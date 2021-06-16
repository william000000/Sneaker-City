const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const products = require('../models/products.json');


chai.use(chaiHttp);
chai.should();


const productId4 = [
    {
      id: 4,
      brandName: 'Nike 4',
      model: 'Air Force 4',
      availableSizes: [ 32, 40, 70, 2 ],
      price: 100,
      image: "/products/sneaker_2.jpeg",
      countInStock: 12,
      releaseDate: '12/03/1990'
    }
]

describe('Welcome to Sneaker City', () => {
  it('should display the welcome words', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        expect(res.body.message).eql('Welcome to Sneaker City Shop')
        done();
      });
  });

  it('should display error when a route does not exist', (done) => {
    chai.request(app)
      .get('/mfdskfg')
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.message).eql('Ooops the route you are looking for, It does not exist!')
        done();
      });
  });
});

describe('Product Tests', () => {
    
    it("Should get all products", (done) => {
        chai.request(app)
            .get("/api/products")
            .end((req, res) => {
                res.should.have.status(200);
                expect(res.body).eql(products.products)
                done();
            });
    });

    it("Should get a specific product details", (done) => {
        chai.request(app)
            .get("/api/products?id=4")
            .end((req, res) => {
                res.should.have.status(200);
                expect(res.body).eql(productId4)
                done();
            });
    });

    it("Should fail to get a specific product when id does not exists", (done) => {
        chai.request(app)
            .get("/api/products?id=40003")
            .end((req, res) => {
                res.should.have.status(404);
                expect(res.body.error).eql("The Product not found!")
                done();
            });
    });

    it("Should sort your product by asc", (done) => {
        chai.request(app)
            .get("/api/products/sort?orderBy=asc")
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.an("array");
                done();
            });
    });
})