import React from "react";
import Counter from "./Counter";
import MessageBoard from "./MessageBoard";

function App() {
  return (
    <div className="App">
      <div>
        <header className="App-header">React-redux-sw App</header>
      </div>
      <div>
        <main>
          <Counter />
          <MessageBoard />
        </main>
      </div>
    </div>
  );
}

export default App;
