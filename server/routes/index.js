import express from 'express';

const router = express.Router();

router.use('/test', require('./test.js'));

export default router;
