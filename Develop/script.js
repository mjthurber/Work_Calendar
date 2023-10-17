// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var saveButtons = document.querySelectorAll(".saveBtn");
  var today = dayjs();
  var currentHour = dayjs().format('H'); // Change format to 'H'
  var savedWork = {};
  var hourElements = document.querySelectorAll("[id^='hour-']");
  var calHour = [];
  
  $('#currentDay').text(today.format('MMM D, YYYY'));
  
  init();
  
  function init() {
    var storedWork = JSON.parse(localStorage.getItem("savedWork"));
    if (storedWork !== null) {
      savedWork = storedWork;
    }
    renderWork();
  }
  
  function renderWork() {
    for (var saveHourID in savedWork) {
      var textArea = savedWork[saveHourID];
      $("#" + saveHourID).find('.description').val(textArea);
    }
  }
  
  saveButtons.forEach(function (saveButton) {
    saveButton.addEventListener("click", function (event) {
      var saveHourID = this.parentElement.id;
      var textArea = this.parentElement.querySelector('.description').value;
      
      // Update the savedWork object with the new data
      savedWork[saveHourID] = textArea;
      
      // Save the entire savedWork object to local storage
      localStorage.setItem("savedWork", JSON.stringify(savedWork));
      
      console.log(saveHourID);
      console.log(textArea);
    });
  });
  
  $('#currentDay').text(today.format('MMM D, YYYY'));
  
  hourElements.forEach(function(element) {
    var hour = parseInt(element.id.substring(5)); // Parse the hour as an integer
    calHour.push(hour);
    
    if (hour < parseInt(currentHour)) {
      $(element).addClass('past');
      $(element).removeClass('present');
      $(element).removeClass('future');
    } else if (hour === parseInt(currentHour)) {
      $(element).removeClass('past');
      $(element).addClass('present');
      $(element).removeClass('future');
    } else {
      $(element).removeClass('past');
      $(element).removeClass('present');
      $(element).addClass('future');
    }
    console.log(hour);
  });
  
  console.log(calHour);
});

  
  


  // TODO: 
  //Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  
  //HINT: What does `this` reference in the click listener function?


  // How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 



  
  //HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

