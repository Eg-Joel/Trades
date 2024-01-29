const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, default: 1  },
    type: { type: String, enum: ['buy', 'sell'], required: true },
    user_id: { type: Number, required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, min: 1, max: 100, required: true },
    price: { type: Number, required: true },
    
  },
   {timestamps: true}
);

module.exports = mongoose.model("Trade", tradeSchema);