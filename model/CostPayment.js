const mongoose = require('mongoose');

const costTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const costPaymentSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false },
  types: [costTypeSchema],
  totalToPay: { type: Number, required: true },
  clientCost: { type: Number },
  isPaid: { type: Boolean, default: false },
});

const CostPayment = mongoose.model('CostPayment', costPaymentSchema);

module.exports = CostPayment;
