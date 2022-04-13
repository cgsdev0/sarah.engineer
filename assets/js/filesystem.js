const identity = (a) => a;

module.exports = class FileSystem {
  constructor() {
    this.filesystem = {
      children: {
        "/": {
          children: {
            // 'about/': {
            // children: {
            //     'index.html': {
            //         linkTo: identity,
            //     }
            // }
            // },
            // 'blog/': {
            // children: {
            //     'post-1.html': {
            //         linkTo: (path) => path.replace('.html', '.md'),
            //     }
            // }
            // }
          },
        },
      },
    };
    this.indexFilesystem();
  }

  indexFilesystem = () => {
    const recursiveHelper = (system, parent = null) => {
      Object.keys(system.children || []).forEach((key) => {
        if (typeof system.children[key] !== "object") {
          return;
        }
        recursiveHelper(system.children[key], system.children[key]);
        system.children[key].parent = parent;
        system.children[key].name = key;
        if (key.endsWith("/")) {
          system.children[key].isDirectory = true;
        } else {
          system.children[key].isFile = true;
        }
      });
      return system;
    };
    this.filesystem = recursiveHelper(this.filesystem);
  };

  getFsRoot = () => {
    return this.filesystem.children["/"];
  };

  findFileNode = (cwd, path) => {
    let inode = cwd;
    if (path && path.startsWith("/")) {
      inode = this.getFsRoot();
    }
    if (path) {
      try {
        path
          .split("/")
          .filter((p) => p)
          .forEach((seg) => {
            if (!seg || seg === ".") return;
            if (seg === "..") {
              inode = inode.parent || inode;
            } else {
              inode = inode.children[seg + "/"] || inode.children[seg];
            }
          });
      } catch (e) {
        return undefined;
      }
    }
    return inode;
  };

  getFilePath = (cwd, file) => {
    let inode = this.findFileNode(cwd, file);

    if (!inode) {
      throw new Error("directory not found\n");
    }

    if (inode.isDirectory) {
      throw new Error(
        `${inode.name} is a directory; only editing a file is supported\n`
      );
    }

    // build full path
    let path = inode.name;
    let t_inode = inode;
    while (t_inode.parent) {
      path = t_inode.parent.name + path;
      t_inode = t_inode.parent;
    }

    return path;
  };

  readFileAsync = async (cwd, file) => {
    let inode = this.findFileNode(cwd, file);
    if (!inode) {
      throw new Error("directory not found\n");
    }
    if (inode.isDirectory) {
      throw new Error(`${inode.name} is a directory\n`);
    }

    if (inode.cache) {
      return inode.cache;
    }

    // build full path
    let path = inode.name;
    let t_inode = inode;
    while (t_inode.parent) {
      path = t_inode.parent.name + path;
      t_inode = t_inode.parent;
    }

    // no one has to know that cat makes a network call...
    const resp = await window.fetch(inode.linkTo(path));
    const body = await resp.text();
    inode.cache = body;
    return body;
  };

  initFilesystem = (xml) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const urls = xmlDoc.getElementsByTagName("url");
    let pages = [];
    for (let i = 0; i < urls.length; ++i) {
      pages.push(
        new URL(urls[i].getElementsByTagName("loc")[0].innerHTML).pathname
      );
    }
    pages = pages
      .filter((p) => p !== "/")
      .map((page) => {
        let newPage = page.replace(".html", ".md");
        if (newPage.endsWith("/")) newPage += "index.md";
        return newPage;
      });
    pages.forEach((page) => {
      let inode = this.filesystem.children["/"];
      const segs = page.split("/").filter((p) => p);
      for (let i = 0; i < segs.length - 1; ++i) {
        if (inode.children.hasOwnProperty(segs[i] + "/")) {
          inode = inode.children[segs[i] + "/"];
          continue;
        }
        inode.children[segs[i] + "/"] = { children: {} };
        inode = inode.children[segs[i] + "/"];
      }
      // Link final node
      inode.children[segs[segs.length - 1]] = { linkTo: identity };
    });
    // Re-index filesystem
    this.indexFilesystem();
  };
};
