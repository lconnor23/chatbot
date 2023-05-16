import { chatbotPrompt } from "@component/app/helpers/constants/chatbot-prompt"
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@component/lib/openai-stream"
import { MessageArraySchema } from "@component/lib/validators/message"

export async function POST(req: Request){
    const { messages } = await req.json()

    //need to parse messages above against message schema, parse will fail if it is anything else
    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
        return {
          role: message.isUserMessage ? 'user' : 'system',
          content: message.text,
        }
      })

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt
    })

    const payload: OpenAIStreamPayload = {
        //can read about all these properties in openai docs
        //regular gpt api. could also use gpt-4 that is better in reasoning, but slower. turbo is a better choice for this project
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        //temp is how creative it can be
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}