/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { User, Database } = require('../db/models')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    const name = "Brenda";
    const databases = []
    //const databaseName = "Beena"
    var user

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        name: name
      })
      .then(function(user1){
        console.log("user1", user1)
        user = user1
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          console.log("res", res.body)
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('GET /api/users/:userId/databases', () => {
      return request(app)
        .get('/api/users/' + user.id + '/databases')
        .then(res => {
          console.log("database", res)
          Database.findAll({where: {userId: 1}})
          .then((user) => {
            console.log("user", user)
            expect(user).to.be.equal([])
          })
        })
      })

    // it.only('POST /api/users/:userId/databases/:databaseName', () => {
    //   return request(app)
    //   .post('/api/users/1/databases/Beena')
    //   .send({userId: 1, databaseName: 'Monica'})
    //   .then(res => {
    //     Database.findOrCreate({where: {userId: 1, databaseName: 'Monica'}})
    //     console.log("post1", res.body)
    //     expect(res.name).to.be.equal("Monica")
    //   })
    // })
    
  }) // end describe('/api/users')
}) // end describe('User routes')
