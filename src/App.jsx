import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import "./App.scss"

const COLORS = [
  {
    color:"#2364AA",
    darkColor:"#113255"
  },
  {
    color:"#F93943",
    darkColor:"#94050c"
  },
  {
    color:"#F5BB00",
    darkColor:"#7a5d00"
  },
  {
    color:"#20FC8F",
    darkColor:"#028c48"
  }
]

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

export default function App() {
  const [sequence,setSequence] = useState([])
  const [currentIndex,setCurrentIndex] = useState(null)
  const [isUserPlaying,setIsUserPlaying] = useState(false)

  const score = useMemo(()=>sequence.length-1,[sequence])

  useEffect(()=>{
    if(currentIndex === sequence.length){
      if(isUserPlaying) {
        setSequence([...sequence,COLORS[getRandomIntInclusive(0,3)]])
      }  
      setCurrentIndex(0)
      setIsUserPlaying(!isUserPlaying)
    }
  },[currentIndex,sequence,isUserPlaying])

  useEffect(()=>{
    let timer
    if(!isUserPlaying){
      timer = setTimeout(()=>setCurrentIndex(currentIndex+1),3000)
    }
    return () => {
      if(timer){
        clearTimeout(timer)
      }
    }
  },[currentIndex,isUserPlaying])


  const handleChoice = useCallback((color)=>{
    if(sequence[currentIndex] === color){
      setCurrentIndex(currentIndex+1)
    } else {
      setCurrentIndex(0)
    }
  },[sequence,currentIndex])

  return (
    <div className="app">
      <div className="container">
        <div className="simon">
          <h1 className="simon__title">Simon</h1>
          <div className="simon__container">
            {
              COLORS.map((color,index)=>{
                return (
                  <button 
                    key={index} 
                    onClick={()=>{handleChoice(color)}} 
                    className="simon__box" 
                    style={{
                      backgroundColor : (!isUserPlaying && color===sequence[currentIndex])
                        ? color.color
                        : color.darkColor
                      }}>
                  </button>
                )
              })
            }
          </div>
          <button className='simon__btn' onClick={()=>{setCurrentIndex(0)}}>Jouer</button>
        </div>
      </div>
    </div>
  )
}


