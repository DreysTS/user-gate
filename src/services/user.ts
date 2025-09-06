import { UserStatus } from '@prisma/client'
import { prisma } from '../common/config/prisma'

export class UserService {
	public async findById(id: string) {
		return await prisma.user.findFirst({ where: { id } })
	}

	public async findAll() {
		return await prisma.user.findMany()
	}

	public async blockUser(id: string) {
		return await prisma.user.update({
			where: {
				id
			},
			data: {
				status: UserStatus.NON_ACTIVE
			}
		})
	}
}
