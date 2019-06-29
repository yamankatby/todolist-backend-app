import { NextFunction, Request, Response } from 'express';

export type RoutesMap = { [key: string]: RouteConfig };

export interface RouteConfig {
	path: string,
	method: 'GET' | 'POST',
	controller: Controller,
}

export type Controller = (request: Request, response: Response, next?: NextFunction) => Promise<void>;