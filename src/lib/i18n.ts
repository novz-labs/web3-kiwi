export type Locale = "ko" | "en";

export const translations = {
  ko: {
    terminal: {
      welcome: `Welcome to web3kiwi terminal v1.0.0
바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널

'/'를 입력하면 명령어 목록을 볼 수 있습니다.`,
      placeholder: "명령어를 입력하세요... '/'로 시작하세요",
      placeholderTyping: "출력 중... Enter 또는 Space로 스킵",
      placeholderNext: "명령어를 입력하세요... 다음 컨텐츠는",
      commandSelect: "명령어 선택",
      navigation: "↑↓ 이동 · ↵ 선택",
      commands: "[/] 명령어",
      helpBtn: "[?] 도움말",
      language: "Language:",
      notFound:
        "명령어를 찾을 수 없습니다. '/'를 입력하여 사용 가능한 명령어를 확인하세요.",
    },
    commands: {
      home: { shortcut: "0", label: "/home", description: "처음으로" },
      about: { shortcut: "1", label: "/about", description: "web3kiwi 소개" },
      services: {
        shortcut: "2",
        label: "/services",
        description: "서비스 안내",
      },
      vibe: { shortcut: "3", label: "/vibe", description: "바이브코딩이란?" },
      crypto: {
        shortcut: "4",
        label: "/crypto",
        description: "크립토 인사이트",
      },
      projects: {
        shortcut: "5",
        label: "/projects",
        description: "프로젝트 목록",
      },
      contact: { shortcut: "6", label: "/contact", description: "연락처" },
      clear: { shortcut: "9", label: "/clear", description: "화면 초기화" },
    },
    content: {
      help: {
        title: "HELP",
        content: `사용 가능한 명령어:

  /home      처음으로 돌아가기
  /about     web3kiwi 소개
  /services  서비스 안내
  /vibe      바이브코딩이란?
  /crypto    크립토 인사이트
  /projects  프로젝트 목록
  /contact   연락처
  /clear     화면 초기화

Tip: '/'를 입력하면 명령어 팔레트가 열립니다.
     ↑↓로 탐색하고 Enter로 선택하세요.`,
      },
      home: {
        title: "web3kiwi terminal v1.0.0",
        content: `Welcome back!

바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널에 오신 것을 환영합니다.

─────────────────────────────────

Quick Navigation:

  /about     우리에 대해 알아보기
  /services  제공하는 서비스 확인
  /vibe      바이브코딩 알아보기
  /contact   연락하기`,
      },
      about: {
        title: "ABOUT web3kiwi",
        content: `web3kiwi는 바이브코딩(Vibe Coding)의 실제 활용법, 밈 문화, 그리고 크립토를 현실적인 관점에서 알려주는 채널입니다.

우리는 퍼포먼스보다 실제로 무언가를 만드는 것에 집중합니다.
화려한 데모가 아닌, 진짜 작동하는 것들을 만들어갑니다.

─────────────────────────────────

Philosophy:

  "Show, don't tell. Build, don't hype."
  실제로 만들어보고, 실제로 사용해보고, 실제로 공유한다.

─────────────────────────────────

Focus Areas:

  Vibe Coding    AI와 함께하는 실용적인 개발
  Crypto         현실적인 크립토 인사이트
  Memes          웹3 문화와 밈의 힘`,
      },
      services: {
        title: "SERVICES",
        content: `[01] Vibe Coding Tutorials
     AI를 활용한 실용적인 개발 튜토리얼
     Claude, Cursor, Copilot 등을 활용한 실전 가이드

[02] Crypto Insights
     현실적인 크립토 분석과 인사이트
     FOMO 없이, 팩트 기반의 정보 제공

[03] Web3 Content
     웹3 생태계에 대한 컨텐츠 제작
     밈, 문화, 트렌드 분석

[04] Consulting
     AI/Web3 프로젝트 컨설팅
     아이디어를 현실로 만드는 과정 지원`,
      },
      vibe: {
        title: "VIBE CODING",
        content: `"바이브코딩"이란?

AI와 함께 코딩하며 아이디어를 빠르게 현실로 만드는 새로운 개발 패러다임입니다.

─────────────────────────────────

Core Principles:

  완벽보다 실행
  일단 만들고, 개선하고, 배포한다.

  AI는 도구다
  AI가 코드를 써주지만, 방향은 내가 정한다.

  빠른 피드백 루프
  만들고 → 테스트하고 → 개선하고 → 반복한다.

─────────────────────────────────

Tools We Use:

  Claude Code, Cursor, GitHub Copilot
  Vercel, Supabase, Cloudflare
  Next.js, React, TypeScript`,
      },
      crypto: {
        title: "CRYPTO INSIGHTS",
        content: `현실적인 크립토 이야기

우리는 FOMO를 조장하지 않습니다.
팩트 기반으로, 현실적으로, 솔직하게 이야기합니다.

─────────────────────────────────

What We Cover:

  온체인 데이터 분석
  실제 데이터로 보는 시장 흐름

  프로젝트 리서치
  기술적 관점에서 바라보는 프로젝트 분석

  밈코인과 문화
  밈의 힘과 커뮤니티 다이나믹스

  실전 경험 공유
  성공도, 실패도 솔직하게 공유

─────────────────────────────────

Disclaimer:
  NFA (Not Financial Advice)
  DYOR (Do Your Own Research)`,
      },
      projects: {
        title: "PROJECTS",
        content: `바이브코딩으로 만든 프로젝트들

─────────────────────────────────

[01] This Website
     이 터미널 스타일 포트폴리오 자체도
     바이브코딩으로 제작되었습니다.

     Tech: Next.js, TypeScript, Tailwind

[02] Coming Soon...
     더 많은 프로젝트가 준비 중입니다.
     Stay tuned!

─────────────────────────────────

모든 프로젝트는 AI와 함께 제작되었으며,
실제로 작동하고 사용 가능한 것들입니다.`,
      },
      contact: {
        title: "CONTACT",
        content: `Let's connect!

  Twitter/X     https://x.com/b_cryptojake
  YouTube       https://www.youtube.com/@web3kiwi
  Instagram     https://www.instagram.com/web3kiwi/
  Telegram      t.me/b_cryptojake

─────────────────────────────────

비즈니스 문의:

  비즈니스 관련 문의는 이메일로 보내주세요.
  mailto:web3boy.official@gmail.com

응답 시간: 보통 24-48시간 이내`,
      },
    },
  },
  en: {
    terminal: {
      welcome: `Welcome to web3kiwi terminal v1.0.0
Practical vibe coding, memes, and realistic crypto insights.

Type '/' to see available commands.`,
      placeholder: "Type a command... start with '/'",
      placeholderTyping: "Printing... Press Enter or Space to skip",
      placeholderNext: "Type a command... next content is",
      commandSelect: "Select Command",
      navigation: "↑↓ Navigate · ↵ Select",
      commands: "[/] Commands",
      helpBtn: "[?] Help",
      language: "Language:",
      notFound: "Command not found. Type '/' to see available commands.",
    },
    commands: {
      home: { shortcut: "0", label: "/home", description: "Home" },
      about: { shortcut: "1", label: "/about", description: "About web3kiwi" },
      services: {
        shortcut: "2",
        label: "/services",
        description: "Our Services",
      },
      vibe: {
        shortcut: "3",
        label: "/vibe",
        description: "What is Vibe Coding?",
      },
      crypto: {
        shortcut: "4",
        label: "/crypto",
        description: "Crypto Insights",
      },
      projects: { shortcut: "5", label: "/projects", description: "Projects" },
      contact: { shortcut: "6", label: "/contact", description: "Contact" },
      clear: { shortcut: "9", label: "/clear", description: "Clear Screen" },
    },
    content: {
      help: {
        title: "HELP",
        content: `Available commands:

  /home      Go back to home
  /about     About web3kiwi
  /services  Our services
  /vibe      What is vibe coding?
  /crypto    Crypto insights
  /projects  Project list
  /contact   Contact info
  /clear     Clear the terminal

Tip: Type '/' to open command palette.
     Use ↑↓ to navigate, Enter to select.`,
      },
      home: {
        title: "web3kiwi terminal v1.0.0",
        content: `Welcome back!

A channel that shares practical vibe coding tutorials, memes, and realistic crypto insights.

─────────────────────────────────

Quick Navigation:

  /about     Learn about us
  /services  See what we offer
  /vibe      Discover vibe coding
  /contact   Get in touch`,
      },
      about: {
        title: "ABOUT web3kiwi",
        content: `web3kiwi is a channel that shares practical vibe coding techniques, meme culture, and realistic crypto insights.

We focus on actually building things rather than performance.
Not flashy demos, but things that actually work.

─────────────────────────────────

Philosophy:

  "Show, don't tell. Build, don't hype."
  Actually build it, actually use it, actually share it.

─────────────────────────────────

Focus Areas:

  Vibe Coding    Practical development with AI
  Crypto         Realistic crypto insights
  Memes          The power of web3 culture and memes`,
      },
      services: {
        title: "SERVICES",
        content: `[01] Vibe Coding Tutorials
     Practical development tutorials with AI
     Real-world guides using Claude, Cursor, Copilot

[02] Crypto Insights
     Realistic crypto analysis and insights
     Fact-based information without FOMO

[03] Web3 Content
     Content creation about web3 ecosystem
     Memes, culture, and trend analysis

[04] Consulting
     AI/Web3 project consulting
     Support for turning ideas into reality`,
      },
      vibe: {
        title: "VIBE CODING",
        content: `What is "Vibe Coding"?

A new development paradigm where you code with AI to quickly turn ideas into reality.

─────────────────────────────────

Core Principles:

  Execution over Perfection
  Build it, improve it, ship it.

  AI is a Tool
  AI writes the code, but I set the direction.

  Fast Feedback Loop
  Build → Test → Improve → Repeat.

─────────────────────────────────

Tools We Use:

  Claude Code, Cursor, GitHub Copilot
  Vercel, Supabase, Cloudflare
  Next.js, React, TypeScript`,
      },
      crypto: {
        title: "CRYPTO INSIGHTS",
        content: `Realistic Crypto Stories

We don't promote FOMO.
We talk facts, realistically, and honestly.

─────────────────────────────────

What We Cover:

  On-chain Data Analysis
  Market trends through real data

  Project Research
  Technical analysis of projects

  Memecoins and Culture
  The power of memes and community dynamics

  Sharing Real Experience
  Sharing both successes and failures honestly

─────────────────────────────────

Disclaimer:
  NFA (Not Financial Advice)
  DYOR (Do Your Own Research)`,
      },
      projects: {
        title: "PROJECTS",
        content: `Projects Built with Vibe Coding

─────────────────────────────────

[01] This Website
     This terminal-style portfolio itself
     was built with vibe coding.

     Tech: Next.js, TypeScript, Tailwind

[02] Coming Soon...
     More projects are on the way.
     Stay tuned!

─────────────────────────────────

All projects are built with AI
and are actually working and usable.`,
      },
      contact: {
        title: "CONTACT",
        content: `Let's connect!

  Twitter/X     https://x.com/b_cryptojake
  YouTube       https://www.youtube.com/@web3kiwi
  Instagram     https://www.instagram.com/web3kiwi/
  Telegram      t.me/b_cryptojake

─────────────────────────────────

For business inquiries:

  Please contact via email.
  mailto:web3boy.official@gmail.com

Response time: Usually within 24-48 hours`,
      },
    },
  },
};

export function getTranslation(locale: Locale) {
  return translations[locale];
}
