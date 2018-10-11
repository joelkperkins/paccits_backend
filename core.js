import Immutable, {List, Map} from 'immutable';

export const INITIAL_STATE = Immutable.fromJS({
    jobs: {},
    numberOfJobs: 0,
    bigCard: {},
});

export function populateJobList(state, jobList) {
  // create immutable data structure out of object passed into state
  const importedJobList = Immutable.fromJS(jobList);
  const countInitialJobList = Object.keys(jobList);
  const updatedState = state.set('jobs', importedJobList);

  // update state with the immutable data
  return state.merge(updatedState, {numberOfJobs: countInitialJobList.length} );
}

export function addToJobListANDIncrementNumberOfJobs(state, newJob) {
  // get number of jobs in order to dynamically increment the job list
  const incrementer = 1;
  const newJobNumber = state.get('numberOfJobs') + incrementer;
  // dynamically create job by running concat with the incremented data value
  const newJobKey = 'job' + newJobNumber;

  // create an iterable list of the state object in order to add a new job key/value pair
  const updatedJobList = state.entries().next().value[1].set(newJobKey, Map(newJob));
  // update the state object with the new list of jobs
  const updatedJobListInState = state.set('jobs', updatedJobList);

  // merge new joblist state with an updated count on the number of jobs
  return state.merge(updatedJobListInState, {numberOfJobs: newJobNumber});
}

export function openBigCard(state, selectedJob) {
  // get the data from the selected job and put it into the variable
  const fillBigCardWithThisData = state.get('jobs').get(selectedJob);
  // update state with a new bigCard key/value pair
  return state.set('bigCard', Map(fillBigCardWithThisData));
}
