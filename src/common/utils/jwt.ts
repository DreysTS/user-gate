import jwt from 'jsonwebtoken'
import { env } from '../config/env'

const JWT_SECRET = env.jwtSecret || 'secret'
const JWT_ACCESS_TOKEN_TTL = env.jwtAccessTokenTTL || '1h'

export function generateToken(payload: object) {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_ACCESS_TOKEN_TTL as any,
		algorithm: 'HS256'
	})
}

export function verifyToken(token: string) {
	return jwt.verify(token, JWT_SECRET, {
		algorithms: ['HS256'],
		ignoreExpiration: false
	})
}
