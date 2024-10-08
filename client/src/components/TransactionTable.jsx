import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TransactionTable = ({
	transactions,
	handlePageChange,
	currentPage,
	totalPages,
}) => {
	const navigate = useNavigate();
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Office transactions</th>
						<th></th>
						<th></th>
						<th></th>
						<th
							onClick={() => navigate('/addTransaction')}
							style={{ background: 'gray', cursor: 'pointer' }}
						>
							+ Add Transaction
						</th>
					</tr>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Credit</th>
						<th>Debit</th>
						<th>Running Balance</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map(
						({
							_id,
							transactionType,
							newBalance,
							transactionAmount,
							transactionRemarks,
							createdAt,
						}) => (
							<tr key={_id}>
								<td>{dayjs(createdAt).format('MM/DD/YYYY HH:mm A')}</td>
								<td>{transactionRemarks}</td>
								<td>
									{transactionType === 'credit' ? transactionAmount : '-'}
								</td>
								<td>
									{transactionType !== 'credit' ? transactionAmount : '-'}
								</td>
								<td>{newBalance}</td>
							</tr>
						)
					)}
				</tbody>
			</table>
			<div>
				<button
					style={{ cursor: 'pointer' }}
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
				>
					Previous
				</button>
				<span>
					{currentPage} of {totalPages}
				</span>
				<button
					style={{ cursor: 'pointer' }}
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(currentPage + 1)}
				>
					Next
				</button>
			</div>
		</>
	);
};

export default TransactionTable;
