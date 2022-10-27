import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Middleware responsável por verificar se um token de acesso válido foi enviado no cabeçalho de uma requisição.
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({
      name: 'Error',
      message: 'Acesso negado!',
      status: 401,
    });
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;

    res.locals.user = jwt.verify(accessToken, secret as string);

    next();
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
      status: 400,
    });
  }
};
