"use client";

import { Terminal, type OpenTUIContext } from "@/components/ui/terminal";
import { type Locale, getTranslation } from "@/lib/i18n";
import { ASCII_LOGO } from "@/lib/terminal-commands";
import type { CommandHandler } from "@/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [mem, setMem] = useState(42);
  const [cpu, setCpu] = useState(1);
  const localeRef = useRef(locale);

  // Keep ref in sync with state
  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const t = getTranslation(locale);

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setMem(Math.floor(Math.random() * 20) + 40);
      setCpu(Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const welcomeMessage = useMemo(() => {
    const messages = [
      ...ASCII_LOGO.split("\n"),
      "",
      ...t.terminal.welcome.split("\n"),
      "",
      'Type "commands" to see web3kiwi commands, or "help" for built-in commands.',
    ];
    return messages;
  }, [t.terminal.welcome]);

  const outputSection = (
    addLine: (content: string, type?: "input" | "output" | "error" | "success") => void,
    title: string,
    content: string
  ) => {
    addLine(`┌─ ${title} ─────────────────────────────────`, "success");
    content.split("\n").forEach((line) => {
      addLine(`│ ${line}`);
    });
    addLine("└────────────────────────────────────────────", "success");
  };

  const commands = useMemo<Record<string, CommandHandler>>(() => {
    const currentT = getTranslation(localeRef.current);

    return {
      home: {
        name: "home",
        description: currentT.commands.home.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.home.title, t.content.home.content);
        },
      },
      about: {
        name: "about",
        description: currentT.commands.about.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.about.title, t.content.about.content);
        },
      },
      services: {
        name: "services",
        description: currentT.commands.services.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.services.title, t.content.services.content);
        },
      },
      vibe: {
        name: "vibe",
        description: currentT.commands.vibe.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.vibe.title, t.content.vibe.content);
        },
      },
      crypto: {
        name: "crypto",
        description: currentT.commands.crypto.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.crypto.title, t.content.crypto.content);
        },
      },
      projects: {
        name: "projects",
        description: currentT.commands.projects.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.projects.title, t.content.projects.content);
        },
      },
      contact: {
        name: "contact",
        description: currentT.commands.contact.description,
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          outputSection(context.addLine, t.content.contact.title, t.content.contact.content);
        },
      },
      logo: {
        name: "logo",
        description: "Display web3kiwi ASCII logo",
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          ASCII_LOGO.split("\n").forEach((line) => {
            context.addLine(line, "success");
          });
        },
      },
      lang: {
        name: "lang",
        description: "Switch language (ko/en)",
        category: "system",
        handler: (args, context: OpenTUIContext) => {
          const newLocale = args[0] as Locale;
          if (newLocale === "ko" || newLocale === "en") {
            setLocale(newLocale);
            context.addLine(
              `Language changed to: ${newLocale === "ko" ? "한국어" : "English"}`,
              "success"
            );
          } else {
            context.addLine(`Usage: lang [ko|en]`, "error");
            context.addLine(
              `Current language: ${localeRef.current === "ko" ? "한국어" : "English"}`
            );
          }
        },
      },
      welcome: {
        name: "welcome",
        description: "Show welcome message",
        category: "system",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          ASCII_LOGO.split("\n").forEach((line) => {
            context.addLine(line, "success");
          });
          context.addLine("");
          t.terminal.welcome.split("\n").forEach((line) => {
            context.addLine(line);
          });
        },
      },
      commands: {
        name: "commands",
        description: "Show web3kiwi commands",
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          context.addLine("Available web3kiwi commands:", "success");
          context.addLine(`  home      - ${t.commands.home.description}`);
          context.addLine(`  about     - ${t.commands.about.description}`);
          context.addLine(`  services  - ${t.commands.services.description}`);
          context.addLine(`  vibe      - ${t.commands.vibe.description}`);
          context.addLine(`  crypto    - ${t.commands.crypto.description}`);
          context.addLine(`  projects  - ${t.commands.projects.description}`);
          context.addLine(`  contact   - ${t.commands.contact.description}`);
          context.addLine(`  lang      - Switch language (ko/en)`);
          context.addLine(`  logo      - Display ASCII logo`);
          context.addLine(`  welcome   - Show welcome message`);
          context.addLine("");
          context.addLine('Type "help" for OpenTUI built-in commands.');
        },
      },
      cmds: {
        name: "cmds",
        description: "Alias for commands",
        category: "custom",
        handler: (_args, context: OpenTUIContext) => {
          const t = getTranslation(localeRef.current);
          context.addLine("Available web3kiwi commands:", "success");
          context.addLine(`  home      - ${t.commands.home.description}`);
          context.addLine(`  about     - ${t.commands.about.description}`);
          context.addLine(`  services  - ${t.commands.services.description}`);
          context.addLine(`  vibe      - ${t.commands.vibe.description}`);
          context.addLine(`  crypto    - ${t.commands.crypto.description}`);
          context.addLine(`  projects  - ${t.commands.projects.description}`);
          context.addLine(`  contact   - ${t.commands.contact.description}`);
          context.addLine(`  lang      - Switch language (ko/en)`);
          context.addLine(`  logo      - Display ASCII logo`);
          context.addLine(`  welcome   - Show welcome message`);
          context.addLine("");
          context.addLine('Type "help" for OpenTUI built-in commands.');
        },
      },
    };
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ko" ? "en" : "ko"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <span className="text-primary font-semibold">web3kiwi</span>
          <span className="text-muted">—</span>
          <span className="text-muted">terminal-v1.0.0</span>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <span>MEM: {mem}MB</span>
          <span>CPU: {cpu}%</span>
          <span className="text-primary">●</span>
        </div>
      </header>

      {/* Terminal */}
      <main className="flex-1 overflow-hidden p-4">
        <Terminal
          prompt=">"
          welcomeMessage={welcomeMessage}
          commands={commands}
          variant="minimal"
          className="h-full"
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4">
        <div className="text-xs text-muted flex justify-between">
          <div className="flex gap-4">
            <span>{t.terminal.commands}</span>
            <span>Type &quot;commands&quot; for web3kiwi commands</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{t.terminal.language}</span>
            <button
              onClick={toggleLocale}
              className={`transition-colors ${locale === "ko" ? "text-foreground" : "text-muted hover:text-primary"}`}
            >
              한국어
            </button>
            <span>|</span>
            <button
              onClick={toggleLocale}
              className={`transition-colors ${locale === "en" ? "text-foreground" : "text-muted hover:text-primary"}`}
            >
              EN
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
