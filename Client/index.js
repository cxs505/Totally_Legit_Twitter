const ConfirmBtn = document.getElementById("new-post");
ConfirmBtn.addEventListener("mouseover", sendReady);

let checkbox = true;

function sendReady() {
  if (checkbox) {
    modeCheck.innerText = "Waiting to Submit";
    checkbox = false;
  } else {
    modeCheck.innerText = "Ready to Submit";
    checkbox = true;
  }
}

feed =[
    

]


const btn = document.querySelector('button');
btn.addEventListener('click', getAllFeed)


function getAllFeed(){
    fetch('http://localhost:3000/feed')
        .then(r => r.json())
        .then(appendfeed)
        .catch(console.warn)
};

function appendfeed(data){
    data.posts.forEach(appendfeeds);
};

function appendCat(catData){
    const newLi = document.createElement('li');
    newLi.textContent = `Name: ${catData.name} || Age: ${catData.age}`
    catsList.append(newLi);
};