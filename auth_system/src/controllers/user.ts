import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = 'secret';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        // const isMatch = await bcrypt.compareSync(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: `Incorrect password.` });
        // }

        console.log(password, " vs ", user.password);

        if (password !== user.password) {
            return res.status(400).json({ message: `Incorrect password.` });
        }

        const payload = {
            user: {
                username: user.username,
                email: user.email
            },
        };

        const token = jwt.sign(payload, "secret", {
            expiresIn: '1h', // Token expiry time
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserDetails = (req: Request, res: Response) => {
    const user = (req as any).user; // Type assertion to access the user object

    if (user) {
        return res.json({
            username: user.username,
            email: user.email,
        });
    } else {
        return res.status(400).json({ msg: 'User not found' });
    }
};