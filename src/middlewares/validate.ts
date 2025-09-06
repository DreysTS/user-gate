import type { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function validateBody(schema: ZodSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body)
			next()
		} catch (err: any) {
			return res.status(400).json({
				error: err.errors
			})
		}
	}
}
