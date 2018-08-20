'use strict';

var imageChoiceOneEl = document.getElementById('image-choice-one');
var imageChoiceTwoEl = document.getElementById('image-choice-two');
var imageChoiceThreeEl = document.getElementById('image-choice-three');
var allImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass', 'sweep', 'usb'];
var allProductImages = [];
var previousDisplayedIndexes = [-1, -1, -1, -1, -1, -1];
var totalClicks = 0;
var MAX_CLICKS_ALLOWED = 25;
var userClickResults = document.getElementById('user-click-results');

function ProductImage(imageName) {
  this.imageName = imageName;
  this.timesShown = 0;
  this.timesClicked = 0;

  if(this.imageName === 'sweep') {
    this.path = `img/${imageName}.png`;
  }
  else if(this.imageName === 'usb') {
    this.path = `img/${imageName}.gif`;
  }
  else {
    this.path = `img/${imageName}.jpg`;
  }
  allProductImages.push(this);
}

allImageNames.forEach(function(name) {
  new ProductImage(name);
});





// imageChoiceOneEl.src = allProductImages[0].path;
// imageChoiceTwoEl.src = allProductImages[1].path;
// imageChoiceThreeEl.src = allProductImages[2].path;

//Checks prev six images to see if they were displayed
function checkDisplayable(randomElement) {
  for (var i = 0; i < 6; i++) {
    if (previousDisplayedIndexes[i] === randomElement) {
      return false;
    }
  }
  return true;
}


function showRandomProductImages() {
  var rando = Math.floor(allProductImages.length * Math.random());
  while(!checkDisplayable(rando)){
    rando = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceOneEl.src = allProductImages[rando].path;
  imageChoiceOneEl.title = allProductImages[rando].imageName;
  allProductImages[rando].timesShown++;
  previousDisplayedIndexes.unshift(rando);

  rando = Math.floor(allProductImages.length * Math.random());
  while(!checkDisplayable(rando)){
    rando = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceTwoEl.src = allProductImages[rando].path;
  imageChoiceTwoEl.title = allProductImages[rando].imageName;
  allProductImages[rando].timesShown++;
  previousDisplayedIndexes.unshift(rando);

  rando = Math.floor(allProductImages.length * Math.random());
  while(!checkDisplayable(rando)){
    rando = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceThreeEl.src = allProductImages[rando].path;
  imageChoiceThreeEl.title = allProductImages[rando].imageName;
  allProductImages[rando].timesShown++;
  previousDisplayedIndexes.unshift(rando);
}

showRandomProductImages();


imageChoiceOneEl.addEventListener('click', function(event) {
  console.log(event.target.title);
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks <= MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else {
    makeHeaderRow();
    renderResults();
  }
});

imageChoiceTwoEl.addEventListener('click', function(event) {
  console.log(event.target.title);
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks <= MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else {
    makeHeaderRow();
    renderResults();
  }
});

imageChoiceThreeEl.addEventListener('click', function(event) {
  console.log(event.target.title);
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks < MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else {
    makeHeaderRow();
    renderResults();
  }
});



function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Product';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Times Displayed';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Times Clicked';
  trEl.appendChild(thEl);

  userClickResults.appendChild(trEl);
}

ProductImage.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.imageName;
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = this.timesShown;
  trEl.appendChild(tdEl);
  
  tdEl = document.createElement('td');
  tdEl.textContent = this.timesClicked;
  trEl.appendChild(tdEl);
  userClickResults.appendChild(trEl);
};

function renderResults() {
  for(var i = 0; i < allProductImages.length; i++) {
    allProductImages[i].render();
  }
}