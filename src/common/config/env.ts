import dotenv from 'dotenv'

dotenv.config()

export const env = {
	applicationPort: process.env.APPLICATION_PORT,
	jwtSecret: process.env.JWT_SECRET,
	jwtAccessTokenTTL: process.env.JWT_ACCESS_TOKEN_TTL,
	jwtRefreshTokenTTL: process.env.JWT_REFRESH_TOKEN_TTL
}
