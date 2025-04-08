import { Router } from 'express';

const authRouter = Router();

authRouter.get('/register', (req, res) => {
    res.send({message: "Auth sign up!"});
})

export default authRouter;