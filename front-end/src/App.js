import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [guessedLetters, setguessedletters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);


  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/word');
      const data = await response.json();
      const wordFromServer = data.word.toLowerCase(); 
      setWord(wordFromServer);
      console.log(wordFromServer);
      setDisplayWord('_ '.repeat(wordFromServer.length));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuess = async (letter) => {

    if (guessedLetters.includes(letter)) return;
    setguessedletters([...guessedLetters, letter]);
    const LetterCorrect = word.includes(letter);
    if (!LetterCorrect) {
      setIncorrectGuesses(incorrectGuesses + 1);
    } else {
      const newDisplayedWord = word.split('').map((char, index) => {
        return char === letter || displayWord[index] === char ? char : displayWord[index];
      }).join('');
      setDisplayWord(newDisplayedWord);
    }
  };
  
  const Hangman = ({ incorrectGuesses }) => {
    return (
      <p>Incorrect Guesses: {incorrectGuesses}</p>
    );
  };
  
  const Keyboard = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return (
      <div className="keyboard">
        {letters.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <p>{displayWord}</p>
       <Keyboard />
       {incorrectGuesses <= 7 ? (
        <>
          <Hangman incorrectGuesses={incorrectGuesses} />
        </>
      ) : (
        <p>Game Over</p>
      )}    </div>
  );
}

export default App;
