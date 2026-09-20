import { checkExistingAddress, createUserAddress, deleteUserAddress, getUserAddress, updateUserAddress } from "../services/address.service.js";
import { addressSchema } from "../validations/address.validation.js";

export const createAddress = async (req, res) => {
    try {

        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        const result = addressSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json({ success: false, message: result.error.flatten().fieldErrors });
        }

        const { name, addressLine1, addressLine2, city, state, postalCode, isDefault } = result.data;

        const isExistingAddress = await checkExistingAddress(userId, name);
        if (isExistingAddress) {
            return res.status(409).json({ success: false, message: `Address Already Exist on ${name}` })
        }

        const address = await createUserAddress(userId, name, addressLine1, addressLine2, city, state, postalCode, isDefault);

        return res.status(201).json({ success: true, message: 'Address created Successfully', data: address });
    } catch (error) {
        console.error('Error while creating address', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        const result = addressSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json({ success: false, message: result.error.flatten().fieldErrors });
        }

        const { name, addressLine1, addressLine2, city, state, postalCode } = result.data;

        const isExistingAddress = await checkExistingAddress(userId, name);
        if (!isExistingAddress) {
            return res.status(404).json({ success: false, message: `Address do not exists` })
        }
        const address = await updateUserAddress(userId, name, addressLine1, addressLine2, city, state, postalCode);

        return res.status(200).json({ success: true, message: 'Address Updated Successfully', data: address });
    } catch (error) {
        console.error('Error while updating address', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        const data = await getUserAddress(userId);
        if (data.length == 0) {
            return res.status(404).json({ success: false, message: 'No Address Found' });
        }
        return res.status(200).json({ success: true, message: 'Address Found Successfully', data });
    } catch (error) {
        console.error('Error while getting addresses', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        const addressId = req.params.addressId;
        if (!addressId) {
            return res.status(400).json({ success: false, message: 'Address Id not found' });
        }
        const data = await deleteUserAddress(userId, addressId);
        if (!data) {
            return res.status(400).json({ success: false, message: 'Default Address Cannot be deleted' });
        }
        return res.status(204).send();
    } catch (error) {
        console.error('Error while deleting addresses', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}