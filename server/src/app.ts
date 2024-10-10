import express from 'express';
import connectDB from './db';
import userRoutes from './routes/userRoutes';
import catalogRoutes from './routes/catalogRoutes';
import { setupAutomatedIndexing } from './utils/utils';
import cors from 'cors';
import logger from './logger';

import { PORT } from './consts';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/catalogs', catalogRoutes);

setupAutomatedIndexing();

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
