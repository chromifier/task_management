import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTicket from './CreateTicket';
import AuthContext from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { addTicket } from '../redux/slices/ticketsSlice';

interface Ticket {
    _id: string;
    machineNumber: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdBy: string;
    createdAt: string;
}

const TicketList: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const userSelector = useSelector((state: RootState) => state.user);
    const ticketsSelector = useSelector((state: RootState) => tickets);
    const dispatch = useDispatch();
    // console.log("userSelector:", userSelector);

    console.log(ticketsSelector);



    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('User not authenticated');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                console.log("attempting get for tickets...");
                const response = await axios.get('http://localhost:5000/api/tickets/getTickets', config);
                dispatch(addTicket(response.data));
                setTickets(response.data);
            } catch (error: any) {
                console.error('Error fetching tickets:', error.response?.data?.message || error.message);
            }
        };

        if (ticketsSelector.length === 0) {
            fetchTickets();
        }
    }, []);

    return (
        <>
            <CreateTicket username={userSelector?.username} />
            <div>
                <h1>Tickets</h1>
                <ul>
                    {tickets.map((ticket) => (
                        <li key={ticket._id}>
                            <h2>{ticket.title}</h2>
                            <p>{ticket.description}</p>
                            <p>Status: {ticket.status}</p>
                            <p>Priority: {ticket.priority}</p>
                            <p>Machine Number: {ticket.machineNumber}</p>
                            <p>Created By: {ticket.createdBy}</p>
                            <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TicketList;
