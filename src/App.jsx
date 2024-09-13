import { useState, useEffect } from 'react';

const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
  'Y': '-.--', 'Z': '--..', 
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', 
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': ' / ',
};

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const translateToMorse = (text) => {
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
  };

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    if (output) {
      const interval = setInterval(() => {
        if (currentIndex < output.length) {
          setDisplayedText((prev) => prev + output[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100); 
      return () => clearInterval(interval);
    }
  }, [output]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setOutput(translateToMorse(newValue));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Traducteur de Code Morse</h1>
      <input 
        type="text" 
        value={input} 
        onChange={handleInputChange} 
        placeholder="Tapez ici" 
        style={{ padding: '10px', fontSize: '18px' }}
      />
      <p style={{ marginTop: '20px', fontSize: '24px', whiteSpace: 'pre-wrap' }}>
        {displayedText}
      </p>
    </div>
  );
};

export default App;
