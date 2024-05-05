import express from 'express';
import Router from 'express-promise-router';
const router = Router();

import {models, sequelize} from '../../models/index.js';
import {Index} from '../../controllers/dashboard.js';

router.get('/', Index);
export default router;
