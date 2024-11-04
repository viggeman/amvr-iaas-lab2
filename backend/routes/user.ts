import { Router } from 'express';
import { createUser } from '../repositories/user';

const userRoutes = Router();

userRoutes.post('/sign-up', createUser);

export default userRoutes;
