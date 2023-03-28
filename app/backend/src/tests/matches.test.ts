import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';

chai.use(chaiHttp);

const matchesMock = [
  { 
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
]

const matchMock =   { 
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

const createMock = { 
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

const { expect } = chai;

describe('/matches', () => {
  beforeEach(() => Sinon.restore());
  describe('Get route', () => {
    it('Get all', async () => {
      Sinon.stub(Match, 'findAll').resolves(matchesMock as Match[]);

      const response = await chai.request(app).get('/matches').send();
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length.above(1);
      expect(response.body).to.be.an('array');
    })
    it('Get all with query inProgress = true', async () => {
      Sinon.stub(Match, 'findAll').resolves(matchesMock as Match[]);

      const response = await chai.request(app).get('/matches').query({inProgress: true});
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    })

    describe('Patch /matches/:id/finish', () => {
      it('Update state match key:inProgress to false', async () => {
        const response = await chai.request(app).patch('/matches/1/finish')
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({ message: 'Finished' });
      })
    })
    
    describe('Post /matches', () => {
      it('Create new match', async () => {
        Sinon.stub(Match, 'create').resolves(matchMock as Match)
        Sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as unknown as void)

        const response = await chai.request(app).post('/matches').set('authorization', 'ntoken').send(createMock);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.deep.equal(matchMock);
      })
    })
  })
});