import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../redux/slices/ticketsSlice';
import { RootState } from '../redux/store';

const TicketList: React.FC = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const loading = useSelector((state: RootState) => state.tickets.loading);
  const error = useSelector((state: RootState) => state.tickets.error);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {tickets.map(ticket => (
        <li key={ticket._id}>{ticket.title}</li>
      ))}
    </ul>
  );
};

export default TicketList;
