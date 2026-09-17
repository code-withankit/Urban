import { User } from "../models/user.model.js";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { hash } from "zod";

export const checkUser = async (email) => {
    try {
        return await User.findOne({ where: { email }, raw: true });
    } catch (error) {
        console.error('Error while checking user', error);
        throw error;
    }
}

export const HashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const createUser = async (name, email, password, role) => {
    try {
        return (await User.create({ name, email, password, role })).get({ plain: true });
    } catch (error) {
        console.error('Error while creating user', error);
        throw error;
    }
}

export const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '7d' });
}

export const checkPasswordValidity = async (hash, password) => {
    return await bcrypt.compare(password, hash);
}