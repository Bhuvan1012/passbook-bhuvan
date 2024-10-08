import Transaction from "../models/Transaction.js"

export const createTransaction = async (req, res) => {
  const { transactionType, transactionAmount, previousBalance } = req.body

  const newBalance = transactionType === "credit" ? Number(previousBalance) + Number(transactionAmount) : Number(previousBalance) - Number(transactionAmount)

  if (newBalance < 0) return res.status(400).json({ message: "Insufficient funds for debit" })

  try {
    const newTransaction = await Transaction.create({ ...req.body, newBalance })
    res.status(201).json(newTransaction)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

export const getTransactions = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 10

  try {
    const transactions = await Transaction.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })
    const total = await Transaction.countDocuments()

    res.status(200).json({ transactions, currentPage: page, totalPages: Math.ceil(total / limit) })
  } catch (error) { res.status(500).json({ message: "Server Error" }) }
}

export const getClosingBalance = async (req, res) => {
  try {
    const latestTransaction = await Transaction.findOne().sort({ createdAt: -1 }).select('newBalance')
    if (!latestTransaction) {
      return res.status(404).json({ message: "No transaction found" })
    }
    const closingBalance = latestTransaction.newBalance
    res.status(200).json({ closingBalance })
  } catch (error) { res.status(500).json({ message: "Server Error" }) }
}