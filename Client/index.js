const timelineUl = document.getElementById('originalPosts');
const newPostForm = document.getElementById('newPostForm');
newPostForm.addEventListener("submit", userAction);

let thumbsUp = "👍";
let hilarious = "🤣";
let thumbsDown = "👎";

function userAction (event) {           // Checks which button the user pressed and if the text is less than 150 characters
    event.preventDefault();
    if (event.submitter.value == "Post" && event.target.newPost.value.length < 150) {
        sendPostToServer(event);
        flyAway();
    } else if (event.submitter.value == "Giphy" && event.target.newPost.value.length < 150) {
      fetchGif(event);
    } else {
      alert("Please keep in mind that your posts are limited to a maximum of 150 characters");
    };
};

function sendPostToServer (event) {         // We take the text written in the text area by the user and send it the server to be stored as a new entry
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
        .then(addPostToFeed)
        .catch(error => console.warn(`Oh no: ${error}`))
};

function fetchGif (event) {         // We fetch a single random giff using as search critiria what the user wrote in the text area
    event.preventDefault();
    const postText=event.target.newPost.value;
    let giphyApiKey = "8x0VRgzjaGPEBptzrtAvSOeWVu6Lxqrb";
    let url =`https://api.giphy.com/v1/gifs/random?tag=${postText}&api_key=${giphyApiKey}&limit=1"`
  
    fetch(url)
        .then(response => response.json())
        .then(sendGifToServer)
        .catch(error => console.warn(`Oh no: ${error}`))
};

function sendGifToServer (giffObject) {         // We get the url of the giff and send it to our server to be stored as a new entry
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
        .then(addGifToFeed)
        .catch(error => console.warn(`Oh no: ${error}`))
};

function addPostToFeed (newPost) {      // We create a new post entry and initialize it with reactions, an empty reply thread and the reply form
    const newPostLi = document.createElement('li');
    newPostLi.setAttribute("id", `postLi${newPost.id}`);
    newPostLi.setAttribute("class", "newEntry")
    timelineUl.append(newPostLi);
    
    addPost(newPost);
    addReactions(newPost);
    addReplyThread(newPost);
    addReplyForm(newPost);
};

function addGifToFeed (newGif) {        // We create a new gif entry and initialize it with reactions, an empty reply thread and the reply form
    const newPostLi = document.createElement('li');
    newPostLi.setAttribute("id", `postLi${newGif.id}`);
    newPostLi.setAttribute("class", "newEntry")
    timelineUl.append(newPostLi);
    
    addGif(newGif);
    addReactions(newGif);
    addReplyThread(newGif);
    addReplyForm(newGif);
};

function addPost (newPost) {        // This displays the new post on the timeline
    const postLi = document.getElementById(`postLi${newPost.id}`);
    const newTextArea = document.createElement('textarea');
    newTextArea.setAttribute("class", "newPost")
    newTextArea.setAttribute("readonly", "true")
    newTextArea.textContent = `${newPost.post}`;
    postLi.append(newTextArea);
};

function addGif (newGif) {          // This displays the new gif on the timeline
    const postLi = document.getElementById(`postLi${newGif.id}`);
    const newGifImg = document.createElement('img');
    newGifImg.setAttribute("src", `${newGif.post}`);
    newGifImg.setAttribute("class", "newGif")
    postLi.append(newGifImg);
};

function addReactions (newEntry) {          // This creates the reactions beneath each new entry
    const postLi = document.getElementById(`postLi${newEntry.id}`);
    const reactionForm = document.createElement("form");
    reactionForm.setAttribute("id", `reactionForm${newEntry.id}`);
    reactionForm.setAttribute("class", "reactionForm")

    const positive = document.createElement("input");
    positive.setAttribute("type", "button");
    positive.setAttribute("id", `posReact${newEntry.id}`);
    positive.setAttribute("value", `${thumbsUp} ${newEntry.thumbsUp}`);
    positive.addEventListener('click', posReaction);

    const funny = document.createElement("input");
    funny.setAttribute("type", "button");
    funny.setAttribute("id", `funReact${newEntry.id}`);
    funny.setAttribute("value", `${hilarious} ${newEntry.hilarious}`);
    funny.addEventListener('click', funReaction);

    const negative = document.createElement("input");
    negative.setAttribute("type", "button");
    negative.setAttribute("id", `negReact${newEntry.id}`);
    negative.setAttribute("value", `${thumbsDown} ${newEntry.thumbsDown}`);
    negative.addEventListener('click', negReaction);

    reactionForm.append(positive);
    reactionForm.append(funny);
    reactionForm.append(negative);
    postLi.append(reactionForm);
};

