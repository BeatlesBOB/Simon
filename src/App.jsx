import { useEffect, useState } from 'react'


const grammar = '#JSGF V1.0; grammar colors; public <color> = bleu | jaune | vert | rouge'

export default function App() {
  
  useEffect(()=>{
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  },[])

  return (
    <div className="simon">
      <h1 className="simon__h1">Simon</h1>
    </div>
  )
}


