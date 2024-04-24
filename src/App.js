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

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,1)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div
      className="container position-absolute top-50 start-50 translate-middle mx-2"
      style={{ width: "40vw", height: "35vh" }}
    >
      <div className="card">
        <h2 className="card-header bg-secondary text-white text-center">
          Password Generator
        </h2>
        <div className="card-body mb-3">
          <div className="input-group mb-3">
            <input
              value={password}
              type="text"
              className="form-control"
              readOnly
              ref={passwordRef}

            />
            <button className="btn btn-primary rounf" type="button" id="button-addon" onClick={copyPasswordToClipBoard} >
              Copy
            </button>
          </div>


          <input
            type="range"
            className="form-range"
            min={8}
            max={50}
            id="customRange2"
            value={length} onChange={(e) => { setLength(e.target.value) }}
          />
          <p className="text-center">Length : {length}</p>
          <div className="row">
            <div className="col">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"

                  min={8}
                  defaultChecked={numberAllowed}
                  id='numberInput' onChange={() => {
                    setNumberAllowed((prev) => !prev)
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked1"
                >
                  Numbers
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  min={8} defaultChecked={numberAllowed} id='CharInput' onChange={() => {
                    setCharacterAllowed((prev) => !prev)
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked2"
                >
                  Symbol
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>







  )
}

export default App;
