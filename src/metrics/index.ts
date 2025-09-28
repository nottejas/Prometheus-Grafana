import type { NextFunction, Request, Response } from "express";
import { httpRequestDurationMicroseconds, requestCounter } from "./requestCount.js";
import { activeRequestsGauge } from "./activeRequests.js";

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestsGauge.inc();

    res.on('finish', function() {
        const endTime = Date.now();
        const duration = endTime - startTime
        // console.log(`Request took ${endTime - startTime}ms`);
    
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration)
        activeRequestsGauge.dec();
    });
    next();
}