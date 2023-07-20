const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let theNUMBER;
let inputGuesses;
generateRandom();

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.post('/game', (req,res) => {
  console.log('at game req body', req.body)
  inputGuesses = req.body
  checkAgainstRandom(inputGuesses)
  res.send(201)
})


app.get('/input', (req,res) => {
res.send(inputGuesses)
})


function generateRandom() {
  theNUMBER = Math.floor(Math.random()*(25-1)+1)
  console.log('the secret number is: ',theNUMBER)
}


function checkAgainstRandom(allguesses) {
  for ( let guess in allguesses) {
  if (theNUMBER == allguesses[guess].guess) {
    allguesses[guess].hint = 'Correct!!!' 
  }
  else if (theNUMBER < allguesses[guess].guess) {
    allguesses[guess].hint = 'You are too high!'
  }
  else if (theNUMBER > allguesses[guess].guess) {
    allguesses[guess].hint = 'You are too low!'
  }
  
}
console.log(allguesses);
return allguesses;
}

console.log("input guesses after addind", inputGuesses);


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
