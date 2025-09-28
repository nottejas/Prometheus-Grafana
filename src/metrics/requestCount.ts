import type { NextFunction, Request, Response } from "express"
import client from "prom-client"

export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total no of Http requests',
    labelNames: ['method', 'route', 'status_code']
})
