
import {populateJobList, addToJobListANDIncrementNumberOfJobs, openBigCard} from '../core.js';

export function jobListReducer(state, action) {
  // determine which reducer to run
  switch(action.type) {
    case 'POPULATE_JOB_LIST':
      return populateJobList(state, action.payload);
    case 'ADD_JOB_AND_INCREMENT':
      return addToJobListANDIncrementNumberOfJobs(state, action.payload);
    case 'OPEN_BIG_CARD':
      return openBigCard(state, action.payload);
  }

  return state;
}
