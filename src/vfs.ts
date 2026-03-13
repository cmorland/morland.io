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
      content: `Chad Morland — Oakville, Ontario

25 years building infrastructure. Started as a teenager on the BBS scene in
the 90s, got a job at a dial-up ISP, and never looked back. No CS degree —
self-taught, curiosity-driven, learned by breaking things and reading RFCs.

Career arc: sysadmin → IT ops manager → Director of Engineering.

Spent time at ISPs, ad networks, crypto exchanges, and domain registrars.
Managed everything from a single FreeBSD box to 360+ servers across 12
datacenters. Built CDNs, mining pools, analytics pipelines, and registrar
platforms serving millions of domains.

Still run a home lab. Still prefer the terminal. Currently exploring
AI-driven engineering and agentic workflows.

Hacker at heart. The scarce resource is judgment, not code.`
    },
    'contact.txt': {
      type: 'file',
      name: 'contact.txt',
      content: `Email:    chad@morland.io
GitHub:   github.com/cmorland
LinkedIn: linkedin.com/in/cmorland`
    },
    'skills.txt': {
      type: 'file',
      name: 'skills.txt',
      content: `INFRASTRUCTURE
  Linux (Debian/Ubuntu, RHEL/CentOS, FreeBSD, Solaris)
  Bare metal provisioning (iDRAC, IPMI, PXE/Netboot)
  Datacenter operations, hardware lifecycle management

CLOUD
  AWS (EC2, S3, RDS, ELB, Redshift, Kinesis, EMR, Lambda, EKS)
  GCP (GKE), OpenStack, Terraform

CONTAINERS & ORCHESTRATION
  Docker, Kubernetes (EKS, GKE), Helm, OpenStack

NETWORKING
  BGP (BIRD), anycast DNS, VLANs, VPN
  Firewalls (iptables, pf), IP telephony

WEB & EDGE
  Nginx, OpenResty/Lua, HAProxy, Apache
  Custom CDN — hundreds of global edge nodes

DATA
  PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
  Redshift, Snowplow, Looker

AUTOMATION & CI/CD
  Ansible, Terraform, Puppet, cfengine
  GitHub Actions, GitLab CI, Jenkins

LANGUAGES
  Python, Go, TypeScript/Node.js, PHP, Perl, Bash, Solidity

MONITORING & OBSERVABILITY
  Prometheus, Grafana, Datadog, ELK, Nagios, Sensu, Sentry

SECURITY & COMPLIANCE
  SOC2, ISO 27001, PCI-DSS, GDPR, HashiCorp Vault

DOMAIN INDUSTRY
  EPP, DNSSEC, WHOIS/RDAP, ICANN
  DNS at scale (2M+ domains)

AI/ML
  LLMs, agentic workflows, RAG, prompt engineering
  Local model serving (NVIDIA GPUs)

BLOCKCHAIN
  Mining pool architecture, Solidity
  Multi-chain integration (BTC, ETH, SOL)`
    },
    'motd.txt': {
      type: 'file',
      name: 'motd.txt',
      content: `
                      _                 _   _
  _ __ ___   ___  _ _| | __ _ _ __   __| | (_) ___
 | '_ \` _ \\ / _ \\| '_| |/ _\` | '_ \\ / _\` | | |/ _ \\
 | | | | | | (_) | | | | (_| | | | | (_| |_| | (_) |
 |_| |_| |_|\\___/|_| |_|\\__,_|_| |_|\\__,_(_)_|\\___/

 Director-level engineer who still prefers the terminal.
 Breaking and fixing things since '95.

 Type "help" to get started.`
    },
    'experience': {
      type: 'dir',
      name: 'experience',
      children: {
        'tucows.txt': {
          type: 'file',
          name: 'tucows.txt',
          content: `TUCOWS — Director of Engineering, Domains
2020–2024 | Toronto, ON (Remote)
─────────────────────────────────────────

OpenSRS + Ascio registrar platform.
24.6M domains under management. 35,000+ resellers. ~$255M annual revenue.

Partners included Shopify, Canva, Squarespace, and Wix.

Led platform modernization — migrating legacy infrastructure to OpenStack,
driving SOC2 certification, and consolidating two major registrar platforms.

Managed 3 teams (19 engineers) across platform engineering, SRE, and
domain services.

Key wins:
  • SOC2 Type II certification from zero
  • Legacy datacenter → OpenStack migration
  • Unified platform for OpenSRS + Ascio reseller operations
  • Kept 24.6M domains resolving while modernizing everything underneath`
        },
        'coinsquare.txt': {
          type: 'file',
          name: 'coinsquare.txt',
          content: `COINSQUARE — Director of Technology, Mining
2018–2019 | Toronto, ON
─────────────────────────────────────────────

Greenfield build. Built a profit-chasing mining pool from scratch.

The pool auto-switched algorithms (SHA256, Scrypt, X11, Ethash) to always
mine the most profitable coin at any given moment.

Stack:
  • Go stratum server (custom)
  • Python/FastAPI backend
  • Kubernetes on EKS + GKE
  • Multi-chain wallet integration (BTC, LTC, DOGE, ETH)

Results:
  • Mined millions in crypto assets
  • $30K average daily payouts
  • 4-person dev team, greenfield to production`
        },
        'ytz.txt': {
          type: 'file',
          name: 'ytz.txt',
          content: `YTZ INTERNATIONAL — Director of IT Operations
2009–2018 | Toronto, ON
─────────────────────────────────────────────

8.5 years building the infrastructure behind a performance ad network.
This was the "build everything from scratch" era.

Custom CDN
  Hundreds of edge nodes across 12+ providers. Self-healing, stateless.
  Detect failure → pull from pool → provision replacement → terminate →
  cleanup. Zero-impact failures. 360+ servers total.

Ad Server
  100M impressions/day. Custom stack, globally distributed.

Analytics Pipeline
  Snowplow → Kinesis → Redshift → Looker (real-time path)
  S3 → EMR/Spark → Redshift (batch path)
  500M events/day. First-party data, schema governance via Iglu.

URL Shortener
  OpenResty/Lua. 2,200 QPS sustained.

DomainManager.com
  2M+ domains. Budget anycast DNS using BIRD/BGP across 5 global POPs
  on cheap VPS providers. Rented IP space from brokers.
  "Poor man's anycast" — enterprise results on a shoestring.

AWS Cost Reduction
  60% reduction (~$20K/mo savings) through reserved instances,
  architecture optimization, and eliminating waste.`
        },
        'epic_media.txt': {
          type: 'file',
          name: 'epic_media.txt',
          content: `EPIC MEDIA GROUP — Manager, IT Operations
2006–2008 | Toronto, ON
────────────────────────────────────────

Performance ad network. Early-stage growth.

Built the ops team from 2 to 10 engineers.

Three office buildouts: San Francisco, New York City, and Markham, ON.
Datacenter expansion in Philadelphia.

Introduced config management (cfengine → Puppet) and CDN implementation.
Established operational processes that scaled with the business.`
        },
        'early_career.txt': {
          type: 'file',
          name: 'early_career.txt',
          content: `EARLY CAREER — System Administrator
1999–2006
────────────────────────────────────

InQuent Technologies / WebHosting.com (2001–2006)
  FreeBSD and Solaris. Co-built HIVE — a distributed hosting platform.
  AT&T datacenter deployments. Company valued at $342M.
  This is where I learned to build systems that don't break at 3 AM.

Date.com (2000–2001)
  Built email delivery infrastructure from scratch.
  Millions of messages per day on qmail.
  Learned that email at scale is a special kind of hell.

Dial-up ISP (late 1990s)
  Started as a teenager. BBS scene kid who talked his way into a job.
  First exposure to real networking, real servers, real users yelling
  about their connection dropping during a file download.

  This is where it all began.`
        }
      }
    },
    'projects': {
      type: 'dir',
      name: 'projects',
      children: {
        'self_healing_infra.md': {
          type: 'file',
          name: 'self_healing_infra.md',
          content: `# Self-Healing Stateless Infrastructure

Built at YTZ International for the ad network CDN.

## The Problem
360+ servers across 12+ hosting providers. Servers fail. Providers have
outages. At that scale, something is always broken.

## The Solution
Fully stateless edge nodes. No local state = no data loss on failure.

Lifecycle:
  1. Health checks detect failure
  2. Node removed from load balancer pool
  3. New node provisioned via API (provider-agnostic)
  4. Config deployed via Ansible
  5. Node added to pool, old node terminated
  6. DNS/cleanup finalized

## Result
Zero-impact failures. Nodes were cattle, not pets.
Self-healing ran 24/7 — most failures resolved before anyone noticed.`
        },
        'snowplow_analytics.md': {
          type: 'file',
          name: 'snowplow_analytics.md',
          content: `# Behavioral Analytics Pipeline — 500M Events/Day

Built at YTZ International for the ad network.

## Architecture
Two paths, one warehouse:

Real-time:  Snowplow → Kinesis → Redshift → Looker
Batch:      S3 → EMR/Spark → Redshift

## Scale
500M events/day. All first-party data.

## Key Details
  • Schema governance via Iglu schema registry
  • Event validation at ingestion — bad data rejected, not silently stored
  • Looker dashboards for business intelligence
  • Enabled real-time campaign optimization and fraud detection

## Why It Mattered
First-party behavioral data at ad-network scale. No third-party cookies,
no sampling. Every click, every impression, every conversion tracked
with full schema enforcement.`
        },
        'mining_pool.md': {
          type: 'file',
          name: 'mining_pool.md',
          content: `# Profit-Chasing Mining Pool

Built at Coinsquare (2018–2019). Greenfield project.

## Concept
Instead of mining one coin, the pool continuously evaluated profitability
across algorithms and automatically switched to mine whatever was most
profitable at any given moment.

## Algorithms
SHA256, Scrypt, X11, Ethash — covering BTC, LTC, DOGE, ETH and others.

## Stack
  • Go stratum server (custom-built for multi-algo support)
  • Python/FastAPI backend for pool management and payouts
  • Kubernetes (EKS + GKE) for orchestration
  • Multi-chain wallet integration

## Results
  • Mined millions in crypto assets
  • $30K average daily payouts
  • 4-person team, zero to production`
        },
        'anycast_dns.md': {
          type: 'file',
          name: 'anycast_dns.md',
          content: `# Budget Anycast DNS — 2M+ Domains

Built at YTZ International for DomainManager.com.

## The Problem
Enterprise anycast DNS costs a fortune. We needed global DNS for 2M+
domains on an ad-network budget.

## The Solution
"Poor man's anycast" — 5 global POPs using BIRD/BGP on cheap VPS
providers. Rented IP space from IP brokers instead of owning our own.

## How It Worked
  • BIRD for BGP routing at each POP
  • Announced rented IP prefixes from each location
  • PowerDNS as the authoritative nameserver
  • Automated deployment and zone management

## Result
Enterprise-grade anycast DNS at a fraction of the cost.
2M+ domains served reliably from 5 continents.
Total monthly spend: less than what AWS Route 53 would charge for
a tenth of those zones.`
        },
        'genai_agents.md': {
          type: 'file',
          name: 'genai_agents.md',
          content: `# Generative AI & Agentic Systems

Active focus (2024–present). Not just using AI — building with it,
writing about it, and rethinking how engineering orgs should work
because of it.

## Agent Building
  • Designing and deploying autonomous AI agents with tool use,
    persistent memory, and multi-channel integration
  • Context engineering: structuring prompts, memory systems, and
    retrieval pipelines so agents actually work reliably
  • RAG implementations with vector databases for domain-specific
    knowledge retrieval

## Broad Framework Exposure
  • LangChain / LangGraph / LangSmith ecosystem
  • Anthropic (Claude Code, tool use patterns)
  • OpenAI (Codex, Assistants API, function calling)
  • GitHub Copilot, Cursor, agentic coding workflows
  • OpenRouter for multi-provider routing and cost optimization
  • Local model serving on NVIDIA GPUs (Ollama, vLLM)
  • Multiple embedding and reranking strategies

## Cost Optimization
  • Provider arbitrage across OpenAI, Anthropic, Google, open-weight models
  • Prompt caching, context window management, token budgeting
  • Right-sizing models to tasks (not everything needs Opus 4.6)

## Thought Leadership
  • The SDLC isn't dead — it's compressing. Stages are merging,
    not disappearing. The ceremonies collapse, but the principles
    (iterate, inspect, adapt) survive.
  • When AI writes the code, the scarce resource becomes judgment:
    systems thinking, failure modes, business context.
  • Who holds the pager when the agent ships the code? Accountability
    doesn't compress. Someone still gets the 3am call.
  • Writing on AI's impact on engineering orgs, team structure,
    junior developer mentoring, and vendor lock-in risk.

The scarce resource is judgment, not code.`
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

  private buildTree(node: DirNode, prefix: string, isLast: boolean, isRoot: boolean): string {
    const lines: string[] = [];
    const name = isRoot ? '.' : node.name;
    const dirName = `\x1b[1;34m${name}\x1b[0m`;

    if (isRoot) {
      lines.push(dirName);
    } else {
      lines.push(`${prefix}${isLast ? '└── ' : '├── '}${dirName}`);
    }

    const children = Object.values(node.children);
    const childPrefix = isRoot ? '' : `${prefix}${isLast ? '    ' : '│   '}`;

    children.forEach((child, idx) => {
      const childIsLast = idx === children.length - 1;
      if (child.type === 'dir') {
        lines.push(this.buildTree(child as DirNode, childPrefix, childIsLast, false));
      } else {
        lines.push(`${childPrefix}${childIsLast ? '└── ' : '├── '}${child.name}`);
      }
    });

    return lines.join('\n');
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
  tree    - Display directory structure as a tree
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

      case 'tree': {
        const targetPath = args.length > 1 ? args[1] : '.';
        const node = this.resolvePath(targetPath);

        if (!node) return `tree: '${targetPath}': No such file or directory`;
        if (node.type === 'file') return node.name;

        return this.buildTree(node as DirNode, '', true, true);
      }

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
