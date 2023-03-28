import * as Sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  beforeEach(() => Sinon.restore());
  describe('Get route /, home, away', () => {
    it('/leaderboard', async () => {
        const response = await chai.request(app).get('/leaderboard');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.above(2);
        expect(response.body).to.be.an('array');
    })
    it('/leaderboard/home', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.above(2);
        expect(response.body).to.be.an('array');
    })
    it('/leaderboard/away', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.above(2);
        expect(response.body).to.be.an('array');
    })
  })
});