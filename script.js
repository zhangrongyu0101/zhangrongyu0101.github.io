const banner = String.raw`
 ____   ___  _   _  ____ _   _ _   _
|  _ \ / _ \| \ | |/ ___| | | | | | |
| |_) | | | |  \| | |  _| | | | | | |
|  _ <| |_| | |\  | |_| | |_| | |_| |
|_| \_\___/|_| \_|\____|\___/ \___/
`.trim().split("\n");

const posts = [
  {
    slug: "vaguebench",
    date: "November 2026",
    title: "Don't Guess, Ask Wisely",
    href: "blog/vaguebench.html",
    blurb: "VagueBench, DialogGRPO, and why underspecified requests should get a question first."
  },
  {
    slug: "leaderboard",
    date: "November 2026",
    title: "Reading the VagueBench leaderboard",
    href: "blog/leaderboard.html",
    blurb: "Ask%, coverage F1, and IAR across intent-vague, fully-vague, and complete queries."
  }
];

const commands = ["help", "about", "blog", "news", "research", "publication", "experience", "projects", "contact", "banner", "clear"];

const lines = {
  banner() {
    return [
      ...banner.map(row => `<pre>${escapeHtml(row)}</pre>`),
      "",
      "Hi, this is Rongyu Zhang (张荣宇).",
      "I work on proactive elicitation: when a request is underspecified, a model should ask a useful question before it answers.",
      "The current project is <span class='command'>VagueBench</span> and <span class='command'>DialogGRPO</span>, an EMNLP 2026 oral paper.",
      "------------------",
      "Type <span class='command'>help</span> for commands.",
      "Type <span class='command'>blog</span> for the writing.",
      ""
    ];
  },
  help() {
    const rows = [
      ["help", "List commands."],
      ["about", "A short bio and education-facing affiliations."],
      ["blog", "Open the blog index."],
      ["news", "Recent public updates."],
      ["research", "What VagueBench and DialogGRPO study."],
      ["publication", "The EMNLP 2026 paper."],
      ["experience", "Affiliations listed on the paper."],
      ["projects", "Project page, code, and data."],
      ["contact", "Public links."],
      ["banner", "Show the welcome banner again."],
      ["clear", "Clear the terminal."]
    ];
    return [
      "",
      ...rows.map(([name, text]) => `  <span class="command">${name}</span>${"&nbsp;".repeat(Math.max(1, 14 - name.length))}${text}`),
      "",
      "Press <span class='keys'>Tab</span> to complete, <span class='keys'>Esc</span> to clear the line, and <span class='keys'>↑</span><span class='keys'>↓</span> for history.",
      ""
    ];
  },
  about() {
    return [
      "",
      "I am Rongyu Zhang, written 张荣宇.",
      "My GitHub profile lists Zhejiang University, in Hangzhou.",
      "On Don't Guess, Ask Wisely, the affiliations are Zhejiang University, Ant Group, and City University of Hong Kong.",
      "The paper studies when a language model should ask, and what it should ask, before committing to an answer.",
      "Type <span class='command'>research</span> for the method, or <span class='command'>blog</span> for two short notes.",
      ""
    ];
  },
  blog() {
    return [
      "",
      "Blog",
      "",
      ...posts.map((post, index) => `${String(index + 1).padStart(2, "0")}  <a href="${post.href}">${escapeHtml(post.title)}</a><br>&nbsp;&nbsp;&nbsp;&nbsp;${escapeHtml(post.date)} · ${escapeHtml(post.blurb)}`),
      "",
      "Or open the <a href='blog/'>blog index</a>.",
      ""
    ];
  },
  news() {
    return [
      "",
      "[November 2026] The project page and leaderboard are live: <a href='https://zhangrongyu0101.github.io/VagueBench/' target='_blank' rel='noopener'>VagueBench</a>.",
      "[November 2026] Don't Guess, Ask Wisely is an EMNLP 2026 oral paper.",
      "[November 2026] The dataset is on <a href='https://huggingface.co/datasets/rongyu0101/VagueBench' target='_blank' rel='noopener'>Hugging Face</a>.",
      ""
    ];
  },
  research() {
    return [
      "",
      "Vague queries hide intent, details, or both. Baseline models in the paper ask on fewer than 11% of underspecified queries.",
      "",
      "VagueBench makes that gap measurable. Real open-domain seeds are annotated with intent and detail units, then degraded into intent-vague and fully-vague variants. A simulated user reveals a hidden unit only when the question matches it.",
      "",
      "DialogGRPO trains the asking policy offline. Multi-turn elicitation is a dialogue-state graph. Each turn gets a dense reward from immediate information gain and lookahead value, without a user simulator during parameter updates.",
      "",
      "On Qwen3.5-27B, DialogGRPO asks on 88.4% of intent-vague queries and 91.2% of fully-vague queries, and it does not turn complete queries into an interrogation.",
      ""
    ];
  },
  publication() {
    return [
      "",
      "<a href='https://zhangrongyu0101.github.io/VagueBench/paper.pdf' target='_blank' rel='noopener'><strong>Don't Guess, Ask Wisely: Benchmarking and Training Proactive Elicitation in Open-Domain LLM Conversations</strong></a>",
      "Rongyu Zhang*, Mutian Bao*, Jinjian Zhang*, Yuetian Du, He Xu, Wei Zhou, Xiaojun Zhu, Ming Kong, Jie Liu, Linjian Mo, Qiang Zhu",
      "EMNLP 2026 Oral · * equal contribution",
      "Zhejiang University · Ant Group · City University of Hong Kong",
      "",
      "<a href='https://zhangrongyu0101.github.io/VagueBench/' target='_blank' rel='noopener'>Project page</a> · <a href='https://github.com/zhangrongyu0101/VagueBench' target='_blank' rel='noopener'>Code</a> · <a href='https://huggingface.co/datasets/rongyu0101/VagueBench' target='_blank' rel='noopener'>Data</a>",
      ""
    ];
  },
  experience() {
    return [
      "",
      "These are the affiliations printed on the paper, not a full CV.",
      "",
      "Zhejiang University",
      "Ant Group",
      "City University of Hong Kong",
      "",
      "GitHub also lists Zhejiang University, Hangzhou.",
      ""
    ];
  },
  projects() {
    return [
      "",
      "<a href='https://zhangrongyu0101.github.io/VagueBench/' target='_blank' rel='noopener'>VagueBench</a>      project page and leaderboard",
      "<a href='https://github.com/zhangrongyu0101/VagueBench' target='_blank' rel='noopener'>Code</a>           evaluation repository",
      "<a href='https://huggingface.co/datasets/rongyu0101/VagueBench' target='_blank' rel='noopener'>Dataset</a>        Hugging Face",
      ""
    ];
  },
  contact() {
    return [
      "",
      `GitHub     <a href="https://github.com/zhangrongyu0101" target="_blank" rel="noopener">zhangrongyu0101</a>`,
      `Page       <a href="https://zhangrongyu0101.github.io/VagueBench/" target="_blank" rel="noopener">VagueBench project page</a>`,
      `Scholarly  the paper PDF is linked from <span class="command">publication</span>`,
      ""
    ];
  }
};

