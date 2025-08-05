import React from 'react';
import { Home } from "./components/pages/Home";
import "./App.css";

// Import API debug untuk development
if (import.meta.env.DEV) {
  import('./utils/api-debug');
}

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;