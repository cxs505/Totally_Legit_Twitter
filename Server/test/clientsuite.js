
const expect = require('chai').expect;
const rewire = require('rewire');
const index=rewire("../../Client/index.js")


describe('userAction', () => {
    let userAction = index.__get__("userAction");
    const fakeAction ={
        preventDefault: () => {},
        event: {
            submitter: { value: "Post" },
            target: { newPost: { value: "i’m sorry to hear that your grandma passed away yeah i actually am like obviously i'm i'm going to be upset about that innit yeah and hadiqa you know the only thing is yeah is that no one can force me to be your mate or anything yeah and i don't want to be mates wiv you alright" } }
        }
    }

    it('should be a function', () => {
        expect(userAction).to.be.a('function');
    });

    it('should prompt user', () => {
        expect(userAction(fakeAction)).to.equal(alert("Please keep in mind that your posts are limited to a maximum of 150 characters"));
    })
});

// describe('fetchGif',()=>{
//     let fetchGif = index.__get__('fetchGif');
//     let postText='monkey';
//     let giphyApiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb";
//     let url =`https://api.giphy.com/v1/gifs/random?tag=${postText}&api_key=${giphyApiKey}&limit=1"`;
//     it('should be a function', () => {
//         expect(fetchGif('monkey')).to.equal(fetch(url));
//     });
// })
