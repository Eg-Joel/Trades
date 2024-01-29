const { createTrade, getAllTrade, getTrade, deleteTrade, editTrade } = require("../controllers/tradeController");

const router = require("express").Router()

router.post('/trades',createTrade)

router.get('/trades',getAllTrade)

router.get('/trades/:id',getTrade)

router.delete('/trades/:id',deleteTrade)

router.put('/trades/:id',editTrade)


module.exports = router;