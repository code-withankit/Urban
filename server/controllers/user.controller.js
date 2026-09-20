import { sendOnboardingEmail } from "../services/email.service.js";
import { checkPasswordValidity, checkUser, createToken, createUser, HashPassword } from "../services/user.service.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";

const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV == 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

// user register
export const Register = async (req, res) => {
    try {

        // Validate Request Data
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json({ success: false, message: result.error.flatten().fieldErrors });
        }

        // Extract validated data
        const { name, email, password, role } = result.data;

        // Find Existing User
        let user = await checkUser(email);
        if (user) {
            return res.status(409).json({ success: false, message: 'User Already exists' });
        }

        // hash the password
        const hash = await HashPassword(password);

        // create user
        user = await createUser(name, email, hash, role);

        // delete password to hide sensitive information
        delete user.password;

        // create token
        const token = createToken(user.id);

        // set token in response
        res.cookie('jwt_token', token, cookieOptions);

        await sendOnboardingEmail(name,email);

        // return created user
        return res.status(201).json({ success: true, message: 'User Created Successfully', data: user });
    } catch (error) {
        console.error('Error while registering User', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// user login
export const Login = async (req, res) => {
    try {

        // Validate Request data
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json({ success: false, message: result.error.flatten().fieldErrors });
        }

        // Extract validated data
        const { email, password } = result.data;

        // Find Existing User
        let user = await checkUser(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User do not exists' });
        }

        // check password validity
        const isPasswordValid = await checkPasswordValidity(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Please Provide Valid Credentials' });
        }

        // delete user password to hide sensitive information
        delete user.password;

        // create token
        const token = createToken(user.id);

        // set token in response
        res.cookie('jwt_token', token, cookieOptions);

        // return logged In user
        return res.status(200).json({ success: true, message: 'User Logged In Successfully', data: user });
    } catch (error) {
        console.error('Error while logging in User', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// user logout
export const Logout = async (req, res) => {
    try {
        // clear cookies
        res.clearCookie('jwt_token');
        return res.status(200).json({ success: false, message: 'User Logged Out Successfully' });
    } catch (error) {
        console.error('Error while logging out User', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}