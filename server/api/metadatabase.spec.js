const {expect} = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')
const { Database, Table } = require('../db/models')


describe('Database routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/metadatabase/', () => {
    var database
    var table
    const tableName = 'Table2';
    const databaseName = "Kelaiya";
    beforeEach(() => {
        return Database.create({
          name: databaseName
          
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

    it('GET /api/metadatabase/:databaseId/tables', () => {
      return request(app)
      .get('/api/metadatabase/' + database.id + '/table')
      .then(found => {
        console.log("found", found)
        //console.log("here", res)
        //expect(found).to.be.equal(1)
      });
  
    });

    it('POST /api/metadatabase/', ()=>{
      return request(app)
      .post('/api/metadatabase/')
      .send({name: 'data1', userId: 1})
      .then(found => {
        Database.findById(1)
        .then((database) => console.log("hey", database.name))
        expect(database.name).to.be.an("string")
        expect(database.name).to.be.equal('data1')
      })
      .catch(() => console.log("Error"))
    })

  });

});
