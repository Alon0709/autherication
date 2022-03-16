import { NextFunction, Request, Response } from 'express';
import HttpError from './ServerError';

const errorMiddleWare = function (error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof HttpError) {
        response.status(error.status).send({ message: error.message });
    } else {
        response.send({ status: 500, message: error.message });
    }
    next();
};

export default errorMiddleWare;