function posReaction (event) {      // We send a request to the server to increase the number of positive reactions to that specific post
    event.preventDefault();
    const postId = event.target.id.slice(8);
  
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

function funReaction (event) {      // We send a request to the server to increase the number of funny reactions to that specific post
    event.preventDefault();
    const postId = event.target.id.slice(8);
  
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

function negReaction (event) {      // We send a request to the server to increase the number of funny reactions to that specific post
    event.preventDefault();
    const postId = event.target.id.slice(8);
  
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

function updateReaction (newReactions) {      // We fetch the latest value of each reaction and update the number displayed
    const newPosReact = document.getElementById(`posReact${newReactions.id}`)
    newPosReact.setAttribute("value",`${thumbsUp} ${newReactions.thumbsUp}`)
    
    const newFunReact = document.getElementById(`funReact${newReactions.id}`)
    newFunReact.setAttribute("value",`${hilarious} ${newReactions.hilarious}`)
    
    const newNegReact = document.getElementById(`negReact${newReactions.id}`)
    newNegReact.setAttribute("value",`${thumbsDown} ${newReactions.thumbsDown}`)
};

function addReplyThread (newEntry) {            // This creates the reply thread beneath each new entry
    const postLi = document.getElementById(`postLi${newEntry.id}`);
    const newReplyThread = document.createElement('ul');
    newReplyThread.setAttribute("id", `replyThread${newEntry.id}`);
    newReplyThread.setAttribute("class", "replyThread")
    postLi.append(newReplyThread);
};

function addReplyForm (newEntry) {          // This creates the reply form beneath each new entry
    const postLi = document.getElementById(`postLi${newEntry.id}`);
    const replyForm = document.createElement('form');
    replyForm.setAttribute("id", `replyForm${newEntry.id}`);
    replyForm.setAttribute("class", "replyForm");
    replyForm.addEventListener("submit", postReply);

    const replyTextBox = document.createElement('textarea');
    replyTextBox.setAttribute("name", "newReply");
    replyTextBox.setAttribute("maxlength", "150")

    const replyButton = document.createElement('input');
    replyButton.setAttribute("type", "submit");
    replyButton.setAttribute("value", "Reply");

    replyForm.append(replyTextBox);
    replyForm.append(replyButton);
    postLi.append(replyForm);    
};

function postReply (event) {            // We take the text written in the reply area by the user and send it the server to be stored inside the original entry
    event.preventDefault();
    const postId = event.target.id.slice(9);
    const replyText = event.target.newReply.value;

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id:postId,
            replies:replyText
        })
    };

    fetch('http://localhost:3000/newreply', options)
        .then(response => response.json())
        .then(appendReply)
        .catch(error => console.warn(`Oh no: ${error}`))
};

function appendReply (reply) {          // We append and display the reply as a list inside the reply thread
    const replyThread = document.getElementById(`replyThread${reply.id}`);  
    const newReplyLi = document.createElement('li');
    const newReplyBox = document.createElement('textarea');
    newReplyBox.setAttribute("class", "newReply")
    newReplyBox.setAttribute("readonly", "true")
    newReplyBox.textContent = `${reply.replies[reply.replies.length-1]}`;
    newReplyLi.append(newReplyBox);
    replyThread.append(newReplyLi);
};

function flyAway(){
    document.getElementById('logo').classList.toggle("birdAnimation");
}