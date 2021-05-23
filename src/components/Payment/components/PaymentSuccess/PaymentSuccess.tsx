import React from 'react'

import useAllTexts from '../../../../hooks/content/useAllTexts'
import CheckCircle from '../../../shared/_svg/CheckCircle'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentSuccess.styles'

export default function PaymentSuccess() {
  const texts = useAllTexts()
  const swishTexts = texts.donations.swish
  return (
    <>
      <Heading className={styles.title()}>
        {swishTexts.paymentSuccessDescription}
      </Heading>
      <Text className={styles.description()}>
        {swishTexts.paymentSuccessTitle}
      </Text>

      <CheckCircle className={styles.icon()} />
    </>
  )
}
