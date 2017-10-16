import { fork } from 'redux-saga/effects'

import {
  watchSearchDatasetsByText,
  watchLoadDatasetById,
  watchSearchDatasetsByFields
} from './datasets'

import {
  watchLoadStructures
} from './structures'

import {
  watchLoadReconstructions
} from './reconstructions'

import {
  watchFetchOauthProviders,
  watchInvalidateToken,
  watchNewToken,
  watchAuthenticate,
  watchFetchMe
} from './auth'

export default function* root() {
  yield fork(watchSearchDatasetsByText)
  yield fork(watchSearchDatasetsByFields)
  yield fork(watchLoadDatasetById)
  yield fork(watchLoadStructures)
  yield fork(watchLoadReconstructions)
  yield fork(watchFetchOauthProviders)
  yield fork(watchInvalidateToken)
  yield fork(watchNewToken)
  yield fork(watchAuthenticate)
  yield fork(watchFetchMe)
}
