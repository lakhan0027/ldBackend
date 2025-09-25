import express from 'express';
import { loginController, logoutController, registerController } from '../controllers/authController.js';
import { loginValidationRules, registerValidationRules } from '../validators/authValidator.js';
import { validateRequest } from '../middlewares/authMiddleware.js';

const router=express.Router();




router.post('/auth/register',registerValidationRules,validateRequest,registerController);

router.post('/auth/login',loginValidationRules,validateRequest,loginController);



// Logout route
router.post('/auth/logout', logoutController);


export default router;