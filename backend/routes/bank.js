import Router from 'express';
import * as bank from '../controller/bank.js';

const router = new Router();

router.get('/', bank.getAll);
router.get('/:bank', bank.getBank);
router.post('/', bank.create);
router.delete('/:bank', bank.remove);

export default router;