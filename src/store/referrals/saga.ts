import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { Action } from "typescript-fsa";
import { API_URL } from "../../config/api";
import { IServerResponse, ReferralType } from "../../types/Temp";
import { nextPane } from "../layout/actions";
import { State } from "../state";
import { fetchReferralsAction, submitReferralAction } from "./actions";

export function* fetchReferrals(action: Action<undefined>): SagaIterator<void> {
  try {
    const request = yield call(fetch, `${API_URL}/referrals/types`);
    const result: IServerResponse<[ReferralType]> = yield call(
      request.json.bind(request)
    );
    if (result.status !== 200) throw new Error(result.content as string);

    yield put(
      fetchReferralsAction.done({
        params: action.payload,
        result: result.content as [ReferralType],
      })
    );
  } catch (ex) {
    yield put(
      fetchReferralsAction.failed({ params: action.payload, error: ex })
    );
  }
}

export function* submitReferral(action: Action<number>): SagaIterator<void> {
  const donorId = yield select((state: State) => state.donation.donor?.donorID);

  try {
    const data = {
      referralId: action.payload,
      donorId,
      // TODO: Fix other comment
      comment: null,
    };

    const request = yield call(fetch, `${API_URL}/referrals/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: IServerResponse<boolean> = yield call(
      request.json.bind(request)
    );
    if (result.status !== 200) throw new Error(result.content as string);

    yield put(
      submitReferralAction.done({
        params: action.payload,
        result: result.content as boolean,
      })
    );
  } catch (ex) {
    yield put(
      submitReferralAction.failed({ params: action.payload, error: ex })
    );
  }

  yield put(nextPane());
}
