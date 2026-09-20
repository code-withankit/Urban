import { Address } from "../models/index.js";
import { sequelize } from "../config/db.js";

export const checkExistingAddress = async (userId, name) => {
    try {
        return await Address.findOne({ where: { userId, name }, raw: true });
    } catch (error) {
        console.error('Error while checking existing address', error);
        throw error;
    }
}

export const createUserAddress = async (userId, name, addressLine1, addressLine2, city, state, postalCode, isDefault) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            if (isDefault) {
                await Address.update({ isDefault: false }, { where: { userId, isDefault: true }, transaction });
            }
            return await Address.create({ userId, name, addressLine1, addressLine2, city, state, postalCode, isDefault }, { transaction });
        });
    } catch (error) {
        console.error('Error while creating user address', error);
        throw error;
    }
}

export const updateUserAddress = async (userId, name, addressLine1, addressLine2, city, state, postalCode) => {
    try {
        if (name) {
            return await Address.update({ addressLine1, addressLine2, city, state, postalCode }, { where: { userId, name } });
        }
    } catch (error) {
        console.error('Error while updating user address', error);
        throw error;
    }
}

export const getUserAddress = async (userId) => {
    try {
        return await Address.findAll({ where: { userId } });
    } catch (error) {
        console.error('Error while getting user address', error);
        throw error;
    }
}

export const deleteUserAddress = async (userId, addressId) => {
    try {
        const deleted = await Address.destroy({ where: { userId, id: addressId, isDefault: false } });
        if (!deleted) {
            return false;
        }
        return deleted;
    } catch (error) {
        console.error('Error while deleting user address', error);
        throw error;
    }
}