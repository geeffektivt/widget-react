import actionCreatorFactory from "typescript-fsa";
import {
  DonationActionTypes,
  SELECT_PAYMENT_METHOD,
  SELECT_TAX_DEDUCTION,
  SUBMIT_DONOR_INFO,
  SET_SUM,
  SET_RECURRING,
  SET_SHARES,
  SET_DONOR_ID,
  SET_KID,
  SET_PAYMENT_PROVIDER_URL,
  SELECT_CUSTOM_SHARE,
  SET_SHARE_TYPE,
} from "./types";
import { PaymentMethod, RecurringDonation, ShareType } from "../../types/Enums";
import { OrganizationShare } from "../../types/Temp";

const actionCreator = actionCreatorFactory();

export function selectPaymentMethod(
  method: PaymentMethod
): DonationActionTypes {
  return {
    type: SELECT_PAYMENT_METHOD,
    payload: {
      method,
    },
  };
}

export function selectTaxDeduction(taxDeduction: boolean): DonationActionTypes {
  return {
    type: SELECT_TAX_DEDUCTION,
    payload: {
      taxDeduction,
    },
  };
}

export function submitDonorInfo(
  name: string,
  email: string,
  taxDeduction: boolean,
  ssn: number,
  newsletter: boolean
): DonationActionTypes {
  return {
    type: SUBMIT_DONOR_INFO,
    payload: {
      name,
      email,
      taxDeduction,
      ssn,
      newsletter,
    },
  };
}

export function setShares(shares: OrganizationShare[]): DonationActionTypes {
  return {
    type: SET_SHARES,
    payload: {
      shares,
    },
  };
}

export function setSum(sum: number): DonationActionTypes {
  return {
    type: SET_SUM,
    payload: {
      sum,
    },
  };
}

export function setRecurring(
  recurring: RecurringDonation
): DonationActionTypes {
  return {
    type: SET_RECURRING,
    payload: {
      recurring,
    },
  };
}

export function setDonorID(donorID: number): DonationActionTypes {
  return {
    type: SET_DONOR_ID,
    payload: {
      donorID,
    },
  };
}

export function setKID(kid: string): DonationActionTypes {
  return {
    type: SET_KID,
    payload: {
      kid,
    },
  };
}

export function setPaymentProviderURL(url: string): DonationActionTypes {
  return {
    type: SET_PAYMENT_PROVIDER_URL,
    payload: {
      url,
    },
  };
}

export function selectCustomShare(customShare: boolean): DonationActionTypes {
  return {
    type: SELECT_CUSTOM_SHARE,
    payload: {
      customShare,
    },
  };
}

export function setShareType(shareType: ShareType): DonationActionTypes {
  return {
    type: SET_SHARE_TYPE,
    payload: {
      shareType,
    },
  };
}

/**
 * TODO: Find a place this can live
 */

export type RegisterDonationResponse = {
  KID: string;
  donorID: number;
  hasAnsweredReferral: boolean;
  paymentProviderUrl: string;
};

export const registerDonationAction = actionCreator.async<
  undefined,
  RegisterDonationResponse,
  Error
>("REGISTER_DONATION");
