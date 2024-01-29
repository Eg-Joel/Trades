const Trade = require("../models/Trade");

exports.createTrade = async (req, res) => {
  const { type, user_id, symbol, shares, price } = req.body;

  try {
    if (shares < 1 || shares > 100 || !["buy", "sell"].includes(type)) {
      return res.status(400).json({ error: "type value is invalid " });
    }

    const newTrade = new Trade({
      type,
      user_id,
      symbol,
      shares,
      price,
    });
    const tradeCount = await Trade.countDocuments();
    newTrade.id = tradeCount + 1;
    await newTrade.save();
    res.status(201).json(newTrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTrade = async (req, res) => {
  try {
    let query = {};

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.user_id) {
      query.user_id = req.query.user_id;
    }
    const trades = await Trade.find(query).sort({ id: 1 });
    res.status(200).json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTrade = async (req, res) => {
  const tradeId  = parseInt(req.params.id);

  try {
    const trade = await Trade.findOne({ id: tradeId  });
    if (!trade) {
        return res.status(404).json({ error: 'ID not found' });
      }
       res.status(200).json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTrade = async (req, res) => {
    const tradeId  = parseInt(req.params.id);
  
    try {
        const trade = await Trade.findById(tradeId);

        if (!trade) {
          return res.status(404).json({ error: 'Trade not found' });
        }

        await Trade.findByIdAndDelete(tradeId);
         res.status(200).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
exports.editTrade = async (req, res) => {
    const tradeId  = parseInt(req.params.id);
    const { type, symbol, shares, price } = req.body;

    try {
        const trade = await Trade.findById(tradeId);

        if (!trade) {
          return res.status(404).json({ error: 'Trade not found' });
        }
        if (shares < 1 || shares > 100 || !["buy", "sell"].includes(type)) {
            return res.status(400).json({ error: "type value is invalid " });
          }
      
          trade.type = type || trade.type;
          trade.symbol = symbol || trade.symbol;
          trade.shares = shares !== undefined ? shares : trade.shares;
          trade.price = price !== undefined ? price : trade.price;
      
          await trade.save();
         res.status(200).json(updatedTrade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };