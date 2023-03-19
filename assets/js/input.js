// like input.js but better

import Convert from "ansi-to-html";
import { timeout, createSpanWithClasses, isLetter, createSpan } from "./utils";

const convert = new Convert();

// Consts
const SHELL_INTERACTIVITY_DELAY = 3000;

module.exports = (shell) => async () => {
  const commandHistory = [];
  let historyPointer = -1;

  const headerWrapper = document.querySelector("#header-wrapper");
  const output = document.querySelector("#command-output");
  const fake = document.querySelector("#fake-input");
  const input = document.querySelector("#hidden-input");
  const container = document.querySelector("#container");

  const words = [
    { color: "name", word: "sarah" },
    { color: "dot", word: "." },
    { color: "tld", word: "engineer" },
  ];

  input.value = words.map((w) => w.word).join("");

  const spawn_title = async () => {
    await timeout(2000);
    for (let i = 0; i < words.length; ++i) {
      const { color, word } = words[i];
      for (let j = 0; j < word.length; ++j) {
        fake.appendChild(createSpanWithClasses(word[j], [color]));
        await timeout(88);
      }
    }
  };

  spawn_title();

  // Button handlers
  let closing = false;
  document.querySelector(".buttons .green").addEventListener("click", () => {
    if (closing) return;
    document.body.classList.toggle("floating");
    document.body.classList.toggle("fullscreen");
  });

  document.querySelector(".buttons .red").addEventListener("click", () => {
    const close = () => {
      document
        .querySelector("#header-wrapper")
        .classList.remove("slide-to-top");
      document.querySelector("#command-output-wrapper").classList.add("hidden");

      // Restore the prompt
      input.value = words.map((w) => w.word).join("");
      update(input);

      closing = true;
      setTimeout(() => {
        closing = false;
        output.innerText = "";
      }, 500);
    };
    if (document.body.className.includes("fullscreen")) {
      document.body.classList.remove("fullscreen");
      document.body.classList.add("floating");
      setTimeout(close, 250);
    } else {
      close();
    }
  });

  // Load filesystem
  try {
    const resp = await window.fetch("/sitemap.xml");
    const text = await resp.text();
    shell.fs.initFilesystem(text);
  } catch (e) {
    console.error(e);
  }

  const selectEnd = () => {
    setTimeout(() => {
      const l = input.value.length;
      input.setSelectionRange(l, l);
    }, 1);
  };

  setTimeout(() => {
    // Start cursor at the end of input

    input.focus();
    document.addEventListener("click", () => {
      input.focus();
    });
  }, SHELL_INTERACTIVITY_DELAY);

  function update(target) {
    setTimeout(() => {
      let i = 0;
      let j = 0;
      let className = "nothing";

      fake.textContent = "";
      const caret =
        target.selectionStart === target.selectionEnd ||
        target.selectionDirection === "backward"
          ? target.selectionStart + 1
          : target.selectionEnd + 1;
      const hasSelection = target.selectionStart !== target.selectionEnd;
      for (const c of target.value) {
        if (j === 0) {
          for (const { word, color } of words) {
            if (target.value.slice(i).startsWith(word)) {
              j = word.length;
              className = color;
            }
          }
        }
        const span = document.createElement("span");
        if (j > 0) {
          j--;
          span.classList.add(className);
        }
        i++;
        if (i > target.selectionStart && i <= target.selectionEnd) {
          span.classList.add("selected");
        }

        if (!hasSelection && i === caret) {
          span.classList.add("caret");
        }
        if (c === " ") span.innerHTML = "&nbsp;";
        else span.innerText = c;

        fake.appendChild(span);
      }
      if (!hasSelection && i + 1 === caret) {
        container.lastChild.classList.remove("invisible-caret");
      }
      if (hasSelection || i + 1 !== caret) {
        container.lastChild.classList.add("invisible-caret");
      }
    }, 1);
  }

  input.addEventListener("blur", (e) => e.target.focus());
  input.addEventListener("input", (e) => update(e.target));
  input.addEventListener("keydown", async function (e) {
    const { key } = e;
    // Shell history controls
    if (key === "ArrowUp") {
      if (!commandHistory.length || !historyPointer) return;
      headerWrapper.classList.add("slide-to-top");
      if (historyPointer === -1) historyPointer = commandHistory.length;
      input.value = commandHistory[--historyPointer];
      selectEnd();
    }
    if (key === "ArrowDown") {
      if (!commandHistory.length || historyPointer === -1) return;
      headerWrapper.classList.add("slide-to-top");
      if (historyPointer === commandHistory.length - 1) {
        historyPointer = -1;
        input.value = "";
      } else {
        input.value = commandHistory[++historyPointer] || "";
      }
      selectEnd();
    }

    // Input submit
    if (key === "Enter") {
      let total = input.value;
      if (!total) return;

      output.classList.add("command-output"); // reveal the shell
      output.parentElement.classList.remove("hidden");
      document.querySelector("#hint-text").classList.add("hidden-no-animate");
      input.value = "";
      update(input);

      if (total === "clear") {
        output.innerText = "";
        return;
      }

      // Execute the command
      historyPointer = -1;
      commandHistory.push(total);
      const result = await shell.executeBash(total);
      const cmd = createSpan(
        // style.green.open + total + style.green.close,
        total,
        shell.returnCode ? "red" : "cyan"
      );
      cmd.classList.add("shell-command");
      output.prepend(cmd);
      if (typeof result === "string") {
        const span = document.createElement("span");
        span.innerHTML = convert.toHtml(
          result.replace(">", "&gt;").replace("<", "&lt;")
        );
        // Parse links
        span.querySelectorAll("u").forEach((u) => {
          var node = u,
            newNode = document.createElement("a"),
            parent = node.parentNode,
            children = node.childNodes;

          newNode.setAttribute("href", u.innerText);
          newNode.setAttribute("target", "_blank");
          Array.prototype.forEach.call(children, function (elem) {
            newNode.appendChild(elem);
          });
          parent.replaceChild(newNode, node);
        });
        output.prepend(span);
      } else {
        output.prepend(createSpan(result.error, "red"));
      }
      document
        .querySelector("#command-output")
        .scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    // Slide on any key-press
    headerWrapper.classList.add("slide-to-top");

    update(e.target);
  });
};
