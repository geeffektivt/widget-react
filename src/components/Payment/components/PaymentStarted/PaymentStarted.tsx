import React from 'react'

import Spinner from '../../../shared/Spinner'
import SwishLogo from '../../../shared/_svg/SwishLogo'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentStarted.styles'

export default function PaymentStarted() {
  const title = 'Payment started'
  const description = 'Open your Swish App and follow the instructions'

  return (
    <>
      <Heading className={styles.title}>{title}</Heading>

      <Text className={styles.description}>{description}</Text>

      <Spinner />

      <SwishLogo className={styles.logo} />
    </>
  )
}
