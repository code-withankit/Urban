import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Address = sequelize.define(
    'Address',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.ENUM('home', 'office', 'secondary'),
            allowNull: false,
            defaultValue: 'home'
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        addressLine2: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        postalCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "addresses",
        timestamps: true,
    }
)