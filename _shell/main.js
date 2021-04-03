const parse = require("bash-parser");



const aliases = {};

const linkParents = (system, parent = null) => {
    Object.keys(system.children || []).forEach(key => {
        if(typeof system.children[key] !== "object") {
            return;
        }
        linkParents(system.children[key], system.children[key]);
        system.children[key].parent = parent;
        system.children[key].name = key;
    })
    return system;
}
const identity = (a) => a;
const filesystem = linkParents({
children: {
    '/': {
    children: {
        'about/': {
        children: {
            'index.html': {
                linkTo: identity,
            }
        }
        },
        'blog/': {
        children: {
            'post-1.html': {
                linkTo: (path) => path.replace('.html', '.md'),
            }
        }
        }
    }
    }
}
});

console.log({filesystem})

let cwd = '/';
let cwd_p = filesystem.children[cwd];

const environment = {
    "SHELL": "javascript 🚀",
};

const echo = (...args) => {
    let ending = '\n';
    if(args.length && args[0] === '-n')  {
        args.shift();
        ending = '';
    }
    return args.join(" ") + ending;
}

const pwd = () => {
    return `${cwd}\n`;
}

const sudo = () => {
    window.returnCode = 1;
    return 'Username is not in the sudoers file. This incident will be reported\n';
}

const welcome = () => {
    return 'You\'ve discovered the hidden shell!\nWhat else is there to find? 🤔\n';
}

const cat = (...files) => {
    if (window.stdin) {
        return window.stdin;
    } else {
        // TODO: read the files or something
        return echo(...files);
    }
}

const clear = () => {
    // ehhrrm, well
    return '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
}

const alias = (arg) => {
    const split = arg.split('=');
    if (split.length < 2) {
        window.returnCode = 1;
        return '';
    }
    const aliasName = split.shift();
    aliases[aliasName] = split.join('');
    return '';
}

const exportVar = (arg) => {
    const split = arg.split('=');
    if (split.length < 2) {
        window.returnCode = 1;
        return '';
    }
    const environmentVar = split.shift();
    environment[environmentVar] = split.join('');
    return '';
}

const unalias = (arg) => {
    if(!aliases.hasOwnProperty(arg)) {
        window.returnCode = 1;
        return `no alias named '${arg}'`;
    }
    delete aliases[arg];
    return '';
}

const env = () => {
    return Object.entries(environment).map(([k, v]) => `${k}="${v}"`).join('\n');   
}

const sad = () => {
    window.returnCode = 4;
    return 'Why would you want to use a different shell? 😭\n';
}

const whoami = () => {
    return 'definitelynotroot\n'
}

const curl = async (url) => {
    const resp = await window.fetch(url);
    return await resp.text();
}

const ls = async (dir) => {
    let inode = cwd_p;
    if(dir) {
        try {
        dir.split('/').forEach(seg => {
            if(!seg || seg === '.') return;
            if(seg === '..') {
                inode = inode.parent || inode;
            }
            else {
                inode = inode.children[seg + '/'];
            }
        })
        } catch(e) {
            window.returnCode = 1
            return "directory not found"
        }
        if(!inode) {
            window.returnCode = 1
            return "directory not found"
        }
    }
    const base = ['.'];
    if (inode.parent) base.push('..');
    return base.concat(Object.keys(inode.children)).join('\n');
}

const find_r = (path) => (inode) => {
    console.warn("traversing node", inode)
    if(!inode.children) {
        return [path + inode.name];
    }
    return [path + inode.name].concat(Object.values(inode.children).map(find_r(path + inode.name)));
}

const find = async (dir) => {
    let inode = cwd_p;
    if(dir) {
        try {
        dir.split('/').forEach(seg => {
            if(!seg || seg === '.') return;
            if(seg === '..') {
                inode = inode.parent || inode;
            }
            else {
                inode = inode.children[seg + '/'];
            }
        })
        } catch(e) {
            window.returnCode = 1
            return "directory not found"
        }
        if(!inode) {
            window.returnCode = 1
            return "directory not found"
        }
    }
    const base = ['.'];
    return base.concat(find_r('')(inode).flat()).join('\n');
}

