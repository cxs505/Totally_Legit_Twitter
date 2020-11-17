// const ConfirmBtn = document.getElementById("new-post");
// ConfirmBtn.addEventListener("mouseover", sendReady);

// let checkbox = true;

// function sendReady() {
//   if (checkbox) {
//     modeCheck.innerText = "Waiting to Submit";
//     checkbox = false;
//   } else {
//     modeCheck.innerText = "Ready to Submit";
//     checkbox = true;
//   }
// }

// feed =[
    

// ]


const myForm=document.getElementById('submitID');
myForm.addEventListener('submit', submitPost);

getAllFeed();

function getAllFeed(){
  fetch('http://localhost:3000/blogpost')
    .then(r => r.json())
    .then(appendpost)
    .catch(console.warn)
};

function appendpost(data){
    data.bP.forEach(appendfeeds);
};


function submitPost(e){
  e.preventDefault();

  const postData=e.target.post.value;

  const options ={
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch('http://localhost:3000/blogpost', options)
    .then(r => r.json())
    .then(appendfeeds)
    .catch(console.warn)
};

const newPost=document.getElementById('originalPosts');
function appendfeeds(post){
    const newLi = document.createElement('li');
    newLi.textContent = `${bP.post}`
    newPost.append(newLi);
  };