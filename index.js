const terminalPopup = document.getElementById("terminal-popup");
const openTerminalBtn = document.querySelectorAll(".btn-2");
const closeTerminalBtn = document.getElementById("close-terminal");
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

openTerminalBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    terminalPopup.classList.remove("d-none");
    terminalInput.focus();
  });
});

closeTerminalBtn.addEventListener("click", () => {
  terminalPopup.classList.add("d-none");
});

function scrollTerminal() {
  const body = terminalPopup.querySelector(".terminal-body");
  body.scrollTop = body.scrollHeight;
}

function randomPath() {
  const folders = ["projects", "dev", "code", "workspace", "personal", "python"];
  const pathDepth = Math.floor(Math.random() * 3) + 2; // 2-4 levels
  let path = "";
  for (let i = 0; i < pathDepth; i++) {
    const folder = folders[Math.floor(Math.random() * folders.length)];
    path += `/${folder}`;
  }
  path += `/nedal_portfolio`;
  return path;
}

function typeLine(lineText, callback) {
  const lineDiv = document.createElement("div");
  terminalOutput.appendChild(lineDiv);
  let i = 0;

  function typeChar() {
    if (i < lineText.length) {
      lineDiv.textContent += lineText[i];
      i++;
      scrollTerminal();
      setTimeout(typeChar, 1); // speed (ms per char)
    } else if (callback) {
      callback();
    }
  }

  typeChar();
}

const commands = {
  help: () =>
    `Available commands:
help      : Show available commands
ls        : List projects
pwd       : Show current directory
whoami    : Show full name
contact   : Show contact info
github    : Open GitHub page
clear     : Clear the terminal`,

  ls: () =>
    `projects:
- Portfolio
- Exam Management System
- Vegetables Market System
- Poultry Flock Management
Check GitHub for details`,

  pwd: randomPath,

  whoami: () => "Nedal Abdullah",

  contact: () => `Email: nedal@example.com
Telegram: @N3dal_Abdullah
WhatsApp: +218 ...`,

  github: () => `Opening GitHub: https://github.com/N3dal`,

  clear: () => {
    terminalOutput.innerHTML = "";
    return null;
  },
};

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const input = terminalInput.innerText.trim();

    if (input) {
      const inputLine = document.createElement("div");
      inputLine.textContent = `>>> ${input}`;
      terminalOutput.appendChild(inputLine);

      if (commands[input]) {
        const result = commands[input]();
        if (result) {
          const lines = result.split("\n");
          let index = 0;

          function typeNext() {
            if (index < lines.length) {
              typeLine(lines[index], () => {
                index++;
                typeNext();
              });
            }
          }

          typeNext();
        }
      } else {
        typeLine(`'${input}' is not a command`);
      }
    }

    terminalInput.innerText = "";
    scrollTerminal();
  }
});
