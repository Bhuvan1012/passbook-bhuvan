import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionForm = ({ closingBalance, refreshData }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		transactionType: 'credit',
		transactionAmount: '',
		transactionRemarks: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/transaction', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, previousBalance: closingBalance }),
			});
			const data = await response.json();
			refreshData();
			navigate('/');
		} catch (error) {
			console.error('Some error occurred: ', error);
		} finally {
			setFormData({
				transactionType: 'credit',
				transactionAmount: '',
				transactionRemarks: '',
			});
		}
	};
	return (
		<div style={{ margin: '0 auto', maxWidth: '400px' }}>
			<div style={{ marginBottom: '16px' }}>
				<label style={{ marginRight: '8px' }} htmlFor="transactionType">
					Transaction Type
				</label>
				<select
					name="transactionType"
					value={formData.transactionType}
					onChange={handleChange}
					required
					style={{
						width: '95%',
						padding: '8px',
						margin: '5px 0',
						cursor: 'pointer',
					}}
				>
					<option value="credit">Credit</option>
					<option value="debit">Debit</option>
				</select>
			</div>
			<div
				style={{
					marginBottom: '16px',
				}}
			>
				<label style={{ marginRight: '8px' }} htmlFor="transactionAmount">
					Transaction Amount
				</label>
				<input
					name="transactionAmount"
					value={formData.transactionAmount}
					onChange={handleChange}
					required
					type="number"
					style={{ width: '95%', padding: '8px', margin: '5px 0' }}
				/>
			</div>
			<div
				style={{
					marginBottom: '16px',
				}}
			>
				<label style={{ marginRight: '8px' }} htmlFor="transactionRemarks">
					Transaction Description
				</label>
				<textarea
					name="transactionRemarks"
					value={formData.transactionRemarks}
					onChange={handleChange}
					rows={3}
					style={{ width: '95%', padding: '8px', margin: '5px 0' }}
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<button
						onClick={handleFormSubmit}
						style={{ padding: '10px', cursor: 'pointer', width: '100%' }}
					>
						Save
					</button>
					<button
						onClick={() => navigate(-1)}
						style={{
							padding: '10px',
							cursor: 'pointer',
							width: '100%',
							background: 'red',
							marginLeft: '10px',
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default TransactionForm;
