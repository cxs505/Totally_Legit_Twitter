
const puppeteer = require('puppeteer');

const rewire = require('rewire');
const index=rewire("../../Client/index.js");
const expect = require('chai').expect;


// import puppeteer from 'puppeteer';

// test('less than 150 characters submitted', async()=>{
//     let characters = "i’m sorry to hear that your grandma passed away yeah i actually am like obviously i'm i'm going to be upset about that innit yeah and hadiqa you know the only thing is yeah is that no one can force me to be your mate or anything yeah and i don't want to be mates wiv you alright";
//     const browser= await puppeteer.launch();
//     const page= await browser.newPage();
//     const app = 'file:///C:/Users/madeleinemartin/Downloads/FutureProof/Totally_Legit_Twitter/Client/index.html'
//     await page.goto(app);

//     await page.click('textarea#newPost');
//     await page.type('textarea#newPost',characters);
//     await page.click('input#newPostButton');
//     let newPostInputError= await page.$eval('input#newPostButton',()=>btn.value );
//     expect(newPostInputError).toBe('invalid')
//     await browser.close();
// })


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

// // describe('fetchGif',()=>{
// //     let fetchGif = index.__get__('fetchGif');
// //     let postText='monkey';
// //     let giphyApiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb";
// //     let url =`https://api.giphy.com/v1/gifs/random?tag=${postText}&api_key=${giphyApiKey}&limit=1"`;
// //     it('should be a function', () => {
// //         expect(fetchGif('monkey')).to.equal(fetch(url));
// //     });
// })
