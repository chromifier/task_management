import React, { useState } from 'react';
import axios from 'axios';

interface CreateTicketProps {
    username: string | null | undefined;
}


const CreateTicket: React.FC<CreateTicketProps> = ({ username }) => {
    const [machineNumber, setMachineNumber] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const createTicket = async (machineAsset: string, title: string, description: string, status: string, priority: string, createdBy: string) => {
        // await axios.post('/api/users/register', { username, email, password });
        try {
            const response = await axios.post('http://localhost:5000/api/ticket/create', {
                machineAsset,
                title,
                description,
                status,
                priority,
                createdBy
            });
            console.log('Ticket Created:', response.data);
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

            const newTicket = {
                machineNumber,
                title,
                description,
                status,
                priority,
                createdBy: username
            };

            const response = await axios.post('http://localhost:5000/api/tickets/create', newTicket);
            console.log('Ticket created:', response.data);
        } catch (error: any) {
            console.error('Error creating ticket:', error.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Machine Number</label>
                <input
                    type="text"
                    value={machineNumber}
                    onChange={(e) => setMachineNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div>
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button type="submit">Create Ticket</button>
        </form>
    );
};

export default CreateTicket;
