import React, { useState } from 'react';
import { createTicket } from '../context/AuthContext';

const CreateTicket: React.FC = () => {
    const [formData, setFormData] = useState({
        machineAsset: '',
        title: '',
        description: '',
        status: 'Open',
        priority: 'Medium',
        createdBy: '',
    });

    const { machineAsset, title, description, status, priority, createdBy } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTicket(machineAsset, title, description, status, priority, createdBy);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Machine Asset</label>
                <input type="number" name="machineAsset" value={machineAsset} onChange={onChange} required />
            </div>
            <div>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={onChange} required />
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" value={description} onChange={onChange} required />
            </div>
            <button type="submit">Create Ticket</button>
        </form>
    );
};

export default CreateTicket;
