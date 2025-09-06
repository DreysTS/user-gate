import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../common/utils/jwt'
import { User } from '@prisma/client'

export interface AuthRequest extends Request {
	user?: User
}

export function authMiddleware(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({
			message:
				'Пользователь не авторизован. Войдите в аккаунт или создайте его.'
		})
	}

	try {
		const decoded = verifyToken(token) as User

		req.user = decoded

		next()
	} catch (error) {
		return res.status(403).json({
			message: 'Некорректный токен авторизации.'
		})
	}
}

export function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
	if (req.user?.role !== 'ADMIN') {
		return res.status(403).json({
			message: 'Недостаточно прав для совершения данного действия.'
		})
	}
	next()
}

export function isSelfUserOrAdmin(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	if (req.user?.role === 'ADMIN' || req.user?.id === req.params.id) {
		return next()
	}
	return res.status(403).json({
		message: 'Недостаточно прав для совершения данного действия'
	})
}
