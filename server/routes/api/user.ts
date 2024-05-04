'use strict';

import express, {Request, Response, NextFunction} from 'express';
import Router from 'express-promise-router';
const router = Router();
import {User} from '../models/user.js';


router.get('/me', function (req: Request, res: Response) {

    if (req.isAuthenticated()) {

        const {id, email} = req.user;
        res.json({id,email});

    } else {
        res.status(500).json({});
    }

});



export default router;
