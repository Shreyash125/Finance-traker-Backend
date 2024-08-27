import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// POST /api/transactions
router.post('/', async (req, res) => {
  const { desc, amount, type, date } = req.body;

  if (!desc || !amount || !type || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTransaction = new Transaction({ desc, amount, type, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
