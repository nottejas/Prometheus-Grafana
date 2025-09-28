import type { NextFunction, Request, Response } from "express"
import client from "prom-client"

export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total no of Http requests',
    labelNames: ['method', 'route', 'status_code']
})

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});