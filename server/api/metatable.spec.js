const {expect} = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')
const { Table } = require('../db/models')


describe('MetaTable routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/metatable/', () => {
    var name = "Kelaiya";
    var table = []
    beforeEach(() => {
        return Table.create({
          name: name
        })
        .then(function(data){
          table = data
        })
    })

    it('GET /api/metatable/:tableId', () => {
      return request(app)
      .get('/api/metatable/' + table.id)
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('Kelaiya');
      })
    });

    it('POST /api/metatable', () => {
      return request(app)
      .post('/api/metatable/')
      .send({name: 'kelaiya', databaseId: 1})
      .then(found => {
        Table.findById(1)
        .then((table) => console.log("hey",table.name))
        expect(table.name).to.be.an('string')
        expect(table.name).to.be.equal('Kelaiya');
      })
      .catch(() => console.log("Something went wrong"));
      
    });

    it('DELETE /api/metatable/:tableId', () => {
      return request(app)
      .delete('/api/metatable' + table.id)
      .then(res => {
        Table.destroy({where: { id : 1}})
        .then((table) => {
              expect(table).to.be.equal(1);
          })
        })
    });
  });

});
