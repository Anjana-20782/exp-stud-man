// import express from 'express';
// import {
//   getAllStudents,
//   getStudentById,
//   createStudent,
//   updateStudent,
//   deleteStudent
// } from '../controllers/studentController.js';

// const router = express.Router();

// router.get('/', getAllStudents);    //api creation verum / vilichal display cheypikande paranj koduthirikanne route                                    
// router.get('/:id', getStudentById);  //frondend eppo call cheyum backendil eppo work cheyanam paranj kodutirika
// router.post('/', createStudent);
// router.put('/:id', updateStudent);
// router.delete('/:id', deleteStudent);

// export default router;


import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.post('/', verifyToken, createStudent);
router.put('/:id', verifyToken, updateStudent);
router.delete('/:id', verifyToken, deleteStudent);

export default router;

