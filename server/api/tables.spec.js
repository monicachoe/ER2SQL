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
    var tableName = "1";
    var tablee = {name: tableName}

    beforeEach(() => {
        return Table.create({
          name: tableName
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

    it('DELETE /api/tables/:tableName', () => {
      return request(app)
      .delete('/api/tables/' + tableName)
      .then(res => {
        Table.destroy({where: { tableName: "1"}})
        .then((table) => {
          expect(res).to.be.equal("Deleted")
        })
      })
    })
  });
});


