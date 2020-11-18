const request = require("supertest")
const app = require("../app.js")
const port = process.env.PORT || 3000

describe("Api endpoints", () =>{
    let api = app.listen(port, () => console.log(`starting test server on port ${port}`))
    let testPost = {id: 1, post: "originalPost", thumbsUp:0, hilarious:0, thumbsDown:0, replies:[]}
    
    
    // before(()=> {
    //     api = app.listen(port, () => console.log(`starting test server on port ${port}`))
    // })

    // after(done => {
    //       console.log("stopping server")
    //       api.close(done)
    //       })

    it("responds to /", done => {
        request(api)
            .get("/")
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
            .send(testPost.replies)
            .expect(201, done)
    }) 

    it('404 everything else', done => {
        request(app)
            .get('/bob')
            .expect(404, done);
    });

    

})