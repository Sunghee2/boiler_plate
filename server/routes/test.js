import express from 'express';
import db from '../modules/db/pool';
import util from '../modules/utils/authUtil';
import statusCode from '../modules/utils/statusCode';
import responseMessage from '../modules/utils/responseMessage';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const query = 'SELECT password FROM Users WHERE id= ?';
  const result = await db.queryParam_Parse(query, [req.params.id]);

  res
    .status(statusCode.OK)
    .send(util.successTrue(statusCode.OK, responseMessage.X_READ_SUCCESS('비밀번호'), result));
});

module.exports = router;
