// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateUser = (request, response, next) => {
    // Check for authentication token in the request headers
    const token = request.headers.authorization;
    console.log('Token',token)

    if (!token) {
        return response.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    // Check if the token is in the expected format (e.g., "Bearer token")
    const [bearer, tokenValue] = token.split(' ');

    if (bearer !== 'Bearer' || !tokenValue) {
        return response.status(401).json({ message: 'Unauthorized - Invalid token format' });
    }

    try {
        const decoded = jwt.verify(tokenValue, 'your_secret_key');
        console.log('decoded user :',decoded.user)
        request.user = decoded.user;
         // Attach user information to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        response.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};
