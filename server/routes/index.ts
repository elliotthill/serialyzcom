import express from 'express';
//const router = express.Router();
import Router from 'express-promise-router';
const router = Router();

import {Index} from '../controllers/index.js';
import {Login} from '../controllers/login.js';
import {models, sequelize} from '../models/index.js';

/* GET home page. */
router.get('/', Index);

router.get('/login', Login);

export default router;
