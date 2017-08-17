const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Database, Table } = require('../db/models')


describe('Database routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/metadatabase/', () => {
    var database
    const tableName = 'Table2';
    const databaseName = "Kelaiya";
    const id = 2;
    // const databaseName = 'Database1';
    // const message = "u got it"
    // const id = 2;

    beforeEach(() => {
        return Database.create({
          name: databaseName,
          userId: 2
        })
        .then(function(data){
          database = data
        })
    })

    it('GET /api/metadatabase', () => {
      return request(app)
      .get('/api/metadatabase/')
      .expect(200)
      .then(res => {
        console.log("res", res.text)
        expect(res.text).to.be.equal('u got it!');
      })
    });

    it('GET /api/metadatabase/:databaseId', () => {
      return request(app)
      .get('/api/metadatabase/' + database.id)
      .expect(200)
      .then(res => {
        expect(res.text).to.be.an('string');
        expect(res.text).to.be.equal(`got database ${databaseName}`);
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

    it.only('POST /api/metadatabase/', ()=>{
      return request(app)
      .post('/api/metadatabase/')
      .send({name: 'data1', userId: 2})
      .expect(200)
      .then(res=> {
        const data = res.text;
        return Database.findById(data.id)
      })
      .then(found => {
        console.log("res")
        expect(found.name).to.be.equal('data1')
        expect(found.userId).to.be.equal(2)
      })

    })

  });

});
