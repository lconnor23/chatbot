import { z } from 'zod'

//constrains message to a schema to enforce security on the backend

export const MessageSchema = z.object({
    id: z.string(),
    isUserMessage: z.boolean(),
    text: z.string()
})

//array validator
export const MessageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>