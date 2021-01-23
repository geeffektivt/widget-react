import { SagaIterator } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { Action } from 'typescript-fsa'

import contentOrganizations from '../../content/organizations.json'
import { Organization } from '../../types/Organization'

import { fetchOrganizationsAction } from './actions'

export function* fetchOrganizations(
  action: Action<undefined>
): SagaIterator<void> {
  yield put(
    fetchOrganizationsAction.done({
      params: action.payload,
      result: contentOrganizations as Organization[],
    })
  )
}
