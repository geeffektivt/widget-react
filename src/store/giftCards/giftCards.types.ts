import { FieldError } from 'react-hook-form'

export interface GiftCardsState {
  giftCards: GiftCard[]
  errors: GiftCardErrors
  showAllOrganisation: boolean
}

export interface GiftCardErrors {
  receiverEmail?: FieldError
}

export interface GiftCard {
  id?: string
  schedule?: Date
  receiverName: string
  receiverEmail: string
  body?: string
}
