const newPost=document.getElementById('originalPosts');
const myForm=document.getElementById('newPostForm');
myForm.addEventListener('submit', postOriginal);

displayTimeline();

function displayTimeline(){
  fetch('http://localhost:3000/blogpost')
    .then(r => r.json())
    .then(displayPosts)
    .catch(err => console.warn(`Caught problem at position 1: ${err}`))
};

function displayPosts(data){
  data.timeline.forEach(appendPost);
};

function appendPost(timeline){
  const newLiPost = document.createElement('li');
  newLiPost.textContent = `${timeline.post}`;
  newPost.append(newLiPost);
  //this is where we add the function for reacts to orginal posts
  timeline.replies.forEach(reply => displayReply(reply));
  newReplyForm(timeline);
};

function displayReply(data) {
  const newReplyThread = document.createElement('ul');
  const newReply = document.createElement('li');
  newReply.textContent = `${data}`;
  newReplyThread.append(newReply);
  //this is where we add the function for reacts to replies
  newPost.appendChild(newReplyThread);
};

function newReplyForm(timeline) {
  const replyContainer = document.createElement('div');

  const replyForm = document.createElement('form');
  replyForm.addEventListener("submit", postReply);

  const replyTextBox = document.createElement('textarea');
  const entryId = timeline.id;
  replyTextBox.setAttribute("id", `${entryId}`);
  replyTextBox.setAttribute("name", "newReply");
  replyTextBox.setAttribute("placeholder", "reply to this thread here");

  const replyButton = document.createElement('input');
  replyButton.setAttribute("type", "submit");
  replyButton.setAttribute("value", "reply");

  replyForm.append(replyTextBox);
  replyForm.append(replyButton);
  replyContainer.append(replyForm);
  newPost.append(replyContainer);
};

function postOriginal (e) {
  e.preventDefault();
  const postText=e.target.newPost.value;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post:postText,
      replies:[]
    })
  };

  fetch('http://localhost:3000/newpost', options)
    .then(r => r.json())
    .then(appendPost)
    .catch(err => console.warn(`Caught problem at position 2: ${err}`))
};

function postReply(e) {
  e.preventDefault();
  const replyId = e.target.newReply.id;
  const replyText=e.target.newReply.value;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id:replyId,
      replies:replyText
    })
  };

  fetch('http://localhost:3000/newreply', options)
    .then(r => r.json())
    .then(appendPost)
    .catch(err => console.warn(`Caught problem at position 3: ${err}`))
};
