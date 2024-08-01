import { Schema, model, Document } from 'mongoose';

interface Comment {
    comment: string;
    commentedBy: Schema.Types.ObjectId;
    commentedAt: Date;
}

export interface TicketDocument extends Document {
    machineAsset: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    createdBy: string;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
}

const commentSchema = new Schema<Comment>({
    comment: {
        type: String,
        trim: true,
    },
    commentedBy: {
        type: String,
        ref: 'User',
    },
    commentedAt: {
        type: Date,
        default: Date.now,
    },
});

const ticketSchema = new Schema<TicketDocument>({
    machineAsset: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open',
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: true,
    },
    assignedTo: {
        type: String,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    comments: [commentSchema],
});

ticketSchema.pre<TicketDocument>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const Ticket = model<TicketDocument>('Ticket', ticketSchema);
