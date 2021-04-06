// Utils
function isLetter(str) {
  return (
    str.length === 1 &&
    str.match(/[|~=`;:'"a-z .0-9\s-.,<>\\\/$\-_?\^*@!&#%\(\)\[\]{}]/i)
  );
}

function createSpan(str, color = undefined) {
  const span = document.createElement("span");
  span.innerText = str;
  if (color) {
    span.style = `color: ${color};`;
  }
  return span;
}

// Consts
const SHELL_INTERACTIVITY_DELAY = 4000;
const konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

module.exports = (shell) => async () => {
  const output = document.querySelector("#command-output");

  // Konami handler
  let k_index = 0,
    c = 0,
    mux = { red: 1, green: 0 };
  const sarah = document.querySelector(".site-title .name");
  const flash = (a) => {
    sarah.classList.remove(`flash-red`);
    sarah.classList.remove(`flash-green`);
    if (k_index < konami.length + mux[a])
      window.requestAnimationFrame(() => {
        sarah.classList.add(`flash-${a}`);
      });
  };

  document.addEventListener("keydown", function (e) {
    if (k_index < konami.length && e.code != konami[k_index++]) {
      if (k_index > 1) flash("red");
      k_index = 0;
    } else {
      flash("green");
      if (k_index >= konami.length && !c) {
        c = 1;
        document.body.classList.add("crt");
        output.prepend(createSpan("CRT mode enabled.", "limegreen"));
      }
    }
  });

  // Prompt interactivity
  const prompt = document.querySelector(".site-title .typewriter");
  const headerWrapper = document.querySelector("#header-wrapper");
  const commandHistory = [];
  let historyPointer = -1;

  try {
    const resp = await window.fetch("/sitemap.xml");
    const text = await resp.text();
    shell.fs.initFilesystem(text);
  } catch (e) {
    console.error(e);
  }

  const setPromptText = (text) => {
    const a = prompt.childNodes[0];
    a.innerText = text;
    prompt.innerText = "";
    prompt.appendChild(a);
  };

  const getPromptText = () => {
    let total = "";
    prompt.childNodes.forEach((c) => (total += c.innerText));
    return total;
  };

  setTimeout(() => {
    document.addEventListener("keydown", async function (e) {
      let { key, ctrlKey } = e;

      if (ctrlKey && key === "v") {
        // paste detected
        const clip = await navigator.clipboard.readText();

        for (let i = 0; i < clip.length; ++i) {
          if (!isLetter(clip[i])) continue;

          headerWrapper.classList.add("slide-to-top");

          if (clip[i] === " ") prompt.lastChild.innerHTML += "\u00A0";
          if (clip[i] === "\n") continue;
          else prompt.lastChild.innerText += clip[i];
        }
      }

      if (key === "Backspace" || key === "Enter" || isLetter(key)) {
        headerWrapper.classList.add("slide-to-top");
      }

      // Shell history controls
      if (key === "ArrowUp") {
        if (!commandHistory.length || !historyPointer) return;
        if (historyPointer === -1) historyPointer = commandHistory.length;
        setPromptText(commandHistory[--historyPointer]);
      }
      if (key === "ArrowDown") {
        if (!commandHistory.length || historyPointer === -1) return;
        if (historyPointer === commandHistory.length) {
          historyPointer = -1;
          return;
        }
        setPromptText(commandHistory[++historyPointer] || "");
      }

      if (key === "Enter") {
        let total = getPromptText();
        if (!total) return;

        output.classList.add("command-output"); // reveal the shell
        setPromptText("");

        if (total === "clear") {
          output.innerText = "";
          return;
        }

        // Execute the command
        historyPointer = -1;
        commandHistory.push(total);
        const result = await shell.executeBash(total);
        output.prepend(
          createSpan("$ " + total + "\n", shell.returnCode ? "red" : "darkblue")
        );
        if (typeof result === "string") {
          output.prepend(createSpan(result));
        } else {
          output.prepend(createSpan(result.error, "red"));
        }
      }

      if (key === "Backspace") {
        if (e.ctrlKey) {
          // Delete the entire line
          setPromptText("");
        } else {
          // Delete a single character
          const cur = prompt.lastChild.innerText;
          prompt.lastChild.innerText = cur.substr(0, cur.length - 1);
          if (cur.length === 1 && prompt.children.length > 1) {
            prompt.removeChild(prompt.lastChild);
          }
        }
      }

      // Handle general input
      if (isLetter(key) && !ctrlKey) {
        const cur = prompt.lastChild.innerText;
        if (key === " ") {
          prompt.lastChild.innerHTML += "\u00A0";
        } else prompt.lastChild.innerText = cur + e.key;
      }
    });
  }, SHELL_INTERACTIVITY_DELAY);
};
