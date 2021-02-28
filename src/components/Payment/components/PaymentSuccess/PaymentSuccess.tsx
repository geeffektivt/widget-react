import React from 'react'

import CheckCircle from '../../../shared/_svg/CheckCircle'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentSuccess.styles'

export default function PaymentSuccess() {
  const title = 'Payment success'
  const description = 'Thanks!'

  return (
    <>
      <Heading className={styles.title}>{title}</Heading>

      <Text className={styles.description}>{description}</Text>

      <CheckCircle className={styles.icon} />
    </>
  )
}
