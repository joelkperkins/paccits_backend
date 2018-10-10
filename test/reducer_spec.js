import Immutable, {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {jobListReducer} from '../reducers/jobList_reducer.js';

describe('jobListReducer', () => {

  it ('has an initial state', () => {
    const action = {
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
    };
    const nextState = jobListReducer(undefined, action);
    const thisVersionOfState = Immutable.fromJS({ 
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
        bigCard: {}, 
    });
    expect(nextState).to.equal(thisVersionOfState);
  });
  
  it('can be used with reduce', () => {
    const actions = [
      {
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
      },
      {
        type: 'ADD_JOB_AND_INCREMENT',
        payload: {
          jobName: 'Big Church',
          jobId: 1,
          location: 'Escondido',
          contractor: 'LazyKids, Inc',
        },
      },
      {
        type: 'OPEN_BIG_CARD',
        payload: 'job1',
      }
    ];
    const finalState = actions.reduce(jobListReducer, Map());
    const thisFinalState = Immutable.fromJS({
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
        job3: {
          jobName: 'Big Church',
          jobId: 1,
          location: 'Escondido',
          contractor: 'LazyKids, Inc',
        },   
      },
      numberOfJobs: 3,
      bigCard: {
        jobName: 'Big School', 
        jobId: 3,
        location: 'San Marcos',
        contractor: 'LazyGuys, Inc',
      },
    });
    expect(finalState).to.equal(thisFinalState);
  });

  it('reduces populateJobList', () => {
    const initialState = Immutable.fromJS({});
    const action = { 
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
    };
    const nextState = jobListReducer(initialState, action);
    const thisVersionOfState = Immutable.fromJS({ 
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
    expect(nextState).to.equal(thisVersionOfState);
  });

  it('reduces addToJobListANDIncrementNumberOfJobs', () => {
      const initialState = Immutable.fromJS({
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
        bigCard: {},
      });
      const action = {
        type: 'ADD_JOB_AND_INCREMENT',
        payload: {
          jobName: 'Big Church',
          jobId: 1,
          location: 'Escondido',
          contractor: 'LazyKids, Inc',
        },
      };
      const nextState = jobListReducer(initialState, action);
      const thisVersionOfState = Immutable.fromJS({
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
          job3: {
            jobName: 'Big Church',
            jobId: 1,
            location: 'Escondido',
            contractor: 'LazyKids, Inc',
          },
        },
        numberOfJobs: 3,
        bigCard: {},
      });
      expect(nextState).to.equal(thisVersionOfState);
  });

  it('reduces openBigCard', () => {
    const initialState = Immutable.fromJS({
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
      bigCard: {},
    });
    const action = {
      type: 'OPEN_BIG_CARD',
      payload: 'job1',
    }
    const nextState = jobListReducer(initialState, action);
    const bigCardData = initialState.get('jobs').get('job1');
    const thisVersionOfBigCardData = nextState.get('bigCard');
    expect(bigCardData).to.equal(thisVersionOfBigCardData);

  });

});