const cd = async (dir) => {
    let inode = cwd_p;
    if(dir) {
        try {
        dir.split('/').forEach(seg => {
            if(!seg || seg === '.') return;
            if(seg === '..') {
                inode = inode.parent || inode;
            }
            else {
                inode = inode.children[seg + '/'];
            }
        })
        } catch(e) {
            window.returnCode = 1
            return "directory not found"
        }
        if(!inode) {
            window.returnCode = 1
            return "directory not found"
        }
    }
    cwd_p = inode;
    // build new cwd
    cwd = inode.name
    while(inode.parent) {
        cwd = inode.parent.name + cwd;
        inode = inode.parent;
    }
    return '';
}

const commands = {
    find,
    clear,
    echo,
    pwd,
    sudo,
    alias,
    unalias,
    "sarah.engineer": welcome,
    cat,
    env,
    "export": exportVar,
    whoami,
    curl,
    ls,
    cd,
    /** pity points */
    "bash": sad,
    "zsh": sad,
    "sh": sad,
    "fish": sad,
    "chsh": sad,
};


const parseAssignments = (prefix) => {
    switch(prefix.type) {
        case "AssignmentWord":
            const split = prefix.text.split('=');
            if (split.length < 2) {
                window.returnCode = 1;
                return '';
            }
            const environmentVar = split.shift();
            environment[environmentVar] = split.join('');
            break;
        default:
            window.returnCode = 1;
            throw new Error(`stop trying to be so fancy, with your ${prefix.type} 😜`)
    }
}

const execCommand = async (command) => {
    console.log("exec-ing command", command);
    if(!command.name) {
        (command.prefix || []).map(parseAssignments);
        return '';
    }
    const cmd = expand(command.name);
    if(!commands.hasOwnProperty(cmd)) {
        window.returnCode = 1;
        return `command not found: ${cmd}`;
    }
    window.returnCode = 0;
    const res = await commands[cmd](...(command.suffix ? command.suffix.map(expand) : []));
    window.stdin = '';
    console.log("result", res);
    return res;
}

const expand = (node) => {
    if (node.hasOwnProperty('originalText')) {
        return node.text;
    }
    if (node.hasOwnProperty('expansion')) {
        return node.expansion.map(e => resolveExpansion(e)).join('');
    }
    return node.text;
}

const resolveExpansion = (expansion) => {
    switch(expansion.type) {
        case "ParameterExpansion":
            return resolveParameter(expansion);
        case "CommandExpansion":
            return execAST(expansion);
        default:
            throw new Error(`Unknown expansion type ${expansion.type}`)
    }
}

const resolveAlias = (alias) => {
    console.warn("RESOLVE ALIAS", alias);
    return aliases[alias] || alias;
}

const execPipeline = async (commands) => {
    for(let i = 0; i < commands.length; ++i) {
        window.stdin = await execCommand(commands[i]);
    }
    const res = window.stdin;
    window.stdin = '';
    return res;
}

const execSubshell = async (commands) => {
    let result = '';
    for(let i = 0; i < commands.length; ++i) {
        result += await execCommand(commands[i]);
    }
    return result;
}

const walk = async (command) => {
    switch(command.type) {
        case "Command":
            return await execCommand(command);
        case "Subshell":
            return execSubshell(command.list.commands); // command.list.commands.map(execCommand).join('');
        case "Pipeline":
            return await execPipeline(command.commands);
        default:
            throw new Error(`${command.type} is not supported :(`);
    }
}

const execAST = async (ast) => {
    if (ast.type === "command_expansion" || ast.type === "CommandExpansion") {
        return await execAST(ast.commandAST);
    }
    if(ast.type !== "Script") {
        throw new Error("Something went wrong!");
    }
    const all = await Promise.all(ast.commands.map(async command => await walk(command)));
    console.log(all);
    return all.join('');
}

const resolveEnv = (name) => {
    console.warn("RESOLVING ENV", name);
    return null;
}

const resolveParameter = (param) => {
    console.warn("RESOLVING PARAM", param)
    if(param.kind === "last-exit-status") {
        return `${window.returnCode}`;
    }
    if (environment.hasOwnProperty(param.parameter)) {
        return environment[param.parameter];
    }
return '';
}

window.returnCode = 0;
window.stdin = '';
window.executeBash = async (bash) => {
    let ast = {};
    try {
        try {
            ast = parse(bash, { execCommand: execAST, execShellScript: execAST, resolveEnv, resolveParameter, resolveAlias });
        } catch(e) {
            throw new Error("invalid syntax");
        }
        return await execAST(ast);
    } catch(e) {
        console.error(ast);
        return { error: e.message };
    }
};

window.parseBash = parse;