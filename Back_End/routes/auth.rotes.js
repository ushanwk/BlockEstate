import { Router } from 'express';

const authRouter = Router();

authRouter.get('/sign-up', (req, res) => {
    res.send({message: "Auth sign up!"});
})

export default authRouter;