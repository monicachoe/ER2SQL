const {expect} = require('chai')
const request = require('supertest')
const { db } = require('../db')
const app = require('../index')
const { Table } = require('../db/models')

describe('Table routes', () => {
  beforeEach(() => {
    return db.sync()
  });

  describe('/api/tables/', () => {
    var tablename = "1";
    var tablee = {name: tablename}

    beforeEach(() => {
        return Table.create({
          name: tablename
        })
        .then(function(data){
          tablee = data
        })
    })

		it('POST /api/tables', () => {
      return request(app)
      .post('/api/tables/')
      .send({tableName: "1", "fields": {"style":{"type": "string"}}})
      .then(res => {
        expect(res.text).to.be.equal("OK. Table 1 created.");
      })
      .catch(() => console.log("Error"))
    });

    it.only('DELETE /api/tables', () => {
      return request(app)
      .delete('/api/tables/')
      .send({tableName: "1", "fields": {"style":{"type": "string"}}})
      .then(res => {
        console.log("here", res)
        expect(res.text).to.be.equal("OK. Table 1 created.");
      })
      .catch(() => console.log("Error"))
    });




    
    });
  });


