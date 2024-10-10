import mongoose from 'mongoose';
import logger from './logger';

import { MONGO_URI } from './consts';


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.info(err);
    process.exit(1);
  }
};

export default connectDB;
