import Router from "express";
import banks from './bank.js';

const router = new Router();

router.use('/bank', banks);

export default router;
