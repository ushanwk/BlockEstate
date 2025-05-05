import {SearchField} from "../common/SearchField.jsx";
import { BellRing } from 'lucide-react';
import {useEffect, useState} from "react";
import { CalendarRange } from 'lucide-react';
import ThemeToggle from "../common/ThemeToggle.jsx";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase/firebase.config.js";
import {Button} from "../common/Button.jsx";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();


    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });


    const [profileImageUrl, setProfileImageUrl] = useState(null);

    const { signOutUser } = useAuth();

    async function getUserProfilePicture(currentUser) {
        const firebaseUid = currentUser.uid;

        const token = await currentUser.getIdToken();

        const res = await axios.post(
            "http://localhost:5500/api/user/get-user-image",
            {firebaseUid},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setProfileImageUrl(res.data.image);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                getUserProfilePicture(currentUser);
            } else {
                // user is logged out
                console.log('No user signed in');
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <header>
            <div className="flex items-center justify-between w-full">
                <div className="w-64">
                    <SearchField placeholder="Search..." />
                </div>

                <div className="flex items-center justify-between gap-6">

                    <div className={`flex items-center gap-2`}>

                        <CalendarRange className="w-5 h-5 text-gray-400 dark:text-gray-500 " />

                        <span className="text-sm text-gray-400 dark:text-gray-500">
                        {formattedDate}
                      </span>
                    </div>

                    <BellRing className="w-5 h-5 fill-current text-gray-800 dark:text-gray-300" />

                    <ThemeToggle />

                    <div className="w-20">
                        <Button red="red" children="Logout" onclick={() => {
                            signOutUser();
                            navigate("/auth");
                        }} />
                    </div>

                    <img
                        src={profileImageUrl}
                        alt="Daniel Carter"
                        className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />

                </div>
            </div>
        </header>
    )
}