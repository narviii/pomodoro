import React, { useEffect, useState } from 'react'
//import "tailwindcss/tailwind.css";

const zeroPad = (num, places) => String(num).padStart(places, '0')


function ClockDigits() {


  const d = new Date();
  const s = d.getSeconds()
  const blinker = (s % 2 == 0) ? 'invisible' : 'visible';

  const h = zeroPad(d.getHours(), 2);
  const m = zeroPad(d.getMinutes(), 2);

  return (
    <div className="absolute h-full w-full flex justify-center flex-col">
      <div className="inline mx-auto">
        <p className="inline text-blue-200 text-9xl font-sans ...">
          {h}
        </p>
        <p className={blinker + " inline text-blue-200 text-9xl font-sans ..."}>
          :
        </p>
        <p className="inline text-blue-200 text-9xl font-sans ...">
          {m}
        </p>
      </div>

    </div>
  )
}

function ShowTime(props) {
  const m = zeroPad(props.time.getMinutes(), 2);
  const s = zeroPad(props.time.getSeconds(), 2);
  const sblink = props.time.getSeconds()
  const blinker = (sblink % 2 == 0) ? 'invisible' : 'visible';
  return (

    <div className=" flex justify-center">
      <p className=" text-blue-200 text-8xl font-mono ...">
        {m}
      </p>
      <p className={blinker + "  text-blue-200 text-8xl font-mono ..."}>
        :
        </p>
      <p className=" text-blue-200 text-8xl font-mono justify-self-end ...">
        {s}
      </p>
    </div>

  )
}

function TimeCircle(props) {
  const fullCircle = 1181
  const dashOffset = (props.timeRemain / props.timeFull) * fullCircle
  return (
    <svg className="svg-circle absolute " transform="rotate(-90 0 0)" width="24rem" height="24rem">
      <circle
        style={{ strokeDasharray: 1181, strokeDashoffset: dashOffset }}
        fill="transparent"
        cx="12rem"
        cy="12rem" r="188"
        stroke="green"
        strokeWidth={8}
        strokeLinecap="round" />
    </svg>
  )
}

function PauseButton({ timerRunning, setTimerRunning, isStarted, setStarted }) {
  const handleclick = () => {
    if (timerRunning == true && isStarted == true) {
      setTimerRunning(false)
    } else if (timerRunning == false && isStarted == false) {
      setTimerRunning(true)
      setStarted(true)
    } else if (timerRunning == false && isStarted == true) {
      setTimerRunning(true)
    } else if (timerRunning == true && isStarted == true) {
      setTimerRunning(false)
    }
  }

  let button

  if (timerRunning == true && isStarted == true) {
    button = "pause"
  } else if (timerRunning == false && isStarted == false) {
    button = "start"
  } else if (timerRunning == false && isStarted == true) {
    button = "resume"

  }


  return (
    <React.Fragment>
      <button onClick={handleclick} className="mx-auto focus:outline-none hover:bg-blue-600  mt-8 text-blue-200 text-xl z-30  w-3/6 font-sans rounded-lg">
        {button}
      </button>
    </React.Fragment>
  )
}

function ToggleButton({ text, selectedText, setSelected,setTimeRemain, setTimerRunning, setStarted, setTimerLength,setPomodoroEnd }) {
  const handleclick = () => {
    setSelected(text)

    if (text == "Pomodoro") {
      setTimerLength(1500000)
      setTimeRemain(new Date(1500000))
      setPomodoroEnd(new Date(new Date().getTime() + 1500000))
      setStarted(false)
      setTimerRunning(false)

    } else if (text == "Short  Break") {
      setTimerLength(300000)
      setTimeRemain(new Date(300000))
      setPomodoroEnd(new Date(new Date().getTime() + 300000))
      setStarted(false)
      setTimerRunning(false)

    } else if (text == "Long Break") {
      setTimerLength(900000) 
      setTimeRemain(new Date(900000))
      setPomodoroEnd(new Date(new Date().getTime() + 900000))
      setStarted(false)
      setTimerRunning(false)
    }

  }

  if (text != selectedText) {
    return (
      <button onClick={handleclick} className="m-3 whitespace-nowrap p-3 focus:outline-none hover:text-blue-600  text-blue-200 text-xl z-30  w-3/6 font-sans rounded-full">
        {text}
      </button>
    )
  } else {
    return (
      <button className="m-3 whitespace-nowrap p-3 bg-blue-500 focus:outline-none  text-blue-200 text-xl z-30  w-3/6 font-sans rounded-full">
        {text}
      </button>
    )
  }

}

