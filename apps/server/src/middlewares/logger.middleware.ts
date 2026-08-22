import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    private logger = new Logger('HTTP')

    use(req: Request, res: Response, next: NextFunction): void {
        
        const { method, originalUrl, ip } = req
        const agent = req.get('user-agent') || ''
        const today = Date.now()

        res.on('finish', () => {
            const { statusCode } = res
            const duration = Date.now() - today
            const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms | IP: ${ip} | UA: ${agent}`
            if (statusCode >= 500) this.logger.error(message)
            else if (statusCode >= 400) this.logger.warn(message)
            else this.logger.log(message)
        })

        next()

    }
    
}