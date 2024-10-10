import cron from 'node-cron';
import Catalog from '../models/Catalog';
import logger from '../logger';

export const isValidName = (name: string): boolean => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
};

export const setupAutomatedIndexing = (): void => {
  cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('Starting automated indexing process for all catalogs.');

      const result = await Catalog.updateMany({}, { indexedAt: new Date() });

      logger.info(`Automated indexing process completed. ${result.modifiedCount} catalogs updated.`);
    } catch (error) {
      logger.error(`Error during automated indexing process:, ${error}`);
    }
  });

  logger.info('Automated indexing cron job has been set up to run every 24 hours.');
};
