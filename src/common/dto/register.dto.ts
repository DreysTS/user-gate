import z from 'zod'

export const RegisterSchema = z.object({
	name: z.string().min(1),
	surname: z.string().min(1),
	patronymic: z.string().optional(),
	dateOfBirth: z.string().refine(v => !isNaN(Date.parse(v))),
	email: z.email(),
	password: z.string().min(6)
})

export type RegisterDto = z.infer<typeof RegisterSchema>
