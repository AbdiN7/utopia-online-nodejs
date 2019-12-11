const chai = require( 'chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe("UserRoutes API", () => {
    it( 'check server health', ()=> {
        return chai.request(app).get("/")
        .then( (res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.string
        }
        )
    })
})