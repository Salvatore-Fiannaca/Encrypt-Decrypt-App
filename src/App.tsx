import { createAdapter, EncryptionAlgorithm } from "iocane";
import React, { MouseEvent, useState } from "react";
import cn from "classnames";
import { generateKey, copyToClipboard } from "./Utils";
import hideImg from "./img/hide.png";
import showImg from "./img/show.png";

export const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messageisValid, setValidMsg] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [keyisValid, setValidKey] = useState<boolean>(false);
  const [btnCopyVisible, setBtnCopyVisible] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);

  function encrypt() {
    if (key && message) {
      createAdapter()
        .setAlgorithm(EncryptionAlgorithm.CBC)
        .setDerivationRounds(14)
        .encrypt(message, key)
        .then((res) => {
          setMessage(res.toString());
          setBtnCopyVisible(true);
        })
        .catch(() => {
          setMessage("Something's gone wrong...");
        });
    }
  }
  function decrypt() {
    if (key && message) {
      createAdapter()
        .decrypt(message, key)
        .then((res) => {
          setMessage(res.toString());
          setBtnCopyVisible(true);
        })
        .catch(() => {
          alert("Cannot decrypt this message...");
        });
    }
  }
  function reset() {
    setBtnCopyVisible(false);
    setValidKey(false);
    setValidMsg(false);
    setShowKey(false)
    setMessage("");
    setKey("");
  }
  function changeHandler(e: any) {
    switch (e.target.type) {
      case 'text':
      case 'password':
        setValidKey(e.target.value.length > 0);
        setKey(e.target.value);
        break;
      case 'textarea':
        setValidMsg(e.target.value.length > 0);
        setMessage(e.target.value);
        break;
    }
  }
  function generateHandler(e: MouseEvent) {
    e.preventDefault();
    setKey(generateKey(12));
    setShowKey(true)
    setValidKey(true)
  }
  function copyHandler() {
    copyToClipboard(message);
  }
  function showKeyHandler(e: MouseEvent){
    e.preventDefault();
    setShowKey(!showKey)
  }

  return (
    <div className="container top">
      <form>
        <div className="form-group m-2">
          <label className="mb-2">Paste your message here</label>
          <textarea
            rows={12}
            className={cn(
              "form-control",
              { "is-valid": messageisValid },
              { "is-invalid": !messageisValid }
            )}
            value={message}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group mt-4 m-2">
          <div className="row align-items-end">
            <div className="col-md-9">
              <label className="mb-2">Protect with a key</label>
              <div className="input-group">
                <input
                  className={cn(
                    "form-control input-group",
                    { "is-valid": keyisValid },
                    { "is-invalid": !keyisValid }
                  )}
                  type={ showKey ? 'text' : 'password'}
                  value={key}
                  onChange={changeHandler}
                />
                  <span 
                  className="input-group-text img"
                  onClick={showKeyHandler}>
                    <img
                      src={ showKey ? showImg : hideImg}
                      width="26em"
                      height="26em"
                      alt="show/hide key"
                    />
                  </span>
              </div>
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-outline-secondary form-control"
                onClick={generateHandler}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="container controls">
        <div className="row justify-content-center align-items-center">
          <div className="col-auto py-2">
            <button className="btn btn-outline-primary" onClick={encrypt}>
              Encrypt
            </button>
          </div>
          <div className="col-auto py-2">
            <button className="btn btn-outline-primary" onClick={decrypt}>
              Decrypt
            </button>
          </div>

          {(key !== "" || message !== "") && (
            <div className="col-auto py-2">
              <button className="btn btn-outline-dark " onClick={reset}>
                Reset
              </button>
            </div>
          )}
          {message !== "" && btnCopyVisible && (
            <div className="col-auto py-2">
              <button className="btn btn-success" onClick={copyHandler}>
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
