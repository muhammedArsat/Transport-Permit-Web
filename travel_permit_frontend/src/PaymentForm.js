import React, { useState } from 'react';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure amount is valid and positive
        const numericAmount = Number(amount);
        if (numericAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        // Replace with your actual UPI ID for testing
    // Your UPI ID
        const upiLink = `upi://pay?pa=tranavv8@oksbi&pn=Test User&mc=&tid=${Date.now()}&tt=Testing UPI Payment&am=${numericAmount}&cu=INR&url=http://localhost:3000/user-form`;

        // Log the UPI link for debugging
        console.log("UPI Link: ", upiLink);

        // Redirect to UPI payment
        window.location.href = upiLink;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="amount">Amount (INR):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Pay with UPI</button>
        </form>
    );
};

export default PaymentForm;
