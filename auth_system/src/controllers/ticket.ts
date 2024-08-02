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

// Get all tickets
export const getAllTickets = async (req: Request, res: Response) => {
    try {
      const tickets = await Ticket.find();
      console.log(tickets);
      return res.status(200).json(tickets);
    } catch (err: any) {
    //   console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  };