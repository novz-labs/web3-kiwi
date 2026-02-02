import type { CommandHandler } from "./types";
import { type Locale, getTranslation } from "./i18n";

const ASCII_LOGO = `██╗    ██╗███████╗██████╗ ██████╗ ██╗  ██╗██╗██╗    ██╗██╗
██║    ██║██╔════╝██╔══██╗╚════██╗██║ ██╔╝██║██║    ██║██║
██║ █╗ ██║█████╗  ██████╔╝ █████╔╝█████╔╝ ██║██║ █╗ ██║██║
██║███╗██║██╔══╝  ██╔══██╗ ╚═══██╗██╔═██╗ ██║██║███╗██║██║
╚███╔███╔╝███████╗██████╔╝██████╔╝██║  ██╗██║╚███╔███╔╝██║
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚══╝╚══╝ ╚═╝`;

export interface TerminalContext {
  addLine: (content: string, type?: "input" | "output" | "error" | "success") => void;
  clearLines: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export function createCommands(context: TerminalContext): Record<string, CommandHandler> {
  const { addLine, clearLines, locale, setLocale } = context;
  const t = getTranslation(locale);

  const outputSection = (title: string, content: string) => {
    addLine(`┌─ ${title} ─────────────────────────────────`, "success");
    content.split("\n").forEach((line) => {
      addLine(`│ ${line}`);
    });
    addLine("└────────────────────────────────────────────", "success");
  };

  return {
    home: {
      name: "home",
      description: t.commands.home.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.home;
        outputSection(title, content);
      },
    },
    about: {
      name: "about",
      description: t.commands.about.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.about;
        outputSection(title, content);
      },
    },
    services: {
      name: "services",
      description: t.commands.services.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.services;
        outputSection(title, content);
      },
    },
    vibe: {
      name: "vibe",
      description: t.commands.vibe.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.vibe;
        outputSection(title, content);
      },
    },
    crypto: {
      name: "crypto",
      description: t.commands.crypto.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.crypto;
        outputSection(title, content);
      },
    },
    projects: {
      name: "projects",
      description: t.commands.projects.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.projects;
        outputSection(title, content);
      },
    },
    contact: {
      name: "contact",
      description: t.commands.contact.description,
      category: "custom",
      handler: () => {
        const { title, content } = t.content.contact;
        outputSection(title, content);
      },
    },
    logo: {
      name: "logo",
      description: "Display web3kiwi ASCII logo",
      category: "custom",
      handler: () => {
        ASCII_LOGO.split("\n").forEach((line) => {
          addLine(line, "success");
        });
      },
    },
    lang: {
      name: "lang",
      description: "Switch language (ko/en)",
      category: "system",
      handler: (args) => {
        const newLocale = args[0] as Locale;
        if (newLocale === "ko" || newLocale === "en") {
          setLocale(newLocale);
          addLine(`Language changed to: ${newLocale === "ko" ? "한국어" : "English"}`, "success");
        } else {
          addLine(`Usage: lang [ko|en]`, "error");
          addLine(`Current language: ${locale === "ko" ? "한국어" : "English"}`);
        }
      },
    },
    welcome: {
      name: "welcome",
      description: "Show welcome message",
      category: "system",
      handler: () => {
        ASCII_LOGO.split("\n").forEach((line) => {
          addLine(line, "success");
        });
        addLine("");
        t.terminal.welcome.split("\n").forEach((line) => {
          addLine(line);
        });
      },
    },
  };
}

export { ASCII_LOGO };
