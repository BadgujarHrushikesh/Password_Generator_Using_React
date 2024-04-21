import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+{}><?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,1)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className="cont">
      <div >
        <h1>Password Generator </h1>
        <input type="text" value={password} className='' placeholder='Password' readOnly ref={passwordRef} />
        <button className='btn btn-primary' onClick={copyPasswordToClipBoard}>Copy</button>
      </div>
      <div>
        <input type="range" min={8} max={50} value={length} onChange={(e) => { setLength(e.target.value) }} /> <label htmlFor="range">Length : {length}</label>
      </div>
      <div>
        <input type="checkbox" min={8} defaultChecked={numberAllowed} id='numberInput' onChange={() => {
          setNumberAllowed((prev) => !prev)
        }} /><label htmlFor="numberInput"> : Numbers</label>

      </div>
      <div>
        <input type="checkbox" min={8} defaultChecked={numberAllowed} id='CharInput' onChange={() => {
          setCharacterAllowed((prev) => !prev)
        }} /><label htmlFor="numberInput"> : Character</label>

      </div>
    </div>

  )
}

export default App;