const terminal = document.querySelector("#terminal");
const input = document.querySelector("#user-input");
const history = [];
let historyIndex = 0;
let draft = "";

function escapeHtml(value) {
  return value.replace(/[&<>]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character]));
}

function write(parts) {
  const block = document.createElement("div");
  parts.forEach(part => {
    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = part === "" ? "&nbsp;" : part;
    block.append(line);
  });
  terminal.append(block);
  document.querySelector("#main").scrollTop = document.querySelector("#main").scrollHeight;
}

function run(raw) {
  const command = raw.trim().toLowerCase();
  const echo = document.createElement("div");
  echo.className = "line";
  echo.innerHTML = `<span class="prompt"><span class="user">visitor</span>@<span class="host">rongyu</span>:$ ~ </span>${escapeHtml(raw)}`;
  terminal.append(echo);
  if (command === "clear") {
    terminal.replaceChildren();
    return;
  }
  if (lines[command]) write(lines[command]());
  else write(["", "Command not found.", "Type <span class='command'>help</span> to get started.", ""]);
}

input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    const value = input.value;
    history.push(value);
    historyIndex = history.length;
    draft = "";
    run(value);
    input.value = "";
  } else if (event.key === "Escape") {
    input.value = "";
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    if (historyIndex === history.length) draft = input.value;
    if (historyIndex > 0) {
      historyIndex -= 1;
      input.value = history[historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex < history.length) {
      historyIndex += 1;
      input.value = historyIndex === history.length ? draft : history[historyIndex];
    }
  } else if (event.key === "Tab") {
    event.preventDefault();
    const match = commands.find(command => command.startsWith(input.value.trim().toLowerCase()));
    if (match) input.value = match;
  }
});

document.querySelector("#main").addEventListener("click", event => {
  if (event.target.closest("a")) return;
  input.focus();
});

write(lines.banner());
input.focus();
