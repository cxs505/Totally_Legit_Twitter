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


const newPost=document.getElementById('originalPosts');
const newReply=document.getElementsByTagName('')
const myForm=document.getElementById('newPostForm');
myForm.addEventListener('submit', postOriginal);

displayTimeline();

function displayTimeline(){
  fetch('http://localhost:3000/blogpost')
    .then(r => r.json())
    .then(appendpost)
    .catch(console.warn)
};

function appendpost(data){
  data.timeline.forEach(appendfeeds);
};

function appendfeeds(timeline){
  const newLiPost = document.createElement('li');
  newLiPost.textContent = `${timeline.post}`
  newPost.append(newLiPost);
  timeline.replies.forEach(reply => displayReply(reply));
};

function displayReply(data) {
  const newReplyThread = document.createElement('ul');
  const newReply = document.createElement('li');
  newReply.textContent = `${data}`
  newReplyThread.append(newReply)
  newPost.appendChild(newReplyThread);
};

function postOriginal (e) {
  e.preventDefault();
  const postText=e.target.newPost.value;

  const options = {
    method: 'POST',
    body: JSON.stringify(postText),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch('http://localhost:3000/blogpost', options)
    .then(r => r.json())
    .then(appendfeeds)
    .catch(console.warn)
};
