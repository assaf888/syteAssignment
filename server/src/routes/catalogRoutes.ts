import { Router } from 'express';
import {
  getAllCatalogs,
  addNewCatalog,
  updateCatalog,
  deleteCatalog,
  deleteMultipleCatalogs,
} from '../controllers/catalogController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/list', auth, getAllCatalogs);
router.post('/add', auth, addNewCatalog);
router.put('/update/:id', auth, updateCatalog);
router.delete('/delete/:id', auth, deleteCatalog);
router.delete('/delete-multiple', auth, deleteMultipleCatalogs);

export default router;
