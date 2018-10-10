import Immutable, { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../store.js';

describe('store', () => {
  
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Immutable.fromJS({}));

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
    const thisVersionOfStore = Immutable.fromJS({ 
      jobs: {
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
      numberOfJobs: 2,
    });
    expect(store.getState()).to.equal(thisVersionOfStore);
  });
  
});