import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  date: { type: Date, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
