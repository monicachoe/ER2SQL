const {expect} = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')

describe('Field routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/fields/', () => {
    
    // beforeEach(() => {
    //     return Table.create({
    //       name: name
    //     })
    //     .then(function(data){
    //       table = data
    //     })
    // })

    it('POST /api/fields', () => {
      return request(app)
      .post('/api/fields')
      .send({})
      .then(res => {
        expect(res.status).to.be.equal(200);
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

