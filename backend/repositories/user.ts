import { type Request, type Response } from 'express';
import { client } from '../index';

// client.connect();

interface User {
  role: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  dateOfBirth: string;
  address?: string;
}

export const createUser = async (req: Request, res: Response) => {
  const {
    role,
    firstName,
    lastName,
    emailAddress,
    password,
    dateOfBirth,
    address,
  }: User = req.body;
  try {
    const text = 'INSERT INTO app_user ($1, $2, $3, $4, $5, $6, $7)';
    const values = [
      role,
      firstName,
      lastName,
      emailAddress,
      password,
      dateOfBirth,
      address,
    ];
  } catch (error) {
    console.error(error);
    res.status(500).send('Error ');
  }
};
