const {expect} = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')
const { Table } = require('../db/models')

describe('Table routes', () => {
  console.log("hey")
  beforeEach(() => {
    return db.sync()
  });

  describe('/api/tables/', () => {
    var tablename = 1;
    var tablee = {name: tablename}

    beforeEach(() => {
        return Table.create({
          name: tablename
        })
        .then(function(data){
          tablee = data
        })
    })

    console.log("again")

    it.only('POST /api/tables', () => {
      return request(app)
      .post('/api/tables/')
      .send({name: 1})
      .then(res => {
      	console.log("here", res)
        expect(res._server.Server._data.table.name).to.be.equal(1);
      })
      .catch(() => console.log("Error"))
    });

    
    });
  });


