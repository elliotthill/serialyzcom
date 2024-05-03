'use strict'
import config from "../../config.json" assert {type:"json"};

import {models, sequelize} from '../models/index.js';
import {QueryTypes} from 'sequelize';

const deleteAllOldCaches =  `
                DELETE
                FROM render_cache
                WHERE timestamp < NOW() - INTERVAL :expirationDays DAY`;

sequelize.query(deleteAllOldCaches,
                {
                    replacements: {expirationDays:config.CACHE_EXPIRATION_DAYS},
                    type: QueryTypes.SELECT
                });
