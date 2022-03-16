import { NextFunction, Response, Request } from 'express';
// eslint-disable-next-line no-unused-vars
export default function asyncWrapper(funcToAsync : (request: Request, response: Response) => void) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await funcToAsync(request, response);
        } catch (err) {
            next(err);
        }
    };
}
