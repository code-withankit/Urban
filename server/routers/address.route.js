import express from 'express';
import { createAddress, deleteAddress, getAddress, updateAddress } from '../controllers/address.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const addressRouter = express.Router();

addressRouter.post('/create-address', authMiddleware, createAddress);
addressRouter.get('/get-address', authMiddleware, getAddress);
addressRouter.put('/update-address', authMiddleware, updateAddress);
addressRouter.delete('/delete-address/:addressId', authMiddleware, deleteAddress);