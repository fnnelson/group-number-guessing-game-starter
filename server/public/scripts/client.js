$(document).ready(handleReady);

let guessTotal = 0;
let guessResults;

function handleReady() {
  console.log("jquery is loaded!")

  $('#submitBtn').on("click", handleSubmit);
}




function handleSubmit(event) {
  event.preventDefault();
  // getting input from form

  const player1Guess = $('#player1Guess').val();
  const player2Guess = $('#player2Guess').val();
  const player3Guess = $('#player3Guess').val();

  let inputGuesses = {
    player1: {
      name: "Player 1",
      guess: player1Guess
    },
    player2: {
      name: "Player 2",
      guess: player2Guess
    },
    player3: {
      name: "Player 3",
      guess: player3Guess
    }

  }
  console.log(inputGuesses);

  // AJAX post
  $.ajax({
    method: "POST",
    url: '/game',
    data: inputGuesses
  }).then((response) => {
    updateTable()
    console.log("POST was successful:", response)
  }).catch((error) => {
    // console.log('error caught', error)
    alert('ERRORRRRR')
  })

  guessTotal++
  $('#guessTotal').text(guessTotal)

}


function updateTable() {
// AJAX get
$.ajax({
  method: "GET",
  url: '/input',
}).then((response) => {
  guessResults = response
  console.log("GET was successful:", response)
  render()
}).catch((error) => {
  // console.log('error caught', error)
  alert('ERRORRRRR')
})

}

function render() {
for (let results in guessResults) {
  $('#guessTable').append(`
  <tr>
  <td>${guessResults[results].name}</td>
  <td>${guessResults[results].guess}</td>
  <td>${guessResults[results].hint}</td>
</tr>
  `)
}
 
}