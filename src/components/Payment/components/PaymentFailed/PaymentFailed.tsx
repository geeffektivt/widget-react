import React from 'react'

import useAllTexts from '../../../../hooks/content/useAllTexts'
import CloseCircle from '../../../shared/_svg/CloseCircle'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentFailed.styles'

export default function PaymentFailed() {
  const texts = useAllTexts()
  const swishTexts = texts.donations.swish
  return (
    <>
      <Heading className={styles.title()}>
        {swishTexts.paymentFailedTitle}
      </Heading>

      <Text className={styles.description()}>
        {swishTexts.paymentFailedDescription}
      </Text>

      <CloseCircle />
    </>
  )
}
