import { NextFunction, Request, Response } from 'express';

export type RoutesMap = { [key: string]: RouteConfig };

export interface RouteConfig {
	path: string,
	method: 'GET' | 'POST',
	controller: Controller,
	authorized?: boolean,
}

export type Controller = (request: Request, response: Response, next?: NextFunction) => Promise<void>;

export interface IUser {
	_id: string,
	name: string,
	email: string,
	phone: string,
	password: string,
}

export interface ITodo {
	_id: string,
	text: string,
	completed: string,
	_createdBy: string,
}