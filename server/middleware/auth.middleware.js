import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        // Fetch Token 
        const token = req.cookies.jwt_token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // decode the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // send userId in request
        req.userId = decoded.userId;

        return next();
    } catch (error) {
        console.error('Error while authenticating user', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}