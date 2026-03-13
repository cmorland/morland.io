import { useState } from 'react';
import { Terminal } from './Terminal';
import './App.css';

function App() {
  const [booting, setBooting] = useState(true);

  return (
    <div className={`app-container ${booting ? 'booting' : 'ready'}`}>
      <div className="crt-overlay" />
      <div className="terminal-wrapper">
        <Terminal 
          onBootStart={() => setBooting(true)}
          onBootComplete={() => setBooting(false)}
        />
      </div>
    </div>
  );
}

export default App;