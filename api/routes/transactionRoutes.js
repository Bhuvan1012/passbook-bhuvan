import express from "express";
import { createTransaction, getClosingBalance, getTransactions } from "../controllers/transactionController.js";

const router = express.Router()

router.post("/transaction", createTransaction)
router.get("/transactions", getTransactions)
router.get("/getClosingBalance", getClosingBalance)

export default router