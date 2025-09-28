import type { NextFunction, Request, Response } from "express"
import client from "prom-client"

const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total no of Http requests',
    labelNames: ['method', 'route', 'status_code']
})
export const requestCount = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path, 
            status_code: res.statusCode,
        });
    })
    next();
}