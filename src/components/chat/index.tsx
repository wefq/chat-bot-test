import type { FormEvent } from 'react'
import type { ChatMessage } from './types'

import { parseCharacters, url } from './utilities'

import { useState } from 'react'

import styles from './style.module.scss'

import { Form } from './form'
import { Message } from './message'

export const Chat = () => {
  const [userMessage, setuserMessage] = useState('')

  const [allMessages, setAllMessages] = useState<ChatMessage[]>([])

  const sendMessage = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    }

    const response = await fetch(url('v1/chat/send-message'), options)

    if (!response.ok) {
      console.error('Error sending message')
      return
    }

    const reader = response
      .body!.pipeThrough(new TextDecoderStream('utf-8'))
      .getReader()

    setAllMessages((prev) => [...prev, { type: 'bot', text: '' }])

    while (true) {
      const { value, done } = await reader.read()

      if (done) break

      const characters = parseCharacters(value)

      setAllMessages((messages) =>
        messages.map((message, index) =>
          index === messages.length - 1
            ? { ...message, text: message.text + characters }
            : message
        )
      )
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setAllMessages((previousState) => [
      ...previousState,
      { type: 'user', text: userMessage },
    ])

    sendMessage()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bot Chat</h1>

        <span>AI-based service</span>
      </div>

      <div className={styles.chat}>
        <div className={styles.response}>
          {allMessages.map((response, index) => (
            <Message key={index} type={response.type}>
              {response.text}
            </Message>
          ))}
        </div>
      </div>

      <Form value={userMessage} setValue={setuserMessage} onSubmit={onSubmit} />
    </div>
  )
}
