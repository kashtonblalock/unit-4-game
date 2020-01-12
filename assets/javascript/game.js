$(document).ready(function() {

    // The number we change when we click crystals
    var currentGuess = 0;
  
    // Generates goal number
    var randomNumber = numGenRandom();
  
    // Beginning numbers.
    var wins = 0;
    var losses = 0;
    var crystals;
  
    // Function that generates random numbers for each crystal.
    function crystalNumRandom() {
      // Crystals object.
      return {
        amethyst: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/amethyst.jpg"
        },
        druzy: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/druzy.jpg"
        },
        opal: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/opal.jpg"
        },
        quartz: {
          points: Math.floor(Math.random() * 12) + 1,
          imageUrl: "assets/images/quartz.jpg"
        }
      };
    }
  
    // Creates a random # btwn 19 and 120.
    function numGenRandom() {
      return Math.floor(Math.random() * 102) + 19;
    }
  
    // Reset Game
    function gameReset() {
      // Resets current total to 0
      currentGuess = 0;
      // Creates random number for crystal
      crystals = crystalNumRandom();
      // Generate a random target number and render it to the page.
      randomNumber = numGenRandom();
      $("#randomNumber").text(randomNumber);
    }
  
    // Refreshes/updates page
    function domRefresh(didUserWin) {
      $("#winsLosses").empty();
  
      // If they win
      if (didUserWin === true) {
        $("#winsLosses").append($("<p>").text("You Rock!"));
        gameReset();
        newCurrentGuess();
      }
      // If they lose...
      else if (didUserWin === false) {
        $("#winsLosses").append($("<p>").text("You Lose"));
        gameReset();
        newCurrentGuess();
      }

      var wSpan = $("<span>").text(wins);
      var lSpan = $("<span>").text(losses);
  
      var pWins = $("<p>").text("Wins: ");
      var pLosses = $("<p>").text("Losses: ");
  
      pWins.append(wSpan);
      pLosses.append(lSpan);
  
      $("#winsLosses").append(pWins);
      $("#winsLosses").append(pLosses);
    }
  
    // Function to render our crystals to the page.
    function giveCrystals() {
      for (var key in crystals) {
        var crystalDiv = $("<div class='crystalButton' data-name='" + key + "'>");
        var crystalImg = $("<img alt='image' class='crystalPic'>").attr("src", crystals[key].imageUrl);
        crystalDiv.append(crystalImg);
        $("#crystalBox").append(crystalDiv);
      }
    }
  
    // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
    function refreshCurrentGuess(crystal) {
      // Update our "current guess" number based on which crystal was clicked.
      currentGuess += crystals[crystal.attr("data-name")].points;
    }
  
    // Function that will render your "current guess" number to the page.
    function newCurrentGuess() {
      var scoreNumDiv = $("<div id='score-number'>").text(currentGuess);
      $("#currentScore").html();
      $("#currentScore").html(scoreNumDiv);
    }
  
    // Call our functions to start the game!
    gameReset();
    domRefresh();
    giveCrystals();
    newCurrentGuess();
  
    // Here we create an on.click event for the crystals.
    $(".crystalButton").on("click", function(event) {
      // Update our "current guess" number and re-render it.
      refreshCurrentGuess($(this));
      newCurrentGuess();
  
      // Check to see if we have won or lost.
      // If our current guess number equals the target number..
      if (currentGuess === randomNumber) {
        // Increment wins, restart the game, and update the page.
        wins++;
        gameReset();
        domRefresh(true);
      }
      // If our guess number exceeded our target number...
      else if (currentGuess > randomNumber) {
        // Increment losses, restart the game, and update the page.
        losses++;
        gameReset();
        domRefresh(false);
      }
    });
  
  });