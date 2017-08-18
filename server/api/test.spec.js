const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Table } = require('../db/models')

describe('Table routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/tables/', () => {
    var tablename = "Kelaiya";
    var fields = ["name"]
    var table

    beforeEach(() => {
        return Table.create({
          name: tablename
        })
        .then(function(data){
          table = data
        })
    })

    it.only('POST /api/tables', () => {
      return request(app)
      .post('/api/tables/')
      .send({name: 'Vinaya', fields: 'Age'})
      .expect(200)
      .then(res => {
      	console.log("here", res.body)
        expect(res.body.name).to.be.equal('Vinaya');
      })
    });

    
    });
  });


