import { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import authMiddleware from '../middleware/auth';


export const createTicket = async (req: Request, res: Response) => {
  console.log("entered create ticket.");

  try {
    const { machineNumber, title, description, status, priority, createdBy } = req.body;
    const newTicket = new Ticket({
      machineNumber,
      title,
      description,
      status,
      priority,
      createdBy
    });

    console.log("ticket details:", newTicket);
    console.log("attempting to save ticket...");

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error creating ticket', error });
    }
  }
};

export const getTickets = async (req: Request, res: Response) => {
  console.log("entered get tickets");

  try {
    console.log("attempting to find tickets...");
    const tickets = await Ticket.find();
    console.log(tickets);

    return res.json(tickets);
  } catch (error: any) {
    if (!res.headersSent) {
      return res.json(error);
    }
  }
};