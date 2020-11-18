const originalPostsUl = document.getElementById('originalPosts');
const newPostForm = document.getElementById('newPostForm');
newPostForm.addEventListener('submit', postOriginal);

let thumbsUp = "👍";
let hilarious = "🤣";
let thumbsDown = "👎";
let reactionId;

function postOriginal (event) {     // This function is called when we post an original post
  event.preventDefault();
  const postText=event.target.newPost.value;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post:postText
    })
  };

  fetch('http://localhost:3000/newpost', options)
    .then(response => response.json())
    .then(appendPostToFeed)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function appendPostToFeed (newOriginalPost) {
  const newPostLi = document.createElement('li');
  newPostLi.setAttribute("id", `postLi${newOriginalPost.id}`);
  newPostLi.textContent = `${newOriginalPost.post}`;
  originalPostsUl.append(newPostLi)
  appendReactions(newOriginalPost);
  appendReplyForm(newOriginalPost);
};

function appendReactions (newOriginalPost) {
  const post = document.getElementById(`postLi${newOriginalPost.id}`);
  reactionId = newOriginalPost.id;
    const reactionContainer = document.createElement("div");
  
      const positiveReaction = document.createElement("input");
      positiveReaction.setAttribute("id", `posReact${newOriginalPost.id}`);
      positiveReaction.setAttribute("type", "button");
      positiveReaction.addEventListener('click', posReaction);
      positiveReaction.setAttribute("value", `${thumbsUp} ${newOriginalPost.thumbsUp}`);

      const funnyReaction = document.createElement("input");
      funnyReaction.setAttribute("id", `funReact${newOriginalPost.id}`);
      funnyReaction.setAttribute("type", "button");
      funnyReaction.addEventListener('click', funReaction);
      funnyReaction.setAttribute("value", `${hilarious} ${newOriginalPost.hilarious}`);

      const negativeReaction = document.createElement("input");
      negativeReaction.setAttribute("id", `negReact${newOriginalPost.id}`);
      negativeReaction.setAttribute("type", "button");
      negativeReaction.addEventListener('click', negReaction);
      negativeReaction.setAttribute("value", `${thumbsDown} ${newOriginalPost.thumbsDown}`);

    reactionContainer.append(positiveReaction);
    reactionContainer.append(funnyReaction);
    reactionContainer.append(negativeReaction);
  post.append(reactionContainer);
};

function posReaction (event) {
  event.preventDefault();
  const postId = reactionId;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id:postId
    })
  };

  fetch('http://localhost:3000/posreaction', options)
    .then(response => response.json())
    .then(updateReaction)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function funReaction (event) {
  event.preventDefault();
  const postId = reactionId;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id:postId
    })
  };

  fetch('http://localhost:3000/funreaction', options)
    .then(response => response.json())
    .then(updateReaction)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function negReaction (event) {
  event.preventDefault();
  const postId = reactionId;

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id:postId
    })
  };

  fetch('http://localhost:3000/negreaction', options)
    .then(response => response.json())
    .then(updateReaction)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function updateReaction (newReactions) {
  const newPosReact = document.getElementById(`posReact${newReactions.id}`)
  newPosReact.setAttribute("value",`${thumbsUp} ${newReactions.thumbsUp}`)
  
  const newFunReact = document.getElementById(`funReact${newReactions.id}`)
  newFunReact.setAttribute("value",`${hilarious} ${newReactions.hilarious}`)
  
  const newNegReact = document.getElementById(`negReact${newReactions.id}`)
  newNegReact.setAttribute("value",`${thumbsDown} ${newReactions.thumbsDown}`)
}

function appendReplyForm (newOriginalPost) {
  const newReplyThread = document.createElement('ul');
  newReplyThread.setAttribute("id", `newReplyThread${newOriginalPost.id}`);

    const formContainer = document.createElement('li');

      const replyForm = document.createElement('form');
      replyForm.addEventListener("submit", postReply);

        const replyTextBox = document.createElement('textarea');
        replyTextBox.setAttribute("id", `${newOriginalPost.id}`);
        replyTextBox.setAttribute("name", "newReply");

        const replyButton = document.createElement('input');
        replyButton.setAttribute("type", "submit");
        replyButton.setAttribute("value", "Reply");

      replyForm.append(replyTextBox);
      replyForm.append(replyButton);
    formContainer.append(replyForm)
  newReplyThread.append(formContainer)
  originalPostsUl.append(newReplyThread)
};

function postReply (event) {     // This function is called when we post a reply
  event.preventDefault();
  const replyId = event.target.newReply.id;
  const replyText = event.target.newReply.value;

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
    .then(response => response.json())
    .then(appendReply)
    .catch(error => console.warn(`Oh no: ${error}`))
};

<<<<<<< HEAD
const myForm=document.getElementById('newPostForm');

const emojiButton = document.createElement('button');
emojiButton.addEventListener('click', postOriginal);

function EmojiCount (){
  if 
}
let heartCount=0;
let lyingCount=0;
let shockedCount=0;
=======
function appendReply (newReply) {
  const replyThread = document.getElementById(`postLi${newReply.id}`);              // Either this line or the one below
  // const replyThread = document.getElementById(`newReplyThread${newReply.id}`);
  const newReplyLi = document.createElement('li');
  newReplyLi.textContent = `${newReply.replies[newReply.replies.length-1]}`;
  replyThread.append(newReplyLi);
};

>>>>>>> b706db4272160f28ff376c3f9e05ebfa03e2f498
