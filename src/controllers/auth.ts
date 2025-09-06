import type { Request, Response } from 'express'
import { AuthService } from '../services/auth'
import { Logger } from '../common/utils/logger'

export class AuthController {
	private readonly logger = Logger.child({ label: AuthController.name })
	private readonly authService = new AuthService()

	public async register(req: Request, res: Response) {
		try {
			const { token, user } = await this.authService.register(req.body)

			return res.status(200).json({
				token,
				user
			})
		} catch (error) {
			this.logger.error(error)

			return res.status(409).json({
				message:
					'Пользователь уже существует. Введите другую почту для создания аккаунта.'
			})
		}
	}

	public async login(req: Request, res: Response) {
		try {
			const { token, user } = await this.authService.login(req.body)

			return res.status(200).json({
				token,
				user
			})
		} catch (error) {
			this.logger.error(error)

			return res.status(404).json({
				message: 'Неверный email или пароль'
			})
		}
	}
}
