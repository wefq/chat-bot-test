import type { FC, ReactNode } from 'react'

import styles from './Style.module.scss'

interface MessageProperties {
  children: ReactNode
  type: string
}

export const Message: FC<MessageProperties> = ({ children, type }) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <div className={styles.avatar}></div>
      <p>{children}</p>
    </div>
  )
}
