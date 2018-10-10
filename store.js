import {createStore} from 'redux';
import {jobListReducer} from './reducers/jobList_reducer.js';

export default function makeStore() {
  return createStore(jobListReducer);
}