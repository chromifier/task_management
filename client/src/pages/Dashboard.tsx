import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTicket from './CreateTicket';
import AuthContext from '../context/AuthContext';

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

    interface User {
        username: string | null;
        email: string | null;
    }

    const user = React.useContext(AuthContext);
    const [userDetails, setUserDetails] = React.useState<User | null>();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const userInfo = user?.user;
            // console.log(userInfo);
            if (userInfo) {
                setUserDetails(userInfo);
            }
        } else {
            setUserDetails(null);
        }

        console.log("userDetails State:", userDetails);


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
                setTickets(response.data);
            } catch (error: any) {
                console.error('Error fetching tickets:', error.response?.data?.message || error.message);
            }
        };

        fetchTickets();
    }, []);

    return (
        <>
            <CreateTicket username={userDetails?.username} />
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
