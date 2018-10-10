import makeStore from './store.js';
import startServer from './server.js';

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'POPULATE_JOB_LIST',
  payload: {
    job1: {
      jobName: 'Big School', 
      jobId: 3,
      location: 'San Marcos',
      contractor: 'LazyGuys, Inc',
    },
    job2: {
      jobName: 'Big Hospital', 
      jobId: 2,
      location: 'San Diego',
      contractor: 'LazyGals, Inc',
    }, 
  }, 
});

store.dispatch({
  type: 'ADD_JOB_AND_INCREMENT',
  payload: {
    jobName: 'Big Church',
    jobId: 1,
    location: 'Escondido',
    contractor: 'LazyKids, Inc',
  },
});