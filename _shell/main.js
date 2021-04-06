const parse = require("bash-parser");

const CommandSet = require("./commands");
const FileSystem = require("./filesystem");
const initializeInput = require("./input");

class Shell {
  constructor() {
    this.aliases = {};
    this.env = {
      SHELL: "javascript 🚀",
      USER: "definitelynotroot",
    };

    this.returnCode = 0;
    this.stdin = "";

    this.fs = new FileSystem();
    this.cwd = "/";
    this.cwd_p = this.fs.getFsRoot();

    this.commands = new CommandSet(this, this.fs);
  }

  parseAssignments = async (prefix) => {
    switch (prefix.type) {
      case "AssignmentWord":
        const expanded = await this.expand(prefix);
        const split = prefix.text.split("=");
        if (split.length < 2) {
          this.returnCode = 1;
          return "";
        }
        const envVar = split.shift();
        this.env[envVar] = prefix.hasOwnProperty("expansion")
          ? expanded
          : split.join("");
        break;
      default:
        this.returnCode = 1;
        throw new Error(
          `stop trying to be so fancy, with your ${prefix.type} 😜\n`
        );
    }
  };

  execCommand = async (command) => {
    if (command.async) {
      this.returnCode = 1;
      throw new Error("background tasks are not supported");
    }
    if (!command.name) {
      await asyncMap(command.prefix || [], this.parseAssignments);
      return "";
    }
    const cmd = await this.expand(command.name);
    if (!this.commands.commands.hasOwnProperty(cmd)) {
      this.returnCode = 1;
      return `command not found: ${cmd}\n`;
    }
    this.returnCode = 0;
    const res = await this.commands.commands[cmd](
      ...(command.suffix ? await asyncMap(command.suffix, this.expand) : [])
    );
    this.stdin = "";
    return res;
  };

  expand = async (node) => {
    if (node.hasOwnProperty("expansion")) {
      return (await asyncMap(node.expansion, this.resolveExpansion)).join("");
    }
    if (node.type === "Redirect") {
      throw new Error("redirection is not supported\n");
    }
    return node.text;
  };

  resolveExpansion = async (expansion) => {
    switch (expansion.type) {
      case "ParameterExpansion":
        return this.resolveParameter(expansion);
      case "CommandExpansion":
        return await this.execAST(expansion);
      default:
        throw new Error(`Unknown expansion type ${expansion.type}\n`);
    }
  };

  resolveAlias = (alias) => {
    return this.aliases[alias] || alias;
  };

  execPipeline = async (commands) => {
    for (let i = 0; i < commands.length; ++i) {
      this.stdin = await this.execCommand(commands[i]);
    }
    const res = this.stdin;
    this.stdin = "";
    return res;
  };

  execSubshell = async (commands) => {
    let result = "";
    for (let i = 0; i < commands.length; ++i) {
      result += await this.execCommand(commands[i]);
    }
    return result;
  };

  execLogicalExpression = async (expr) => {
    let outLeft = "",
      outRight = "";
    outLeft = await this.walk(expr.left);
    if (
      (this.returnCode && expr.op === "or") ||
      (!this.returnCode && expr.op === "and")
    ) {
      this.returnCode = 0;
      outRight = await this.walk(expr.right);
    }
    return outLeft + outRight;
  };

  walk = async (command) => {
    switch (command.type) {
      case "Command":
        return await this.execCommand(command);
      case "Subshell":
        return this.execSubshell(command.list.commands);
      case "Pipeline":
        return await this.execPipeline(command.commands);
      case "LogicalExpression":
        return await this.execLogicalExpression(command);
      default:
        throw new Error(`${command.type} is not supported :(\n`);
    }
  };

  execAST = async (ast) => {
    if (ast.type === "command_expansion" || ast.type === "CommandExpansion") {
      return await this.execAST(ast.commandAST);
    }
    if (ast.type !== "Script") {
      throw new Error("Something went wrong!\n");
    }
    return (await asyncMap(ast.commands, this.walk)).join("");
  };

  resolveEnv = (name) => {
    return null;
  };

  resolveParameter = (param) => {
    if (param.kind === "last-exit-status") {
      return `${this.returnCode}`;
    }
    if (this.env.hasOwnProperty(param.parameter)) {
      return this.env[param.parameter];
    }
    return "";
  };

  executeBash = async (bash) => {
    let ast = {};
    try {
      try {
        ast = parse(bash, {
          resolveEnv: this.resolveEnv,
          resolveParameter: this.resolveParameter,
          resolveAlias: this.resolveAlias,
        });
      } catch (e) {
        throw new Error("invalid syntax\n");
      }
      return await this.execAST(ast);
    } catch (e) {
      console.error(e);
      console.error(ast);
      return { error: e.message };
    }
  };
}

// Utils
asyncMap = async (arr, fn) => {
  return await Promise.all(arr.map(fn));
};

// Debug
window.parseBash = parse;

// Hook
document.addEventListener(
  "DOMContentLoaded",
  initializeInput(new Shell()),
  false
);
