function search(){
    let q = document.getElementById("input").value
    console.log(q)
    let newApiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb";
    let url =`https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${newApiKey}&limit=1"`
    console.log(url)
  
    // function giffy() {
      //let str = document.querySelector("#gifSearch")
      
      fetch(url)
          .then(res => res.json())
          .then(json => {
              console.log(json.data)
              console.log(json.meta)
              console.log(json.data[0].images.fixed_height.url)
              let imgPath = json.data[0].images.fixed_height.url
              let img = document.createElement("img")
              img.setAttribute("src", imgPath)
              document.body.appendChild(img)
              // json.data.forEach(obj => {
              //     console.log(obj.images.fixed_height.url)
              //     gifHtml = `<img src="${url}" lenght="${height}">`
              // })
          .catch(err => {
              console.log(err)
              })
          })
  }
  
  const btn = document.querySelector("#btn")
  btn.addEventListener("click", search)