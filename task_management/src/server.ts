import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jmulkinj:OcJUilYTrDaQa8gp@cluster0.u2mgnp4.mongodb.net/?appName=Cluster0';

app.use(express.json());

// Correct connection options
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
