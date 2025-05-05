import {CommonAuth} from "../CommonAuth.jsx";
import LoginBg from "../../../assets/images/auth/common/LoginBg.png"
import {PasswordField} from "../../../components/common/PasswordField.jsx";
import {TextField} from "../../../components/common/TextField.jsx";
import AppleIcon from "../../../assets/icons/auth/AppleIcon.png";
import GoogleIcon from "../../../assets/icons/auth/GoogleIcon.png";
import {Button} from "../../../components/common/Button.jsx";
import {GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../firebase/firebase.config.js";
import {toast} from "sonner";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export const LoginPage = () => {

    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLoginGoogle = async () => {

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const firebaseId = user.uid;

            const res = await fetch(`http://localhost:5500/api/auth/check-firebase-user/${firebaseId}`);
            const data = await res.json();

            console.log(data.exists)

            if (data.exists) {
                toast.success("Login successfully!", {
                    description: "Your have successfully logged in",
                });

                navigate("/");
            } else {
                await result.user.delete();
                toast.error("Account not registered.", {
                   description: "Not registered. Please sign up first.",
                });
            }

        } catch (err) {
            console.error("Google login error:", err);
            toast.error("Something went wrong", {
                description: "Please try again later."
            });
        }
    };

    const handleSubmit = async () => {
        if (!emailOrUsername || !password) {
            toast.error("Empty credentials", {
                description: "Please enter your credentials",
            });
            return;
        }

        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailOrUsername)) {
                toast.error("Invalid Email", {
                    description: "Please enter a valid email address",
                });
                return;
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailOrUsername,
                password
            );

            const firebaseUid = userCredential.user.uid;

            const res = await axios.post(
                "http://localhost:5500/api/user/get-user-role",
                { firebaseUid }
            );

            toast.success("Login successfully!", {
                description: "Your have successfully logged in",
            });

            if(res.data.role === "ADMIN") {
                navigate("/admin");
            }else{
                if(res.data.role === "INVESTOR"){
                    navigate("/");
                }else{
                    navigate("/agency");
                }
            }



        } catch (error) {
            console.error("Firebase login error:", error);

            toast.error("Incorrect email or password.", {
                description: "Please try again later."
            });
        }
    }


    return (
       <CommonAuth image={LoginBg} topic="Revolutionizing Real Estate with Blockchain" text="A secure, transparent, and innovative platform to invest in real estate and earn passive income"
                   section={
                       <div className="mt-8 flex items-center justify-center">
                           <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] p-8 rounded-lg w-full">
                               <div>
                                   <h1 className="text-[22px] md:text-[26px] lg:text-[24px] font-light dark:text-white">Welcome Back to BlockEstate!</h1>
                                   <p className="text-[#999999] text-[14px] font-light">Securely Access Your Property Investments & Listings</p>
                               </div>

                               <div className="flex gap-4 my-8 mt-[45px]">
                                   <button
                                       className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px] gap-2 cursor-pointer font-normal hover:border-black/30 dark:text-white dark:bg-white/10"
                                       onClick={handleLoginGoogle}
                                   >
                                       <img src={GoogleIcon} alt="Google" className="md:w-5 w-3"/>
                                       Login with Google
                                   </button>
                                   <button
                                       className="flex items-center justify-center w-full h-[38px] py-2 border-black/10 border-[0.5px] rounded-[5px] md:text-[13px] text-[12px]  gap-2 cursor-pointer font-normal hover:border-black/30 dark:text-white dark:bg-white/10">
                                       <img src={AppleIcon} alt="Apple" className="md:w-5 w-3"/>
                                       Login with Apple
                                   </button>
                               </div>

                               <div className="flex items-center gap-2 my-6">
                                   <div className="flex-grow h-px bg-[#E1E1E1] dark:bg-white/40"></div>
                                   <h5 className="text-xs text-[#E1E1E1] dark:text-white/40">or</h5>
                                   <div className="flex-grow h-px bg-[#E1E1E1] dark:bg-white/40"></div>
                               </div>

                               <div className="mt-8">
                                   <div className="mt-6">
                                       <TextField placeholder="Enter your username or email" label="Username or Email"
                                                  value={emailOrUsername}
                                                  onChange={(e) => setEmailOrUsername(e.target.value)}
                                       />
                                   </div>

                                   <div className="mt-6">
                                       <PasswordField placeholder="Enter your password" label="Password"
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                       />
                                       <div className="mt-[-10px] text-right">
                                           <a href="/auth/forget" className="text-[10px] text-black/60 dark:text-white/50 hover:text-blue-500 cursor-pointer">Forgot Password?</a>
                                       </div>
                                   </div>
                               </div>

                               <div className="mt-6">
                                   <Button children="Login" onclick={handleSubmit}/>
                               </div>

                               <div className="mt-4 text-center">
                                   <span className="text-[10px] text-black/60 dark:text-white/50">Don’t have an account? </span>
                                   <a href="/auth/type" className="text-[10px] text-[#0274F9] hover:text-[#00B3FE] cursor-pointer">Register now</a>
                               </div>

                           </div>
                       </div>
                   } />
    )
}