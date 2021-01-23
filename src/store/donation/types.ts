import { PaymentMethod, RecurringDonation, ShareType } from "../../types/Enums";
import { OrganizationShare } from "../../types/Temp";

export const SELECT_PAYMENT_METHOD = "SELECT_PAYMENT_METHOD";
export const SELECT_TAX_DEDUCTION = "SELECT_TAX_DEDUCTION";
export const SUBMIT_DONOR_INFO = "SUBMIT_DONOR_INFO";
export const SET_SHARES = "SET_SHARES";
export const SET_SUM = "SET_SUM";
export const SET_RECURRING = "SET_RECURRING";
export const SET_KID = "SET_KID";
export const SET_DONOR_ID = "SET_DONOR_ID";
export const SET_PAYMENT_PROVIDER_URL = "SET_PAYMENT_PROVIDER_URL";
export const SELECT_CUSTOM_SHARE = "SELECT_CUSTOM_SHARE";
export const SET_SHARE_TYPE = "SET_SHARE_TYPE";

interface SelectPaymentMethod {
  type: typeof SELECT_PAYMENT_METHOD;
  payload: {
    method: PaymentMethod;
  };
}

interface SelectTaxDeduction {
  type: typeof SELECT_TAX_DEDUCTION;
  payload: {
    taxDeduction: boolean;
  };
}

interface SubmitDonorInfo {
  type: typeof SUBMIT_DONOR_INFO;
  payload: {
    name: string;
    email: string;
    taxDeduction: boolean;
    ssn: number;
    newsletter: boolean;
  };
}

interface SetShares {
  type: typeof SET_SHARES;
  payload: {
    shares: OrganizationShare[];
  };
}

interface SetSum {
  type: typeof SET_SUM;
  payload: {
    sum: number;
  };
}

interface SetRecurring {
  type: typeof SET_RECURRING;
  payload: {
    recurring: RecurringDonation;
  };
}

interface SetKID {
  type: typeof SET_KID;
  payload: {
    kid: string;
  };
}

interface SetDonorID {
  type: typeof SET_DONOR_ID;
  payload: {
    donorID: number;
  };
}

interface SetPaymentProviderURL {
  type: typeof SET_PAYMENT_PROVIDER_URL;
  payload: {
    url: string;
  };
}

interface SelectCustomShare {
  type: typeof SELECT_CUSTOM_SHARE;
  payload: {
    customShare: boolean;
  };
}

interface SetShareType {
  type: typeof SET_SHARE_TYPE;
  payload: {
    shareType: ShareType;
  };
}

export type DonationActionTypes =
  | SelectPaymentMethod
  | SelectTaxDeduction
  | SubmitDonorInfo
  | SetShares
  | SetSum
  | SetRecurring
  | SetKID
  | SetDonorID
  | SetPaymentProviderURL
  | SelectCustomShare
  | SetShareType;
