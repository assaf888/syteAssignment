import { Request, Response } from 'express';
import Catalog from '../models/Catalog';
import logger from '../logger';
import { isValidName } from '../utils/utils';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const getAllCatalogs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    logger.info(`Getting catalogs for user: ${req.userId}`);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const catalogs = await Catalog.find({ userId: req.userId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Catalog.countDocuments({ userId: req.userId });

    res.json({ catalogs, totalCount });
    return;
  } catch (error) {
    logger.info(`Error fetching catalogs: ${error}`);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const addNewCatalog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, vertical, isPrimary, locales } = req.body;

  try {

    if(!req.userId){
      res.status(401).json({ message: 'Unauthorized: no userId found' });
      return;
    }

    const userId = req.userId

    logger.info('Validating name');
    if(!name || !isValidName(name)){
      logger.info('Failed adding new catalog');
      res.status(400).json({ error: 'Catalog name must contain letters and cannot be empty' });
      return;
    }

    if (isPrimary) {
      await Catalog.updateMany({ vertical, userId: userId }, { isPrimary: false });
      logger.info('Changed all previous catalogs (of the same vertical) primary to false');
    }

    const existingCatalog = await Catalog.findOne({ name: name.toLowerCase(), userId: userId });
    if (existingCatalog) {
      logger.info(`A catalog with the name "${name}" already exists`);
      res.status(400).json({ error: `A catalog with the name "${name}" already exists.` });
      return;
    }

    logger.info('Adding new catalog');
    const newCatalog = new Catalog({ name, vertical, isPrimary, locales, userId: req.userId });
    await newCatalog.save();
    res.status(201).json(newCatalog);

    logger.info('added new catalog successfully');
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error adding catalog' });
    return;
  }
};

export const updateCatalog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, vertical, isPrimary, locales } = req.body;

  try {

    if (!req.userId) {
      res.status(401).json({ message: 'Unauthorized: no userId found' });
      return;
    }

    logger.info('Updating selected catalog');

    if (isPrimary) {
      await Catalog.updateMany({ _id: { $ne: id }, vertical, userId: req.userId }, { isPrimary: false });
      logger.info('Changed all previous catalogs (of the same vertical) primary to false');
    }
    
    const updatedCatalog = await Catalog.findByIdAndUpdate(
      { _id: id, userId: req.userId },
      { name, vertical, isPrimary, locales, indexedAt: new Date() },
      { new: true }
    );

    if (!updatedCatalog) {
      logger.info('Failed updating catalog');
      res.status(404).json({ message: 'Catalog not found' });
      return;
    }

    res.json(updatedCatalog);

    logger.info('Successfully updated catalog');
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error updating catalog' });
    return;
  }
};

export const deleteCatalog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    logger.info(`Deleting catalog, ${id}`);
    const deletedCatalog = await Catalog.findByIdAndDelete(id);

    if (!deletedCatalog) {
      logger.info('Error deleting catalog');
      res.status(404).json({ message: 'Catalog not found' });
      return;
    }

    res.json({ message: 'Catalog deleted successfully' });
    logger.info('Catalog was successfully deleted');
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catalog' });
    return;
  }
};

export const deleteMultipleCatalogs = async (req: Request, res: Response): Promise<void> => {
  const { ids } = req.body;

  try {
    logger.info('Deleting bulk of catalogs');
    const result = await Catalog.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Catalogs deleted successfully', count: result.deletedCount });
    logger.info('Deletion complete.');
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catalogs' });
    return;
  }
};