const originalPostsUl = document.getElementById('originalPosts');
const newPostForm = document.getElementById('newPostForm');
newPostForm.addEventListener('submit', userAction);

let thumbsUp = "👍";
let hilarious = "🤣";
let thumbsDown = "👎";
let reactionId;

function userAction (event) {
  event.preventDefault();
  if (event.submitter.value == "Post" && event.target.newPost.value.length < 150) {
    postOriginal(event);
  } else if (event.submitter.value == "Giphy" && event.target.newPost.value.length < 150) {
    fetchGif(event);
  } else {
    console.warn("Please type less that 150 characters")
  };
};

function fetchGif (event) {
  event.preventDefault();
  const postText=event.target.newPost.value;
  let giphyApiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb";
  let url =`https://api.giphy.com/v1/gifs/random?tag=${postText}&api_key=${giphyApiKey}&limit=1"`

  fetch(url)
    .then(response => response.json())
    .then(postGiff)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function postGiff(giffObject) {
  console.log(giffObject)
  const giffUrl = giffObject.data.images.fixed_height.url

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post:giffUrl
    })
  };

  fetch('http://localhost:3000/newpost', options)
    .then(response => response.json())
    .then(appendGiffToFeed)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function appendGiffToFeed (newGiff) {
  const newPostLi = document.createElement('li');
  newPostLi.setAttribute("id", `postLi${newGiff.id}`);

  const newGiffImg = document.createElement('img');
  newGiffImg.setAttribute("src", `${newGiff.post}`);

  newPostLi.append(newGiffImg)
  originalPostsUl.append(newPostLi)
  
  appendReactions(newGiff);
  appendReplyForm(newGiff);
};

function postOriginal (event) {     // This function is called when we post an original post
  event.preventDefault();
  const postText=event.target.newPost.value;
  if (postText.length>1)

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
  newPostLi.setAttribute("class","post-on-thread")
  // newReplyLi.setAttribute('class','reply-div')
  newPostLi.textContent = `${newOriginalPost.post}`;
  originalPostsUl.append(newPostLi);
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
      positiveReaction.setAttribute("class","positiveBtn")
      positiveReaction.addEventListener('click', posReaction);
      positiveReaction.setAttribute("value", `${thumbsUp} ${newOriginalPost.thumbsUp}`);

      const funnyReaction = document.createElement("input");
      funnyReaction.setAttribute("id", `funReact${newOriginalPost.id}`);
      funnyReaction.setAttribute("type", "button");
      funnyReaction.addEventListener('click', funReaction);
      funnyReaction.setAttribute("value", `${hilarious} ${newOriginalPost.hilarious}`);

      const negativeReaction = document.createElement("input");
      negativeReaction.setAttribute("id", `negReact${newOriginalPost.id}`);
      negativeReaction.setAttribute("class", "negativeBtn")
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
};

function appendReplyForm (newOriginalPost) {
  const newReplyThread = document.createElement('ul');

  newReplyThread.setAttribute("id", `newReplyThread${newOriginalPost.id}`);

    const formContainer = document.createElement('li');

      const replyForm = document.createElement('form');
      replyForm.addEventListener("submit", postReply);

        const replyTextBox = document.createElement('textarea');
        replyTextBox.setAttribute("id", `${newOriginalPost.id}`);
        replyTextBox.setAttribute('class',"reply-text-box")
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
  const replyThread = document.getElementById(`postLi${newReply.id}`);              // Either this line or the one below
  // const replyThread = document.getElementById(`newReplyThread${newReply.id}`);
  const newReplyLi = document.createElement('li');
  newReplyLi.setAttribute('class','reply-div')
  newReplyLi.textContent = `${newReply.replies[newReply.replies.length-1]}`;
  replyThread.append(newReplyLi);
};
