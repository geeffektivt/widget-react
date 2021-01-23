import actionCreatorFactory from "typescript-fsa";
import { ReferralType } from "../../types/Temp";

const actionCreator = actionCreatorFactory();

export const fetchReferralsAction = actionCreator.async<
  undefined,
  [ReferralType],
  Error
>("FETCH_REFERRALS");

export const submitReferralAction = actionCreator.async<number, boolean, Error>(
  "SUBMIT_REFERRAL"
);
