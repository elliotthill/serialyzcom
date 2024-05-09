import express, {Request, Response, NextFunction} from 'express';
import Router from 'express-promise-router';
import {models, sequelize} from "../../models/index.js";
import {Job} from "../../models/job.js";
import {QueryTypes} from "sequelize";
const router = Router();


router.post('/try', async function (req: Request, res: Response) {

    const url:string = req.body.url
    const jobId = await models.Job.create({url:url})

    //Wait until job completes
    const poll = async () => {

        let job = await sequelize.query<Job>(`
        SELECT id, url, status, structure
        FROM job
        WHERE status='complete' AND id=:id
        `,{
            type:QueryTypes.SELECT,
            replacements: {id:jobId.id},
            plain:true
        })

        if (job)
            res.json(job);
        else
            setTimeout(poll, 200);
    }

    setTimeout(poll, 200);

});





export default router;
