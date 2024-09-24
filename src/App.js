import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LowercaseCharacters, NumberCharacters, SpecialCharacters, UppercaseCharacters } from "./data/PassChar";

function App() {
  let [passwordLength, setPasswordLength] = useState(10);
  let [finalPassword, setFinalPassword] = useState('');
  let [uc, setUC] = useState(false);
  let [lc, setLC] = useState(false);
  let [nc, setNC] = useState(false);
  let [sc, setSC] = useState(false);

  let createPassword = ()=>{
    let charSet = '';
    if (uc || lc || nc || sc){
      if (uc) charSet += UppercaseCharacters;
      if (lc) charSet += LowercaseCharacters;
      if (nc) charSet += NumberCharacters;
      if (sc) charSet += SpecialCharacters;
      let finalPass = ''
      for (let i=0; i<passwordLength; i++){
        finalPass += charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setFinalPassword(finalPass)
      toast.success("Password Generated Successfully");
    }
    else{
      toast.error("Sorry. Please check at least one checkbox");
    }
  }

  let copyPassword = ()=>{
    navigator.clipboard.writeText(finalPassword);
    toast.success("Successfully Copied");
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="passwordBox">
          <h2>Password Generator</h2>

          <div className="result-container">
            <span id="result">{finalPassword}</span>
            <button className="btn" id="clipboard" onClick={copyPassword}>&#x2398;</button>
          </div>

          <div className="options">
            <div className="option">
              <label>Password Length</label>
              <input 
                type="number"
                min="4" 
                max="24" 
                value={passwordLength} 
                onChange={(e) => setPasswordLength(e.target.value)} 
              />
            </div>
            <div className="option">
              <label>Include uppercase letters</label>
              <input type="checkbox" checked={uc} onChange={()=>setUC(!uc)} />
            </div>
            <div className="option">
              <label>Include lowercase letters</label>
              <input type="checkbox" checked={lc} onChange={()=>setLC(!lc)} />
            </div>
            <div className="option">
              <label>Include numbers</label>
              <input type="checkbox" checked={nc} onChange={()=>setNC(!nc)} />
            </div>
            <div className="option">
              <label>Include symbols</label>
              <input type="checkbox" checked={sc} onChange={()=>setSC(!sc)} />
            </div>
          </div>

          <button onClick={createPassword} className="btn btn-large">Generate Password</button>
        </div>
      </div>
    </>
  );
}

export default App;