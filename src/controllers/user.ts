import type { Request, Response } from 'express'
import { UserService } from '../services/user'
import { Logger } from '../common/utils/logger'

export class UserController {
	private readonly logger = Logger.child({ label: UserController.name })

	private readonly userService = new UserService()

	public async findById(req: Request, res: Response) {
		try {
			const id = req.params.id as string

			const user = await this.userService.findById(id)

			if (!user) {
				res.status(404).json({
					mesasge:
						'Пользователь не найден. Убедитесь, что вы ввели правильные данные.'
				})
			}

			res.status(200).json(user)
		} catch (error) {
			this.logger.error(error)

			res.status(500).json({
				message:
					'Ошибка со стороны сервера. Не удалось получить пользователя.'
			})
		}
	}

	public async findAll(req: Request, res: Response) {
		try {
			const users = await this.userService.findAll()

			return res.status(200).json({ users })
		} catch (error) {
			this.logger.error(error)

			res.status(500).json({
				message:
					'Ошибка со стороны сервера. Не удалось получить пользователей.'
			})
		}
	}

	public async blockUser(req: Request, res: Response) {
		try {
			const id = req.params.id as string

			await this.userService.blockUser(id)

			return res.status(200).json({
				message: 'Пользователь успешно заблокирован!'
			})
		} catch (error) {
			res.status(500).json({
				message:
					'Ошибка со стороны сервера. Не удалось заблокировать пользователя.'
			})
		}
	}
}
