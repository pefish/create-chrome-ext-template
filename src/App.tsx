import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "antd";

function App() {

  React.useEffect(() => {

    // Initialize butotn with users's prefered color
    let changeColor = document.getElementById("changeColor");

    chrome.storage.sync.get("color", ({ color }) => {
      changeColor!.style.backgroundColor = color;
    });

    // When the button is clicked, inject setPageBackgroundColor into current page
    changeColor!.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          chrome.storage.sync.get("color", ({ color }) => {
            document.body.style.backgroundColor = color;
          });
        },
      });
    });

    chrome.runtime.sendMessage(
      "I am popup",
      function (response) {
        console.log("popup received response: " + response);
      }
    );
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button id="changeColor">改变页面 body 颜色</Button>
      </header>
    </div>
  );
}

export default App;
