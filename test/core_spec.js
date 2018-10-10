import Immutable, {List, Map} from 'immutable';
import {expect} from 'chai';

import {populateJobList, addToJobListANDIncrementNumberOfJobs, openBigCard} from '../core.js';

describe('application logic', () => {

  describe('Check populateJobList', () => {

    it('Adds all available jobs to the state', () => {
      const state = Immutable.fromJS({});
      const jobList = {
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
      };
      const nextState = populateJobList(state, jobList);
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
      });
      expect(nextState).to.equal(Immutable.fromJS(thisVersionOfState));    
    });

    it('converts objects to immutable data', () => {
      const state = Immutable.fromJS({});
      const jobList = {
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
      };
      const nextState = populateJobList(state, jobList);
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
      });
      expect(nextState).to.equal(thisVersionOfState);
    });

  });

  describe('Adds a new job to the list and increments number of jobs', () => {
  
    it('adds a new job without deleting an old one', () => {
      const state = Immutable.fromJS({
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
      const newJob = {
        jobName: 'Big Church',
        jobId: 1,
        location: 'Escondido',
        contractor: 'LazyKids, Inc',
      };
      const nextState = addToJobListANDIncrementNumberOfJobs(state, newJob);
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

});

  describe('creates the desired bigJob card', () => {

    it('transfer the appropriate data to the big card ', () => {
      const state = Immutable.fromJS({
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
      const selectedJob = 'job1';
      const nextState = openBigCard(state, selectedJob)
      const variable = Immutable.fromJS({
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
        bigCard: {
          jobName: 'Big School', 
          jobId: 3,
          location: 'San Marcos',
          contractor: 'LazyGuys, Inc',
        },
      });
      expect(nextState.get('bigCard')).to.equal(variable.get('jobs').get(selectedJob));
    });

  });

});