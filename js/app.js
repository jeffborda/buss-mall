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
var votesChart; //for chart.js :not using currently????????
//var chartDrawn = false; //for chart.js :not using currently
var imageTitles = []; //holds image titles for chart
var imageVotes = []; //holds image votes for chart

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

//For printing out a simple table of what user clicks.
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

function renderResults() {
  for(var i = 0; i < allProductImages.length; i++) {
    allProductImages[i].render();
  }
}

//Helper function that checks the previous six image elements displayed to prevent repeats.
//  true means the image is safe to display again
//  false means it's a repeat
function isDisplayable(randomElement) {
  for (var i = 0; i < 6; i++) {
    if (previousDisplayedIndexes[i] === randomElement) {
      return false;
    }
  }
  return true;
}

//Function to display three random images, and checking to make sure they're not repeats
function showRandomProductImages() {
  var randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  while(!isDisplayable(randomIndexNumber)){
    randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceOneEl.src = allProductImages[randomIndexNumber].path;
  imageChoiceOneEl.title = allProductImages[randomIndexNumber].imageName;
  allProductImages[randomIndexNumber].timesShown++;
  previousDisplayedIndexes.unshift(randomIndexNumber);

  randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  while(!isDisplayable(randomIndexNumber)){
    randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceTwoEl.src = allProductImages[randomIndexNumber].path;
  imageChoiceTwoEl.title = allProductImages[randomIndexNumber].imageName;
  allProductImages[randomIndexNumber].timesShown++;
  previousDisplayedIndexes.unshift(randomIndexNumber);

  randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  while(!isDisplayable(randomIndexNumber)){
    randomIndexNumber = Math.floor(allProductImages.length * Math.random());
  }
  imageChoiceThreeEl.src = allProductImages[randomIndexNumber].path;
  imageChoiceThreeEl.title = allProductImages[randomIndexNumber].imageName;
  allProductImages[randomIndexNumber].timesShown++;
  previousDisplayedIndexes.unshift(randomIndexNumber);
}

//Listeners for each of the three images
imageChoiceOneEl.addEventListener('click', function(event) {
  //console.log(event.target.title); //for testing
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks < MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else if (totalClicks === MAX_CLICKS_ALLOWED) {
    // makeHeaderRow();
    // renderResults();
    updateChartArrays();
    drawChart();
  }
});

imageChoiceTwoEl.addEventListener('click', function(event) {
  //console.log(event.target.title); //for testing
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks < MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else if (totalClicks === MAX_CLICKS_ALLOWED) {
    // makeHeaderRow();
    // renderResults();
    updateChartArrays();
    drawChart();
  }
});

imageChoiceThreeEl.addEventListener('click', function(event) {
  //console.log(event.target.title); //for testing
  for (var i = 0; i < allProductImages.length; i++) {
    if(event.target.title === allProductImages[i].imageName) {
      allProductImages[i].timesClicked++;
    }
  }
  totalClicks++;
  if (totalClicks < MAX_CLICKS_ALLOWED) {
    showRandomProductImages();
  }
  else if (totalClicks === MAX_CLICKS_ALLOWED) {
    // makeHeaderRow();
    // renderResults();
    updateChartArrays();
    drawChart();
  }
});

//Chart Funcitons +++++++++++++++++++++++++++++++++++++++++++++

function updateChartArrays() {
  for(var i = 0; i < allProductImages.length; i++) {
    imageTitles[i] = allProductImages[i].imageName;
    imageVotes[i] = allProductImages[i].timesClicked;
  }
}

var data = {
  labels: imageTitles,
  datasets: [{
    label: 'Number of Clicks',
    data: imageVotes,
    backgroundColor: '#2772BE',
    hoverBackgroundColor: '#153A5F',
  }],
};

function drawChart() {
  var ctx = document.getElementById('vote-chart').getContext('2d');
  //eslint-disable-next-line
  votesChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuad'

      },
      scales: {
        xAxes: [{
          stacked: false,
        }],
        yAxes: [{
          stacked: false,
          ticks: {
            stepSize: 1,
          },
        }],
      }
    }
  });
  chartDrawn = true;
}



//main
showRandomProductImages();