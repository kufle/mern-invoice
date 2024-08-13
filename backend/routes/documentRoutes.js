import express from 'express';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import createDocument from '../controllers/documents/createDocument.js';
import getAllUserDocuments from '../controllers/documents/getAllUserDocuments.js';
import updateDocument from '../controllers/documents/updateDocument.js';
import getSingleUserDocument from '../controllers/documents/getSingleUserDocument.js';
import deleteDocument from '../controllers/documents/deleteDocument.js';

const router = express.Router();

// create a new document at /api/v1/document/create
router.route('/create').post(checkAuth, createDocument);

// get all of a users documents at /api/v1/document/all
router.route('/all').get(checkAuth, getAllUserDocuments);

router
  .route('/:id')
  .patch(checkAuth, updateDocument)
  .get(checkAuth, getSingleUserDocument)
  .delete(checkAuth, deleteDocument);

export default router;
