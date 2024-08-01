import { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';

export const createTicket = async (req: Request, res: Response) => {
    const { machineAsset, title, description, status, priority, createdBy, } = req.body;

    try {
        const ticketExists = await Ticket.findOne({ machineAsset });

        const newTicket = new Ticket({
            machineAsset,
            title,
            description,
            status,
            priority,
            createdBy
        });

        await newTicket.save();

        res.status(201).json({ message: 'Ticket created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};