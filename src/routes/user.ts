import { Router } from 'express'
import { UserController } from '../controllers/user'
import { authMiddleware, isAdmin, isSelfUserOrAdmin } from '../middlewares/auth'

const router = Router()

const controller = new UserController()

router.get('/', authMiddleware, isAdmin, async (req, res) => {
	await controller.findAll(req, res)
})

router.get('/:id', authMiddleware, isSelfUserOrAdmin, async (req, res) => {
	await controller.findById(req, res)
})

router.patch('/:id/block', authMiddleware, isSelfUserOrAdmin, async (req, res) => {
	await controller.blockUser(req, res)
})

export default router
