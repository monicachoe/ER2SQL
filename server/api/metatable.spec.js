const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Table } = require('../db/models')


describe('Table routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/metatable/', () => {
    const name = "Kelaiya"
    beforeEach(() => {
        return Table.create({
          name: name
        })
    })

    it('GET /api/metadatabase/:tableId', () => {
      return request(app)
      .get('/api/metadatabase/:tableId')
      .expect(200)
      .then(res => {
        expect(res.data).to.be.equal('u got it!');
      })
    });

    it('GET /api/metadatabase/:databaseId', () => {
      return request(app)
      .get('/api/metadatabase/:databaseId')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('string');
        expect(res.body.name).to.be.equal(`got database ${Database1}`);
      })
    });

    it('GET /api/metadatabase/:databaseId/metatable', () => {
      return request(app)
      .get('/api/metadatabase/:databaseId/metatable')
      .expect(200)
      .then(res => {
        expect(res.body[0].name).to.be.equal(id);
      })
    });

    it('POST /api/metadatabase/', ()=>{
      return request(app)
      .post('/api/metadatabase/')
      .send({name: 'data1'},{id: 1})
      .expect(201)
      .then(res=> {
        expect(res.body.name).to.be.equal('data1')
        expect(res.body.id).to.be,equal(1)
      })
    });

  });

});
