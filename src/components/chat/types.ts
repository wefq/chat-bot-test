import type { FormEvent } from 'react'

type ChatMessageType = 'user' | 'bot'

export type ChatMessage = {
  type: ChatMessageType
  text: string
}

export interface FormProperties {
  value: string
  placeholder?: string
  setValue: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}
