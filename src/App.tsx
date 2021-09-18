import { createAdapter, EncryptionAlgorithm } from "iocane";
import React, { useState } from "react";
import cn from 'classnames'

export const App: React.FC = () => {
  const [ message, setMessage] = useState<string>("")
  const [ messageisValid, setValidMsg] = useState<boolean>(false)
  const [ key, setKey] = useState<string>("")
  const [ keyisValid, setValidKey] = useState<boolean>(false)
  const [ btnCopyVisible, setBtnCopyVisible] = useState<boolean>(false)

  function encrypt() {
    if (key && message) {
      createAdapter()
      .setAlgorithm(EncryptionAlgorithm.CBC)
      .setDerivationRounds(14)
      .encrypt(message, key)
      .then((res) => {
        setMessage(res.toString())
        setBtnCopyVisible(true)
      })
      .catch(() => {
        setMessage("Something's gone wrong...")
      })
    }
  }
  function decrypt() {
    if (key && message){
      createAdapter()
      .decrypt(message, key)
      .then((res) => {
        setMessage(res.toString())
        setBtnCopyVisible(true)
      })
      .catch(() => {
        alert("Cannot decrypt this message...")
      })
    }
  }
  function changeHandler (e:any) {
    if (e.target.type === 'password') {
      setValidKey(e.target.value.length > 0)
      setKey(e.target.value)
    }
    if (e.target.type === 'textarea') {
      setValidMsg(e.target.value.length > 0)
      setMessage(e.target.value)
    }
  }
  function reset() {
    setBtnCopyVisible(false)
    setValidKey(false)
    setValidMsg(false)
    setMessage("");
    setKey("");
  }
  function copyToClipboard() {
    if (message) {
      try {
        if (window.isSecureContext) {
          return navigator.clipboard.writeText(message)
        }

        var textArea = document.createElement("textarea");
        textArea.value = message;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
      } catch (error) {
        alert("Cannot copy to clipboard")
      } 
    }
  }

  return (
    <div className="container mt-5">
      <form>
        <div className="form-group m-2">
          <label className="mb-2">Message:</label>
          <textarea
            className={cn(
              "form-control",
              {'is-valid': messageisValid},
              {'is-invalid': !messageisValid}
            )}
            placeholder="(text here)"
            value={message}
            onChange={changeHandler} 
          />
        </div>
        <div className="form-group m-2">
          <label className="mb-2">Key:</label>
          <input
            type="password"
            className={cn(
              "form-control",
              {'is-valid': keyisValid},
              {'is-invalid': !keyisValid}
            )}
            placeholder="******"
            value={key}
            onChange={changeHandler} 
          />
        </div>
      </form>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-auto py-3">
            <button className="btn btn-primary" onClick={encrypt}>
              Encrypt
            </button>
          </div>
          <div className="col-auto py-3">
            <button className="btn btn-primary" onClick={decrypt}>
              Decrypt
            </button>
          </div>
          
          {
            (key !== '' || message !== '') &&
            <div className="col-auto py-3">
              <button className="btn btn-secondary" onClick={reset}>
                Reset
              </button>
            </div>
          }
          {
            ( message !== '' && btnCopyVisible ) && 
            <div className="col-auto py-3">
              <button className="btn btn-success" onClick={copyToClipboard}>
                Copy to Clipboard
              </button>
            </div>
          }

        </div>
      </div>
    </div>
  );
}