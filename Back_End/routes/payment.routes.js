import {Router} from "express";
import {Stripe} from "stripe";

import { SEC_KEY } from "../config/env.config.js";
const stripe = Stripe(SEC_KEY);


const paymentRouter = Router();

paymentRouter.post("/pay-sponsor", async (req, res) => {
    const { title, price} = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Sponsor: ${title}`,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5173/agency/sponsorships/success`,
            cancel_url: `http://localhost:5173/agency/sponsorships/failed`,
        });

        return res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error("Stripe error:", error.message);
        return res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
});

export default paymentRouter;