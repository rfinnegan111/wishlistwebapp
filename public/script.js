/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("Hello from the Web App Dev 1 lab!");

function likeIt(){
  alert('Thanks! You\'re okay too');
}

function showHide() {
  let readMoreDiv = document.getElementById("readmore");
  readMoreDiv.style.color = "green";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}

function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById('welcomeuser').innerHTML = '<p> Hello, ' + username + ', looking forward to hearing your playlists! Click this message to close it.</p>';
  welcomeUserDiv.style.cursor = "pointer";
}

function hideWelcome() {
  let welcomeUserDiv = document.getElementById("welcomeuser");
  if (welcomeUserDiv.style.display === "block") {
    welcomeUserDiv.style.display = "none";
  }
}

function getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("You gave a rating of: ");
    for (let i=0; i < userRating; i++){
        $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}
