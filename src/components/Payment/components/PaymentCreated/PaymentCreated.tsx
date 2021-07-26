import React from 'react'

import useAllTexts from '../../../../hooks/content/useAllTexts'
import Spinner from '../../../shared/Spinner'
import SwishLogo from '../../../shared/_svg/SwishLogo'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentCreated.styles'

export default function PaymentCreated() {
  const texts = useAllTexts()
  const swishTexts = texts.donations.swish
  return (
    <>
      <Heading className={styles.title()}>
        {swishTexts.paymentCreatedTitle}
      </Heading>

      <Text className={styles.description()}>
        {swishTexts.paymentCreatedTitle}
      </Text>

      <Spinner />

      <SwishLogo className={styles.logo()} />
    </>
  )
}
