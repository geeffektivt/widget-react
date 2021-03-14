import React from 'react'

import CloseCircle from '../../../shared/_svg/CloseCircle'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentFailed.styles'

export default function PaymentFailed() {
  const title = 'Payment failed'
  const description =
    'Your payment failed, please follow the instructions to re-try'

  return (
    <>
      <Heading className={styles.title()}>{title}</Heading>

      <Text className={styles.description()}>{description}</Text>

      <CloseCircle className={styles.icon()} />
    </>
  )
}
