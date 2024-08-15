import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getTickets } from '../redux/slices/ticketsSlice';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hooks/reduxHooks';

const TicketList: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const tickets = useSelector((state: RootState) => state.tickets.tickets);
  // const loading = useSelector((state: RootState) => state.tickets.loading);
  // const error = useSelector((state: RootState) => state.tickets.error);

  // useEffect(() => {
  //   dispatch(getTickets());
  // }, []);

  // if (loading) return <p>Loading tickets...</p>;
  // if (error) return <p>Error: {error}</p>;

  // console.log(tickets);

  return (
    <>
      list here:
    </>
  );
};

export default TicketList;
