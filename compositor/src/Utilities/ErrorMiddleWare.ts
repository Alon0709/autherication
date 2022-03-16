import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import ServerError from './ServerError';
import HttpError from './ServerError';

const errorMiddleWare = function (error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof HttpError) {
        response.status(error.status).send({ message: error.message });
    } else {
        response.send({ status: 500, message: error.message });
    }
    next();
};

export const axiosErrors = (error: AxiosError) => {
    switch(error.code) {
        case 'ENOTFOUND':
            return new ServerError(500, error.message);
    }
};

export default errorMiddleWare;
