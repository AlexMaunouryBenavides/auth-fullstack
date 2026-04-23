import type { Request, Response, NextFunction } from "express";
export declare const browse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const read: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const add: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const edit: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const destroy: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map