import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/Team';

const allTeamsMock = [
    {
        id: 1,
        teamName: 'Avaí/Kindermann',
    },
    {
        id: 2,
        teamName: 'Bahia',
    },
    {
        id: 16,
        teamName: 'São Paulo',
    },
  ];
const teamIdMock = {
    id: 1,
    teamName: 'Avaí/Kindermann',
  };

chai.use(chaiHttp);


const { expect } = chai;

describe('/teams', () => {
  beforeEach(() => Sinon.restore());
  describe('GET from /teams', () => {
    it('Get all teams', async () => {
    Sinon.stub(Team, 'findAll').resolves(allTeamsMock as Team[]);

    const response = await chai.request(app).get('/teams').send();
    expect(response.status).to.equal(200);
    expect(response.body).to.have.length.above(2);
    expect(response.body).to.be.an('array');
    })

    it('Get team by Id', async () => {
    Sinon.stub(Team, 'findByPk').resolves(teamIdMock as Team); 
    const response = await chai.request(app).get('/teams/1').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('teamName');
    expect(response.body).to.be.deep.equal(teamIdMock);
    })
    
    it('Get with wrong Id', async () => {
    const response = await chai.request(app).get('/teams/50').send();

    expect(response.status).to.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Team not Found' });
    })
  })
})