const supertest = require('supertest');
const app = require('../app');
const agent = supertest.agent(app);
const { db, Page } = require('../server/db/models');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-things'));

describe('Table routes', () => {
	beforeEach(() => {
    return db.sync({force: true})
  });

	describe('/api/table/', () => {
		const tablename = 'Kelaiya';
		const id = 1;

		beforeEach(() => {
			return Table.create({
				name: tablename,
				databaseid: id
			})
		})
		it('POST /', () => {
			return request(app)
			.post('/api/table')
			.expect(204)
			.then(res => {
				expect(res.body).to.be.an('array');
				expect(res.body[0].tablename).to.be.equal('Kelaiya');
			})
		})

		it('DELETE /1')
})
	