function ToggleBar({ choice, isSelected, setSelected, setTimeRemain, setTimerRunning, setStarted, setTimerLength,setPomodoroEnd }) {

  return (
    <div className="mx-auto  neumorphismSize-lg  w-auto  rounded-full nm-concave-blue-900-xl m-10 ">
      <div className=" neumorphismSize-lg w-auto  rounded-full bg-gradient-to-r from-blue-900 to-blue-800 ">
        <div className="flex">
          {choice.map(elem => <ToggleButton text={elem}
            selectedText={isSelected}
            setSelected={setSelected} 
            setTimeRemain = {setTimeRemain}
            setTimerRunning = {setTimerRunning}
            setStarted = {setStarted}
            setTimerLength = {setTimerLength}
            setPomodoroEnd = {setPomodoroEnd}
            />)}
        </div>
      </div>
    </div>
  )
}


function Pomodoro({ isSelected, timeRemain, setTimeRemain, timerRunning, setTimerRunning, isStarted, setStarted, pomodoroEnd, setPomodoroEnd, timerLength, setTimerLength }) {

  const tick = () => {
    if (timerRunning == true) {
      setTimeRemain(new Date(pomodoroEnd - new Date()))
    } else {
      setPomodoroEnd(new Date(new Date().getTime() + timeRemain.getTime()))
    }

  }


  /*
    useEffect(() => {
  
      if (isSelected == "Pomodoro") {
        timerLength = 1500000
        setTimeRemain(new Date(1500000))
        setPomodoroEnd(new Date(new Date().getTime() + 1500000))
        setStarted(false)
        setTimerRunning(false)
  
      } else if (isSelected == "Short  Break") {
        timerLength = 300000
        setTimeRemain(new Date(300000))
        setPomodoroEnd(new Date(new Date().getTime() + 300000))
        setStarted(false)
        setTimerRunning(false)
  
      } else if (isSelected == "Long Break") {
        timerLength = 900000
        setTimeRemain(new Date(900000))
        setPomodoroEnd(new Date(new Date().getTime() + 900000))
        setStarted(false)
        setTimerRunning(false)
      }
  
  
    }, [isSelected, timerRunning])
  
    */

  useEffect(() => {
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [timerRunning, isSelected]);

  return (
    <React.Fragment>
      <TimeCircle timeRemain={timeRemain} timeFull={timerLength} />
      <div className=" h-full w-full flex justify-center flex-col z-10">
        <ShowTime time={timeRemain} />
        <PauseButton timerRunning={timerRunning} setTimerRunning={setTimerRunning} isStarted={isStarted} setStarted={setStarted} />
      </div>
    </React.Fragment >
  )
}


export default function Home() {
  const choice = ["Pomodoro", "Short  Break", "Long Break"]
  const [isSelected, setSelected] = useState(choice[0])
  const [timeRemain, setTimeRemain] = useState(new Date(1500000))
  const [timerRunning, setTimerRunning] = useState(false)
  const [isStarted, setStarted] = useState(false)
  const [pomodoroEnd, setPomodoroEnd] = useState(new Date(new Date().getTime() + 1500000))
  const [timerLength, setTimerLength] = useState(1500000)

  return (
    <React.Fragment>
      <div className="container   flex justify-center flex-col  h-screen bg-blue-900">
        <ToggleBar choice={choice}
          isSelected={isSelected}
          setSelected={setSelected}
          setTimerLength={setTimerLength}
          setTimeRemain={setTimeRemain}
          setPomodoroEnd={setPomodoroEnd}
          setStarted={setStarted}
          setTimerRunning={setTimerRunning}
        />
        <div className="mx-auto  neumorphismSize-lg  h-96 w-96  rounded-full nm-concave-blue-900-xl ">
          <div className=" neumorphismSize-lg  h-96 w-96  rounded-full bg-gradient-to-r from-blue-900 to-blue-800 ">
            <div className="transform scale-90  h-96 w-96 rounded-full bg-blue-900 ">
              <Pomodoro isSelected={isSelected}
                timeRemain={timeRemain}
                setTimeRemain={setTimeRemain}
                timerRunning={timerRunning}
                setTimerRunning={setTimerRunning}
                isStarted={isStarted}
                setStarted={setStarted}
                pomodoroEnd={pomodoroEnd}
                setPomodoroEnd={setPomodoroEnd}
                timerLength={timerLength}
                setTimerLength={setTimerLength}
              />
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}


