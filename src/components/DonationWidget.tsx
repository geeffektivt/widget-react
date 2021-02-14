import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrganizationsAction } from '../store/layout/actions'
import { fetchReferralsAction } from '../store/referrals/actions'
import { State } from '../store/state'

import { Carousel } from './Carousel'
import { DonationPane } from './panes/DonationPane/DonationPane'
import { DonorPane } from './panes/DonorPane/DonorPane'
import { MethodPane } from './panes/MethodPane/MethodPane'
import { PaymentPane } from './panes/PaymentPane/PaymentPane'
import { ReferralPane } from './panes/ReferralPane/ReferralPane'

import './Carousel.style.css'

export default function DonationWidget() {
  const dispatch = useDispatch()
  const answeredReferal = useSelector(
    (state: State) => state.layout.answeredReferral
  )

  useEffect(() => {
    dispatch(fetchOrganizationsAction.started(undefined))
    dispatch(fetchReferralsAction.started(undefined))
  }, [])

  return (
    <div id="app">
      <Carousel>
        <MethodPane />
        <DonorPane />
        <DonationPane />
        {answeredReferal !== true && <ReferralPane />}
        <PaymentPane />
      </Carousel>
    </div>
  )
}
