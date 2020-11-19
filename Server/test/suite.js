const request = require("supertest")
const app = require("../app.js")
<<<<<<< HEAD
const port = 7000
// const index = require("../../Client/index.js")
=======
<<<<<<< HEAD
const index=require("../../client/index.js")
const port = process.env.PORT || 3001
=======
const port = process.env.PORT || 3000
>>>>>>> 007b5ebb97c8324ca34485bd6e3f85f85505ebe9

describe('fetchGif', () => {
    let userAction = index.__get__("fetchGif");

    it('should be a function', () => {
        expect(fetchGif).to.be.a('function');
    });

    it('should submit new post', () => {
        expect(fetchGif(hi)).to.equal();
    })
});

>>>>>>> a8ec376b340340bbecf4d83c81e6e36309bd8662

describe("Api endpoints", () =>{
    let api 
    let testPost = {id: 1, post: "originalPost", thumbsUp:0, hilarious:0, thumbsDown:0, replies:[]}
    
    
    beforeEach(()=> {
        api = app.listen(port, () => console.log(`starting test server on port ${port}`))
    })
    afterEach(done => {
        console.log("stopping server")
        api.close(done)
        })

    it("responds to /", done => {
        request(api)
            .get("/")
            .expect("Nothing to see here, move along!")
            .expect(200, done);
    })
    it("reponds to /feed", done => {
        request(api)
            .get("/feed")
            .expect(200, done)
    })
    
    it("reponds to post on /newpost", done => {
        request(api)
            .post("/newpost")
            .send(testPost)
            .expect(testPost)
            .expect(201, done)
    })

    it("responds to post on /newreply", done => {
        request(api)
            .post("/newreply")
            .send(testPost)
            .expect(201, done)
    }) 

    it('404 everything else', done => {
        request(api)
            .get('/bob')
            .expect(404, done);
    });

<<<<<<< HEAD
    // it("will fail", done =>{
    //     request(api)
    //         .get("/hi")
    //         .expect(200, done);
    // })
=======
    it("reponds to post", done => {
        request(api)
            .post("/blogpost")
            .send(testPost)
            .expect(testPost)
            .expect(201, done)
    })
>>>>>>> a8ec376b340340bbecf4d83c81e6e36309bd8662

    
})