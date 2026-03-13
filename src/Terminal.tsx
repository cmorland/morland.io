import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { TerminalContext } from './vfs';

interface Props {
  onBootStart?: () => void;
  onBootComplete?: () => void;
}

export const Terminal: React.FC<Props> = ({ onBootStart, onBootComplete }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const vfsContextRef = useRef<TerminalContext>(new TerminalContext());
  
  // Use refs for state to ensure callbacks always have the latest values
  // without triggering React re-renders for every keystroke.
  const currentLineRef = useRef('');
  const cursorXRef = useRef(0);
  const isExecutingRef = useRef(false);

  const prompt = () => {
    if (!xtermRef.current) return;
    const p = vfsContextRef.current.getPrompt();
    xtermRef.current.write('\r\n' + p);
  };

  const runHackerScript = async (term: XTerm) => {
    term.writeln('\r\n\x1b[1;31mINITIATING BRUTE FORCE PROTOCOL...\x1b[0m');
    await new Promise(r => setTimeout(r, 800));
    
    term.writeln('Targetting mainframes: \x1b[1;33m[204.14.21.1, 192.168.0.254, 10.0.0.1]\x1b[0m');
    await new Promise(r => setTimeout(r, 600));

    term.writeln('Bypassing outer firewall...');
    let progress = '[';
    for(let i=0; i<20; i++) {
        progress += '#';
        term.write('\rBypassing outer firewall... ' + progress.padEnd(21, '.') + ']');
        await new Promise(r => setTimeout(r, Math.random() * 50 + 20));
    }
    term.writeln(' \x1b[1;32m[SUCCESS]\x1b[0m');
    await new Promise(r => setTimeout(r, 400));

    term.writeln('Injecting payload into memory banks...');
    for (let i = 0; i < 30; i++) {
      const hex = Array.from({length: 8}, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
      const addr = '0x' + Array.from({length: 8}, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
      term.writeln(`\x1b[1;32m[${addr}]\x1b[0m Writing segments... ${hex} ${hex} ${hex}`);
      await new Promise(r => setTimeout(r, Math.random() * 30 + 10));
    }
    
    term.writeln('\r\n\x1b[1;31mWARNING: INTRUSION DETECTED. TRACING CONNECTION...\x1b[0m');
    await new Promise(r => setTimeout(r, 1200));
    term.writeln('\x1b[1;32mCounter-measures deployed. Connection secured.\x1b[0m');
    await new Promise(r => setTimeout(r, 500));
    term.writeln('\x1b[5;32mACCESS GRANTED\x1b[0m'); // Blinking text
    await new Promise(r => setTimeout(r, 1000));
  };

  const handleCommand = async (cmd: string) => {
    if (!xtermRef.current) return;
    const term = xtermRef.current;
    
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) {
      prompt();
      return;
    }

    isExecutingRef.current = true;

    if (trimmedCmd === 'clear') {
      term.clear();
      // Need to re-prompt immediately without an extra newline
      term.write('\r');
      prompt();
      isExecutingRef.current = false;
      return;
    }

    if (trimmedCmd === 'hack') {
      await runHackerScript(term);
    } else {
      const output = vfsContextRef.current.executeCommand(cmd);
      if (output) {
        term.write('\r\n' + output.replace(/\n/g, '\r\n'));
      }
    }
    
    prompt();
    isExecutingRef.current = false;
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      cursorStyle: 'block',
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: 16,
      theme: {
        background: '#0a0a0a',
        foreground: '#33ff33', // Phosphor green
        cursor: '#33ff33',
        selectionBackground: 'rgba(51, 255, 51, 0.3)',
      },
      convertEol: true,
    });
    
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    fitAddon.fit();
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    term.onData(data => {
      if (isExecutingRef.current) return;

      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        handleCommand(currentLineRef.current);
        currentLineRef.current = '';
        cursorXRef.current = 0;
      } else if (code === 127) { // Backspace
        if (cursorXRef.current > 0) {
          term.write('\b \b');
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          cursorXRef.current--;
        }
      } else if (code >= 32 && code <= 126) { // Printable characters
        currentLineRef.current += data;
        cursorXRef.current++;
        term.write(data);
      }
    });

    const runBootSequence = async () => {
      isExecutingRef.current = true;
      if (onBootStart) onBootStart();
      term.writeln('\x1b[1;32mStarting system initializer...\x1b[0m');
      
      const bootMessages = [
        'Loading kernel modules... [OK]',
        'Mounting virtual filesystems... [OK]',
        'Starting networking interface... [OK]',
        'Bringing up loopback interface... [OK]',
        'Initializing sysadmin simulation protocol... [OK]',
        'Verifying local user credentials... [OK]',
        'Welcome to the morland.io environment.'
      ];

      for (const msg of bootMessages) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
        term.writeln(msg);
      }
      
      term.writeln('');
      term.writeln('  \x1b[1;32mchad\x1b[0m@\x1b[1;32mmorland.io\x1b[0m');
      term.writeln('  ----------------');
      term.writeln('  \x1b[1;36mOS\x1b[0m: Linux (Web Emulation)');
      term.writeln('  \x1b[1;36mHost\x1b[0m: morland.io');
      term.writeln('  \x1b[1;36mKernel\x1b[0m: 6.1.0-17-amd64 (Emulated)');
      term.writeln('  \x1b[1;36mUptime\x1b[0m: 951 days');
      term.writeln('  \x1b[1;36mResolution\x1b[0m: 1920x1080');
      term.writeln('  \x1b[1;36mTerminal\x1b[0m: xterm.js');
      term.writeln('  \x1b[1;36mCPU\x1b[0m: AMD EPYC 7452 32-Core Processor');
      term.writeln('  \x1b[1;36mMemory\x1b[0m: 256GiB / 256GiB'); // Changed to 256GiB, since 263768408 kB is 256 GiB
      term.writeln('');
      term.writeln('  \x1b[40m   \x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[47m   \x1b[0m\r\n');
      term.writeln('Type "help" to see available commands.');
      prompt();
      if (onBootComplete) onBootComplete();
      isExecutingRef.current = false;
    };

    runBootSequence();

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div 
      ref={terminalRef} 
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      className="terminal-container"
    />
  );
};
