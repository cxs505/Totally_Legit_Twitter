// API key for giphy api
// let apiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb"
// document.addEventListener("DOMcontentLoaded", gif);
// function gif() {
//     document.getElementById("btn").addEventListener("submit", e => {
//         e.preventDefault();
//         let url = `https:api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`;
//         let str = document.getElementById("search").nodeValue.trim();

//const { response } = require("../Server/app")

//         fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data.data)
//             console.log("Meta".content.meta)
//         })
//         .catch(error =>{
//             console.log(error)
//         })
//     })
// }
(function () {
    function gifSearch(search) {
        return fetch(`https://api.giphy.com/v1/gifs/search?q=${search}`)
            .then(res => res.json())
    }

})