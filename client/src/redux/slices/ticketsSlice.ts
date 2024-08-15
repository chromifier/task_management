import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  machineNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Array<string> | null,
}

type TicketsState = Ticket[];

const initialState: TicketsState = [];

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.push(action.payload);
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      return state.filter(ticket => ticket.title !== action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.findIndex(ticket => ticket.title === action.payload.title);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTicket, removeTicket, updateTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
