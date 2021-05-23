import React from 'react'

import useAllTexts from '../../../../hooks/content/useAllTexts'
import Spinner from '../../../shared/Spinner'
import SwishLogo from '../../../shared/_svg/SwishLogo'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentStarted.styles'

export default function PaymentStarted() {
  const texts = useAllTexts()
  const swishTexts = texts.donations.swish
  return (
    <>
      <Heading className={styles.title()}>
        {swishTexts.paymentStartedTitle}
      </Heading>

      <Text className={styles.description()}>
        {swishTexts.paymentStartedTitle}
      </Text>

      <Spinner />

      <SwishLogo className={styles.logo()} />
    </>
  )
}
