import style from "ansi-styles";
import { asyncMap } from "./utils";

module.exports = class CommandSet {
  constructor(shell, fs) {
    this.shell = shell;
    this.fs = fs;

    this.commands = {
      false: this.falseProgram,
      true: this.trueProgram,
      find: this.find,
      clear: this.clear,
      echo: this.echo,
      xargs: this.xargs,
      pwd: this.pwd,
      sudo: this.sudo,
      alias: this.alias,
      unalias: this.unalias,
      grep: this.grep,
      lolcat: this.colortest,
      "sarah.engineer": this.welcome,
      cat: this.cat,
      env: this.env,
      export: this.exportVar,
      whoami: this.whoami,
      curl: this.curl,
      ls: this.ls,
      cd: this.cd,
      mc: this.minecraft,
      minecraft: this.minecraft,
      /** pity points */
      bash: this.sad,
      zsh: this.sad,
      sh: this.sad,
      fish: this.sad,
      chsh: this.sad,
    };
  }

  colortest = () => {
    const rainbow = function (i) {
      const freq = 0.3;
      const red = Math.round(Math.sin(freq * i + 0) * 127 + 128);
      const green = Math.round(
        Math.sin(freq * i + (2 * Math.PI) / 3) * 127 + 128
      );
      const blue = Math.round(
        Math.sin(freq * i + (4 * Math.PI) / 3) * 127 + 128
      );

      return style.color.ansi256(style.rgbToAnsi256(red, green, blue));
    };
    return this.shell.stdin
      .split("")
      .map((c, i) => rainbow(i) + c)
      .join("");
  };

  minecraft = async () => {
    const res = await window.fetch(
      "https://api.mcsrvstat.us/2/mc2.badcop.games"
    );
    const data = await res.json();
    if (!data.online) {
      this.shell.returnCode = 1;
      return "The server appears to be offline.";
    }
    return `IP:\t\t${data.hostname}
Map:\t\t${style.underline.open}https://${data.hostname}${style.underline.close}
Version:\t${data.version}
Players:\t${data.players.online}/${data.players.max}
${data.players.list ? data.players.list.join(", ") : "(No one online)"}
`;
  };

  grep = async (...args) => {
    let invert = false;
    if (args.includes("-v")) {
      invert = true;
    }
    args = args.filter((arg) => arg !== "-v");
    let re = new RegExp(args[0] || "", "gi");
    if (!this.shell.stdin) {
      this.shell.stdin = await readFileAsync(this.shell.cwd_p, args[1]);
    }
    return this.shell.stdin
      .split("\n")
      .filter((line) => {
        re.lastIndex = 0;
        return invert ^ re.test(line);
      })
      .map((line) => {
        re.lastIndex = 0;
        let match;
        let colorizedLine = "";
        let index = 0;
        while ((match = re.exec(line))) {
          colorizedLine += line.slice(index, match.index);
          colorizedLine += style.redBright.open;
          colorizedLine += match[0];
          colorizedLine += style.redBright.close;
          index = match.index + match[0].length;
        }
        colorizedLine += line.slice(index, line.length);
        return colorizedLine;
      })
      .join("\n");
  };

  cd = async (dir) => {
    let inode = this.fs.findFileNode(this.shell.cwd_p, dir);
    if (!inode || inode.isFile) {
      this.shell.returnCode = 1;
      return "directory not found\n";
    }
    this.shell.cwd_p = inode;
    // build new cwd
    this.shell.cwd = inode.name;
    while (inode.parent) {
      this.shell.cwd = inode.parent.name + this.shell.cwd;
      inode = inode.parent;
    }
    return "";
  };

  find = async (...args) => {
    const find_r = (path) => (inode) => {
      if (!inode.children) {
        return [path + inode.name];
      }
      return [path + inode.name].concat(
        Object.values(inode.children).map(find_r(path + inode.name))
      );
    };
    let fileFilter = false;
    let dirFilter = false;
    while ((args[0] || "").startsWith("-")) {
      const flag = args.shift();
      switch (flag) {
        case "-type":
          const typeFilter = args.shift();
          if (typeFilter === "f") {
            fileFilter = true;
          } else if (typeFilter === "d") {
            dirFilter = true;
          } else {
            this.shell.returnCode = 1;
            throw new Error("unknown type flag\n");
          }
          break;
      }
    }
    let inode = this.fs.findFileNode(this.shell.cwd_p, args[0]);
    if (!inode || inode.isFile) {
      this.shell.returnCode = 1;
      return "directory not found\n";
    }
    const base = fileFilter ? [] : ["."];
    return base
      .concat(
        find_r("")(inode)
          .flat(Infinity)
          .filter(
            (file) =>
              (!fileFilter && !dirFilter) ||
              (fileFilter && !file.endsWith("/")) ||
              (dirFilter && file.endsWith("/"))
          )
      )
      .join("\n");
  };

  ls = async (dir) => {
    let inode = this.fs.findFileNode(this.shell.cwd_p, dir);
    if (!inode || inode.isFile) {
      this.shell.returnCode = 1;
      return "directory not found\n";
    }
    const base = ["."];
    if (inode.parent) base.push("..");
    return base.concat(Object.keys(inode.children)).join("\n");
  };

  curl = async (url) => {
    const resp = await window.fetch(url);
    return await resp.text();
  };

  trueProgram = () => {
    this.shell.returnCode = 0;
    return "";
  };

  falseProgram = () => {
    this.shell.returnCode = 1;
    return "";
  };

  whoami = () => {
    return `${this.shell.env["USER"]}\n`;
  };

  sad = () => {
    this.shell.returnCode = 4;
    return "Why would you want to use a different shell? 😭\n";
  };

  env = () => {
    return Object.entries(this.shell.env)
      .map(([k, v]) => `${k}="${v}"`)
      .join("\n");
  };

  unalias = (arg) => {
    if (!this.shell.aliases.hasOwnProperty(arg)) {
      this.shell.returnCode = 1;
      return `no alias named '${arg}'`;
    }
    delete this.shell.aliases[arg];
    return "";
  };

  exportVar = (arg) => {
    const split = arg.split("=");
    if (split.length < 2) {
      this.shell.returnCode = 1;
      return "";
    }
    const envVar = split.shift();
    this.shell.env[envVar] = split.join("");
    return "";
  };

  alias = (arg) => {
    const split = arg.split("=");
    if (split.length < 2) {
      this.shell.returnCode = 1;
      return "";
    }
    const aliasName = split.shift();
    this.shell.aliases[aliasName] = split.join("");
    return "";
  };

  clear = () => {
    // ehhrrm, well
    return "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  };

  cat = async (...files) => {
    const printFile = async (file) => {
      if (this.shell.returnCode) return;
      return await this.fs.readFileAsync(this.shell.cwd_p, file);
    };
    if (this.shell.stdin) {
      return this.shell.stdin;
    } else {
      return (
        await asyncMap(
          files.map((fileList) => fileList.split("\n")).flat(),
          printFile
        )
      ).join("\n");
    }
  };

  xargs = async (...args) => {
    if (!this.shell.stdin) {
      return;
    }
    const command = args.shift();
    const expandedArgs = [await asyncMap(args, this.shell.expand)].flat(
      Infinity
    );
    const allArgs = expandedArgs.concat(this.shell.stdin.split("\n"));

    this.shell.stdin = "";
    return await this.commands[command](...allArgs);
  };
  welcome = () => {
    return "You've discovered the hidden shell!\nWhat else is there to find? 🤔\n";
  };

  sudo = () => {
    this.shell.returnCode = 1;
    return "Username is not in the sudoers file. This incident will be reported\n";
  };

  pwd = () => {
    return `${this.shell.cwd}\n`;
  };

  echo = (...args) => {
    let ending = "\n";
    if (args.length && args[0] === "-n") {
      args.shift();
      ending = "";
    }
    return args.join(" ") + ending;
  };
};
