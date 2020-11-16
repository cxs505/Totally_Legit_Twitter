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

const newPost=document.getElementById('originalPosts');
const myForm=document.getElementById('newPostForm');
myForm.addEventListener('submit', getAllFeed);

getAllFeed();

function getAllFeed(){
  fetch('http://localhost:3000/blogpost')
    .then(r => r.json())
    .then(appendpost)
    .catch(console.warn)
};

function appendpost(data){
    data.posts.forEach(appendfeeds);
};


function submitPost(e){
  e.preventDefault();

  const postData=e.target;

  const options ={
    method: 'POST',
    body: postData,
    headers: {
      "Content-Type": "application/text"
    }
  };

  fetch('http://localhost:3000/blogpost', options)
    .then(r => r.json())
    .then(appendfeeds)
    .catch(console.warn)
};

function appendfeeds(post){
    const newLi = document.createElement('li');
    newLi.textContent = `${posts[-1]}`
    newPost.append(newLi);
  };