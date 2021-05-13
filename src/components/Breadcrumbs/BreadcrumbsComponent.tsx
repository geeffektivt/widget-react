import { Breadcrumbs, Button } from '@material-ui/core'
import React from 'react'

import { DonorType } from '../../constants/enums/DonorType'
import useTypedDispatch from '../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../hooks/store/useTypedSelector'
import useCurrentStepIndex from '../../hooks/ui/useCurrentStepIndex'
import { uiActions } from '../../store/ui/ui.slice'

import { Container } from './Breadcrumbs.styles'

const BreadcrumbsComponent = () => {
  const dispatch = useTypedDispatch()

  const handleClick = (index: number) =>
    dispatch(uiActions.setActiveStep(Math.max(0, index - 1)))

  const currentStepIndex = useCurrentStepIndex()
  const { method, recurring, donorType, donor } = useTypedSelector(
    (state) => state.donation
  )

  const donorName = donor?.name ?? ''

  const breadcrumbItems = [
    recurring,
    method,
    donorType === DonorType.Donor ? donorName : donorType,
  ]

  if (breadcrumbItems.some((b) => b === null)) {
    return <></>
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems
          .slice(0, currentStepIndex === 0 ? 0 : currentStepIndex + 1)
          .filter((step) => step)
          .map((step, i) => (
            <Button
              style={{
                textTransform: `none`,
              }}
              size="medium"
              onClick={() => handleClick(i)}
            >
              {step}
            </Button>
          ))}
      </Breadcrumbs>
    </Container>
  )
}
export default BreadcrumbsComponent
