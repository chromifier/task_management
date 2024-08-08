import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user';
import ticketRoutes from './routes/ticket';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://jmulkinj:OcJUilYTrDaQa8gp@cluster0.u2mgnp4.mongodb.net/?appName=Cluster0';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
