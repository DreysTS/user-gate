import express, { type Application } from 'express'
import { Logger } from './common/utils/logger'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import { env } from './common/config/env'

export class Server {
	private readonly logger = Logger.child({ label: Server.name })

	private readonly app: Application

	public constructor() {
		this.app = express()

		this.configure()
	}

	private async configure() {
		this.app.use(express.json())

		this.app.use('/auth', authRouter)

		this.app.use('/users', userRouter)
	}

	public async start() {
		const port = env.applicationPort || 4000

		this.app.listen(port, () => {
			this.logger.info(`Server running on port ${port}`)
		})
	}
}
