"use client";

import { type Locale, getTranslation } from "@/lib/i18n";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useStickToBottom } from "use-stick-to-bottom";

type OutputLine = {
  type: "command" | "response" | "ascii" | "error" | "section";
  content: string;
  title?: string;
};

const ASCII_LOGO = `██╗    ██╗███████╗██████╗ ██████╗ ██╗  ██╗██╗██╗    ██╗██╗
██║    ██║██╔════╝██╔══██╗╚════██╗██║ ██╔╝██║██║    ██║██║
██║ █╗ ██║█████╗  ██████╔╝ █████╔╝█████╔╝ ██║██║ █╗ ██║██║
██║███╗██║██╔══╝  ██╔══██╗ ╚═══██╗██╔═██╗ ██║██║███╗██║██║
╚███╔███╔╝███████╗██████╔╝██████╔╝██║  ██╗██║╚███╔███╔╝██║
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚══╝╚══╝ ╚═╝`;

const TYPING_SPEED = 8;

function Linkify({ text }: { text: string }) {
  const urlRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+|mailto:[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          let href = part;
          let label = part;
          if (part.startsWith("t.me")) href = `https://${part}`;
          if (part.startsWith("mailto:")) label = part.replace("mailto:", "");

          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ABC44E] hover:underline underline-offset-4 font-bold"
            >
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function SectionBox({
  title,
  content,
  isTyping,
  typingContent,
}: {
  title: string;
  content: string;
  isTyping?: boolean;
  typingContent?: string;
}) {
  const displayContent = isTyping ? typingContent : content;

  return (
    <div className="my-2 border border-[#333] rounded overflow-hidden">
      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#333]">
        <span className="text-[#ABC44E] font-semibold">{title}</span>
      </div>
      <div className="p-4 whitespace-pre-wrap leading-relaxed">
        <Linkify text={displayContent || ""} />
        {isTyping && <span className="text-[#ABC44E] cursor-blink">▌</span>}
      </div>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [mem, setMem] = useState(42);
  const [cpu, setCpu] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [typingTitle, setTypingTitle] = useState("");
  const [typingType, setTypingType] = useState<
    "response" | "ascii" | "error" | "section"
  >("response");

  const inputRef = useRef<HTMLInputElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollRef, contentRef } = useStickToBottom();

  const t = getTranslation(locale);

  const COMMAND_LIST = [
    { key: "home", ...t.commands.home },
    { key: "about", ...t.commands.about },
    { key: "services", ...t.commands.services },
    { key: "vibe", ...t.commands.vibe },
    { key: "crypto", ...t.commands.crypto },
    { key: "projects", ...t.commands.projects },
    { key: "contact", ...t.commands.contact },
    { key: "clear", ...t.commands.clear },
  ];

  // Initial boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      setIsTyping(true);
      setOutput([{ type: "ascii", content: ASCII_LOGO }]);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTypingType("response");
      setFullContent(t.terminal.welcome);
      setTypingContent("");
    };

    bootSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update welcome message when locale changes
  useEffect(() => {
    if (!isTyping && output.length > 0) {
      // Find and update the welcome message
      const hasWelcome = output.some(
        (line) =>
          line.type === "response" && line.content.includes("terminal v1.0.0"),
      );
      if (hasWelcome) {
        setOutput((prev) =>
          prev.map((line) =>
            line.type === "response" && line.content.includes("terminal v1.0.0")
              ? { ...line, content: t.terminal.welcome }
              : line,
          ),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // Typing effect
  useEffect(() => {
    if (fullContent && typingContent.length < fullContent.length) {
      typingRef.current = setTimeout(() => {
        setTypingContent(fullContent.slice(0, typingContent.length + 1));
      }, TYPING_SPEED);

      return () => {
        if (typingRef.current) clearTimeout(typingRef.current);
      };
    } else if (fullContent && typingContent.length === fullContent.length) {
      if (typingType === "section") {
        setOutput((prev) => [
          ...prev,
          { type: "section", content: fullContent, title: typingTitle },
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          { type: typingType, content: fullContent },
        ]);
      }
      setTypingContent("");
      setFullContent("");
      setTypingTitle("");
      setIsTyping(false);
    }
  }, [typingContent, fullContent, typingType, typingTitle]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setMem(Math.floor(Math.random() * 20) + 40);
      setCpu(Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show command palette when input starts with /
  useEffect(() => {
    if (input.startsWith("/")) {
      setShowCommandPalette(true);
      const searchTerm = input.slice(1).toLowerCase();
      if (searchTerm) {
        const matchIndex = COMMAND_LIST.findIndex(
          (cmd) =>
            cmd.key.toLowerCase().startsWith(searchTerm) ||
            cmd.description.toLowerCase().includes(searchTerm),
        );
        if (matchIndex !== -1) {
          setSelectedCommandIndex(matchIndex);
        }
      }
    } else {
      setShowCommandPalette(false);
      setSelectedCommandIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const typeResponse = (
    content: string,
    type: "response" | "ascii" | "error" | "section" = "response",
    title?: string,
  ) => {
    setIsTyping(true);
    setTypingType(type);
    setFullContent(content);
    setTypingContent("");
    if (title) setTypingTitle(title);
  };

  const handleCommand = (cmd: string) => {
    if (isTyping) return;

    let trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd.startsWith("/")) {
      trimmedCmd = trimmedCmd.slice(1);
    }
    if (!trimmedCmd) return;

    setOutput((prev) => [
      ...prev,
      { type: "command", content: `> /${trimmedCmd}` },
    ]);

    if (trimmedCmd === "clear") {
      setOutput([{ type: "ascii", content: ASCII_LOGO }]);
      typeResponse(t.terminal.welcome);
    } else if (t.content[trimmedCmd as keyof typeof t.content]) {
      const { title, content } =
        t.content[trimmedCmd as keyof typeof t.content];
      typeResponse(content, "section", title);
    } else {
      typeResponse(
        `${t.terminal.notFound.replace("${cmd}", trimmedCmd)}`,
        "error",
      );
    }

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");
    setShowCommandPalette(false);
  };

  const selectCommand = (index: number) => {
    const cmd = COMMAND_LIST[index];
    handleCommand(cmd.key);
  };

  const skipTyping = () => {
    if (typingRef.current) clearTimeout(typingRef.current);
    if (typingType === "section") {
      setOutput((prev) => [
        ...prev,
        { type: "section", content: fullContent, title: typingTitle },
      ]);
    } else {
      setOutput((prev) => [
        ...prev,
        { type: typingType, content: fullContent },
      ]);
    }
    setTypingContent("");
    setFullContent("");
    setTypingTitle("");
    setIsTyping(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isTyping) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skipTyping();
      }
      return;
    }

    if (showCommandPalette) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev > 0 ? prev - 1 : COMMAND_LIST.length - 1,
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev < COMMAND_LIST.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectCommand(selectedCommandIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
        setInput("");
      } else if (e.key >= "0" && e.key <= "9") {
        const cmd = COMMAND_LIST.find((c) => c.shortcut === e.key);
        if (cmd) {
          e.preventDefault();
          handleCommand(cmd.key);
        }
      }
    } else {
      if (e.key === "Enter") {
        handleCommand(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setInput("");
          } else {
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }
        }
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ko" ? "en" : "ko"));
  };

  const selectedCommand = COMMAND_LIST[selectedCommandIndex];

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono flex flex-col relative"
      onClick={handleContainerClick}
    >
      {/* Header */}
      <header className="border-b border-[#333] px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#ABC44E] font-semibold">web3kiwi</span>
          <span className="text-[#666]">—</span>
          <span className="text-[#666]">terminal-v1.0.0</span>
        </div>
        <div className="flex items-center gap-4 text-[#666]">
          <span>MEM: {mem}MB</span>
          <span>CPU: {cpu}%</span>
          <span className="text-[#ABC44E]">●</span>
        </div>
      </header>

      {/* Terminal Output */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 pb-0">
        <div ref={contentRef}>
          {output.map((line, index) => {
            if (line.type === "section") {
              return (
                <SectionBox
                  key={index}
                  title={line.title || ""}
                  content={line.content}
                />
              );
            }

            return (
              <div
                key={index}
                className={`whitespace-pre-wrap mb-1 ${
                  line.type === "ascii"
                    ? "text-[#ABC44E] ascii-art"
                    : line.type === "command"
                      ? "text-[#ABC44E]"
                      : line.type === "error"
                        ? "text-red-400"
                        : "text-[#e0e0e0]"
                }`}
              >
                {line.type === "ascii" ? (
                  line.content
                ) : (
                  <Linkify text={line.content} />
                )}
              </div>
            );
          })}

          {/* Currently typing content */}
          {isTyping &&
            typingContent &&
            (typingType === "section" ? (
              <SectionBox
                title={typingTitle}
                content={fullContent}
                isTyping={true}
                typingContent={typingContent}
              />
            ) : (
              <div
                className={`whitespace-pre-wrap mb-1 ${
                  typingType === "ascii"
                    ? "text-[#ABC44E] ascii-art"
                    : typingType === "error"
                      ? "text-red-400"
                      : "text-[#e0e0e0]"
                }`}
              >
                {typingType === "ascii" ? (
                  typingContent
                ) : (
                  <Linkify text={typingContent} />
                )}
                <span className="text-[#ABC44E] cursor-blink">▌</span>
              </div>
            ))}
        </div>
      </main>

      {/* Command Palette */}
      {showCommandPalette && (
        <div className="absolute bottom-24 right-4 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl w-72 overflow-hidden z-10">
          <div className="px-3 py-2 border-b border-[#333] flex justify-between items-center text-xs text-[#666]">
            <span>{t.terminal.commandSelect}</span>
            <span>{t.terminal.navigation}</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {COMMAND_LIST.map((cmd, index) => (
              <div
                key={cmd.key}
                onClick={() => selectCommand(index)}
                className={`px-3 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                  index === selectedCommandIndex
                    ? "bg-[#ABC44E] text-[#0a0a0a]"
                    : "hover:bg-[#252525]"
                }`}
              >
                <span
                  className={`text-xs ${index === selectedCommandIndex ? "text-[#0a0a0a]" : "text-[#666]"}`}
                >
                  [{cmd.shortcut}]
                </span>
                <span
                  className={`font-medium ${index === selectedCommandIndex ? "text-[#0a0a0a]" : "text-[#ABC44E]"}`}
                >
                  {cmd.label}
                </span>
                <span
                  className={`text-sm ${index === selectedCommandIndex ? "text-[#1a1a1a]" : "text-[#888]"}`}
                >
                  {cmd.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer / Input */}
      <footer className="border-t border-[#333] p-4">
        <div className="flex items-center gap-2">
          <span className="text-[#ABC44E]">{isTyping ? "..." : ">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="flex-1 bg-transparent text-[#e0e0e0] outline-none placeholder-[#666] disabled:opacity-50"
            placeholder={
              isTyping
                ? t.terminal.placeholderTyping
                : showCommandPalette
                  ? `${t.terminal.placeholderNext} [${selectedCommand.shortcut}] ${selectedCommand.label} ${selectedCommand.description}`
                  : t.terminal.placeholder
            }
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={() => {
              if (isTyping) {
                skipTyping();
              } else if (showCommandPalette) {
                selectCommand(selectedCommandIndex);
              } else {
                handleCommand(input);
              }
            }}
            className="text-[#ABC44E] hover:bg-[#ABC44E] hover:text-[#0a0a0a] px-2 py-1 rounded transition-colors"
          >
            ↵
          </button>
        </div>
        <div className="mt-2 text-xs text-[#666] flex justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => !isTyping && setInput("/")}
              disabled={isTyping}
              className="hover:text-[#ABC44E] transition-colors disabled:opacity-50"
            >
              {t.terminal.commands}
            </button>
            <button
              onClick={() => !isTyping && handleCommand("help")}
              disabled={isTyping}
              className="hover:text-[#ABC44E] transition-colors disabled:opacity-50"
            >
              {t.terminal.helpBtn}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>{t.terminal.language}</span>
            <button
              onClick={toggleLocale}
              className={`transition-colors ${locale === "ko" ? "text-[#e0e0e0]" : "text-[#666] hover:text-[#ABC44E]"}`}
            >
              한국어
            </button>
            <span>|</span>
            <button
              onClick={toggleLocale}
              className={`transition-colors ${locale === "en" ? "text-[#e0e0e0]" : "text-[#666] hover:text-[#ABC44E]"}`}
            >
              EN
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
