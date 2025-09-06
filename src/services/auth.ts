import { prisma } from '../common/config/prisma'
import { LoginDto } from '../common/dto/login.dto'
import { RegisterDto } from '../common/dto/register.dto'
import { comparePassword, hashPassword } from '../common/utils/hash'
import { generateToken } from '../common/utils/jwt'

export class AuthService {
	public async register(data: RegisterDto) {
		const hashedPassword = await hashPassword(data.password)

		const user = await prisma.user.create({
			data: {
				...data,
				dateOfBirth: new Date(data.dateOfBirth),
				patronymic: data.patronymic ? data.patronymic : null,
				password: hashedPassword
			}
		})

		const token = generateToken(user)

		return {
			token,
			user
		}
	}

	public async login(data: LoginDto) {
		const { email, password } = data

		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (!user) {
			throw new Error('Неверный email или пароль.')
		}

		const isValidPassword = await comparePassword(password, user.password)

		if (!isValidPassword) {
			throw new Error('Неверный email или пароль.')
		}

		const token = generateToken(user)

		return {
			token,
			user
		}
	}
}
