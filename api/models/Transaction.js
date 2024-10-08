import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionType: { type: String, enum: ['credit', 'debit'], required: true },
  transactionAmount: { type: Number, required: true },
  previousBalance: { type: Number, required: true },
  newBalance: { type: Number, required: true },
  transactionRemarks: { type: String, required: true },
}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction