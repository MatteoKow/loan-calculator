const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const ReferenceRate = sequelize.define('reference_rates', {
    id_reference_rate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.exports = ReferenceRate;