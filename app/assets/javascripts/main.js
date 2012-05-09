var guessesLeft = 10;
var theAnswer=Math.round(Math.random()*(99)+1);

function processGuess(){
var theGuess = document.forms.guessTheNumber.guess.value;
var telluser ='';
document.forms.guessTheNumber.guess.value='';
if(theGuess =='')
{
  telluser='You didn\'t Guess anything!';
  fillUserFeedback(telluser);
}
else if (theGuess<0 || theGuess>100)
{
  telluser ='You guessed something too big or small, what\'s wrong with you?!';
  fillUserFeedback(telluser);
}
else
{
guessesLeft-=1;
updateScore(guessesLeft);
if(guessesLeft>0)
{
if (theGuess == theAnswer)
{
  
  telluser = 'Well done - the mystery number is '+theAnswer+'! \n\nPress the link below to reload the page for another game.';
  disableGuess();
  
  var nameToAdd = prompt("Please enter your name","");
  if (nameToAdd!=null && nameToAdd!="")
  {
   $.post("/highscores.json", { name: nameToAdd, score: guessesLeft },function(){});
  populateHighScores();
  }
  fillUserFeedback(telluser);
  showReloadPageLink();
}
if (theGuess>theAnswer)
{
 
 telluser ='Your guess is too big, try again!';
 fillUserFeedback(telluser);

}
if(theGuess<theAnswer && theGuess > 0 )
{
  
  telluser ='Your Guess is too small, try again!';
  fillUserFeedback(telluser);

}

document.forms.guessTheNumber.guess.focus();
}
else
{
if (theGuess == theAnswer)
{
  telluser = 'Well done - the mystery number is '+theAnswer+'! \n\nPress the link below to reload the page for another game.';
  disableGuess();
  fillUserFeedback(telluser);
  showReloadPageLink();
  var nameToAdd = prompt("Please enter your name","");
  if (nameToAdd!=null && nameToAdd!="")
  {
  $.post("/highscores.json", { name: nameToAdd, score: guessesLeft },function(){});
  populateHighScores();
  }
}
else
{
  telluser ='YOU LOSE! The mystery number was '+theAnswer+'! \n\nPress the link below to reload the page for another game.';
  fillUserFeedback(telluser);
  showReloadPageLink();
  disableGuess();
}
}
}
}

$(function() {
  updateScore(guessesLeft);
  populateHighScores();
});
function sortMultiDimensional(a,b)
{
    // this sorts the array using the second element    
    return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0));
}

function populateHighScores() {
  var scores;
  $.ajax({
      type    : "GET",
      url   : "/highscores.json",
      async : true,
      dataType: "json",
      success: function(data) {
      console.log(data);
      if (data != undefined) {
        
        /*var test =$.parseJSON(data);
        for (var i=0; i<test.length; i++)
        {
          scores[i]=[test[i].score,test[i].name];
        }*/
        scores = $.map(data, function(score) {
          return [[score.score, score.name]];
      });
      console.log(scores);
      scores.sort(sortMultiDimensional);
  scores.reverse();
  $('div#highScores').empty();
  for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }
     }
    }
    })


  
}

function updateScore(score) {
  $('h2#score span#guessesLeft').empty();
  $('h2#score span#guessesLeft').append(score);
}
function fillUserFeedback(feedback)
{
  $('h2#feedback span#userFeedback').empty();
  $('h2#feedback span#userFeedback').append(feedback);
}
function showReloadPageLink()
{
 $('span#resetGame').empty();
 $('span#resetGame').append('<A HREF="javascript:pageReset()">Click to refresh the page</A>');
}
function pageReset()
{
  guessesLeft=10;
  $('h2#feedback span#userFeedback').empty();
  updateScore(guessesLeft);
  document.forms.guessTheNumber.btnGuess.disabled=false;
  $('span#resetGame').empty();
  theAnswer=Math.round(Math.random()*(99)+1);
}
function disableGuess() 
{
  document.forms.guessTheNumber.btnGuess.disabled=true;
}

