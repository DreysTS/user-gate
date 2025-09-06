import { Router } from 'express'
import { AuthController } from '../controllers/auth'
import { validateBody } from '../middlewares/validate'
import { RegisterSchema } from '../common/dto/register.dto'
import { LoginSchema } from '../common/dto/login.dto'

const router = Router()

const controller = new AuthController()

router.post('/register', validateBody(RegisterSchema), async (req, res) => {
	await controller.register(req, res)
})

router.post('/login', validateBody(LoginSchema), async (req, res) => {
	await controller.login(req, res)
})

export default router
