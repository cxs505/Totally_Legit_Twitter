const newPost=document.getElementById('originalPosts');
const myForm=document.getElementById('newPostForm');
myForm.addEventListener('submit', postOriginal);

displayTimeline();      // It fetches and displays all premade data we have in the server

function displayTimeline(){
  fetch('http://localhost:3000/blogpost')
    .then(response => response.json())
    .then(displayPosts)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function displayPosts(response){
  response.timeline.forEach(appendPost);                                    // For each object inside the array of the json it creates a new post
};

function appendPost(timeline){
  const newLiPost = document.createElement('li');                           // We create a new list element
  newLiPost.textContent = `${timeline.post}`;                               // We change it's content to be whatever the post value of each object is
  newPost.append(newLiPost);                                                // We append the new li element to the ul of all original posts
  //this is where we add the function for reacts to orginal posts
  timeline.replies.forEach(reply => displayReply(reply));                   // For each item inside the array replies we run the displayReply function
  newReplyForm(timeline);                                                   // Then we create the reply form
};

function displayReply(reply) {
  const newReplyThread = document.createElement('ul');                      // For each original post (line 23) we create a new ul element that will contain the replies
  const newReply = document.createElement('li');                            // We create a new li element
  newReply.textContent = `${reply}`;                                        // We change it's content to be whatever the string of each entry inside the array is
  newReplyThread.append(newReply);                                          // We append the new li element to the ul of replies
  //this is where we add the function for reacts to replies
  newPost.append(newReplyThread);                                           // We append the ul of replies to the ul of original posts
};

function newReplyForm(timeline) {                                           // This function creates the reply form for each original post (line 24 from line 15)
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

function postOriginal (event) {     // This function is called when we post an original post
  event.preventDefault();
  const postText=event.target.newPost.value;

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
    .then(response => response.json())
    .then(appendPost)
    .catch(error => console.warn(`Oh no: ${error}`))
};

function postReply(event) {     // This function is called when we post a reply
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
    // .then(response => response.json())
    // .then(appendPost)
    .then(location.reload())
    .catch(error => console.warn(`Oh no: ${error}`))
};

const myForm=document.getElementById('newPostForm');

const emojiButton = document.createElement('button');
emojiButton.addEventListener('click', postOriginal);

function EmojiCount (){
  if 
}
let heartCount=0;
let lyingCount=0;
let shockedCount=0;
