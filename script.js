const bannerRows = [
  ["█████▌", "Rongyu Zhang"],
  ["██▀▀▀█", "Zhejiang University · Hangzhou"],
  ["█ ██▌ ", "type <span class=\"command\">help</span> · type <span class=\"command\">blog</span>"]
];

const commands = ["help", "about", "blog", "news", "experience", "contact", "banner", "clear"];

const lines = {
  banner() {
    const art = bannerRows
      .map(([mark, text]) => `<span class="mark">${mark}</span>  ${text}`)
      .join("\n");
    return [`<pre class="banner">${art}</pre>`, ""];
  },
  help() {
    const rows = [
      ["help", "List commands."],
      ["about", "A short bio."],
      ["blog", "Open the blog index."],
      ["news", "Recent public updates."],
      ["experience", "Where I am based."],
      ["contact", "Email and GitHub."],
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
      "I am Rongyu Zhang.",
      "I am at Zhejiang University, in Hangzhou.",
      "Email me at <a href='mailto:rongyu.zhang@zju.edu.cn'>rongyu.zhang@zju.edu.cn</a>.",
      ""
    ];
  },
  blog() {
    return [
      "",
      "Blog",
      "",
      "No posts yet.",
      "The index is <a href='blog/'>here</a>.",
      ""
    ];
  },
  news() {
    return [
      "",
      "No updates yet.",
      ""
    ];
  },
  experience() {
    return [
      "",
      "Zhejiang University",
      "Hangzhou, China",
      ""
    ];
  },
  contact() {
    return [
      "",
      `Email      <a href="mailto:rongyu.zhang@zju.edu.cn">rongyu.zhang@zju.edu.cn</a>`,
      `GitHub     <a href="https://github.com/zhangrongyu0101" target="_blank" rel="noopener">zhangrongyu0101</a>`,
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
