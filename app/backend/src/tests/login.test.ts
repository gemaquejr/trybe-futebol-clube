import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';

chai.use(chaiHttp);

const testLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const userMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  // senha: secret_admin
}

const { expect } = chai;

describe('/login', () => {
  beforeEach(() => Sinon.restore());
  describe('/post', () => {
    it('Deve fazer o login', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User)

      const response = await chai.request(app).post('/login').send(testLogin);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    })

    it('Login sem email', async () => {
      const noEmail = await chai.request(app).post('/login').send({ password: '1234567' });
      expect(noEmail.status).to.equal(400);
      expect(noEmail.body).to.deep.equal({ message: 'All fields must be filled' });
    })

    it('Login sem senha', async () => {
      const noPassword = await chai.request(app).post('/login').send({ email: 'user@test.com' });
      expect(noPassword.status).to.equal(400);
      expect(noPassword.body).to.deep.equal({ message: 'All fields must be filled' });
    })

    it('Login com email invalido', async () => {
      Sinon.stub(User, 'findOne').resolves(null);

      const invalidEmail = await chai.request(app).post('/login').send({ email: 'email', password: 'secret_admin' })
      expect(invalidEmail.body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(invalidEmail.status).to.equal(401);
    })

    it('Login com senha invalida', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User)
      Sinon.stub(bcrypt, 'compareSync').returns(false);

      const invalidPassword = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret' })
      expect(invalidPassword.body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(invalidPassword.status).to.equal(401);
    })

    describe('Get /login/validate', () => {
      it('Return role', async () => {
        Sinon.stub(User, 'findOne').resolves(userMock as User)
        Sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as unknown as void)

        const response = await chai.request(app).get('/login/validate').set('authorization', 'ntoken');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('role');
      })
    })
  })
});