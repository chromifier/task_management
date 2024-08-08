import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
    };
}

interface JwtUserPayload extends JwtPayload {
    user: {
        id: string;
        username: string;
        email: string;
    };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, "secret") as JwtUserPayload;
        if (decoded && decoded.user) {
            req.user = decoded.user; // Now TypeScript understands that `user` exists
            next();
        } else {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        // if (!res.headersSent) {
        //     res.status(400).json({ message: 'Error' });
        //     return; // Ensure `next()` is not called
        // }
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authMiddleware;
