import express from 'express';

import GetCards from '../controllers/get-cards';

import CatchResponse from '../utils/catch-response';

const router = express.Router();

router.get('/get-cards', async (req, res) => {
  try {
    const {
      limit,
      searchKeyword = ''
    } = req.query;

    const {
      cards,
      total
    } = await GetCards({
      searchKeyword,
      limit: Number(limit)
    });

    res.status(200).json({
      success: true,
      message: 'Cards Fetched Successfully',
      cards,
      total
    });
  } catch (err) {
    console.log(err);
    CatchResponse({
      res,
      err
    });
  }
});


export default router;
