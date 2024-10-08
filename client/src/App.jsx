import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';

function App() {
	const [transactions, setTransactions] = useState([]);
	const [closingBalance, setClosingBalance] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchTransactionsAndBalance = async (page = 1) => {
		try {
			const [transactionResponse, balanceResponse] = await Promise.all([
				fetch(`/api/transactions?page=${page}`),
				fetch('/api/getClosingBalance'),
			]);

			const transactionData = await transactionResponse.json();
			const balanceData = await balanceResponse.json();
			setTransactions(transactionData.transactions);
			setCurrentPage(transactionData.currentPage);
			setTotalPages(transactionData.totalPages);
			setClosingBalance(balanceData.closingBalance);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	useEffect(() => {
		fetchTransactionsAndBalance();
	}, []);
	useEffect(() => {
		fetchTransactionsAndBalance(currentPage);
	}, [currentPage]);

	const handlePageChange = (newPage) => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<TransactionTable
							transactions={transactions}
							handlePageChange={handlePageChange}
							currentPage={currentPage}
							totalPages={totalPages}
						/>
					}
				/>
				<Route
					path="/addTransaction"
					element={
						<TransactionForm
							closingBalance={closingBalance}
							refreshData={fetchTransactionsAndBalance}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
