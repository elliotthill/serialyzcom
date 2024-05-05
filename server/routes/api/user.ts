import express, {Request, Response, NextFunction} from 'express';
import Router from 'express-promise-router';
const router = Router();
import {User} from '../../models/user.js';
import {DoRegister} from '../../controllers/auth.js';

router.get('/me', function (req: Request, res: Response) {

    if (req.isAuthenticated()) {

        const {id, email} = req.user as User;
        res.json({id,email});

    } else {
        res.status(500).json({});
    }

});

router.post('/register', DoRegister);


export default router;
