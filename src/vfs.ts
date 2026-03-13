export type VFSNode = FileNode | DirNode;

export interface FileNode {
  type: 'file';
  name: string;
  content: string;
}

export interface DirNode {
  type: 'dir';
  name: string;
  children: { [name: string]: VFSNode };
}

export const fileSystem: DirNode = {
  type: 'dir',
  name: '~',
  children: {
    'about.txt': {
      type: 'file',
      name: 'about.txt',
      content: `Hi, I'm Chad.

I'm a seasoned Unix/Linux Systems Administrator with a passion for building robust, secure, and highly available infrastructure.
I've spent years living in the terminal, managing servers, automating deployments, and troubleshooting complex systems.

When I'm not configuring servers, I enjoy exploring the intersection of modern web technologies and classic Unix philosophies.
Welcome to my personal slice of the web.`
    },
    'contact.txt': {
      type: 'file',
      name: 'contact.txt',
      content: `Email: chad@morland.io
GitHub: github.com/chadm
LinkedIn: linkedin.com/in/chadm`
    },
    'skills.txt': {
      type: 'file',
      name: 'skills.txt',
      content: `- Operating Systems: Linux (Debian/Ubuntu, RHEL/CentOS), FreeBSD
- Networking: TCP/IP, DNS, DHCP, Firewalls (iptables, pf), VPNs (WireGuard, OpenVPN)
- Web Servers: Nginx, Apache, HAProxy
- Automation: Ansible, Bash scripting, Python
- Virtualization/Containers: Docker, Kubernetes, Proxmox, VMware
- Monitoring: Prometheus, Grafana, Nagios, Zabbix
- Databases: PostgreSQL, MySQL/MariaDB, Redis`
    },
    'projects': {
      type: 'dir',
      name: 'projects',
      children: {
        'server_automation.sh': {
          type: 'file',
          name: 'server_automation.sh',
          content: `#!/bin/bash
# A collection of scripts I use to bootstrap and manage fresh Linux servers.
# It handles initial hardening, setting up ssh keys, installing base packages, and configuring fail2ban.`
        },
        'homelab_k8s.md': {
          type: 'file',
          name: 'homelab_k8s.md',
          content: `# Homelab Kubernetes Cluster
My documentation for setting up a bare-metal Kubernetes cluster on Raspberry Pis using k3s.`
        }
      }
    }
  }
};

export class TerminalContext {
  cwd: string[];
  vfs: DirNode;
  user: string;
  host: string;

  constructor() {
    this.cwd = ['~'];
    this.vfs = fileSystem;
    this.user = 'chad';
    this.host = 'morland.io';
  }

  getPrompt(): string {
    const path = this.cwd.join('/').replace('~', '');
    const displayPath = path === '' ? '~' : '~' + path;
    return `\x1b[1;32m${this.user}@${this.host}\x1b[0m:\x1b[1;34m${displayPath}\x1b[0m$ `;
  }

  resolvePath(path: string): VFSNode | null {
    if (path === '~' || path === '/') return this.vfs;

    let parts = path.split('/').filter(p => p !== '');
    let targetPaths = [...this.cwd];

    // Handle absolute paths
    if (path.startsWith('~') || path.startsWith('/')) {
        targetPaths = ['~'];
        parts = path.replace(/^[\/~]\/?/, '').split('/').filter(p => p !== '');
    }

    for (const part of parts) {
        if (part === '.') continue;
        if (part === '..') {
            if (targetPaths.length > 1) {
                targetPaths.pop();
            }
            continue;
        }
        targetPaths.push(part);
    }
    
    // Traverse based on targetPaths
    let node: VFSNode = this.vfs;
    for(let i=1; i < targetPaths.length; i++){
        if(node.type !== 'dir') return null;
        node = (node as DirNode).children[targetPaths[i]];
        if(!node) return null;
    }
    
    return node;
  }

  executeCommand(cmdRaw: string): string {
    const args = cmdRaw.trim().split(/\s+/).filter(Boolean);
    if (args.length === 0) return '';

    const cmd = args[0];

    switch (cmd) {
      case 'help':
        return `morland.io interactive shell
Available commands:
  help    - Show this message
  ls      - List directory contents
  cd      - Change the shell working directory
  cat     - Concatenate files and print on the standard output
  clear   - Clear the terminal screen
  whoami  - Print effective userid
  pwd     - Print name of current/working directory
  echo    - Write arguments to the standard output
  date    - Print the system date and time`;
      
      case 'whoami':
        return this.user;

      case 'pwd':
        return '/' + this.cwd.slice(1).join('/');

      case 'date':
        return new Date().toString();

      case 'echo':
        return args.slice(1).join(' ');

      case 'ls': {
        const targetPath = args.length > 1 ? args[1] : '.';
        const node = this.resolvePath(targetPath);
        
        if (!node) return `ls: cannot access '${targetPath}': No such file or directory`;
        if (node.type === 'file') return node.name;
        
        const dirNode = node as DirNode;
        const entries = Object.values(dirNode.children).map(child => {
          if (child.type === 'dir') return `\x1b[1;34m${child.name}\x1b[0m`; // Blue for dirs
          return child.name;
        });
        return entries.join('  ');
      }

      case 'cd': {
        const targetPath = args.length > 1 ? args[1] : '~';
        const node = this.resolvePath(targetPath);
        
        if (!node) return `cd: ${targetPath}: No such file or directory`;
        if (node.type === 'file') return `cd: ${targetPath}: Not a directory`;
        
        // Update cwd
        let parts = targetPath.split('/').filter(p => p !== '');
        let targetPaths = [...this.cwd];

        if (targetPath.startsWith('~') || targetPath.startsWith('/')) {
            targetPaths = ['~'];
            parts = targetPath.replace(/^[\/~]\/?/, '').split('/').filter(p => p !== '');
        }

        for (const part of parts) {
            if (part === '.') continue;
            if (part === '..') {
                if (targetPaths.length > 1) targetPaths.pop();
                continue;
            }
            targetPaths.push(part);
        }
        this.cwd = targetPaths;
        return '';
      }

      case 'cat': {
        if (args.length < 2) return `cat: missing operand`;
        const results: string[] = [];
        
        for (let i = 1; i < args.length; i++) {
          const targetPath = args[i];
          const node = this.resolvePath(targetPath);
          
          if (!node) {
            results.push(`cat: ${targetPath}: No such file or directory`);
          } else if (node.type === 'dir') {
            results.push(`cat: ${targetPath}: Is a directory`);
          } else {
            results.push((node as FileNode).content);
          }
        }
        return results.join('\r\n');
      }

      default:
        return `${cmd}: command not found`;
    }
  }
}
