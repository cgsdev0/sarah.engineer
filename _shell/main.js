const parse = require("bash-parser");



const aliases = {};

const indexFilesystem = (system, parent = null) => {
    Object.keys(system.children || []).forEach(key => {
        if(typeof system.children[key] !== "object") {
            return;
        }
        indexFilesystem(system.children[key], system.children[key]);
        system.children[key].parent = parent;
        system.children[key].name = key;
        if(key.endsWith('/')) {
            system.children[key].isDirectory = true;
        }
        else {
            system.children[key].isFile = true;
        }
    })
    return system;
}
const identity = (a) => a;
let filesystem = indexFilesystem({
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

let cwd = '/';
let cwd_p = filesystem.children[cwd];
const fs_root = cwd_p;

window.initFilesystem = (xml) => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml,"text/xml");
    const urls = window.xmlDoc.getElementsByTagName('url');
    let pages = [];
    for(let i = 0; i < urls.length; ++i) {
        pages.push(urls[i].getElementsByTagName('loc')[0].innerHTML);
    }
    pages = pages.filter(p => p !== '/').map(page => {
        let newPage = page.replace('.html', '.md');
        if(newPage.endsWith('/')) newPage += 'index.md';
        return newPage;
    })
    pages.forEach(page => {
        let inode = filesystem.children['/'];
        const segs = page.split('/').filter(p => p);
        for(let i = 0; i < segs.length - 1; ++i) {
            if(inode.children.hasOwnProperty(segs[i] + '/')) {
                inode = inode.children[segs[i]+'/'];
                continue;
            }
            inode.children[segs[i] + '/'] = { children: {} }
            inode = inode.children[segs[i] + '/']
        }
        // Link final node
        inode.children[segs[segs.length - 1]] = { linkTo: identity }
    });
    // Re-index filesystem
    filesystem = indexFilesystem(filesystem);
    console.log("Filesystem loaded from sitemap!", {filesystem})
}

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

const printFile = async (file) => {
    if(window.returnCode) return;
    let inode = find_inode(file);
    if(!inode) {
        window.returnCode = 1
        return "directory not found"
    }
    if(inode.isDirectory) {
        window.returnCode = 1
        return `${inode.name} is a directory`
    }

    if(inode.cache) {
        return inode.cache;
    }

    // build full path
    let path = inode.name
    let t_inode = inode
    while(t_inode.parent) {
        path = t_inode.parent.name + path;
        t_inode = t_inode.parent;
    }

    // no one has to know that cat makes a network call...
    const resp = await window.fetch(inode.linkTo(path));
    const body = await resp.text();
    inode.cache = body;
    return body;
}

const cat = async (...files) => {
    if (window.stdin) {
        return window.stdin;
    } else {
        return (await asyncMap(files, printFile)).join('\n');
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
    let inode = find_inode(dir);
    if(!inode || inode.isFile) {
        window.returnCode = 1
        return "directory not found"
    }
    const base = ['.'];
    if (inode.parent) base.push('..');
    return base.concat(Object.keys(inode.children)).join('\n');
}

const find_r = (path) => (inode) => {
    if(!inode.children) {
        return [path + inode.name];
    }
    return [path + inode.name].concat(Object.values(inode.children).map(find_r(path + inode.name)));
}

const find = async (dir) => {
    let inode = find_inode(dir);
    if(!inode || inode.isFile) {
        window.returnCode = 1
        return "directory not found"
    }
    return ['.', find_r('')(inode)].flat(Infinity).join('\n');
}

const find_inode = (path) => {
    let inode = cwd_p;
    if(path && path.startsWith('/')) {
        inode = fs_root;
    }
    if(path) {
        try {
        path.split('/').filter(p=>p).forEach(seg => {
            if(!seg || seg === '.') return;
            if(seg === '..') {
                inode = inode.parent || inode;
            }
            else {
                inode = inode.children[seg + '/'] || inode.children[seg];
            }
        })
        } catch(e) {
            return undefined;
        }
    }
    return inode;
}

const cd = async (dir) => {
    let inode = find_inode(dir);
    if(!inode || inode.isFile) {
        window.returnCode = 1
        return "directory not found"
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
    const cmd = await expand(command.name);
    if(!commands.hasOwnProperty(cmd)) {
        window.returnCode = 1;
        return `command not found: ${cmd}`;
    }
    window.returnCode = 0;
    const res = await commands[cmd](...(command.suffix ? await asyncMap(command.suffix, expand) : []));
    window.stdin = '';
    console.log("result", res);
    return res;
}

const asyncMap = async (arr, fn) => {
    return await Promise.all(arr.map(fn))
}

const expand = async (node) => {
    if (node.hasOwnProperty('expansion')) {
        return (await asyncMap(node.expansion, resolveExpansion)).join('');
    }
    return node.text;
}

const resolveExpansion = async (expansion) => {
    switch(expansion.type) {
        case "ParameterExpansion":
            return resolveParameter(expansion);
        case "CommandExpansion":
            return await execAST(expansion);
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
    console.warn("EXEC AST", ast)
    if (ast.type === "command_expansion" || ast.type === "CommandExpansion") {
        return await execAST(ast.commandAST);
    }
    if(ast.type !== "Script") {
        throw new Error("Something went wrong!");
    }
    return (await asyncMap(ast.commands, walk)).join('');
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
            ast = parse(bash, { resolveEnv, resolveParameter, resolveAlias });
        } catch(e) {
            throw new Error("invalid syntax");
        }
        return await execAST(ast);
    } catch(e) {
        console.error(e);
        console.error(ast);
        return { error: e.message };
    }
};

window.parseBash = parse;