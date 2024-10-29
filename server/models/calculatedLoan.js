const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const CalculatedLoan = sequelize.define('calculated_loans', {
    id_calculated_loan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    initial_loan_amount: {
        type: DataTypes.FLOAT,
    },
    loan_to_repayment: {
        type: DataTypes.FLOAT,
    },
    new_installment_amount: {
        type: DataTypes.FLOAT,
    },
    remaining_installments: {
        type: DataTypes.INTEGER,
    },
    interest_rate: {
        type: DataTypes.FLOAT,
    },
    reference_rate: {
        type: DataTypes.FLOAT,
    },
    date: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
});

module.exports = CalculatedLoan;
