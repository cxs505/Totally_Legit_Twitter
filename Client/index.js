const originalPostsUl = document.getElementById('originalPosts');
const newPostForm = document.getElementById('newPostForm');
newPostForm.addEventListener('submit', postOriginal);

let thumbsUp = "👍";
let hilarious = "🤣";
let thumbsDown = "👎";

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
    const reactionContainer = document.createElement("div");
  
      const positiveReaction = document.createElement("input");
      positiveReaction.setAttribute("type", "button");
      // positiveReaction.addEventListener('click', posReaction);
      positiveReaction.setAttribute("value", `${thumbsUp} ${newOriginalPost.thumbsUp}`);

      const funnyReaction = document.createElement("input");
      funnyReaction.setAttribute("type", "button");
      // funnyReaction.addEventListener('click', funReaction);
      funnyReaction.setAttribute("value", `${hilarious} ${newOriginalPost.hilarious}`);

      const negativeReaction = document.createElement("input");
      // negativeReaction.addEventListener('click', negReaction);
      negativeReaction.setAttribute("type", "button");
      negativeReaction.setAttribute("value", `${thumbsDown} ${newOriginalPost.thumbsDown}`);

    reactionContainer.append(positiveReaction);
    reactionContainer.append(funnyReaction);
    reactionContainer.append(negativeReaction);
  post.append(reactionContainer);
};

// function posReaction (event) {
//   event.preventDefault();
//   console.log(event);
//   console.log(event.target);
//   const postId = newOriginalPost.id;
//   console.log(postId);

//   const options = {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       id:postId
//     })
//   };

//   fetch('http://localhost:3000/posreaction', options)
//     .then(response => response.json())
//     // .then(appendReply)
//     .catch(error => console.warn(`Oh no: ${error}`))
// };

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

function appendReply (newReply) {
  // const replyThread = document.getElementById(`postLi${newReply.id}`);              // Either this line or the one below
  const replyThread = document.getElementById(`newReplyThread${newReply.id}`);        // This one is better for what we need
  const newReplyLi = document.createElement('li');
  newReplyLi.textContent = `${newReply.replies[newReply.replies.length-1]}`;
  replyThread.append(newReplyLi, );
};

