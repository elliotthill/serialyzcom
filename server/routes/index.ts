import express from 'express';
//const router = express.Router();
import Router from 'express-promise-router';
const router = Router();

import {Index, Try} from '../controllers/index.js';
import {Login, Register, Logout} from '../controllers/auth.js';
import {models, sequelize} from '../models/index.js';

/* GET home page. */
router.get('/', Index);
router.get('/try', Try);

router.get('/login', Login);
router.get('/register', Register);
router.get('/logout', Logout);
export default router;
