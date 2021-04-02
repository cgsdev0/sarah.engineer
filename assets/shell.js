// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1sDb8":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "ba76236dc15f498c73ded0e523420cfa";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"2X3X1":[function(require,module,exports) {
const parse = require("bash-parser");

console.log(parse);
console.log(parse("ehco hi"));

},{"bash-parser":"4VTXg"}],"4VTXg":[function(require,module,exports) {
'use strict';

const shellLexer = require('./shell-lexer');
const utils = require('./utils');

// preload all modes to have them browserified
const modes = {
	'bash': require('./modes/bash'),
	'posix': require('./modes/posix'),
	'word-expansion': require('./modes/word-expansion')
};

function loadPlugin(name) {
	const modePlugin = modes[name];

	if (modePlugin.inherits) {
		return modePlugin.init(loadPlugin(modePlugin.inherits), utils);
	}
	return modePlugin.init(null, utils);
}

module.exports = function parse(sourceCode, options) {
	try {
		options = options || {};
		options.mode = options.mode || 'posix';

		const mode = loadPlugin(options.mode);
		const Parser = mode.grammar.Parser;
		const astBuilder = mode.astBuilder;
		const parser = new Parser();
		parser.lexer = shellLexer(mode, options);
		parser.yy = astBuilder(options);

		const ast = parser.parse(sourceCode);

/*
		const fixtureFolder = `${__dirname}/../test/fixtures`;
		const json = require('json5');
		const {writeFileSync} = require('fs');

		const fileName = require('node-uuid').v4();
		const filePath = `${fixtureFolder}/${fileName}.js`;
		writeFileSync(filePath, 'module.exports = ' + json.stringify({
			sourceCode, result: ast
		}, null, '\t'));
*/
		return ast;
	} catch (err) {
		if (err instanceof SyntaxError) {
			throw err;
		}
		throw new Error(err.stack || err.message);
	}
};

},{"./shell-lexer":"3NCke","./utils":"4UEB6","./modes/bash":"5qDTw","./modes/posix":"2Ma3J","./modes/word-expansion":"5poxb"}],"3NCke":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');

const posixShellLexer = (mode, options) => ({
	lex() {
		const item = this.tokenizer.next();
		const tk = item.value;
		const tkType = tk.originalType;
		const text = tk.value;

		this.yytext = {text};
		if (tk.expansion) {
			this.yytext.expansion = tk.expansion;
		}

		if (tk.originalText) {
			this.yytext.originalText = tk.originalText;
		}

		if (tk.type) {
			this.yytext.type = tk.type;
		}

		if (tk.maybeSimpleCommandName) {
			this.yytext.maybeSimpleCommandName = tk.maybeSimpleCommandName;
		}

		if (tk.joined) {
			this.yytext.joined = tk.joined;
		}

		if (tk.fieldIdx !== undefined) {
			this.yytext.fieldIdx = tk.fieldIdx;
		}

		if (options.insertLOC && tk.loc) {
			this.yytext.loc = tk.loc;
		}

		if (tk.loc) {
			this.yylineno = tk.loc.start.row - 1;
		}

		return tkType;
	},

	setInput(source) {
		const tokenizer = mode.tokenizer(options);
		let previousPhases = [tokenizer];
		const phases = [tokenizer]
			.concat(mode.lexerPhases.map(phase => {
				const ph = phase(options, mode, previousPhases);
				previousPhases = previousPhases.concat(ph);
				return ph;
			}));

		const tokenize = compose.apply(null, phases.reverse());
		this.tokenizer = tokenize(source);
	}
});

module.exports = posixShellLexer;

},{"compose-function":"4PPUu"}],"4PPUu":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = compose;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _arityN = require('arity-n');

var _arityN2 = _interopRequireDefault(_arityN);

var compose2 = function compose2(f, g) {
  return function () {
    return f(g.apply(undefined, arguments));
  };
};

function compose() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  var funcs = functions.filter(function (fn) {
    return typeof fn === 'function';
  });

  var lastIdx = funcs.length - 1;
  var arity = 0;

  if (funcs.length <= 0) {
    throw new Error('No funcs passed');
  }

  if (lastIdx >= 0 && funcs[lastIdx]) {
    arity = funcs[lastIdx].length;
  }

  return (0, _arityN2['default'])(funcs.reduce(compose2), arity);
}

module.exports = exports['default'];
},{"arity-n":"48nf8"}],"48nf8":[function(require,module,exports) {
var arityFn = [
  require('./0'),
  require('./1'),
  require('./2'),
  require('./3'),
  require('./4'),
  require('./5')
];

module.exports = function(fn, n) {
  if (n && n <= 5) {
    return arityFn[n](fn);
  } else {
    return fn;
  }
};

},{"./0":"2ocHU","./1":"1g6Sm","./2":"5BWKy","./3":"6uKLM","./4":"2uBcB","./5":"7AW4O"}],"2ocHU":[function(require,module,exports) {
module.exports = function(fn) {
  return function() {
    return fn.apply(null, arguments);
  };
};

},{}],"1g6Sm":[function(require,module,exports) {
module.exports = function(fn) {
  return function(a) {
    return fn.apply(null, arguments);
  };
};

},{}],"5BWKy":[function(require,module,exports) {
module.exports = function(fn) {
  return function(a, b) {
    return fn.apply(null, arguments);
  };
};

},{}],"6uKLM":[function(require,module,exports) {
module.exports = function(fn) {
  return function(a, b, c) {
    return fn.apply(null, arguments);
  };
};

},{}],"2uBcB":[function(require,module,exports) {
module.exports = function(fn) {
  return function(a, b, c, d) {
    return fn.apply(null, arguments);
  };
};

},{}],"7AW4O":[function(require,module,exports) {
module.exports = function(fn) {
  return function(a, b, c, d, e) {
    return fn.apply(null, arguments);
  };
};

},{}],"4UEB6":[function(require,module,exports) {
exports.loggerPhase = require('./logger-phase');
exports.tokens = require('./tokens');
exports.isValidName = require('./is-valid-name');
exports.replaceRule = require('iterable-transform-replace');

},{"./logger-phase":"ecVs3","./tokens":"4SrYh","./is-valid-name":"7fzkW","iterable-transform-replace":"2cGE8"}],"ecVs3":[function(require,module,exports) {
'use strict';

const logger = name => () => function * (tokens) {
	for (const tk of tokens) {
		if (!tk) {
			console.log(`In ${name} token null.`);
		}
		console.log(
			name,
			'<<<',
			tk,
			'>>>'
		);
		yield tk;
	}
};

module.exports = logger;

},{}],"4SrYh":[function(require,module,exports) {
'use strict';
const hasOwnProperty = require('has-own-property');
const filter = require('filter-obj');
const operators = require('../modes/posix/enums/operators');

class Token {
	constructor(fields) {
		const definedFields = filter(fields, (key, value) => value !== undefined);
		Object.assign(this, definedFields);

		if (this._ === undefined) {
			this._ = {};
		}
	}

	is(type) {
		return this.type === type;
	}

	appendTo(chunk) {
		return new Token(Object.assign({}, this, {value: this.value + chunk}));
	}
	changeTokenType(type, value) {
		return new Token({type, value, loc: this.loc, _: this._, expansion: this.expansion});
	}
	setValue(value) {
		return new Token(Object.assign({}, this, {value}));
	}
	alterValue(value) {
		return new Token(Object.assign({}, this, {value, originalText: this.originalText || this.value}));
	}
	addExpansions() {
		return new Token(Object.assign({}, this, {expansion: []}));
	}
	setExpansions(expansion) {
		return new Token(Object.assign({}, this, {expansion}));
	}
}

exports.token = args => new Token(args);

function mkToken(type, value, loc, expansion) {
	const tk = new Token({type, value, loc});
	if (expansion && expansion.length) {
		tk.expansion = expansion;
	}

	return tk;
}

exports.mkToken = mkToken;

exports.mkFieldSplitToken = function mkFieldSplitToken(joinedTk, value, fieldIdx) {
	const tk = new Token({
		type: joinedTk.type,
		value,
		joined: joinedTk.value,
		fieldIdx,
		loc: joinedTk.loc,
		expansion: joinedTk.expansion,
		originalText: joinedTk.originalText
	});

	return tk;
};

exports.appendTo = (tk, chunk) => tk.appendTo(chunk);
exports.changeTokenType = (tk, type, value) => tk.changeTokenType(type, value);
exports.setValue = (tk, value) => tk.setValue(value);
exports.alterValue = (tk, value) => tk.alterValue(value);
exports.addExpansions = tk => tk.addExpansions();
exports.setExpansions = (tk, expansion) => tk.setExpansions(expansion);

exports.tokenOrEmpty = function tokenOrEmpty(state) {
	if (state.current !== '' && state.current !== '\n') {
		const expansion = (state.expansion || []).map(xp => {
			// console.log('aaa', {token: state.loc, xp: xp.loc});
			return Object.assign({}, xp, {loc: {
				start: xp.loc.start.char - state.loc.start.char,
				end: xp.loc.end.char - state.loc.start.char
			}});
		});
		const token = mkToken('TOKEN', state.current, {
			start: Object.assign({}, state.loc.start),
			end: Object.assign({}, state.loc.previous)
		}, expansion);

		/* if (state.expansion && state.expansion.length) {
			token.expansion = state.expansion;
		}*/

		return [token];
	}
	return [];
};

exports.operatorTokens = function operatorTokens(state) {
	const token = mkToken(
		operators[state.current],
		state.current, {
			start: Object.assign({}, state.loc.start),
			end: Object.assign({}, state.loc.previous)
		}
	);

	return [token];
};

exports.newLine = function newLine() {
	return mkToken('NEWLINE', '\n');
};

exports.continueToken = function continueToken(expectedChar) {
	return mkToken('CONTINUE', expectedChar);
};

exports.eof = function eof() {
	return mkToken('EOF', '');
};

exports.isPartOfOperator = function isPartOfOperator(text) {
	return Object.keys(operators).some(op => op.slice(0, text.length) === text);
};

exports.isOperator = function isOperator(text) {
	return hasOwnProperty(operators, text);
};

exports.applyTokenizerVisitor = visitor => (tk, idx, iterable) => {
	if (hasOwnProperty(visitor, tk.type)) {
		const visit = visitor[tk.type];

		return visit(tk, iterable);
	}

	if (hasOwnProperty(visitor, 'defaultMethod')) {
		const visit = visitor.defaultMethod;
		return visit(tk, iterable);
	}

	return tk;
};

},{"has-own-property":"64xst","filter-obj":"2VABy","../modes/posix/enums/operators":"32vdp"}],"64xst":[function(require,module,exports) {
var _hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function hasOwnProperty (obj, prop) {
  return _hasOwnProperty.call(obj, prop)
}

},{}],"2VABy":[function(require,module,exports) {
'use strict';
module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};

},{}],"32vdp":[function(require,module,exports) {
'use strict';
const operators = {
	'&': 'AND',
	'|': 'PIPE',
	'(': 'OPEN_PAREN',
	')': 'CLOSE_PAREN',
	'>': 'GREAT',
	'<': 'LESS',
	'&&': 'AND_IF',
	'||': 'OR_IF',
	';;': 'DSEMI',
	'<<': 'DLESS',
	'>>': 'DGREAT',
	'<&': 'LESSAND',
	'>&': 'GREATAND',
	'<>': 'LESSGREAT',
	'<<-': 'DLESSDASH',
	'>|': 'CLOBBER',
	';': 'SEMICOLON'
};
module.exports = operators;

},{}],"7fzkW":[function(require,module,exports) {
'use strict';

/*
	Check if a string represents a valid POSIX shell name, as specified in
	http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_231
*/

module.exports = function isValidName(text) {
	return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(text);
};

},{}],"2cGE8":[function(require,module,exports) {
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var curry = _interopDefault(require('curry'));

function replace(oldItem, newItem, array) {
	return array.map(item => {
		if (item === oldItem) {
			return newItem;
		}

		return item;
	});
}

var main = curry(replace);

module.exports = main;

},{"curry":"2r7cF"}],"2r7cF":[function(require,module,exports) {
var slice = Array.prototype.slice;
var toArray = function(a){ return slice.call(a) }
var tail = function(a){ return slice.call(a, 1) }

// fn, [value] -> fn
//-- create a curried function, incorporating any number of
//-- pre-existing arguments (e.g. if you're further currying a function).
var createFn = function(fn, args, totalArity){
    var remainingArity = totalArity - args.length;

    switch (remainingArity) {
        case 0: return function(){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 1: return function(a){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 2: return function(a,b){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 3: return function(a,b,c){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 4: return function(a,b,c,d){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 5: return function(a,b,c,d,e){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 6: return function(a,b,c,d,e,f){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 7: return function(a,b,c,d,e,f,g){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 8: return function(a,b,c,d,e,f,g,h){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 9: return function(a,b,c,d,e,f,g,h,i){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        case 10: return function(a,b,c,d,e,f,g,h,i,j){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
        default: return createEvalFn(fn, args, remainingArity);
    }
}

// [value], arguments -> [value]
//-- concat new arguments onto old arguments array
var concatArgs = function(args1, args2){
    return args1.concat(toArray(args2));
}

// fn, [value], int -> fn
//-- create a function of the correct arity by the use of eval,
//-- so that curry can handle functions of any arity
var createEvalFn = function(fn, args, arity){
    var argList = makeArgList(arity);

    //-- hack for IE's faulty eval parsing -- http://stackoverflow.com/a/6807726
    var fnStr = 'false||' +
                'function(' + argList + '){ return processInvocation(fn, concatArgs(args, arguments)); }';
    return eval(fnStr);
}

var makeArgList = function(len){
    var a = [];
    for ( var i = 0; i < len; i += 1 ) a.push('a' + i.toString());
    return a.join(',');
}

var trimArrLength = function(arr, length){
    if ( arr.length > length ) return arr.slice(0, length);
    else return arr;
}

// fn, [value] -> value
//-- handle a function being invoked.
//-- if the arg list is long enough, the function will be called
//-- otherwise, a new curried version is created.
var processInvocation = function(fn, argsArr, totalArity){
    argsArr = trimArrLength(argsArr, totalArity);

    if ( argsArr.length === totalArity ) return fn.apply(null, argsArr);
    return createFn(fn, argsArr, totalArity);
}

// fn -> fn
//-- curries a function! <3
var curry = function(fn){
    return createFn(fn, [], fn.length);
}

// num, fn -> fn
//-- curries a function to a certain arity! <33
curry.to = curry(function(arity, fn){
    return createFn(fn, [], arity);
});

// num, fn -> fn
//-- adapts a function in the context-first style
//-- to a curried version. <3333
curry.adaptTo = curry(function(num, fn){
    return curry.to(num, function(context){
        var args = tail(arguments).concat(context);
        return fn.apply(this, args);
    });
})

// fn -> fn
//-- adapts a function in the context-first style to
//-- a curried version. <333
curry.adapt = function(fn){
    return curry.adaptTo(fn.length, fn)
}


module.exports = curry;

},{}],"5qDTw":[function(require,module,exports) {
'use strict';

const bashAliasSubstitution = require('./rules/alias-substitution');

const name = '[a-zA-Z_][a-zA-Z0-9_]*';

const parameterOperators = {
	// This is referred to as Substring Expansion.
	// It expands to up to length characters of the value
	// of parameter starting at the character specified by offset.
	[`^(${name}):([^:]*):?([^:]*)$`]: {
		op: 'substring',
		parameter: m => m[1],
		offset: m => parseInt(m[2], 10),
		length: m => parseInt(m[3], 10) || undefined
	},

	// Expands to the names of variables whose names begin with prefix,
	// separated by the first character of the IFS special variable.
	// When ‘@’ is used and the expansion appears within double quotes,
	// each variable name expands to a separate word.
	// TODO: @ case may need some investigation, maybe it's not actually possible
	[`^!(${name})(\\*|@)$`]: {
		op: 'prefix',
		prefix: m => m[1],
		expandWords: m => m[2] === '@',
		parameter: () => undefined
	},

	// If name is an array variable, expands to the list of array indices
	// (keys) assigned in name. If name is not an array, expands to 0 if
	// name is set and null otherwise. When ‘@’ is used and the expansion
	// appears within double quotes, each key expands to a separate word.
	// TODO: @ case may need some investigation, maybe it's not actually possible
	[`^!(${name})(\\[\\*\\]|\\[@\\])$`]: {
		op: 'arrayIndices',
		parameter: m => m[1],
		expandWords: m => m[2] === '[@]'
	},

	// Parameter is expanded and the longest match of pattern against its
	// value is replaced with string. If pattern begins with ‘/’, all matches
	// of pattern are replaced with string.
	[`^(${name})\\/(\\/)?([^\\/])+\\/(.*)$`]: {
		op: 'stringReplace',
		parameter: m => m[1],
		substitute: m => m[3],
		replace: m => m[4],
		globally: m => m[2] === '/'
	},

	// This expansion modifies the case of alphabetic characters in parameter.
	// The pattern is expanded to produce a pattern just as in filename expansion.
	// Each character in the expanded value of parameter is tested against pattern,
	// and, if it matches the pattern, its case is converted. The pattern should
	// not attempt to match more than one character. The ‘^’ operator converts
	// lowercase letters matching pattern to uppercase; the ‘,’ operator converts
	// matching uppercase letters to lowercase. The ‘^^’ and ‘,,’ expansions convert
	// each matched character in the expanded value; the ‘^’ and ‘,’ expansions match
	// and convert only the first character in the expanded value. If pattern is omitted,
	// it is treated like a ‘?’, which matches every character. If parameter is ‘@’
	// or ‘*’, the case modification operation is applied to each positional parameter
	// in turn, and the expansion is the resultant list. If parameter is an array variable
	// subscripted with ‘@’ or ‘*’, the case modification operation is applied to each
	// member of the array in turn, and the expansion is the resultant list.
	[`^(${name})(\\^\\^|\\^|,,|,)(.*)$`]: {
		op: 'caseChange',
		parameter: m => m[1],
		pattern: m => m[3] || '?',
		case: m => m[2][0] === ',' ? 'lower' : 'upper',
		globally: m => m[2].length === 2
	},

	// The expansion is either a transformation of the value of parameter or information about
	// parameter itself, depending on the value of operator. Each operator is a single letter:
	//
	// Q - The expansion is a string that is the value of parameter quoted in a format that can
	// 	be reused as input.
	// E - The expansion is a string that is the value of parameter with backslash escape
	// 	sequences expanded as with the $'…' quoting mechansim.
	// P - The expansion is a string that is the result of expanding the value of parameter
	// 	as if it were a prompt string (see Controlling the Prompt).
	// A - The expansion is a string in the form of an assignment statement or declare command
	// 	that, if evaluated, will recreate parameter with its attributes and value.
	// a - The expansion is a string consisting of flag values representing parameter’s attributes.
	//
	// If parameter is ‘@’ or ‘*’, the operation is applied to each positional parameter in turn,
	// and the expansion is the resultant list. If parameter is an array variable subscripted
	// with ‘@’ or ‘*’, the operation is applied to each member of the array in turn, and the
	// expansion is the resultant list.
	// The result of the expansion is subject to word splitting and pathname expansion as
	// described below.
	[`^(${name})@([Q|E|P|A|a])$`]: {
		op: 'transformation',
		parameter: m => m[1],
		kind: m => {
			switch (m[2]) {
				case 'Q': return 'quoted';
				case 'E': return 'escape';
				case 'P': return 'prompt';
				case 'A': return 'assignment';
				case 'a': return 'flags';
				default: return 'unknown';
			}
		}
	},

	// If the first character of parameter is an exclamation point (!), and parameter is not
	// a nameref, it introduces a level of variable indirection. Bash uses the value of the
	// variable formed from the rest of parameter as the name of the variable; this variable
	// is then expanded and that value is used in the rest of the substitution, rather than
	// the value of parameter itself. This is known as indirect expansion. If parameter is a
	// nameref, this expands to the name of the variable referenced by parameter instead of
	// performing the complete indirect expansion. The exceptions to this are the expansions
	// of ${!prefix*} and ${!name[@]} described below. The exclamation point must immediately
	// follow the left brace in order to introduce indirection.
	[`^!(.+)$`]: {
		op: 'indirection',
		word: m => m[1],
		parameter: () => undefined
	}
};

module.exports = {
	inherits: 'posix',
	init: (posixMode, utils) => {
		const phaseCatalog = Object.assign(
			{},
			posixMode.phaseCatalog,
			{bashAliasSubstitution}
		);

		const lexerPhases = utils.replaceRule(
			phaseCatalog.aliasSubstitution,
			bashAliasSubstitution,
			posixMode.lexerPhases
		);

		const bashOperators = Object.assign(
			parameterOperators,
			posixMode.enums.parameterOperators
		);

		const enums = Object.assign(
			{},
			posixMode.enums,
			{parameterOperators: bashOperators}
		);

		return Object.assign(
			{},
			posixMode,
			{phaseCatalog, lexerPhases, enums}
		);
	}
};

},{"./rules/alias-substitution":"43DUp"}],"43DUp":[function(require,module,exports) {
'use strict';

const compose = require('compose-function');
const identity = require('identity-function');
const map = require('map-iterable');
const values = require('object-values');
const merge = require('transform-spread-iterable');
const tokens = require('../../../utils/tokens');

const expandAlias = (preAliasLexer, resolveAlias, reservedWords) => {
	function * tryExpandToken(token, expandingAliases) {
		if (expandingAliases.indexOf(token.value) !== -1) {
			yield token;
			return;
		}
		const result = resolveAlias(token.value);
		if (result === undefined) {
			yield token;
		} else {
			for (const newToken of preAliasLexer(result)) {
				if (newToken.is('WORD') || reservedWords.some(word => newToken.is(word))) {
					yield * tryExpandToken(
						newToken,
						expandingAliases.concat(token.value)
					);
				} else if (!newToken.is('EOF')) {
					yield newToken;
				}
			}
		}
	}

	function expandToken(tk) {
		return Array.from(tryExpandToken(tk, []));
	}

	const visitor = {
		WORD: expandToken
	};

	reservedWords.forEach(w => {
		visitor[w] = expandToken;
	});
	return visitor;
};

module.exports = (options, mode, previousPhases) => {
	if (typeof options.resolveAlias !== 'function') {
		return identity;
	}

	const preAliasLexer = compose.apply(null, previousPhases.reverse());
	const visitor = expandAlias(preAliasLexer, options.resolveAlias, values(mode.enums.reservedWords));

	return compose(
		merge,
		map(
			tokens.applyTokenizerVisitor(visitor)
		)
	);
};

},{"compose-function":"4PPUu","identity-function":"4EFmd","map-iterable":"2drce","object-values":"5biiv","transform-spread-iterable":"7myx7","../../../utils/tokens":"4SrYh"}],"4EFmd":[function(require,module,exports) {
module.exports = function (x) { return x }

},{}],"2drce":[function(require,module,exports) {
'use strict';

const curry = require('curry');
const isIterable = require('is-iterable');

function initDefault(data) {
	return data;
}

function map(options, data) {
	if (typeof options !== 'function' && (typeof options !== 'object' || options === null)) {
		throw new TypeError('Callback argument must be a function or option object');
	}

	if (!isIterable(data)) {
		throw new TypeError('Data argument must be an iterable');
	}

	let idx = 0;

	const init = options.init || initDefault;
	const callback = options.callback || options;

	const ctx = init(data);
	const dataIterator = data[Symbol.iterator]();

	return {
		[Symbol.iterator]() {
			return this;
		},

		next() {
			const item = dataIterator.next();
			if (!item.done) {
				item.value = callback(item.value, idx++, ctx);
			}
			return item;
		}
	};
}

module.exports = curry(map);

},{"curry":"2r7cF","is-iterable":"5AUeA"}],"5AUeA":[function(require,module,exports) {
'use strict';
module.exports = function (val) {
	return (typeof Symbol !== 'undefined' && Symbol && 'iterator' in Symbol
		&& val != null && typeof val[Symbol.iterator] === 'function');
};

},{}],"5biiv":[function(require,module,exports) {
'use strict';
module.exports = function (obj) {
	var keys = Object.keys(obj);
	var ret = [];

	for (var i = 0; i < keys.length; i++) {
		ret.push(obj[keys[i]]);
	}

	return ret;
};

},{}],"7myx7":[function(require,module,exports) {
'use strict';

function * spread(source) {
	for (const item of source) {
		if (typeof item[Symbol.iterator] === 'function') {
			yield * item;
		} else {
			yield item;
		}
	}
}

module.exports = spread;

},{}],"2Ma3J":[function(require,module,exports) {
'use strict';

const astBuilder = require('./ast-builder');
const tokenizer = require('./tokenizer');
const phaseCatalog = require('./rules');
const grammarSource = require('./grammar');
const enums = require('./enums');

const lexerPhases = () => [
	phaseCatalog.newLineList,
	phaseCatalog.operatorTokens,
	phaseCatalog.separator,
	phaseCatalog.reservedWords,
	phaseCatalog.linebreakIn,
	phaseCatalog.ioNumber,
	phaseCatalog.identifyMaybeSimpleCommands,
	phaseCatalog.assignmentWord,
	phaseCatalog.parameterExpansion,
	phaseCatalog.arithmeticExpansion,
	phaseCatalog.commandExpansion,
	phaseCatalog.forNameVariable,
	phaseCatalog.functionName,
	phaseCatalog.identifySimpleCommandNames,
	// utils.loggerPhase('pre'),
	phaseCatalog.aliasSubstitution,
	// utils.loggerPhase('post'),
	phaseCatalog.tildeExpanding,
	phaseCatalog.parameterExpansion.resolve,
	phaseCatalog.commandExpansion.resolve,
	phaseCatalog.arithmeticExpansion.resolve,
	phaseCatalog.fieldSplitting.split,
	phaseCatalog.pathExpansion,
	phaseCatalog.quoteRemoval,
	phaseCatalog.syntaxerrorOnContinue,
	phaseCatalog.defaultNodeType
	// utils.loggerPhase('tokenizer'),
];

module.exports = {
	inherits: null,
	init: (posixMode, utils) => {
		let grammar = null;
		try {
			grammar = require('./built-grammar');
		} catch (err) {}
		return {
			enums,
			phaseCatalog,
			lexerPhases: lexerPhases(utils),
			tokenizer,
			grammarSource,
			grammar,
			astBuilder
		};
	}
};

},{"./ast-builder":"6jcrV","./tokenizer":"3DmGx","./rules":"2RPUb","./grammar":"1F5V7","./enums":"3vTtt","./built-grammar":"5AquM"}],"6jcrV":[function(require,module,exports) {
'use strict';

module.exports = options => {
	const builder = {};
	mkListHelper(builder, 'caseList');
	mkListHelper(builder, 'pattern');
	mkListHelper(builder, 'prefix');
	mkListHelper(builder, 'suffix');

	builder.caseItem = (pattern, body, locStart, locEnd) => {
		const type = 'CaseItem';
		const node = {type, pattern, body};

		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
		}

		return node;
	};

	builder.caseClause = (clause, cases, locStart, locEnd) => {
		const type = 'Case';
		const node = {type, clause};

		if (cases) {
			Object.assign(node, {cases});
		}

		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
		}

		return node;
	};

	builder.doGroup = (group, locStart, locEnd) => {
		if (options.insertLOC) {
			setLocEnd(setLocStart(group.loc, locStart), locEnd);
		}
		return group;
	};

	builder.braceGroup = (group, locStart, locEnd) => {
		if (options.insertLOC) {
			setLocEnd(setLocStart(group.loc, locStart), locEnd);
		}
		return group;
	};

	builder.list = logicalExpression => {
		const node = {type: 'Script', commands: [logicalExpression]};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, logicalExpression.loc), logicalExpression.loc);
		}
		return node;
	};

	function isAsyncSeparator(separator) {
		return separator.text.indexOf('&') !== -1;
	}

	const last = require('array-last');

	builder.checkAsync = (list, separator) => {
		if (isAsyncSeparator(separator)) {
			last(list.commands).async = true;
		}
		return list;
	};

	builder.listAppend = (list, logicalExpression, separator) => {
		if (isAsyncSeparator(separator)) {
			last(list.commands).async = true;
		}
		list.commands.push(logicalExpression);
		if (options.insertLOC) {
			setLocEnd(list.loc, logicalExpression.loc);
		}
		return list;
	};

	builder.addRedirections = (compoundCommand, redirectList) => {
		compoundCommand.redirections = redirectList;
		if (options.insertLOC) {
			const lastRedirect = redirectList[redirectList.length - 1];
			setLocEnd(compoundCommand.loc, lastRedirect.loc);
		}
		return compoundCommand;
	};

	builder.term = logicalExpression => {
		const node = {type: 'CompoundList', commands: [logicalExpression]};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, logicalExpression.loc), logicalExpression.loc);
		}
		return node;
	};

	builder.termAppend = (term, logicalExpression, separator) => {
		if (isAsyncSeparator(separator)) {
			last(term.commands).async = true;
		}
		term.commands.push(logicalExpression);
		setLocEnd(term.loc, logicalExpression.loc);
		return term;
	};

	builder.subshell = (list, locStart, locEnd) => {
		const node = {type: 'Subshell', list};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
		}
		return node;
	};

	builder.pipeSequence = command => {
		const node = {type: 'Pipeline', commands: [command]};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, command.loc), command.loc);
		}
		return node;
	};

	builder.pipeSequenceAppend = (pipe, command) => {
		pipe.commands.push(command);
		if (options.insertLOC) {
			setLocEnd(pipe.loc, command.loc);
		}
		return pipe;
	};

	builder.bangPipeLine = pipe => {
		const bang = true;
		if (pipe.commands.length === 1) {
			return Object.assign(pipe.commands[0], {bang});
		}
		return Object.assign(pipe, {bang});
	};

	builder.pipeLine = pipe => {
		if (pipe.commands.length === 1) {
			return pipe.commands[0];
		}
		return pipe;
	};

	builder.andAndOr = (left, right) => {
		const node = {type: 'LogicalExpression', op: 'and', left, right};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, left.loc), right.loc);
		}
		return node;
	};

	builder.orAndOr = (left, right) => {
		const node = {type: 'LogicalExpression', op: 'or', left, right};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, left.loc), right.loc);
		}
		return node;
	};

	builder.forClause = (name, wordlist, doGroup, locStart) => {
		const node = {type: 'For', name, wordlist, do: doGroup};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), doGroup.loc);
		}
		return node;
	};

	builder.forClauseDefault = (name, doGroup, locStart) => {
		const node = {type: 'For', name, do: doGroup};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), doGroup.loc);
		}
		return node;
	};

	builder.functionDefinition = (name, body) => {
		const node = {type: 'Function', name};

		node.body = body[0];

		if (body[1]) {
			node.redirections = body[1];
		}

		const endLoc = body[1] || body[0];

		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, name.loc), endLoc.loc);
		}
		return node;
	};

	builder.elseClause = (compoundList, locStart) => {
		if (options.insertLOC) {
			setLocStart(compoundList.loc, locStart.loc);
		}

		return compoundList;
	};

	// eslint-disable-next-line max-params
	builder.ifClause = (clause, then, elseBranch, locStart, locEnd) => {
		const node = {type: 'If', clause, then};

		if (elseBranch) {
			node.else = elseBranch;
		}

		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
		}

		return node;
	};

	builder.while = (clause, body, whileWord) => {
		const node = {type: 'While', clause, do: body};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, whileWord.loc), body.loc);
		}
		return node;
	};

	builder.until = (clause, body, whileWord) => {
		const node = {type: 'Until', clause, do: body};

		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, whileWord.loc), body.loc);
		}

		return node;
	};

	builder.commandName = name => name;

	builder.commandAssignment = function commandAssignment(prefix) {
		return builder.command(prefix);
	};

	builder.command = function command(prefix, command, suffix) {
		const node = {type: 'Command'};
		if (command) {
			node.name = command;
		}

		if (options.insertLOC) {
			node.loc = {};
			if (prefix) {
				const firstPrefix = prefix[0];
				node.loc.start = firstPrefix.loc.start;
			} else {
				node.loc.start = command.loc.start;
			}

			if (suffix) {
				const lastSuffix = suffix[suffix.length - 1];
				node.loc.end = lastSuffix.loc.end;
			} else if (command) {
				node.loc.end = command.loc.end;
			} else {
				const lastPrefix = prefix[prefix.length - 1];
				node.loc.end = lastPrefix.loc.end;
			}
		}

		if (prefix) {
			node.prefix = prefix;
		}
		if (suffix) {
			node.suffix = suffix;
		}
		return node;
	};

	builder.ioRedirect = (op, file) => {
		const node = {type: 'Redirect', op: op, file: file};
		if (options.insertLOC) {
			node.loc = setLocEnd(setLocStart({}, op.loc), file.loc);
		}
		return node;
	};

	builder.numberIoRedirect = (ioRedirect, numberIo) => {
		const node = Object.assign({}, ioRedirect, {numberIo});
		if (options.insertLOC) {
			setLocStart(node.loc, numberIo.loc);
		}
		return node;
	};

	return builder;
};

function setLocStart(target, source) {
	if (source) {
		target.start = source.start;
	}
	return target;
}

function setLocEnd(target, source) {
	if (source) {
		target.end = source.end;
	}
	return target;
}

function mkListHelper(builder, listName) {
	builder[listName] = item => {
		return [item];
	};
	builder[`${listName}Append`] = (list, item) => {
		list.push(item);
		return list;
	};
}

},{"array-last":"3mKEG"}],"3mKEG":[function(require,module,exports) {
/*!
 * array-last <https://github.com/jonschlinkert/array-last>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber = require('is-number');

module.exports = function last(arr, n) {
  if (!Array.isArray(arr)) {
    throw new Error('expected the first argument to be an array');
  }

  var len = arr.length;
  if (len === 0) {
    return null;
  }

  n = isNumber(n) ? +n : 1;
  if (n === 1) {
    return arr[len - 1];
  }

  var res = new Array(n);
  while (n--) {
    res[n] = arr[--len];
  }
  return res;
};

},{"is-number":"5BiXA"}],"5BiXA":[function(require,module,exports) {
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function isNumber(num) {
  var type = typeof num;

  if (type === 'string' || num instanceof String) {
    // an empty string would be coerced to true with the below logic
    if (!num.trim()) return false;
  } else if (type !== 'number' && !(num instanceof Number)) {
    return false;
  }

  return (num - num + 1) >= 0;
};

},{}],"3DmGx":[function(require,module,exports) {
"use strict";
const deepFreeze = require('deep-freeze');
const last = require('array-last');
const defaultFields = reducers => ({
  current: '',
  escaping: false,
  previousReducer: reducers.start,
  loc: {
    start: {
      col: 1,
      row: 1,
      char: 0
    },
    previous: null,
    current: {
      col: 1,
      row: 1,
      char: 0
    }
  }
});
const mkImmutableState = reducers => class ImmutableState {
  constructor(fields) {
    Object.assign(this, fields || defaultFields(reducers));
    deepFreeze(this);
  }
  setLoc(loc) {
    return new ImmutableState(Object.assign({}, this, {
      loc
    }));
  }
  setEscaping(escaping) {
    return new ImmutableState(Object.assign({}, this, {
      escaping
    }));
  }
  setExpansion(expansion) {
    return new ImmutableState(Object.assign({}, this, {
      expansion
    }));
  }
  setPreviousReducer(previousReducer) {
    return new ImmutableState(Object.assign({}, this, {
      previousReducer
    }));
  }
  setCurrent(current) {
    return new ImmutableState(Object.assign({}, this, {
      current
    }));
  }
  appendEmptyExpansion() {
    const expansion = (this.expansion || []).concat({
      loc: {
        start: Object.assign({}, this.loc.current)
      }
    });
    return this.setExpansion(expansion);
  }
  appendChar(char) {
    return new ImmutableState(Object.assign({}, this, {
      current: this.current + char
    }));
  }
  removeLastChar() {
    return new ImmutableState(Object.assign({}, this, {
      current: this.current.slice(0, -1)
    }));
  }
  saveCurrentLocAsStart() {
    return new ImmutableState(Object.assign({}, this, {
      loc: Object.assign({}, this.loc, {
        start: this.loc.current
      })
    }));
  }
  resetCurrent() {
    return new ImmutableState(Object.assign({}, this, {
      current: ''
    }));
  }
  advanceLoc(char) {
    const loc = Object.assign({}, this.loc, {
      current: Object.assign({}, this.loc.current),
      previous: Object.assign({}, this.loc.current)
    });
    if (char === '\n') {
      loc.current.row++;
      loc.current.col = 1;
    } else {
      loc.current.col++;
    }
    loc.current.char++;
    if (char && char.match(/\s/) && this.current === '') {
      loc.start = Object.assign({}, loc.current);
    }
    return this.setLoc(loc);
  }
};
const mkMutableState = reducers => class {
  constructor(fields) {
    Object.assign(this, fields || defaultFields(reducers));
  }
  setLoc(loc) {
    this.loc = loc;
    return this;
  }
  setEscaping(escaping) {
    this.escaping = escaping;
    return this;
  }
  setExpansion(expansion) {
    this.expansion = expansion;
    return this;
  }
  setPreviousReducer(previousReducer) {
    this.previousReducer = previousReducer;
    return this;
  }
  setCurrent(current) {
    this.current = current;
    return this;
  }
  appendEmptyExpansion() {
    this.expansion = this.expansion || [];
    this.expansion.push({
      loc: {
        start: Object.assign({}, this.loc.current)
      }
    });
    return this;
  }
  appendChar(char) {
    this.current = this.current + char;
    return this;
  }
  removeLastChar() {
    this.current = this.current.slice(0, -1);
    return this;
  }
  saveCurrentLocAsStart() {
    this.loc.start = Object.assign({}, this.loc.current);
    return this;
  }
  resetCurrent() {
    this.current = '';
    return this;
  }
  replaceLastExpansion(fields) {
    const xp = last(this.expansion);
    Object.assign(xp, fields);
    return this;
  }
  deleteLastExpansionValue() {
    const xp = last(this.expansion);
    delete xp.value;
    return this;
  }
  advanceLoc(char) {
    const loc = JSON.parse(JSON.stringify(this.loc));
    loc.previous = Object.assign({}, this.loc.current);
    if (char === '\n') {
      loc.current.row++;
      loc.current.col = 1;
    } else {
      loc.current.col++;
    }
    loc.current.char++;
    if (char && char.match(/\s/) && this.current === '') {
      loc.start = Object.assign({}, loc.current);
    }
    return this.setLoc(loc);
  }
};
module.exports = (options, reducers) => function* tokenizer(src) {
  reducers = reducers || require('./reducers');
  const State = undefined === 'development' ? mkImmutableState(reducers) : mkMutableState(reducers);
  let state = new State();
  let reduction = reducers.start;
  const source = Array.from(src);
  while (typeof reduction === 'function') {
    const char = source[0];
    const r = reduction(state, source, reducers);
    const nextReduction = r.nextReduction;
    const tokensToEmit = r.tokensToEmit;
    const nextState = r.nextState;
    if (tokensToEmit) {
      yield* tokensToEmit;
    }
    /*if (char === undefined && nextReduction === reduction) {
    throw new Error('Loop detected');
    }*/
    if (nextState) {
      state = nextState.advanceLoc(char);
    } else {
      state = state.advanceLoc(char);
    }
    reduction = nextReduction;
  }
};
module.exports.reducers = require('./reducers');

},{"deep-freeze":"7rQOe","array-last":"3mKEG","./reducers":"4cX6x"}],"7rQOe":[function(require,module,exports) {
module.exports = function deepFreeze (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};

},{}],"4cX6x":[function(require,module,exports) {
'use strict';

const end = require('./end');
const operator = require('./operator');
const comment = require('./comment');
const singleQuoting = require('./single-quoting');
const doubleQuoting = require('./double-quoting');
const expansionStart = require('./expansion-start');
const expansionCommandTick = require('./expansion-command-tick');
const start = require('./start');
const expansionArithmetic = require('./expansion-arithmetic');
const expansionSpecialParameter = require('./expansion-special-parameter');
const expansionParameter = require('./expansion-parameter');
const expansionCommandOrArithmetic = require('./expansion-command-or-arithmetic');
const expansionParameterExtended = require('./expansion-parameter-extended');

module.exports = {
	end,
	operator,
	comment,
	singleQuoting,
	doubleQuoting,
	expansionStart,
	expansionCommandTick,
	start,
	expansionArithmetic,
	expansionSpecialParameter,
	expansionParameter,
	expansionCommandOrArithmetic,
	expansionParameterExtended
};

},{"./end":"6oWBW","./operator":"7LFis","./comment":"59Lzp","./single-quoting":"6eKtQ","./double-quoting":"4O9ru","./expansion-start":"4fiCT","./expansion-command-tick":"4lqSW","./start":"52wLt","./expansion-arithmetic":"3dkO0","./expansion-special-parameter":"gnZim","./expansion-parameter":"4C4k0","./expansion-command-or-arithmetic":"t7cxk","./expansion-parameter-extended":"7xaIC"}],"6oWBW":[function(require,module,exports) {
'use strict';

const eof = require('../../../../utils/tokens').eof;

module.exports = function end() {
	return {
		nextReduction: null,
		tokensToEmit: [eof()]
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"7LFis":[function(require,module,exports) {
'use strict';

const t = require('../../../../utils/tokens');

const isPartOfOperator = t.isPartOfOperator;
const operatorTokens = t.operatorTokens;
const isOperator = t.isOperator;

module.exports = function operator(state, source, reducers) {
	const char = source && source.shift();

	// console.log('isOperator ', {state,char})

	if (char === undefined) {
		if (isOperator(state.current)) {
			return {
				nextReduction: reducers.end,
				tokensToEmit: operatorTokens(state),
				nextState: state.resetCurrent().saveCurrentLocAsStart()
			};
		}
		return reducers.start(state, char);
	}

	if (isPartOfOperator(state.current + char)) {
		return {
			nextReduction: reducers.operator,
			nextState: state.appendChar(char)
		};
	}

	let tokens = [];
	if (isOperator(state.current)) {
		// console.log('isOperator ', state.current)
		tokens = operatorTokens(state);
		state = state.resetCurrent().saveCurrentLocAsStart();
	}

	const ret = reducers.start(state, [char].concat(source), reducers);
	const nextReduction = ret.nextReduction;
	const tokensToEmit = ret.tokensToEmit;
	const nextState = ret.nextState;

	if (tokensToEmit) {
		tokens = tokens.concat(tokensToEmit);
	}
	return {
		nextReduction: nextReduction,
		tokensToEmit: tokens,
		nextState
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"59Lzp":[function(require,module,exports) {
'use strict';

const newLine = require('../../../../utils/tokens').newLine;

module.exports = function comment(state, source, reducers) {
	const char = source && source.shift();

	if (char === undefined) {
		return {
			nextReduction: reducers.end,
			nextState: state
		};
	}

	if (char === '\n') {
		return {
			tokensToEmit: [newLine()],
			nextReduction: reducers.start,
			nextState: state
		};
	}

	return {
		nextReduction: comment,
		nextState: state
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"6eKtQ":[function(require,module,exports) {
'use strict';

const t = require('../../../../utils/tokens');

const tokenOrEmpty = t.tokenOrEmpty;
const continueToken = t.continueToken;

module.exports = function singleQuoting(state, source, reducers) {
	const char = source && source.shift();

	if (char === undefined) {
		return {
			nextState: state,
			nextReduction: null,
			tokensToEmit: tokenOrEmpty(state).concat(continueToken('\''))
		};
	}

	if (char === '\'') {
		return {
			nextReduction: reducers.start,
			nextState: state.appendChar(char)
		};
	}

	return {
		nextReduction: reducers.singleQuoting,
		nextState: state.appendChar(char)
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"4O9ru":[function(require,module,exports) {
'use strict';

const t = require('../../../../utils/tokens');

const tokenOrEmpty = t.tokenOrEmpty;
const continueToken = t.continueToken;

module.exports = function doubleQuoting(state, source, reducers) {
	const char = source && source.shift();

	state = state.setPreviousReducer(doubleQuoting);

	if (char === undefined) {
		return {
			nextReduction: null,
			tokensToEmit: tokenOrEmpty(state).concat(continueToken('"')),
			nextState: state
		};
	}

	if (!state.escaping && char === '\\') {
		return {
			nextReduction: doubleQuoting,
			nextState: state.setEscaping(true).appendChar(char)
		};
	}

	if (!state.escaping && char === '"') {
		return {
			nextReduction: reducers.start,
			nextState: state.setPreviousReducer(reducers.start).appendChar(char)
		};
	}

	if (!state.escaping && char === '$') {
		return {
			nextReduction: reducers.expansionStart,
			nextState: state.appendEmptyExpansion().appendChar(char)
		};
	}

	if (!state.escaping && char === '`') {
		return {
			nextReduction: reducers.expansionCommandTick,
			nextState: state.appendEmptyExpansion().appendChar(char)
		};
	}

	return {
		nextReduction: reducers.doubleQuoting,
		nextState: state.setEscaping(false).appendChar(char)
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"4fiCT":[function(require,module,exports) {
'use strict';

function isSpecialParameter(char) {
	return char.match(/^[0-9\-!@#\?\*\$]$/);
}

module.exports = function expansionStart(state, source, reducers) {
	const char = source && source.shift();

	if (char === '{') {
		return {
			nextReduction: reducers.expansionParameterExtended,
			nextState: state.appendChar(char)
		};
	}

	if (char === '(') {
		return {
			nextReduction: reducers.expansionCommandOrArithmetic,
			nextState: state.appendChar(char)
		};
	}

	if (char.match(/[a-zA-Z_]/)) {
		return {
			nextReduction: reducers.expansionParameter,
			nextState: state.appendChar(char).replaceLastExpansion({
				parameter: char,
				type: 'parameter_expansion'
			})
		};
	}

	if (isSpecialParameter(char)) {
		return reducers.expansionSpecialParameter(state, [char].concat(source));
	}

	return state.previousReducer(state, [char].concat(source));
};

},{}],"4lqSW":[function(require,module,exports) {
'use strict';

const last = require('array-last');
const t = require('../../../../utils/tokens');

const continueToken = t.continueToken;

module.exports = function expansionCommandTick(state, source, reducers) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	if (!state.escaping && char === '`') {
		return {
			nextReduction: state.previousReducer,
			nextState: state.appendChar(char).replaceLastExpansion({
				type: 'command_expansion',
				loc: Object.assign({}, xp.loc, {end: state.loc.current})
			})
		};
	}

	if (char === undefined) {
		return {
			nextReduction: state.previousReducer,
			tokensToEmit: [continueToken('`')],
			nextState: state.replaceLastExpansion({
				loc: Object.assign({}, xp.loc, {end: state.loc.previous})
			})
		};
	}

	if (!state.escaping && char === '\\') {
		return {
			nextReduction: reducers.expansionCommandTick,
			nextState: state.appendChar(char).setEscaping(true)
		};
	}

	return {
		nextReduction: reducers.expansionCommandTick,
		nextState: state
			.setEscaping(false)
			.appendChar(char)
			.replaceLastExpansion({command: (xp.command || '') + char})
	};
};

},{"array-last":"3mKEG","../../../../utils/tokens":"4SrYh"}],"52wLt":[function(require,module,exports) {
'use strict';

const t = require('../../../../utils/tokens');

const tokenOrEmpty = t.tokenOrEmpty;
const newLine = t.newLine;
const isPartOfOperator = t.isPartOfOperator;

module.exports = function start(state, source, reducers) {
	const char = source && source.shift();

	if (char === undefined) {
		return {
			nextReduction: reducers.end,
			tokensToEmit: tokenOrEmpty(state),
			nextState: state.resetCurrent().saveCurrentLocAsStart()
		};
	}

	if (state.escaping && char === '\n') {
		return {
			nextReduction: reducers.start,
			nextState: state.setEscaping(false).removeLastChar()
		};
	}

	if (!state.escaping && char === '#' && state.current === '') {
		return {
			nextReduction: reducers.comment
		};
	}

	if (!state.escaping && char === '\n') {
		return {
			nextReduction: reducers.start,
			tokensToEmit: tokenOrEmpty(state).concat(newLine()),
			nextState: state.resetCurrent().saveCurrentLocAsStart()
		};
	}

	if (!state.escaping && char === '\\') {
		return {
			nextReduction: reducers.start,
			nextState: state.setEscaping(true).appendChar(char)
		};
	}

	if (!state.escaping && isPartOfOperator(char)) {
		return {
			nextReduction: reducers.operator,
			tokensToEmit: tokenOrEmpty(state),
			nextState: state.setCurrent(char).saveCurrentLocAsStart()
		};
	}

	if (!state.escaping && char === '\'') {
		return {
			nextReduction: reducers.singleQuoting,
			nextState: state.appendChar(char)
		};
	}

	if (!state.escaping && char === '"') {
		return {
			nextReduction: reducers.doubleQuoting,
			nextState: state.appendChar(char)
		};
	}

	if (!state.escaping && char.match(/\s/)) {
		return {
			nextReduction: reducers.start,
			tokensToEmit: tokenOrEmpty(state),
			nextState: state.resetCurrent().saveCurrentLocAsStart().setExpansion([])
		};
	}

	if (!state.escaping && char === '$') {
		return {
			nextReduction: reducers.expansionStart,
			nextState: state.appendChar(char).appendEmptyExpansion()
		};
	}

	if (!state.escaping && char === '`') {
		return {
			nextReduction: reducers.expansionCommandTick,
			nextState: state.appendChar(char).appendEmptyExpansion()
		};
	}

	return {
		nextReduction: reducers.start,
		nextState: state.appendChar(char).setEscaping(false)
	};
};

},{"../../../../utils/tokens":"4SrYh"}],"3dkO0":[function(require,module,exports) {
'use strict';

const last = require('array-last');
const t = require('../../../../utils/tokens');

const continueToken = t.continueToken;

module.exports = function expansionArithmetic(state, source) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	if (char === ')' && state.current.slice(-1)[0] === ')') {
		return {
			nextReduction: state.previousReducer,
			nextState: state
				.appendChar(char)
				.replaceLastExpansion({
					type: 'arithmetic_expansion',
					expression: xp.value.slice(0, -1),
					loc: Object.assign({}, xp.loc, {end: state.loc.current})
				})
				.deleteLastExpansionValue()
		};
	}

	if (char === undefined) {
		return {
			nextReduction: state.previousReducer,
			tokensToEmit: [continueToken('$((')],
			nextState: state.replaceLastExpansion({
				loc: Object.assign({}, xp.loc, {end: state.loc.previous})
			})
		};
	}

	return {
		nextReduction: expansionArithmetic,
		nextState: state.appendChar(char).replaceLastExpansion({value: (xp.value || '') + char})
	};
};

},{"array-last":"3mKEG","../../../../utils/tokens":"4SrYh"}],"gnZim":[function(require,module,exports) {
'use strict';

const last = require('array-last');

module.exports = function expansionSpecialParameter(state, source) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	return {
		nextReduction: state.previousReducer,
		nextState: state.appendChar(char).replaceLastExpansion({
			parameter: char,
			type: 'parameter_expansion',
			loc: Object.assign({}, xp.loc, {end: state.loc.current})
		})
	};
};

},{"array-last":"3mKEG"}],"4C4k0":[function(require,module,exports) {
'use strict';

const last = require('array-last');

module.exports = function expansionParameter(state, source, reducers) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	if (char === undefined) {
		return {
			nextReduction: reducers.start,
			nextState: state.replaceLastExpansion({
				loc: Object.assign({}, xp.loc, {end: state.loc.previous})
			})
		};
	}

	if (char.match(/[0-9a-zA-Z_]/)) {
		return {
			nextReduction: reducers.expansionParameter,
			nextState: state.appendChar(char).replaceLastExpansion({
				parameter: xp.parameter + (char || '')
			})
		};
	}

	return state.previousReducer(
		state.replaceLastExpansion({loc: Object.assign({}, xp.loc, {end: state.loc.previous})}),
		[char].concat(source),
		reducers
	);
};

},{"array-last":"3mKEG"}],"t7cxk":[function(require,module,exports) {
'use strict';

const last = require('array-last');
const t = require('../../../../utils/tokens');

const continueToken = t.continueToken;

module.exports = function expansionCommandOrArithmetic(state, source, reducers) {
	const char = source && source.shift();
	const xp = last(state.expansion);

	if (char === '(' && state.current.slice(-2) === '$(') {
		return {
			nextReduction: reducers.expansionArithmetic,
			nextState: state.appendChar(char)
		};
	}

	if (char === undefined) {
		return {
			nextReduction: state.previousReducer,
			tokensToEmit: [continueToken('$(')],
			nextState: state.replaceLastExpansion({
				loc: Object.assign({}, xp.loc, {end: state.loc.previous})
			})
		};
	}

	if (char === ')') {
		return {
			nextReduction: state.previousReducer,
			nextState: state.appendChar(char).replaceLastExpansion({
				type: 'command_expansion',
				loc: Object.assign({}, xp.loc, {
					end: state.loc.current
				})
			})
		};
	}

	return {
		nextReduction: reducers.expansionCommandOrArithmetic,
		nextState: state.appendChar(char).replaceLastExpansion({command: (xp.command || '') + char})
	};
};

},{"array-last":"3mKEG","../../../../utils/tokens":"4SrYh"}],"7xaIC":[function(require,module,exports) {
'use strict';

const last = require('array-last');
const t = require('../../../../utils/tokens');

const continueToken = t.continueToken;

module.exports = function expansionParameterExtended(state, source, reducers) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	if (char === '}') {
		return {
			nextReduction: state.previousReducer,
			nextState: state.appendChar(char).replaceLastExpansion({
				type: 'parameter_expansion',
				loc: Object.assign({}, xp.loc, {end: state.loc.current})
			})
		};
	}

	if (char === undefined) {
		return {
			nextReduction: state.previousReducer,
			tokensToEmit: [continueToken('${')],
			nextState: state.replaceLastExpansion({
				loc: Object.assign({}, xp.loc, {end: state.loc.previous})
			})
		};
	}

	return {
		nextReduction: reducers.expansionParameterExtended,
		nextState: state
			.appendChar(char)
			.replaceLastExpansion({parameter: (xp.parameter || '') + char})
	};
};

},{"array-last":"3mKEG","../../../../utils/tokens":"4SrYh"}],"2RPUb":[function(require,module,exports) {
'use strict';

exports.parameterExpansion = require('./parameter-expansion');
exports.commandExpansion = require('./command-expansion');
exports.arithmeticExpansion = require('./arithmetic-expansion');
exports.aliasSubstitution = require('./alias-substitution');
exports.defaultNodeType = require('./default-node-type');
exports.fieldSplitting = require('./field-splitting');
exports.tildeExpanding = require('./tilde-expanding');
exports.pathExpansion = require('./path-expansion');
exports.quoteRemoval = require('./quote-removal');
exports.identifySimpleCommandNames = require('./identify-simplecommand-names');
exports.identifyMaybeSimpleCommands = require('./identify-maybe-simple-commands');
exports.operatorTokens = require('./operator-tokens');
exports.reservedWords = require('./reserved-words');
exports.separator = require('./separator');
exports.linebreakIn = require('./linebreak-in');
exports.forNameVariable = require('./for-name-variable');
exports.functionName = require('./function-name');
exports.ioNumber = require('./io-number');
// exports.removeTempObject = require('./remove-temp-object');
exports.newLineList = require('./new-line-list');
exports.assignmentWord = require('./assignment-word');
exports.syntaxerrorOnContinue = require('./syntaxerror-oncontinue');

},{"./parameter-expansion":"4MUer","./command-expansion":"2i8st","./arithmetic-expansion":"5Xry6","./alias-substitution":"24GTv","./default-node-type":"6wOrm","./field-splitting":"6SfA4","./tilde-expanding":"15RIT","./path-expansion":"6pnVz","./quote-removal":"4lt99","./identify-simplecommand-names":"5G5at","./identify-maybe-simple-commands":"52EKe","./operator-tokens":"4P3xq","./reserved-words":"6oUQP","./separator":"6M5m9","./linebreak-in":"4MFCz","./for-name-variable":"4Z6Te","./function-name":"2OpZk","./io-number":"67MU1","./new-line-list":"4cdot","./assignment-word":"7hA4r","./syntaxerror-oncontinue":"2wSBx"}],"4MUer":[function(require,module,exports) {
'use strict';
const mapObj = require('map-obj');
const filter = require('filter-obj');
const map = require('map-iterable');
const pairs = require('object-pairs');
const MagicString = require('magic-string');
const tokens = require('../../../utils/tokens');
const fieldSplitting = require('./field-splitting');

const handleParameter = (obj, match) => {
	const ret = mapObj(obj, (k, v) => {
		if (typeof v === 'function') {
			const val = v(match);
			return [k, val];
		}

		if (typeof v === 'object' && k !== 'expand') {
			return [k, handleParameter(v, match)];
		}

		return [k, v];
	});

	if (ret.expand) {
		const bashParser = require('../../../index');

		for (const prop of ret.expand) {
			const ast = bashParser(ret[prop], {mode: 'word-expansion'});
			ret[prop] = ast.commands[0].name;
		}
		delete ret.expand;
	}

	return ret;
};

function expandParameter(xp, enums) {
	let parameter = xp.parameter;

	for (const pair of pairs(enums.parameterOperators)) {
		const re = new RegExp(pair[0]);

		const match = parameter.match(re);

		if (match) {
			const opProps = handleParameter(pair[1], match);

			return filter(Object.assign(
				xp,
				opProps
			), (k, v) => v !== undefined);
		}
	}

	return xp;
}

// RULE 5 - If the current character is an unquoted '$' or '`', the shell shall
// identify the start of any candidates for parameter expansion (Parameter Expansion),
// command substitution (Command Substitution), or arithmetic expansion (Arithmetic
// Expansion) from their introductory unquoted character sequences: '$' or "${", "$("
// or '`', and "$((", respectively.
const parameterExpansion = (options, mode) => map(token => {
	if (token.is('WORD') || token.is('ASSIGNMENT_WORD')) {
		if (!token.expansion || token.expansion.length === 0) {
			return token;
		}

		return tokens.setExpansions(token, token.expansion.map(xp => {
			if (xp.type === 'parameter_expansion') {
				return expandParameter(xp, mode.enums);
			}

			return xp;
		}));
	}
	return token;
});

parameterExpansion.resolve = options => map(token => {
	if (token.is('WORD') || token.is('ASSIGNMENT_WORD')) {
		if (!options.resolveParameter || !token.expansion || token.expansion.length === 0) {
			return token;
		}

		const value = token.value;

		const magic = new MagicString(value);
		for (const xp of token.expansion) {
			if (xp.type === 'parameter_expansion') {
				const result = options.resolveParameter(xp);
				xp.resolved = true;
				magic.overwrite(
					xp.loc.start,
					xp.loc.end + 1,
					fieldSplitting.mark(result, value, options)
				);
			}
		}
		return tokens.alterValue(token, magic.toString());
	}
	return token;
});

module.exports = parameterExpansion;

},{"map-obj":"5Z3LY","filter-obj":"2VABy","map-iterable":"2drce","object-pairs":"5JWQV","magic-string":"1DXOW","../../../utils/tokens":"4SrYh","./field-splitting":"6SfA4","../../../index":"4VTXg"}],"5Z3LY":[function(require,module,exports) {
'use strict';

// customized for this use-case
const isObject = x =>
	typeof x === 'object' &&
	x !== null &&
	!(x instanceof RegExp) &&
	!(x instanceof Error) &&
	!(x instanceof Date);

module.exports = function mapObj(obj, fn, opts, seen) {
	opts = Object.assign({
		deep: false,
		target: {}
	}, opts);

	seen = seen || new WeakMap();

	if (seen.has(obj)) {
		return seen.get(obj);
	}

	seen.set(obj, opts.target);

	const target = opts.target;
	delete opts.target;

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (opts.deep && isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map(x => isObject(x) ? mapObj(x, fn, opts, seen) : x);
			} else {
				newVal = mapObj(newVal, fn, opts, seen);
			}
		}

		target[res[0]] = newVal;
	}

	return target;
};

},{}],"5JWQV":[function(require,module,exports) {
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]];
  });
};

},{}],"1DXOW":[function(require,module,exports) {
"use strict";
var Buffer = require("buffer").Buffer;
var vlq = require('vlq');
function Chunk(start, end, content) {
  this.start = start;
  this.end = end;
  this.original = content;
  this.intro = '';
  this.outro = '';
  this.content = content;
  this.storeName = false;
  this.edited = false;
  // we make these non-enumerable, for sanity while debugging
  Object.defineProperties(this, {
    previous: {
      writable: true,
      value: null
    },
    next: {
      writable: true,
      value: null
    }
  });
}
Chunk.prototype = {
  append: function append(content) {
    this.outro += content;
  },
  clone: function clone() {
    var chunk = new Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  },
  contains: function contains(index) {
    return this.start < index && index < this.end;
  },
  eachNext: function eachNext(fn) {
    var chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  },
  eachPrevious: function eachPrevious(fn) {
    var chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  },
  edit: function edit(content, storeName) {
    this.content = content;
    this.intro = '';
    this.outro = '';
    this.storeName = storeName;
    this.edited = true;
    return this;
  },
  prepend: function prepend(content) {
    this.intro = content + this.intro;
  },
  split: function split(index) {
    var sliceIndex = index - this.start;
    var originalBefore = this.original.slice(0, sliceIndex);
    var originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    var newChunk = new Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = '';
    this.end = index;
    if (this.edited) {
      // TODO is this block necessary?...
      newChunk.edit('', false);
      this.content = '';
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next) newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  },
  toString: function toString() {
    return this.intro + this.content + this.outro;
  },
  trimEnd: function trimEnd(rx) {
    this.outro = this.outro.replace(rx, '');
    if (this.outro.length) return true;
    var trimmed = this.content.replace(rx, '');
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit('', false);
      }
      return true;
    } else {
      this.edit('', false);
      this.intro = this.intro.replace(rx, '');
      if (this.intro.length) return true;
    }
  },
  trimStart: function trimStart(rx) {
    this.intro = this.intro.replace(rx, '');
    if (this.intro.length) return true;
    var trimmed = this.content.replace(rx, '');
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.end - trimmed.length);
        this.edit('', false);
      }
      return true;
    } else {
      this.edit('', false);
      this.outro = this.outro.replace(rx, '');
      if (this.outro.length) return true;
    }
  }
};
var _btoa;
if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
  _btoa = window.btoa;
} else if (typeof Buffer === 'function') {
  _btoa = function (str) {
    return new Buffer(str).toString('base64');
  };
} else {
  _btoa = function () {
    throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
  };
}
var btoa = _btoa;
function SourceMap(properties) {
  this.version = 3;
  this.file = properties.file;
  this.sources = properties.sources;
  this.sourcesContent = properties.sourcesContent;
  this.names = properties.names;
  this.mappings = properties.mappings;
}
SourceMap.prototype = {
  toString: function toString() {
    return JSON.stringify(this);
  },
  toUrl: function toUrl() {
    return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
  }
};
function guessIndent(code) {
  var lines = code.split('\n');
  var tabbed = lines.filter(function (line) {
    return (/^\t+/).test(line);
  });
  var spaced = lines.filter(function (line) {
    return (/^ {2,}/).test(line);
  });
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  // More lines tabbed than spaced? Assume tabs, and
  // default to tabs in the case of a tie (or nothing
  // to go on)
  if (tabbed.length >= spaced.length) {
    return '\t';
  }
  // Otherwise, we need to guess the multiple
  var min = spaced.reduce(function (previous, current) {
    var numSpaces = (/^ +/).exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(' ');
}
function getSemis(str) {
  return new Array(str.split('\n').length).join(';');
}
function getLocator(source) {
  var originalLines = source.split('\n');
  var start = 0;
  var lineRanges = originalLines.map(function (line, i) {
    var end = start + line.length + 1;
    var range = {
      start: start,
      end: end,
      line: i
    };
    start = end;
    return range;
  });
  var i = 0;
  function rangeContains(range, index) {
    return range.start <= index && index < range.end;
  }
  function getLocation(range, index) {
    return {
      line: range.line,
      column: index - range.start
    };
  }
  return function locate(index) {
    var range = lineRanges[i];
    var d = index >= range.end ? 1 : -1;
    while (range) {
      if (rangeContains(range, index)) return getLocation(range, index);
      i += d;
      range = lineRanges[i];
    }
  };
}
var nonWhitespace = /\S/;
function encodeMappings(original, intro, outro, chunk, hires, sourcemapLocations, sourceIndex, offsets, names) {
  var rawLines = [];
  var generatedCodeLine = intro.split('\n').length - 1;
  var rawSegments = rawLines[generatedCodeLine] = [];
  var generatedCodeColumn = 0;
  var locate = getLocator(original);
  function addEdit(content, original, loc, nameIndex, i) {
    if (i || content.length && nonWhitespace.test(content)) {
      rawSegments.push({
        generatedCodeLine: generatedCodeLine,
        generatedCodeColumn: generatedCodeColumn,
        sourceCodeLine: loc.line,
        sourceCodeColumn: loc.column,
        sourceCodeName: nameIndex,
        sourceIndex: sourceIndex
      });
    }
    var lines = content.split('\n');
    var lastLine = lines.pop();
    if (lines.length) {
      generatedCodeLine += lines.length;
      rawLines[generatedCodeLine] = rawSegments = [];
      generatedCodeColumn = lastLine.length;
    } else {
      generatedCodeColumn += lastLine.length;
    }
    lines = original.split('\n');
    lastLine = lines.pop();
    if (lines.length) {
      loc.line += lines.length;
      loc.column = lastLine.length;
    } else {
      loc.column += lastLine.length;
    }
  }
  function addUneditedChunk(chunk, loc) {
    var originalCharIndex = chunk.start;
    var first = true;
    while (originalCharIndex < chunk.end) {
      if (hires || first || sourcemapLocations[originalCharIndex]) {
        rawSegments.push({
          generatedCodeLine: generatedCodeLine,
          generatedCodeColumn: generatedCodeColumn,
          sourceCodeLine: loc.line,
          sourceCodeColumn: loc.column,
          sourceCodeName: -1,
          sourceIndex: sourceIndex
        });
      }
      if (original[originalCharIndex] === '\n') {
        loc.line += 1;
        loc.column = 0;
        generatedCodeLine += 1;
        rawLines[generatedCodeLine] = rawSegments = [];
        generatedCodeColumn = 0;
      } else {
        loc.column += 1;
        generatedCodeColumn += 1;
      }
      originalCharIndex += 1;
      first = false;
    }
  }
  var hasContent = false;
  while (chunk) {
    var loc = locate(chunk.start);
    if (chunk.intro.length) {
      addEdit(chunk.intro, '', loc, -1, hasContent);
    }
    if (chunk.edited) {
      addEdit(chunk.content, chunk.original, loc, chunk.storeName ? names.indexOf(chunk.original) : -1, hasContent);
    } else {
      addUneditedChunk(chunk, loc);
    }
    if (chunk.outro.length) {
      addEdit(chunk.outro, '', loc, -1, hasContent);
    }
    if (chunk.content || chunk.intro || chunk.outro) hasContent = true;
    var nextChunk = chunk.next;
    chunk = nextChunk;
  }
  offsets.sourceIndex = offsets.sourceIndex || 0;
  offsets.sourceCodeLine = offsets.sourceCodeLine || 0;
  offsets.sourceCodeColumn = offsets.sourceCodeColumn || 0;
  offsets.sourceCodeName = offsets.sourceCodeName || 0;
  return rawLines.map(function (segments) {
    var generatedCodeColumn = 0;
    return segments.map(function (segment) {
      var arr = [segment.generatedCodeColumn - generatedCodeColumn, segment.sourceIndex - offsets.sourceIndex, segment.sourceCodeLine - offsets.sourceCodeLine, segment.sourceCodeColumn - offsets.sourceCodeColumn];
      generatedCodeColumn = segment.generatedCodeColumn;
      offsets.sourceIndex = segment.sourceIndex;
      offsets.sourceCodeLine = segment.sourceCodeLine;
      offsets.sourceCodeColumn = segment.sourceCodeColumn;
      if (~segment.sourceCodeName) {
        arr.push(segment.sourceCodeName - offsets.sourceCodeName);
        offsets.sourceCodeName = segment.sourceCodeName;
      }
      return vlq.encode(arr);
    }).join(',');
  }).join(';') + getSemis(outro);
}
function getRelativePath(from, to) {
  var fromParts = from.split(/[\/\\]/);
  var toParts = to.split(/[\/\\]/);
  fromParts.pop();
  // get dirname
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    var i = fromParts.length;
    while (i--) fromParts[i] = '..';
  }
  return fromParts.concat(toParts).join('/');
}
var toString = Object.prototype.toString;
function isObject(thing) {
  return toString.call(thing) === '[object Object]';
}
function MagicString(string, options) {
  if (options === void 0) options = {};
  var chunk = new Chunk(0, string.length, string);
  Object.defineProperties(this, {
    original: {
      writable: true,
      value: string
    },
    outro: {
      writable: true,
      value: ''
    },
    intro: {
      writable: true,
      value: ''
    },
    firstChunk: {
      writable: true,
      value: chunk
    },
    lastChunk: {
      writable: true,
      value: chunk
    },
    lastSearchedChunk: {
      writable: true,
      value: chunk
    },
    byStart: {
      writable: true,
      value: {}
    },
    byEnd: {
      writable: true,
      value: {}
    },
    filename: {
      writable: true,
      value: options.filename
    },
    indentExclusionRanges: {
      writable: true,
      value: options.indentExclusionRanges
    },
    sourcemapLocations: {
      writable: true,
      value: {}
    },
    storedNames: {
      writable: true,
      value: {}
    },
    indentStr: {
      writable: true,
      value: guessIndent(string)
    }
  });
  if (false) {}
  this.byStart[0] = chunk;
  this.byEnd[string.length] = chunk;
}
MagicString.prototype = {
  addSourcemapLocation: function addSourcemapLocation(char) {
    this.sourcemapLocations[char] = true;
  },
  append: function append(content) {
    if (typeof content !== 'string') throw new TypeError('outro content must be a string');
    this.outro += content;
    return this;
  },
  clone: function clone() {
    var cloned = new MagicString(this.original, {
      filename: this.filename
    });
    var originalChunk = this.firstChunk;
    var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      var nextOriginalChunk = originalChunk.next;
      var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = typeof this.indentExclusionRanges[0] === 'number' ? [this.indentExclusionRanges[0], this.indentExclusionRanges[1]] : this.indentExclusionRanges.map(function (range) {
        return [range.start, range.end];
      });
    }
    Object.keys(this.sourcemapLocations).forEach(function (loc) {
      cloned.sourcemapLocations[loc] = true;
    });
    return cloned;
  },
  generateMap: function generateMap(options) {
    options = options || ({});
    var names = Object.keys(this.storedNames);
    if (false) {}
    var map = new SourceMap({
      file: options.file ? options.file.split(/[\/\\]/).pop() : null,
      sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
      sourcesContent: options.includeContent ? [this.original] : [null],
      names: names,
      mappings: this.getMappings(options.hires, 0, {}, names)
    });
    if (false) {}
    return map;
  },
  getIndentString: function getIndentString() {
    return this.indentStr === null ? '\t' : this.indentStr;
  },
  getMappings: function getMappings(hires, sourceIndex, offsets, names) {
    return encodeMappings(this.original, this.intro, this.outro, this.firstChunk, hires, this.sourcemapLocations, sourceIndex, offsets, names);
  },
  indent: function indent(indentStr, options) {
    var this$1 = this;
    var pattern = /^[^\r\n]/gm;
    if (isObject(indentStr)) {
      options = indentStr;
      indentStr = undefined;
    }
    indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';
    if (indentStr === '') return this;
    // noop
    options = options || ({});
    // Process exclusion ranges
    var isExcluded = {};
    if (options.exclude) {
      var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
      exclusions.forEach(function (exclusion) {
        for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    var shouldIndentNextCharacter = options.indentStart !== false;
    var replacer = function (match) {
      if (shouldIndentNextCharacter) return "" + indentStr + match;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    var charIndex = 0;
    var chunk = this.firstChunk;
    while (chunk) {
      var end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            var char = this$1.original[charIndex];
            if (char === '\n') {
              shouldIndentNextCharacter = true;
            } else if (char !== '\r' && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prepend(indentStr);
              } else {
                var rhs = chunk.split(charIndex);
                rhs.prepend(indentStr);
                this$1.byStart[charIndex] = rhs;
                this$1.byEnd[charIndex] = chunk;
                chunk = rhs;
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  },
  insert: function insert() {
    throw new Error('magicString.insert(...) is deprecated. Use insertRight(...) or insertLeft(...)');
  },
  insertLeft: function insertLeft(index, content) {
    if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
    if (false) {}
    this._split(index);
    var chunk = this.byEnd[index];
    if (chunk) {
      chunk.append(content);
    } else {
      this.intro += content;
    }
    if (false) {}
    return this;
  },
  insertRight: function insertRight(index, content) {
    if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
    if (false) {}
    this._split(index);
    var chunk = this.byStart[index];
    if (chunk) {
      chunk.prepend(content);
    } else {
      this.outro += content;
    }
    if (false) {}
    return this;
  },
  move: function move(start, end, index) {
    if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');
    if (false) {}
    this._split(start);
    this._split(end);
    this._split(index);
    var first = this.byStart[start];
    var last = this.byEnd[end];
    var oldLeft = first.previous;
    var oldRight = last.next;
    var newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk) return this;
    var newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft) oldLeft.next = oldRight;
    if (oldRight) oldRight.previous = oldLeft;
    if (newLeft) newLeft.next = first;
    if (newRight) newRight.previous = last;
    if (!first.previous) this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight;
    if (!newLeft) this.firstChunk = first;
    if (!newRight) this.lastChunk = last;
    if (false) {}
    return this;
  },
  overwrite: function overwrite(start, end, content, storeName) {
    var this$1 = this;
    if (typeof content !== 'string') throw new TypeError('replacement content must be a string');
    while (start < 0) start += this$1.original.length;
    while (end < 0) end += this$1.original.length;
    if (end > this.original.length) throw new Error('end is out of bounds');
    if (start === end) throw new Error('Cannot overwrite a zero-length range – use insertLeft or insertRight instead');
    if (false) {}
    this._split(start);
    this._split(end);
    if (storeName) {
      var original = this.original.slice(start, end);
      this.storedNames[original] = true;
    }
    var first = this.byStart[start];
    var last = this.byEnd[end];
    if (first) {
      first.edit(content, storeName);
      if (first !== last) {
        var chunk = first.next;
        while (chunk !== last) {
          chunk.edit('', false);
          chunk = chunk.next;
        }
        chunk.edit('', false);
      }
    } else {
      // must be inserting at the end
      var newChunk = new Chunk(start, end, '').edit(content, storeName);
      // TODO last chunk in the array may not be the last chunk, if it's moved...
      last.next = newChunk;
      newChunk.previous = last;
    }
    if (false) {}
    return this;
  },
  prepend: function prepend(content) {
    if (typeof content !== 'string') throw new TypeError('outro content must be a string');
    this.intro = content + this.intro;
    return this;
  },
  remove: function remove(start, end) {
    var this$1 = this;
    while (start < 0) start += this$1.original.length;
    while (end < 0) end += this$1.original.length;
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
    if (start > end) throw new Error('end must be greater than start');
    return this.overwrite(start, end, '', false);
  },
  slice: function slice(start, end) {
    var this$1 = this;
    if (start === void 0) start = 0;
    if (end === void 0) end = this.original.length;
    while (start < 0) start += this$1.original.length;
    while (end < 0) end += this$1.original.length;
    var result = '';
    // find start chunk
    var chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      // found end chunk before start
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start) throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
    var startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      var containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end) throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
      var sliceStart = startChunk === chunk ? start - chunk.start : 0;
      var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  },
  // TODO deprecate this? not really very useful
  snip: function snip(start, end) {
    var clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  },
  _split: function _split(index) {
    var this$1 = this;
    if (this.byStart[index] || this.byEnd[index]) return;
    if (false) {}
    var chunk = this.lastSearchedChunk;
    var searchForward = index > chunk.end;
    while (true) {
      if (chunk.contains(index)) return this$1._splitChunk(chunk, index);
      chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
    }
  },
  _splitChunk: function _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      // zero-length edited chunks are a special case (overlapping replacements)
      var loc = getLocator(this.original)(index);
      throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + " – \"" + chunk.original + "\")");
    }
    var newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk) this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    if (false) {}
    return true;
  },
  toString: function toString() {
    var str = this.intro;
    var chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  },
  trimLines: function trimLines() {
    return this.trim('[\\r\\n]');
  },
  trim: function trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  },
  trimEnd: function trimEnd(charType) {
    var this$1 = this;
    var rx = new RegExp((charType || '\\s') + '+$');
    this.outro = this.outro.replace(rx, '');
    if (this.outro.length) return this;
    var chunk = this.lastChunk;
    do {
      var end = chunk.end;
      var aborted = chunk.trimEnd(rx);
      // if chunk was trimmed, we have a new lastChunk
      if (chunk.end !== end) {
        this$1.lastChunk = chunk.next;
        this$1.byEnd[chunk.end] = chunk;
        this$1.byStart[chunk.next.start] = chunk.next;
      }
      if (aborted) return this$1;
      chunk = chunk.previous;
    } while (chunk);
    return this;
  },
  trimStart: function trimStart(charType) {
    var this$1 = this;
    var rx = new RegExp('^' + (charType || '\\s') + '+');
    this.intro = this.intro.replace(rx, '');
    if (this.intro.length) return this;
    var chunk = this.firstChunk;
    do {
      var end = chunk.end;
      var aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        // special case...
        if (chunk === this$1.lastChunk) this$1.lastChunk = chunk.next;
        this$1.byEnd[chunk.end] = chunk;
        this$1.byStart[chunk.next.start] = chunk.next;
      }
      if (aborted) return this$1;
      chunk = chunk.next;
    } while (chunk);
    return this;
  }
};
var hasOwnProp = Object.prototype.hasOwnProperty;
function Bundle(options) {
  if (options === void 0) options = {};
  this.intro = options.intro || '';
  this.separator = options.separator !== undefined ? options.separator : '\n';
  this.sources = [];
  this.uniqueSources = [];
  this.uniqueSourceIndexByFilename = {};
}
Bundle.prototype = {
  addSource: function addSource(source) {
    if (source instanceof MagicString) {
      return this.addSource({
        content: source,
        filename: source.filename,
        separator: this.separator
      });
    }
    if (!isObject(source) || !source.content) {
      throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
    }
    ['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
      if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
    });
    if (source.separator === undefined) {
      // TODO there's a bunch of this sort of thing, needs cleaning up
      source.separator = this.separator;
    }
    if (source.filename) {
      if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
        this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
        this.uniqueSources.push({
          filename: source.filename,
          content: source.content.original
        });
      } else {
        var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
        if (source.content.original !== uniqueSource.content) {
          throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
        }
      }
    }
    this.sources.push(source);
    return this;
  },
  append: function append(str, options) {
    this.addSource({
      content: new MagicString(str),
      separator: options && options.separator || ''
    });
    return this;
  },
  clone: function clone() {
    var bundle = new Bundle({
      intro: this.intro,
      separator: this.separator
    });
    this.sources.forEach(function (source) {
      bundle.addSource({
        filename: source.filename,
        content: source.content.clone(),
        separator: source.separator
      });
    });
    return bundle;
  },
  generateMap: function generateMap(options) {
    var this$1 = this;
    options = options || ({});
    var offsets = {};
    var names = [];
    this.sources.forEach(function (source) {
      Object.keys(source.content.storedNames).forEach(function (name) {
        if (!~names.indexOf(name)) names.push(name);
      });
    });
    var encoded = getSemis(this.intro) + this.sources.map(function (source, i) {
      var prefix = i > 0 ? getSemis(source.separator) || ',' : '';
      var mappings;
      // we don't bother encoding sources without a filename
      if (!source.filename) {
        mappings = getSemis(source.content.toString());
      } else {
        var sourceIndex = this$1.uniqueSourceIndexByFilename[source.filename];
        mappings = source.content.getMappings(options.hires, sourceIndex, offsets, names);
      }
      return prefix + mappings;
    }).join('');
    return new SourceMap({
      file: options.file ? options.file.split(/[\/\\]/).pop() : null,
      sources: this.uniqueSources.map(function (source) {
        return options.file ? getRelativePath(options.file, source.filename) : source.filename;
      }),
      sourcesContent: this.uniqueSources.map(function (source) {
        return options.includeContent ? source.content : null;
      }),
      names: names,
      mappings: encoded
    });
  },
  getIndentString: function getIndentString() {
    var indentStringCounts = {};
    this.sources.forEach(function (source) {
      var indentStr = source.content.indentStr;
      if (indentStr === null) return;
      if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
      indentStringCounts[indentStr] += 1;
    });
    return Object.keys(indentStringCounts).sort(function (a, b) {
      return indentStringCounts[a] - indentStringCounts[b];
    })[0] || '\t';
  },
  indent: function indent(indentStr) {
    var this$1 = this;
    if (!arguments.length) {
      indentStr = this.getIndentString();
    }
    if (indentStr === '') return this;
    // noop
    var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';
    this.sources.forEach(function (source, i) {
      var separator = source.separator !== undefined ? source.separator : this$1.separator;
      var indentStart = trailingNewline || i > 0 && (/\r?\n$/).test(separator);
      source.content.indent(indentStr, {
        exclude: source.indentExclusionRanges,
        indentStart: indentStart
      });
      // TODO this is a very slow way to determine this
      trailingNewline = source.content.toString().slice(0, -1) === '\n';
    });
    if (this.intro) {
      this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function (match, index) {
        return index > 0 ? indentStr + match : match;
      });
    }
    return this;
  },
  prepend: function prepend(str) {
    this.intro = str + this.intro;
    return this;
  },
  toString: function toString() {
    var this$1 = this;
    var body = this.sources.map(function (source, i) {
      var separator = source.separator !== undefined ? source.separator : this$1.separator;
      var str = (i > 0 ? separator : '') + source.content.toString();
      return str;
    }).join('');
    return this.intro + body;
  },
  trimLines: function trimLines() {
    return this.trim('[\\r\\n]');
  },
  trim: function trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  },
  trimStart: function trimStart(charType) {
    var this$1 = this;
    var rx = new RegExp('^' + (charType || '\\s') + '+');
    this.intro = this.intro.replace(rx, '');
    if (!this.intro) {
      var source;
      var i = 0;
      do {
        source = this$1.sources[i];
        if (!source) {
          break;
        }
        source.content.trimStart(charType);
        i += 1;
      } while (source.content.toString() === '');
    }
    return this;
  },
  trimEnd: function trimEnd(charType) {
    var this$1 = this;
    var rx = new RegExp((charType || '\\s') + '+$');
    var source;
    var i = this.sources.length - 1;
    do {
      source = this$1.sources[i];
      if (!source) {
        this$1.intro = this$1.intro.replace(rx, '');
        break;
      }
      source.content.trimEnd(charType);
      i -= 1;
    } while (source.content.toString() === '');
    // TODO faster way to determine non-empty source?
    return this;
  }
};
MagicString.Bundle = Bundle;
module.exports = MagicString;

},{"buffer":"3susO","vlq":"7dqIZ"}],"3susO":[function(require,module,exports) {
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
/*eslint-disable no-proto*/
"use strict";
var base64 = require('base64-js');
var ieee754 = require('ieee754');
var customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' ? // eslint-disable-line dot-notation
Symbol['for']('nodejs.util.inspect.custom') : // eslint-disable-line dot-notation
null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
* If `Buffer.TYPED_ARRAY_SUPPORT`:
*   === true    Use Uint8Array implementation (fastest)
*   === false   Print warning and recommend using `buffer` v4.x which has an Object
*               implementation (most compatible, even IE6)
*
* Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
* Opera 11.6+, iOS 4.2+.
*
* We report that the browser does not support typed arrays if the are not subclassable
* using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
* (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
* for __proto__ and has a buggy typed array implementation.
*/
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
  console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}
function typedArraySupport() {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    var proto = {
      foo: function () {
        return 42;
      }
    };
    Object.setPrototypeOf(proto, Uint8Array.prototype);
    Object.setPrototypeOf(arr, proto);
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}
Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.buffer;
  }
});
Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined;
    return this.byteOffset;
  }
});
function createBuffer(length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"');
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}
/**
* The Buffer constructor returns instances of `Uint8Array` that have their
* prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
* `Uint8Array`, so the returned instances will have all the node `Buffer` methods
* and the `Uint8Array` methods. Square bracket notation works as expected -- it
* returns a single octet.
*
* The `Uint8Array` prototype remains unmodified.
*/
function Buffer(arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError('The "string" argument must be of type string. Received type number');
    }
    return allocUnsafe(arg);
  }
  return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192;
// not used by this implementation
function from(value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset);
  }
  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value);
  }
  if (value == null) {
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
  }
  if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('The "value" argument must not be of type number. Received type number');
  }
  var valueOf = value.valueOf && value.valueOf();
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length);
  }
  var b = fromObject(value);
  if (b) return b;
  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
  }
  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
}
/**
* Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
* if value is a number.
* Buffer.from(str[, encoding])
* Buffer.from(array)
* Buffer.from(buffer)
* Buffer.from(arrayBuffer[, byteOffset[, length]])
**/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number');
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"');
  }
}
function alloc(size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
  }
  return createBuffer(size);
}
/**
* Creates a new filled Buffer instance.
* alloc(size[, fill[, encoding]])
**/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
* Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
**/
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size);
};
/**
* Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
*/
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size);
};
function fromString(string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }
  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding);
  }
  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);
  var actual = buf.write(string, encoding);
  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }
  return buf;
}
function fromArrayLike(array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf;
}
function fromArrayView(arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView);
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
  }
  return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds');
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds');
  }
  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}
function fromObject(obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);
    if (buf.length === 0) {
      return buf;
    }
    obj.copy(buf, 0, 0, len);
    return buf;
  }
  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0);
    }
    return fromArrayLike(obj);
  }
  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data);
  }
}
function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }
  return length | 0;
}
function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
  return b != null && b._isBuffer === true && b !== Buffer.prototype;
};
Buffer.compare = function compare(a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
  }
  if (a === b) return 0;
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};
Buffer.concat = function concat(list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (list.length === 0) {
    return Buffer.alloc(0);
  }
  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }
  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos);
      } else {
        Uint8Array.prototype.set.call(buffer, buf, pos);
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    } else {
      buf.copy(buffer, pos);
    }
    pos += buf.length;
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
  }
  var len = string.length;
  var mustMatch = arguments.length > 2 && arguments[2] === true;
  if (!mustMatch && len === 0) return 0;
  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length;
        }
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
  var loweredCase = false;
  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }
  if (end === undefined || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return '';
  }
  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return '';
  }
  if (!encoding) encoding = 'utf8';
  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);
      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);
      case 'ascii':
        return asciiSlice(this, start, end);
      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);
      case 'base64':
        return base64Slice(this, start, end);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer.prototype.toString = function toString() {
  var length = this.length;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
  if (this.length > max) str += ' ... ';
  return '<Buffer ' + str + '>';
};
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength);
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
  }
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }
  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);
  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
// 
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;
  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;
  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1; else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0; else return -1;
  }
  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }
  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF;
    // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }
  return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }
  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;
  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }
  if (!encoding) encoding = 'utf8';
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);
      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);
      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length);
      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};
Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }
  if (end < start) end = start;
  var newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype);
  return newBuf;
};
/*
* Need to make sure that buffer isn't trying to write out of bounds.
*/
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }
  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }
  return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = value & 0xff;
  return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = value >>> 24;
  this[offset + 2] = value >>> 16;
  this[offset + 1] = value >>> 8;
  this[offset] = value & 0xff;
  return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = value >>> 8;
  this[offset + 1] = value & 0xff;
  return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = value & 0xff;
  this[offset + 1] = value >>> 8;
  this[offset + 2] = value >>> 16;
  this[offset + 3] = value >>> 24;
  return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = value >>> 24;
  this[offset + 1] = value >>> 16;
  this[offset + 2] = value >>> 8;
  this[offset + 3] = value & 0xff;
  return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;
  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;
  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');
  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }
  var len = end - start;
  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
  }
  return len;
};
// Usage:
// buffer.fill(number[, offset[, end]])
// buffer.fill(buffer[, offset[, end]])
// buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } else if (typeof val === 'boolean') {
    val = Number(val);
  }
  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
    var len = bytes.length;
    if (len === 0) {
      throw new TypeError('The value "' + val + '" is invalid for argument "value"');
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};
// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0];
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }
        // valid lead
        leadSurrogate = codePoint;
        continue;
      }
      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }
      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }
    leadSurrogate = null;
    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
  return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
  // For IE11 support
  return obj !== obj;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef';
  var table = new Array(256);
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16;
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j];
    }
  }
  return table;
})();

},{"base64-js":"6UXZh","ieee754":"6YlQP"}],"6UXZh":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"6YlQP":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"7dqIZ":[function(require,module,exports) {
var define;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.vlq = global.vlq || ({}));
})(this, function (exports) {
  "use strict";
  var charToInteger = {};
  var integerToChar = {};
  ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=').split('').forEach(function (char, i) {
    charToInteger[char] = i;
    integerToChar[i] = char;
  });
  function decode(string) {
    var result = [];
    var shift = 0;
    var value = 0;
    for (var i = 0; i < string.length; i += 1) {
      var integer = charToInteger[string[i]];
      if (integer === undefined) {
        throw new Error('Invalid character (' + string[i] + ')');
      }
      var hasContinuationBit = integer & 32;
      integer &= 31;
      value += integer << shift;
      if (hasContinuationBit) {
        shift += 5;
      } else {
        var shouldNegate = value & 1;
        value >>= 1;
        result.push(shouldNegate ? -value : value);
        // reset
        value = shift = 0;
      }
    }
    return result;
  }
  function encode(value) {
    var result;
    if (typeof value === 'number') {
      result = encodeInteger(value);
    } else {
      result = '';
      for (var i = 0; i < value.length; i += 1) {
        result += encodeInteger(value[i]);
      }
    }
    return result;
  }
  function encodeInteger(num) {
    var result = '';
    if (num < 0) {
      num = -num << 1 | 1;
    } else {
      num <<= 1;
    }
    do {
      var clamped = num & 31;
      num >>= 5;
      if (num > 0) {
        clamped |= 32;
      }
      result += integerToChar[clamped];
    } while (num > 0);
    return result;
  }
  exports.decode = decode;
  exports.encode = encode;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

},{}],"6SfA4":[function(require,module,exports) {
'use strict';

const map = require('map-iterable');
const merge = require('transform-spread-iterable');
const compose = require('compose-function');
const mkFieldSplitToken = require('../../../utils/tokens').mkFieldSplitToken;

exports.mark = function markFieldSplitting(result, text, options) {
	if (typeof options.resolveEnv === 'function' &&
			text[0] !== '\'' && text[0] !== '"'
		) {
		const ifs = options.resolveEnv('IFS');

		if (ifs !== null) {
			return result.replace(new RegExp(`[${ifs}]+`, 'g'), '\0');
		}
	}

	return result;
};

exports.split = () => compose(
	merge,
	map(token => {
		if (token.is('WORD')) {
			const fields = token.value.split('\0');
			if (fields.length > 1) {
				let idx = 0;
				return fields.map(field =>
					mkFieldSplitToken(token, field, idx++)
				);
			}
		}

		return token;
	})
);


},{"map-iterable":"2drce","transform-spread-iterable":"7myx7","compose-function":"4PPUu","../../../utils/tokens":"4SrYh"}],"2i8st":[function(require,module,exports) {
'use strict';

const map = require('map-iterable');
const MagicString = require('magic-string');
const tokensUtils = require('../../../utils/tokens');
const fieldSplitting = require('./field-splitting');

function setCommandExpansion(xp, token) {
	let command = xp.command;

	if (token.value[xp.loc.start - 1] === '`') {
		command = command.replace(/\\`/g, '`');
	}

	const bashParser = require('../../../index');

	const commandAST = bashParser(command);

	// console.log(JSON.stringify({command, commandAST}, null, 4))
	return Object.assign({}, xp, {command, commandAST});
}

// RULE 5 - If the current character is an unquoted '$' or '`', the shell shall
// identify the start of any candidates for parameter expansion (Parameter Expansion),
// command substitution (Command Substitution), or arithmetic expansion (Arithmetic
// Expansion) from their introductory unquoted character sequences: '$' or "${", "$("
// or '`', and "$((", respectively.

const commandExpansion = () => map(token => {
	if (token.is('WORD') || token.is('ASSIGNMENT_WORD')) {
		if (!token.expansion || token.expansion.length === 0) {
			return token;
		}

		return tokensUtils.setExpansions(token, token.expansion.map(xp => {
			if (xp.type === 'command_expansion') {
				return setCommandExpansion(xp, token);
			}

			return xp;
		}));
	}
	return token;
});

commandExpansion.resolve = options => map(token => {
	if (options.execCommand && token.expansion) {
		const value = token.value;

		const magic = new MagicString(value);

		for (const xp of token.expansion) {
			if (xp.type === 'command_expansion') {
				const result = options.execCommand(xp);
				// console.log({value, xp})
				magic.overwrite(
					xp.loc.start,
					xp.loc.end + 1,
					fieldSplitting.mark(result.replace(/\n+$/, ''), value, options)
				);
				xp.resolved = true;
			}
		}
		return token.alterValue(magic.toString());
	}
	return token;
});

module.exports = commandExpansion;

},{"map-iterable":"2drce","magic-string":"1DXOW","../../../utils/tokens":"4SrYh","./field-splitting":"6SfA4","../../../index":"4VTXg"}],"5Xry6":[function(require,module,exports) {
'use strict';
/* eslint-disable camelcase */

const map = require('map-iterable');
const babylon = require('babylon');
const MagicString = require('magic-string');
const tokens = require('../../../utils/tokens');
const fieldSplitting = require('./field-splitting');

function parseArithmeticAST(xp) {
	let AST;
	try {
		AST = babylon.parse(xp.expression);
	} catch (err) {
		throw new SyntaxError(`Cannot parse arithmetic expression "${xp.expression}": ${err.message}`);
	}

	const expression = AST.program.body[0].expression;

	if (expression === undefined) {
		throw new SyntaxError(`Cannot parse arithmetic expression "${xp.expression}": Not an expression`);
	}

	return JSON.parse(JSON.stringify(expression));
}

const arithmeticExpansion = () => map(token => {
	if (token.is('WORD') || token.is('ASSIGNMENT_WORD')) {
		if (!token.expansion || token.expansion.length === 0) {
			return token;
		}

		return tokens.setExpansions(token, token.expansion.map(xp => {
			if (xp.type === 'arithmetic_expansion') {
				return Object.assign({}, xp, {arithmeticAST: parseArithmeticAST(xp)});
			}
			return xp;
		}));
	}
	return token;
});

arithmeticExpansion.resolve = options => map(token => {
	if (options.runArithmeticExpression && token.expansion) {
		const value = token.value;

		const magic = new MagicString(value);

		for (const xp of token.expansion) {
			if (xp.type === 'arithmetic_expansion') {
				const result = options.runArithmeticExpression(xp);
				magic.overwrite(
					xp.loc.start,
					xp.loc.end + 1,
					fieldSplitting.mark(result, value, options)
				);
				xp.resolved = true;
			}
		}

		return token.alterValue(magic.toString());
	}
	return token;
});

module.exports = arithmeticExpansion;

},{"map-iterable":"2drce","babylon":"2ST4s","magic-string":"1DXOW","../../../utils/tokens":"4SrYh","./field-splitting":"6SfA4"}],"2ST4s":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* eslint max-len: 0 */

// This is a trick taken from Esprima. It turns out that, on
// non-Chrome browsers, to check whether a string is in a set, a
// predicate containing a big ugly `switch` statement is faster than
// a regular expression, and on Chrome the two are about on par.
// This function uses `eval` (non-lexical) to produce such a
// predicate from a space-separated string of words.
//
// It starts by sorting the words by length.

function makePredicate(words) {
  words = words.split(" ");
  return function (str) {
    return words.indexOf(str) >= 0;
  };
}

// Reserved word lists for various dialects of the language

var reservedWords = {
  6: makePredicate("enum await"),
  strict: makePredicate("implements interface let package private protected public static yield"),
  strictBind: makePredicate("eval arguments")
};

// And the keywords

var isKeyword = makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this let const class extends export import yield super");

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by `bin/generate-identifier-regex.js`.
// eslint-disable-next-line comma-spacing
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];
// eslint-disable-next-line comma-spacing
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) return false;

    pos += set[i + 1];
    if (pos >= code) return true;
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code) {
  if (code < 65) return code === 36;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  return isInAstralSet(code, astralIdentifierStartCodes);
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}

// A second optional argument can be given to further configure
var defaultOptions = {
  // Source type ("script" or "module") for different semantics
  sourceType: "script",
  // Source filename.
  sourceFilename: undefined,
  // Line from which to start counting source. Useful for
  // integration with other tools.
  startLine: 1,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // TODO
  allowSuperOutsideMethod: false,
  // An array of plugins to enable
  plugins: [],
  // TODO
  strictMode: null
};

// Interpret and default an options object

function getOptions(opts) {
  var options = {};
  for (var key in defaultOptions) {
    options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
  }
  return options;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var beforeExpr = true;
var startsExpr = true;
var isLoop = true;
var isAssign = true;
var prefix = true;
var postfix = true;

var TokenType = function TokenType(label) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, TokenType);

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.rightAssociative = !!conf.rightAssociative;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

var KeywordTokenType = function (_TokenType) {
  inherits(KeywordTokenType, _TokenType);

  function KeywordTokenType(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, KeywordTokenType);

    options.keyword = name;

    return possibleConstructorReturn(this, _TokenType.call(this, name, options));
  }

  return KeywordTokenType;
}(TokenType);

var BinopTokenType = function (_TokenType2) {
  inherits(BinopTokenType, _TokenType2);

  function BinopTokenType(name, prec) {
    classCallCheck(this, BinopTokenType);
    return possibleConstructorReturn(this, _TokenType2.call(this, name, { beforeExpr: beforeExpr, binop: prec }));
  }

  return BinopTokenType;
}(TokenType);

var types = {
  num: new TokenType("num", { startsExpr: startsExpr }),
  regexp: new TokenType("regexp", { startsExpr: startsExpr }),
  string: new TokenType("string", { startsExpr: startsExpr }),
  name: new TokenType("name", { startsExpr: startsExpr }),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  braceBarL: new TokenType("{|", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  braceR: new TokenType("}"),
  braceBarR: new TokenType("|}"),
  parenL: new TokenType("(", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", { beforeExpr: beforeExpr }),
  semi: new TokenType(";", { beforeExpr: beforeExpr }),
  colon: new TokenType(":", { beforeExpr: beforeExpr }),
  doubleColon: new TokenType("::", { beforeExpr: beforeExpr }),
  dot: new TokenType("."),
  question: new TokenType("?", { beforeExpr: beforeExpr }),
  arrow: new TokenType("=>", { beforeExpr: beforeExpr }),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", { beforeExpr: beforeExpr }),
  backQuote: new TokenType("`", { startsExpr: startsExpr }),
  dollarBraceL: new TokenType("${", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  at: new TokenType("@"),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", { beforeExpr: beforeExpr, isAssign: isAssign }),
  assign: new TokenType("_=", { beforeExpr: beforeExpr, isAssign: isAssign }),
  incDec: new TokenType("++/--", { prefix: prefix, postfix: postfix, startsExpr: startsExpr }),
  prefix: new TokenType("prefix", { beforeExpr: beforeExpr, prefix: prefix, startsExpr: startsExpr }),
  logicalOR: new BinopTokenType("||", 1),
  logicalAND: new BinopTokenType("&&", 2),
  bitwiseOR: new BinopTokenType("|", 3),
  bitwiseXOR: new BinopTokenType("^", 4),
  bitwiseAND: new BinopTokenType("&", 5),
  equality: new BinopTokenType("==/!=", 6),
  relational: new BinopTokenType("</>", 7),
  bitShift: new BinopTokenType("<</>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: beforeExpr, binop: 9, prefix: prefix, startsExpr: startsExpr }),
  modulo: new BinopTokenType("%", 10),
  star: new BinopTokenType("*", 10),
  slash: new BinopTokenType("/", 10),
  exponent: new TokenType("**", { beforeExpr: beforeExpr, binop: 11, rightAssociative: true })
};

var keywords = {
  "break": new KeywordTokenType("break"),
  "case": new KeywordTokenType("case", { beforeExpr: beforeExpr }),
  "catch": new KeywordTokenType("catch"),
  "continue": new KeywordTokenType("continue"),
  "debugger": new KeywordTokenType("debugger"),
  "default": new KeywordTokenType("default", { beforeExpr: beforeExpr }),
  "do": new KeywordTokenType("do", { isLoop: isLoop, beforeExpr: beforeExpr }),
  "else": new KeywordTokenType("else", { beforeExpr: beforeExpr }),
  "finally": new KeywordTokenType("finally"),
  "for": new KeywordTokenType("for", { isLoop: isLoop }),
  "function": new KeywordTokenType("function", { startsExpr: startsExpr }),
  "if": new KeywordTokenType("if"),
  "return": new KeywordTokenType("return", { beforeExpr: beforeExpr }),
  "switch": new KeywordTokenType("switch"),
  "throw": new KeywordTokenType("throw", { beforeExpr: beforeExpr }),
  "try": new KeywordTokenType("try"),
  "var": new KeywordTokenType("var"),
  "let": new KeywordTokenType("let"),
  "const": new KeywordTokenType("const"),
  "while": new KeywordTokenType("while", { isLoop: isLoop }),
  "with": new KeywordTokenType("with"),
  "new": new KeywordTokenType("new", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  "this": new KeywordTokenType("this", { startsExpr: startsExpr }),
  "super": new KeywordTokenType("super", { startsExpr: startsExpr }),
  "class": new KeywordTokenType("class"),
  "extends": new KeywordTokenType("extends", { beforeExpr: beforeExpr }),
  "export": new KeywordTokenType("export"),
  "import": new KeywordTokenType("import", { startsExpr: startsExpr }),
  "yield": new KeywordTokenType("yield", { beforeExpr: beforeExpr, startsExpr: startsExpr }),
  "null": new KeywordTokenType("null", { startsExpr: startsExpr }),
  "true": new KeywordTokenType("true", { startsExpr: startsExpr }),
  "false": new KeywordTokenType("false", { startsExpr: startsExpr }),
  "in": new KeywordTokenType("in", { beforeExpr: beforeExpr, binop: 7 }),
  "instanceof": new KeywordTokenType("instanceof", { beforeExpr: beforeExpr, binop: 7 }),
  "typeof": new KeywordTokenType("typeof", { beforeExpr: beforeExpr, prefix: prefix, startsExpr: startsExpr }),
  "void": new KeywordTokenType("void", { beforeExpr: beforeExpr, prefix: prefix, startsExpr: startsExpr }),
  "delete": new KeywordTokenType("delete", { beforeExpr: beforeExpr, prefix: prefix, startsExpr: startsExpr })
};

// Map keyword names to token types.
Object.keys(keywords).forEach(function (name) {
  types["_" + name] = keywords[name];
});

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

var TokContext = function TokContext(token, isExpr, preserveSpace, override) {
  classCallCheck(this, TokContext);

  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
};

var types$1 = {
  braceStatement: new TokContext("{", false),
  braceExpression: new TokContext("{", true),
  templateQuasi: new TokContext("${", true),
  parenStatement: new TokContext("(", false),
  parenExpression: new TokContext("(", true),
  template: new TokContext("`", true, true, function (p) {
    return p.readTmplToken();
  }),
  functionExpression: new TokContext("function", true)
};

// Token-specific context update code

types.parenR.updateContext = types.braceR.updateContext = function () {
  if (this.state.context.length === 1) {
    this.state.exprAllowed = true;
    return;
  }

  var out = this.state.context.pop();
  if (out === types$1.braceStatement && this.curContext() === types$1.functionExpression) {
    this.state.context.pop();
    this.state.exprAllowed = false;
  } else if (out === types$1.templateQuasi) {
    this.state.exprAllowed = true;
  } else {
    this.state.exprAllowed = !out.isExpr;
  }
};

types.name.updateContext = function (prevType) {
  this.state.exprAllowed = false;

  if (prevType === types._let || prevType === types._const || prevType === types._var) {
    if (lineBreak.test(this.input.slice(this.state.end))) {
      this.state.exprAllowed = true;
    }
  }
};

types.braceL.updateContext = function (prevType) {
  this.state.context.push(this.braceIsBlock(prevType) ? types$1.braceStatement : types$1.braceExpression);
  this.state.exprAllowed = true;
};

types.dollarBraceL.updateContext = function () {
  this.state.context.push(types$1.templateQuasi);
  this.state.exprAllowed = true;
};

types.parenL.updateContext = function (prevType) {
  var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
  this.state.context.push(statementParens ? types$1.parenStatement : types$1.parenExpression);
  this.state.exprAllowed = true;
};

types.incDec.updateContext = function () {
  // tokExprAllowed stays unchanged
};

types._function.updateContext = function () {
  if (this.curContext() !== types$1.braceStatement) {
    this.state.context.push(types$1.functionExpression);
  }

  this.state.exprAllowed = false;
};

types.backQuote.updateContext = function () {
  if (this.curContext() === types$1.template) {
    this.state.context.pop();
  } else {
    this.state.context.push(types$1.template);
  }
  this.state.exprAllowed = false;
};

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  classCallCheck(this, Position);

  this.line = line;
  this.column = col;
};

var SourceLocation = function SourceLocation(start, end) {
  classCallCheck(this, SourceLocation);

  this.start = start;
  this.end = end;
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur);
    }
  }
}

var State = function () {
  function State() {
    classCallCheck(this, State);
  }

  State.prototype.init = function init(options, input) {
    this.strict = options.strictMode === false ? false : options.sourceType === "module";

    this.input = input;

    this.potentialArrowAt = -1;

    this.inMethod = this.inFunction = this.inGenerator = this.inAsync = this.inPropertyName = this.inType = this.inClassProperty = this.noAnonFunctionType = false;

    this.labels = [];

    this.decorators = [];

    this.tokens = [];

    this.comments = [];

    this.trailingComments = [];
    this.leadingComments = [];
    this.commentStack = [];

    this.pos = this.lineStart = 0;
    this.curLine = options.startLine;

    this.type = types.eof;
    this.value = null;
    this.start = this.end = this.pos;
    this.startLoc = this.endLoc = this.curPosition();

    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    this.context = [types$1.braceStatement];
    this.exprAllowed = true;

    this.containsEsc = this.containsOctal = false;
    this.octalPosition = null;

    this.invalidTemplateEscapePosition = null;

    this.exportedIdentifiers = [];

    return this;
  };

  // TODO


  // TODO


  // Used to signify the start of a potential arrow function


  // Flags to track whether we are in a function, a generator.


  // Labels in scope.


  // Leading decorators.


  // Token store.


  // Comment store.


  // Comment attachment store


  // The current position of the tokenizer in the input.


  // Properties of the current token:
  // Its type


  // For tokens that include more information than their type, the value


  // Its start and end offset


  // And, if locations are used, the {line, column} object
  // corresponding to those offsets


  // Position information for the previous token


  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.


  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.


  // TODO


  // Names of exports store. `default` is stored as a name for both
  // `export default foo;` and `export { foo as default };`.


  State.prototype.curPosition = function curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart);
  };

  State.prototype.clone = function clone(skipArrays) {
    var state = new State();
    for (var key in this) {
      var val = this[key];

      if ((!skipArrays || key === "context") && Array.isArray(val)) {
        val = val.slice();
      }

      state[key] = val;
    }
    return state;
  };

  return State;
}();

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(state) {
  classCallCheck(this, Token);

  this.type = state.type;
  this.value = state.value;
  this.start = state.start;
  this.end = state.end;
  this.loc = new SourceLocation(state.startLoc, state.endLoc);
};

// ## Tokenizer

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) {
    return String.fromCharCode(code);
  } else {
    return String.fromCharCode((code - 0x10000 >> 10) + 0xD800, (code - 0x10000 & 1023) + 0xDC00);
  }
}

var Tokenizer = function () {
  function Tokenizer(options, input) {
    classCallCheck(this, Tokenizer);

    this.state = new State();
    this.state.init(options, input);
  }

  // Move to the next token

  Tokenizer.prototype.next = function next() {
    if (!this.isLookahead) {
      this.state.tokens.push(new Token(this.state));
    }

    this.state.lastTokEnd = this.state.end;
    this.state.lastTokStart = this.state.start;
    this.state.lastTokEndLoc = this.state.endLoc;
    this.state.lastTokStartLoc = this.state.startLoc;
    this.nextToken();
  };

  // TODO

  Tokenizer.prototype.eat = function eat(type) {
    if (this.match(type)) {
      this.next();
      return true;
    } else {
      return false;
    }
  };

  // TODO

  Tokenizer.prototype.match = function match(type) {
    return this.state.type === type;
  };

  // TODO

  Tokenizer.prototype.isKeyword = function isKeyword$$1(word) {
    return isKeyword(word);
  };

  // TODO

  Tokenizer.prototype.lookahead = function lookahead() {
    var old = this.state;
    this.state = old.clone(true);

    this.isLookahead = true;
    this.next();
    this.isLookahead = false;

    var curr = this.state.clone(true);
    this.state = old;
    return curr;
  };

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  Tokenizer.prototype.setStrict = function setStrict(strict) {
    this.state.strict = strict;
    if (!this.match(types.num) && !this.match(types.string)) return;
    this.state.pos = this.state.start;
    while (this.state.pos < this.state.lineStart) {
      this.state.lineStart = this.input.lastIndexOf("\n", this.state.lineStart - 2) + 1;
      --this.state.curLine;
    }
    this.nextToken();
  };

  Tokenizer.prototype.curContext = function curContext() {
    return this.state.context[this.state.context.length - 1];
  };

  // Read a single token, updating the parser object's token-related
  // properties.

  Tokenizer.prototype.nextToken = function nextToken() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) this.skipSpace();

    this.state.containsOctal = false;
    this.state.octalPosition = null;
    this.state.start = this.state.pos;
    this.state.startLoc = this.state.curPosition();
    if (this.state.pos >= this.input.length) return this.finishToken(types.eof);

    if (curContext.override) {
      return curContext.override(this);
    } else {
      return this.readToken(this.fullCharCodeAtPos());
    }
  };

  Tokenizer.prototype.readToken = function readToken(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code) || code === 92 /* '\' */) {
        return this.readWord();
      } else {
      return this.getTokenFromCode(code);
    }
  };

  Tokenizer.prototype.fullCharCodeAtPos = function fullCharCodeAtPos() {
    var code = this.input.charCodeAt(this.state.pos);
    if (code <= 0xd7ff || code >= 0xe000) return code;

    var next = this.input.charCodeAt(this.state.pos + 1);
    return (code << 10) + next - 0x35fdc00;
  };

  Tokenizer.prototype.pushComment = function pushComment(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "CommentBlock" : "CommentLine",
      value: text,
      start: start,
      end: end,
      loc: new SourceLocation(startLoc, endLoc)
    };

    if (!this.isLookahead) {
      this.state.tokens.push(comment);
      this.state.comments.push(comment);
      this.addComment(comment);
    }
  };

  Tokenizer.prototype.skipBlockComment = function skipBlockComment() {
    var startLoc = this.state.curPosition();
    var start = this.state.pos;
    var end = this.input.indexOf("*/", this.state.pos += 2);
    if (end === -1) this.raise(this.state.pos - 2, "Unterminated comment");

    this.state.pos = end + 2;
    lineBreakG.lastIndex = start;
    var match = void 0;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.state.pos) {
      ++this.state.curLine;
      this.state.lineStart = match.index + match[0].length;
    }

    this.pushComment(true, this.input.slice(start + 2, end), start, this.state.pos, startLoc, this.state.curPosition());
  };

  Tokenizer.prototype.skipLineComment = function skipLineComment(startSkip) {
    var start = this.state.pos;
    var startLoc = this.state.curPosition();
    var ch = this.input.charCodeAt(this.state.pos += startSkip);
    while (this.state.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
      ++this.state.pos;
      ch = this.input.charCodeAt(this.state.pos);
    }

    this.pushComment(false, this.input.slice(start + startSkip, this.state.pos), start, this.state.pos, startLoc, this.state.curPosition());
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  Tokenizer.prototype.skipSpace = function skipSpace() {
    loop: while (this.state.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.state.pos);
      switch (ch) {
        case 32:case 160:
          // ' '
          ++this.state.pos;
          break;

        case 13:
          if (this.input.charCodeAt(this.state.pos + 1) === 10) {
            ++this.state.pos;
          }

        case 10:case 8232:case 8233:
          ++this.state.pos;
          ++this.state.curLine;
          this.state.lineStart = this.state.pos;
          break;

        case 47:
          // '/'
          switch (this.input.charCodeAt(this.state.pos + 1)) {
            case 42:
              // '*'
              this.skipBlockComment();
              break;

            case 47:
              this.skipLineComment(2);
              break;

            default:
              break loop;
          }
          break;

        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
            ++this.state.pos;
          } else {
            break loop;
          }
      }
    }
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  Tokenizer.prototype.finishToken = function finishToken(type, val) {
    this.state.end = this.state.pos;
    this.state.endLoc = this.state.curPosition();
    var prevType = this.state.type;
    this.state.type = type;
    this.state.value = val;

    this.updateContext(prevType);
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //


  Tokenizer.prototype.readToken_dot = function readToken_dot() {
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }

    var next2 = this.input.charCodeAt(this.state.pos + 2);
    if (next === 46 && next2 === 46) {
      // 46 = dot '.'
      this.state.pos += 3;
      return this.finishToken(types.ellipsis);
    } else {
      ++this.state.pos;
      return this.finishToken(types.dot);
    }
  };

  Tokenizer.prototype.readToken_slash = function readToken_slash() {
    // '/'
    if (this.state.exprAllowed) {
      ++this.state.pos;
      return this.readRegexp();
    }

    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    } else {
      return this.finishOp(types.slash, 1);
    }
  };

  Tokenizer.prototype.readToken_mult_modulo = function readToken_mult_modulo(code) {
    // '%*'
    var type = code === 42 ? types.star : types.modulo;
    var width = 1;
    var next = this.input.charCodeAt(this.state.pos + 1);

    if (next === 42) {
      // '*'
      width++;
      next = this.input.charCodeAt(this.state.pos + 2);
      type = types.exponent;
    }

    if (next === 61) {
      width++;
      type = types.assign;
    }

    return this.finishOp(type, width);
  };

  Tokenizer.prototype.readToken_pipe_amp = function readToken_pipe_amp(code) {
    // '|&'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === code) return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
    if (next === 61) return this.finishOp(types.assign, 2);
    if (code === 124 && next === 125 && this.hasPlugin("flow")) return this.finishOp(types.braceBarR, 2);
    return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
  };

  Tokenizer.prototype.readToken_caret = function readToken_caret() {
    // '^'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    } else {
      return this.finishOp(types.bitwiseXOR, 1);
    }
  };

  Tokenizer.prototype.readToken_plus_min = function readToken_plus_min(code) {
    // '+-'
    var next = this.input.charCodeAt(this.state.pos + 1);

    if (next === code) {
      if (next === 45 && this.input.charCodeAt(this.state.pos + 2) === 62 && lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.pos))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(types.incDec, 2);
    }

    if (next === 61) {
      return this.finishOp(types.assign, 2);
    } else {
      return this.finishOp(types.plusMin, 1);
    }
  };

  Tokenizer.prototype.readToken_lt_gt = function readToken_lt_gt(code) {
    // '<>'
    var next = this.input.charCodeAt(this.state.pos + 1);
    var size = 1;

    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.state.pos + size) === 61) return this.finishOp(types.assign, size + 1);
      return this.finishOp(types.bitShift, size);
    }

    if (next === 33 && code === 60 && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {
      if (this.inModule) this.unexpected();
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }

    if (next === 61) {
      // <= | >=
      size = 2;
    }

    return this.finishOp(types.relational, size);
  };

  Tokenizer.prototype.readToken_eq_excl = function readToken_eq_excl(code) {
    // '=!'
    var next = this.input.charCodeAt(this.state.pos + 1);
    if (next === 61) return this.finishOp(types.equality, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
    if (code === 61 && next === 62) {
      // '=>'
      this.state.pos += 2;
      return this.finishToken(types.arrow);
    }
    return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
  };

  Tokenizer.prototype.getTokenFromCode = function getTokenFromCode(code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case 46:
        // '.'
        return this.readToken_dot();

      // Punctuation tokens.
      case 40:
        ++this.state.pos;return this.finishToken(types.parenL);
      case 41:
        ++this.state.pos;return this.finishToken(types.parenR);
      case 59:
        ++this.state.pos;return this.finishToken(types.semi);
      case 44:
        ++this.state.pos;return this.finishToken(types.comma);
      case 91:
        ++this.state.pos;return this.finishToken(types.bracketL);
      case 93:
        ++this.state.pos;return this.finishToken(types.bracketR);

      case 123:
        if (this.hasPlugin("flow") && this.input.charCodeAt(this.state.pos + 1) === 124) {
          return this.finishOp(types.braceBarL, 2);
        } else {
          ++this.state.pos;
          return this.finishToken(types.braceL);
        }

      case 125:
        ++this.state.pos;return this.finishToken(types.braceR);

      case 58:
        if (this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58) {
          return this.finishOp(types.doubleColon, 2);
        } else {
          ++this.state.pos;
          return this.finishToken(types.colon);
        }

      case 63:
        ++this.state.pos;return this.finishToken(types.question);
      case 64:
        ++this.state.pos;return this.finishToken(types.at);

      case 96:
        // '`'
        ++this.state.pos;
        return this.finishToken(types.backQuote);

      case 48:
        // '0'
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
      case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
        // 1-9
        return this.readNumber(false);

      // Quotes produce strings.
      case 34:case 39:
        // '"', "'"
        return this.readString(code);

      // Operators are parsed inline in tiny state machines. '=' (61) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.

      case 47:
        // '/'
        return this.readToken_slash();

      case 37:case 42:
        // '%*'
        return this.readToken_mult_modulo(code);

      case 124:case 38:
        // '|&'
        return this.readToken_pipe_amp(code);

      case 94:
        // '^'
        return this.readToken_caret();

      case 43:case 45:
        // '+-'
        return this.readToken_plus_min(code);

      case 60:case 62:
        // '<>'
        return this.readToken_lt_gt(code);

      case 61:case 33:
        // '=!'
        return this.readToken_eq_excl(code);

      case 126:
        // '~'
        return this.finishOp(types.prefix, 1);
    }

    this.raise(this.state.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  Tokenizer.prototype.finishOp = function finishOp(type, size) {
    var str = this.input.slice(this.state.pos, this.state.pos + size);
    this.state.pos += size;
    return this.finishToken(type, str);
  };

  Tokenizer.prototype.readRegexp = function readRegexp() {
    var start = this.state.pos;
    var escaped = void 0,
        inClass = void 0;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
      var ch = this.input.charAt(this.state.pos);
      if (lineBreak.test(ch)) {
        this.raise(start, "Unterminated regular expression");
      }
      if (escaped) {
        escaped = false;
      } else {
        if (ch === "[") {
          inClass = true;
        } else if (ch === "]" && inClass) {
          inClass = false;
        } else if (ch === "/" && !inClass) {
          break;
        }
        escaped = ch === "\\";
      }
      ++this.state.pos;
    }
    var content = this.input.slice(start, this.state.pos);
    ++this.state.pos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = this.readWord1();
    if (mods) {
      var validFlags = /^[gmsiyu]*$/;
      if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
    }
    return this.finishToken(types.regexp, {
      pattern: content,
      flags: mods
    });
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  Tokenizer.prototype.readInt = function readInt(radix, len) {
    var start = this.state.pos;
    var total = 0;

    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.state.pos);
      var val = void 0;
      if (code >= 97) {
        val = code - 97 + 10; // a
      } else if (code >= 65) {
        val = code - 65 + 10; // A
      } else if (code >= 48 && code <= 57) {
        val = code - 48; // 0-9
      } else {
        val = Infinity;
      }
      if (val >= radix) break;
      ++this.state.pos;
      total = total * radix + val;
    }
    if (this.state.pos === start || len != null && this.state.pos - start !== len) return null;

    return total;
  };

  Tokenizer.prototype.readRadixNumber = function readRadixNumber(radix) {
    this.state.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) this.raise(this.state.start + 2, "Expected number in radix " + radix);
    if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");
    return this.finishToken(types.num, val);
  };

  // Read an integer, octal integer, or floating-point number.

  Tokenizer.prototype.readNumber = function readNumber(startsWithDot) {
    var start = this.state.pos;
    var octal = this.input.charCodeAt(start) === 48; // '0'
    var isFloat = false;

    if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
    if (octal && this.state.pos == start + 1) octal = false; // number === 0

    var next = this.input.charCodeAt(this.state.pos);
    if (next === 46 && !octal) {
      // '.'
      ++this.state.pos;
      this.readInt(10);
      isFloat = true;
      next = this.input.charCodeAt(this.state.pos);
    }

    if ((next === 69 || next === 101) && !octal) {
      // 'eE'
      next = this.input.charCodeAt(++this.state.pos);
      if (next === 43 || next === 45) ++this.state.pos; // '+-'
      if (this.readInt(10) === null) this.raise(start, "Invalid number");
      isFloat = true;
    }

    if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");

    var str = this.input.slice(start, this.state.pos);
    var val = void 0;
    if (isFloat) {
      val = parseFloat(str);
    } else if (!octal || str.length === 1) {
      val = parseInt(str, 10);
    } else if (this.state.strict) {
      this.raise(start, "Invalid number");
    } else if (/[89]/.test(str)) {
      val = parseInt(str, 10);
    } else {
      val = parseInt(str, 8);
    }
    return this.finishToken(types.num, val);
  };

  // Read a string value, interpreting backslash-escapes.

  Tokenizer.prototype.readCodePoint = function readCodePoint(throwOnInvalid) {
    var ch = this.input.charCodeAt(this.state.pos);
    var code = void 0;

    if (ch === 123) {
      // '{'
      var codePos = ++this.state.pos;
      code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, throwOnInvalid);
      ++this.state.pos;
      if (code === null) {
        --this.state.invalidTemplateEscapePosition; // to point to the '\'' instead of the 'u'
      } else if (code > 0x10FFFF) {
        if (throwOnInvalid) {
          this.raise(codePos, "Code point out of bounds");
        } else {
          this.state.invalidTemplateEscapePosition = codePos - 2;
          return null;
        }
      }
    } else {
      code = this.readHexChar(4, throwOnInvalid);
    }
    return code;
  };

  Tokenizer.prototype.readString = function readString(quote) {
    var out = "",
        chunkStart = ++this.state.pos;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated string constant");
      var ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.state.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.state.pos;
      } else {
        if (isNewLine(ch)) this.raise(this.state.start, "Unterminated string constant");
        ++this.state.pos;
      }
    }
    out += this.input.slice(chunkStart, this.state.pos++);
    return this.finishToken(types.string, out);
  };

  // Reads template string tokens.

  Tokenizer.prototype.readTmplToken = function readTmplToken() {
    var out = "",
        chunkStart = this.state.pos,
        containsInvalid = false;
    for (;;) {
      if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated template");
      var ch = this.input.charCodeAt(this.state.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.state.pos + 1) === 123) {
        // '`', '${'
        if (this.state.pos === this.state.start && this.match(types.template)) {
          if (ch === 36) {
            this.state.pos += 2;
            return this.finishToken(types.dollarBraceL);
          } else {
            ++this.state.pos;
            return this.finishToken(types.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.state.pos);
        return this.finishToken(types.template, containsInvalid ? null : out);
      }
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.state.pos);
        var escaped = this.readEscapedChar(true);
        if (escaped === null) {
          containsInvalid = true;
        } else {
          out += escaped;
        }
        chunkStart = this.state.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.state.pos);
        ++this.state.pos;
        switch (ch) {
          case 13:
            if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos;
          case 10:
            out += "\n";
            break;
          default:
            out += String.fromCharCode(ch);
            break;
        }
        ++this.state.curLine;
        this.state.lineStart = this.state.pos;
        chunkStart = this.state.pos;
      } else {
        ++this.state.pos;
      }
    }
  };

  // Used to read escaped characters

  Tokenizer.prototype.readEscapedChar = function readEscapedChar(inTemplate) {
    var throwOnInvalid = !inTemplate;
    var ch = this.input.charCodeAt(++this.state.pos);
    ++this.state.pos;
    switch (ch) {
      case 110:
        return "\n"; // 'n' -> '\n'
      case 114:
        return "\r"; // 'r' -> '\r'
      case 120:
        {
          // 'x'
          var code = this.readHexChar(2, throwOnInvalid);
          return code === null ? null : String.fromCharCode(code);
        }
      case 117:
        {
          // 'u'
          var _code = this.readCodePoint(throwOnInvalid);
          return _code === null ? null : codePointToString(_code);
        }
      case 116:
        return "\t"; // 't' -> '\t'
      case 98:
        return "\b"; // 'b' -> '\b'
      case 118:
        return "\x0B"; // 'v' -> '\u000b'
      case 102:
        return "\f"; // 'f' -> '\f'
      case 13:
        if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos; // '\r\n'
      case 10:
        // ' \n'
        this.state.lineStart = this.state.pos;
        ++this.state.curLine;
        return "";
      default:
        if (ch >= 48 && ch <= 55) {
          var codePos = this.state.pos - 1;
          var octalStr = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);
          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }
          if (octal > 0) {
            if (inTemplate) {
              this.state.invalidTemplateEscapePosition = codePos;
              return null;
            } else if (this.state.strict) {
              this.raise(codePos, "Octal literal in strict mode");
            } else if (!this.state.containsOctal) {
              // These properties are only used to throw an error for an octal which occurs
              // in a directive which occurs prior to a "use strict" directive.
              this.state.containsOctal = true;
              this.state.octalPosition = codePos;
            }
          }
          this.state.pos += octalStr.length - 1;
          return String.fromCharCode(octal);
        }
        return String.fromCharCode(ch);
    }
  };

  // Used to read character escape sequences ('\x', '\u').

  Tokenizer.prototype.readHexChar = function readHexChar(len, throwOnInvalid) {
    var codePos = this.state.pos;
    var n = this.readInt(16, len);
    if (n === null) {
      if (throwOnInvalid) {
        this.raise(codePos, "Bad character escape sequence");
      } else {
        this.state.pos = codePos - 1;
        this.state.invalidTemplateEscapePosition = codePos - 1;
      }
    }
    return n;
  };

  // Read an identifier, and return it as a string. Sets `this.state.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  Tokenizer.prototype.readWord1 = function readWord1() {
    this.state.containsEsc = false;
    var word = "",
        first = true,
        chunkStart = this.state.pos;
    while (this.state.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch)) {
        this.state.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) {
        // "\"
        this.state.containsEsc = true;

        word += this.input.slice(chunkStart, this.state.pos);
        var escStart = this.state.pos;

        if (this.input.charCodeAt(++this.state.pos) !== 117) {
          // "u"
          this.raise(this.state.pos, "Expecting Unicode escape sequence \\uXXXX");
        }

        ++this.state.pos;
        var esc = this.readCodePoint(true);
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, true)) {
          this.raise(escStart, "Invalid Unicode escape");
        }

        word += codePointToString(esc);
        chunkStart = this.state.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.state.pos);
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  Tokenizer.prototype.readWord = function readWord() {
    var word = this.readWord1();
    var type = types.name;
    if (!this.state.containsEsc && this.isKeyword(word)) {
      type = keywords[word];
    }
    return this.finishToken(type, word);
  };

  Tokenizer.prototype.braceIsBlock = function braceIsBlock(prevType) {
    if (prevType === types.colon) {
      var parent = this.curContext();
      if (parent === types$1.braceStatement || parent === types$1.braceExpression) {
        return !parent.isExpr;
      }
    }

    if (prevType === types._return) {
      return lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
    }

    if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR) {
      return true;
    }

    if (prevType === types.braceL) {
      return this.curContext() === types$1.braceStatement;
    }

    return !this.state.exprAllowed;
  };

  Tokenizer.prototype.updateContext = function updateContext(prevType) {
    var type = this.state.type;
    var update = void 0;

    if (type.keyword && prevType === types.dot) {
      this.state.exprAllowed = false;
    } else if (update = type.updateContext) {
      update.call(this, prevType);
    } else {
      this.state.exprAllowed = type.beforeExpr;
    }
  };

  return Tokenizer;
}();

var plugins = {};
var frozenDeprecatedWildcardPluginList = ["jsx", "doExpressions", "objectRestSpread", "decorators", "classProperties", "exportExtensions", "asyncGenerators", "functionBind", "functionSent", "dynamicImport", "flow"];

var Parser = function (_Tokenizer) {
  inherits(Parser, _Tokenizer);

  function Parser(options, input) {
    classCallCheck(this, Parser);

    options = getOptions(options);

    var _this = possibleConstructorReturn(this, _Tokenizer.call(this, options, input));

    _this.options = options;
    _this.inModule = _this.options.sourceType === "module";
    _this.input = input;
    _this.plugins = _this.loadPlugins(_this.options.plugins);
    _this.filename = options.sourceFilename;

    // If enabled, skip leading hashbang line.
    if (_this.state.pos === 0 && _this.input[0] === "#" && _this.input[1] === "!") {
      _this.skipLineComment(2);
    }
    return _this;
  }

  Parser.prototype.isReservedWord = function isReservedWord(word) {
    if (word === "await") {
      return this.inModule;
    } else {
      return reservedWords[6](word);
    }
  };

  Parser.prototype.hasPlugin = function hasPlugin(name) {
    if (this.plugins["*"] && frozenDeprecatedWildcardPluginList.indexOf(name) > -1) {
      return true;
    }

    return !!this.plugins[name];
  };

  Parser.prototype.extend = function extend(name, f) {
    this[name] = f(this[name]);
  };

  Parser.prototype.loadAllPlugins = function loadAllPlugins() {
    var _this2 = this;

    // ensure flow plugin loads last, also ensure estree is not loaded with *
    var pluginNames = Object.keys(plugins).filter(function (name) {
      return name !== "flow" && name !== "estree";
    });
    pluginNames.push("flow");

    pluginNames.forEach(function (name) {
      var plugin = plugins[name];
      if (plugin) plugin(_this2);
    });
  };

  Parser.prototype.loadPlugins = function loadPlugins(pluginList) {
    // TODO: Deprecate "*" option in next major version of Babylon
    if (pluginList.indexOf("*") >= 0) {
      this.loadAllPlugins();

      return { "*": true };
    }

    var pluginMap = {};

    if (pluginList.indexOf("flow") >= 0) {
      // ensure flow plugin loads last
      pluginList = pluginList.filter(function (plugin) {
        return plugin !== "flow";
      });
      pluginList.push("flow");
    }

    if (pluginList.indexOf("estree") >= 0) {
      // ensure estree plugin loads first
      pluginList = pluginList.filter(function (plugin) {
        return plugin !== "estree";
      });
      pluginList.unshift("estree");
    }

    for (var _iterator = pluginList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var name = _ref;

      if (!pluginMap[name]) {
        pluginMap[name] = true;

        var plugin = plugins[name];
        if (plugin) plugin(this);
      }
    }

    return pluginMap;
  };

  Parser.prototype.parse = function parse() {
    var file = this.startNode();
    var program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  };

  return Parser;
}(Tokenizer);

var pp = Parser.prototype;

// ## Parser utilities

// TODO

pp.addExtra = function (node, key, val) {
  if (!node) return;

  var extra = node.extra = node.extra || {};
  extra[key] = val;
};

// TODO

pp.isRelational = function (op) {
  return this.match(types.relational) && this.state.value === op;
};

// TODO

pp.expectRelational = function (op) {
  if (this.isRelational(op)) {
    this.next();
  } else {
    this.unexpected(null, types.relational);
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function (name) {
  return this.match(types.name) && this.state.value === name;
};

// Consumes contextual keyword if possible.

pp.eatContextual = function (name) {
  return this.state.value === name && this.eat(types.name);
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function (name, message) {
  if (!this.eatContextual(name)) this.unexpected(null, message);
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function () {
  return this.match(types.eof) || this.match(types.braceR) || lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
};

// TODO

pp.isLineTerminator = function () {
  return this.eat(types.semi) || this.canInsertSemicolon();
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function () {
  if (!this.isLineTerminator()) this.unexpected(null, types.semi);
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error at given pos.

pp.expect = function (type, pos) {
  return this.eat(type) || this.unexpected(pos, type);
};

// Raise an unexpected token error. Can take the expected token type
// instead of a message string.

pp.unexpected = function (pos) {
  var messageOrType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Unexpected token";

  if (messageOrType && (typeof messageOrType === "undefined" ? "undefined" : _typeof(messageOrType)) === "object" && messageOrType.label) {
    messageOrType = "Unexpected token, expected " + messageOrType.label;
  }
  this.raise(pos != null ? pos : this.state.start, messageOrType);
};

/* eslint max-len: 0 */

var pp$1 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function (file, program) {
  program.sourceType = this.options.sourceType;

  this.parseBlockBody(program, true, true, types.eof);

  file.program = this.finishNode(program, "Program");
  file.comments = this.state.comments;
  file.tokens = this.state.tokens;

  return this.finishNode(file, "File");
};

var loopLabel = { kind: "loop" };
var switchLabel = { kind: "switch" };

// TODO

pp$1.stmtToDirective = function (stmt) {
  var expr = stmt.expression;

  var directiveLiteral = this.startNodeAt(expr.start, expr.loc.start);
  var directive = this.startNodeAt(stmt.start, stmt.loc.start);

  var raw = this.input.slice(expr.start, expr.end);
  var val = directiveLiteral.value = raw.slice(1, -1); // remove quotes

  this.addExtra(directiveLiteral, "raw", raw);
  this.addExtra(directiveLiteral, "rawValue", val);

  directive.value = this.finishNodeAt(directiveLiteral, "DirectiveLiteral", expr.end, expr.loc.end);

  return this.finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function (declaration, topLevel) {
  if (this.match(types.at)) {
    this.parseDecorators(true);
  }

  var starttype = this.state.type;
  var node = this.startNode();

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
    case types._break:case types._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case types._debugger:
      return this.parseDebuggerStatement(node);
    case types._do:
      return this.parseDoStatement(node);
    case types._for:
      return this.parseForStatement(node);
    case types._function:
      if (!declaration) this.unexpected();
      return this.parseFunctionStatement(node);

    case types._class:
      if (!declaration) this.unexpected();
      return this.parseClass(node, true);

    case types._if:
      return this.parseIfStatement(node);
    case types._return:
      return this.parseReturnStatement(node);
    case types._switch:
      return this.parseSwitchStatement(node);
    case types._throw:
      return this.parseThrowStatement(node);
    case types._try:
      return this.parseTryStatement(node);

    case types._let:
    case types._const:
      if (!declaration) this.unexpected(); // NOTE: falls through to _var

    case types._var:
      return this.parseVarStatement(node, starttype);

    case types._while:
      return this.parseWhileStatement(node);
    case types._with:
      return this.parseWithStatement(node);
    case types.braceL:
      return this.parseBlock();
    case types.semi:
      return this.parseEmptyStatement(node);
    case types._export:
    case types._import:
      if (this.hasPlugin("dynamicImport") && this.lookahead().type === types.parenL) break;

      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) {
          this.raise(this.state.start, "'import' and 'export' may only appear at the top level");
        }

        if (!this.inModule) {
          this.raise(this.state.start, "'import' and 'export' may appear only with 'sourceType: \"module\"'");
        }
      }
      return starttype === types._import ? this.parseImport(node) : this.parseExport(node);

    case types.name:
      if (this.state.value === "async") {
        // peek ahead and see if next token is a function
        var state = this.state.clone();
        this.next();
        if (this.match(types._function) && !this.canInsertSemicolon()) {
          this.expect(types._function);
          return this.parseFunction(node, true, false, true);
        } else {
          this.state = state;
        }
      }
  }

  // If the statement does not start with a statement keyword or a
  // brace, it's an ExpressionStatement or LabeledStatement. We
  // simply start parsing an expression, and afterwards, if the
  // next token is a colon and the expression was a simple
  // Identifier node, we switch to interpreting it as a label.
  var maybeName = this.state.value;
  var expr = this.parseExpression();

  if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
    return this.parseLabeledStatement(node, maybeName, expr);
  } else {
    return this.parseExpressionStatement(node, expr);
  }
};

pp$1.takeDecorators = function (node) {
  if (this.state.decorators.length) {
    node.decorators = this.state.decorators;
    this.state.decorators = [];
  }
};

pp$1.parseDecorators = function (allowExport) {
  while (this.match(types.at)) {
    var decorator = this.parseDecorator();
    this.state.decorators.push(decorator);
  }

  if (allowExport && this.match(types._export)) {
    return;
  }

  if (!this.match(types._class)) {
    this.raise(this.state.start, "Leading decorators must be attached to a class declaration");
  }
};

pp$1.parseDecorator = function () {
  if (!this.hasPlugin("decorators")) {
    this.unexpected();
  }
  var node = this.startNode();
  this.next();
  node.expression = this.parseMaybeAssign();
  return this.finishNode(node, "Decorator");
};

pp$1.parseBreakContinueStatement = function (node, keyword) {
  var isBreak = keyword === "break";
  this.next();

  if (this.isLineTerminator()) {
    node.label = null;
  } else if (!this.match(types.name)) {
    this.unexpected();
  } else {
    node.label = this.parseIdentifier();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = void 0;
  for (i = 0; i < this.state.labels.length; ++i) {
    var lab = this.state.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
      if (node.label && isBreak) break;
    }
  }
  if (i === this.state.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};

pp$1.parseDebuggerStatement = function (node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};

pp$1.parseDoStatement = function (node) {
  this.next();
  this.state.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  this.expect(types._while);
  node.test = this.parseParenExpression();
  this.eat(types.semi);
  return this.finishNode(node, "DoWhileStatement");
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function (node) {
  this.next();
  this.state.labels.push(loopLabel);

  var forAwait = false;
  if (this.hasPlugin("asyncGenerators") && this.state.inAsync && this.isContextual("await")) {
    forAwait = true;
    this.next();
  }
  this.expect(types.parenL);

  if (this.match(types.semi)) {
    if (forAwait) {
      this.unexpected();
    }
    return this.parseFor(node, null);
  }

  if (this.match(types._var) || this.match(types._let) || this.match(types._const)) {
    var _init = this.startNode();
    var varKind = this.state.type;
    this.next();
    this.parseVar(_init, true, varKind);
    this.finishNode(_init, "VariableDeclaration");

    if (this.match(types._in) || this.isContextual("of")) {
      if (_init.declarations.length === 1 && !_init.declarations[0].init) {
        return this.parseForIn(node, _init, forAwait);
      }
    }
    if (forAwait) {
      this.unexpected();
    }
    return this.parseFor(node, _init);
  }

  var refShorthandDefaultPos = { start: 0 };
  var init = this.parseExpression(true, refShorthandDefaultPos);
  if (this.match(types._in) || this.isContextual("of")) {
    var description = this.isContextual("of") ? "for-of statement" : "for-in statement";
    this.toAssignable(init, undefined, description);
    this.checkLVal(init, undefined, undefined, description);
    return this.parseForIn(node, init, forAwait);
  } else if (refShorthandDefaultPos.start) {
    this.unexpected(refShorthandDefaultPos.start);
  }
  if (forAwait) {
    this.unexpected();
  }
  return this.parseFor(node, init);
};

pp$1.parseFunctionStatement = function (node) {
  this.next();
  return this.parseFunction(node, true);
};

pp$1.parseIfStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  node.consequent = this.parseStatement(false);
  node.alternate = this.eat(types._else) ? this.parseStatement(false) : null;
  return this.finishNode(node, "IfStatement");
};

pp$1.parseReturnStatement = function (node) {
  if (!this.state.inFunction && !this.options.allowReturnOutsideFunction) {
    this.raise(this.state.start, "'return' outside of function");
  }

  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.isLineTerminator()) {
    node.argument = null;
  } else {
    node.argument = this.parseExpression();
    this.semicolon();
  }

  return this.finishNode(node, "ReturnStatement");
};

pp$1.parseSwitchStatement = function (node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types.braceL);
  this.state.labels.push(switchLabel);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur = void 0;
  for (var sawDefault; !this.match(types.braceR);) {
    if (this.match(types._case) || this.match(types._default)) {
      var isCase = this.match(types._case);
      if (cur) this.finishNode(cur, "SwitchCase");
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) this.raise(this.state.lastTokStart, "Multiple default clauses");
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types.colon);
    } else {
      if (cur) {
        cur.consequent.push(this.parseStatement(true));
      } else {
        this.unexpected();
      }
    }
  }
  if (cur) this.finishNode(cur, "SwitchCase");
  this.next(); // Closing brace
  this.state.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};

pp$1.parseThrowStatement = function (node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start))) this.raise(this.state.lastTokEnd, "Illegal newline after throw");
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp$1.parseTryStatement = function (node) {
  this.next();

  node.block = this.parseBlock();
  node.handler = null;

  if (this.match(types._catch)) {
    var clause = this.startNode();
    this.next();

    this.expect(types.parenL);
    clause.param = this.parseBindingAtom();
    this.checkLVal(clause.param, true, Object.create(null), "catch clause");
    this.expect(types.parenR);

    clause.body = this.parseBlock();
    node.handler = this.finishNode(clause, "CatchClause");
  }

  node.guardedHandlers = empty;
  node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;

  if (!node.handler && !node.finalizer) {
    this.raise(node.start, "Missing catch or finally clause");
  }

  return this.finishNode(node, "TryStatement");
};

pp$1.parseVarStatement = function (node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};

pp$1.parseWhileStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  this.state.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, "WhileStatement");
};

pp$1.parseWithStatement = function (node) {
  if (this.state.strict) this.raise(this.state.start, "'with' in strict mode");
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement(false);
  return this.finishNode(node, "WithStatement");
};

pp$1.parseEmptyStatement = function (node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};

pp$1.parseLabeledStatement = function (node, maybeName, expr) {
  for (var _iterator = this.state.labels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _label = _ref;

    if (_label.name === maybeName) {
      this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
  }

  var kind = this.state.type.isLoop ? "loop" : this.match(types._switch) ? "switch" : null;
  for (var i = this.state.labels.length - 1; i >= 0; i--) {
    var label = this.state.labels[i];
    if (label.statementStart === node.start) {
      label.statementStart = this.state.start;
      label.kind = kind;
    } else {
      break;
    }
  }

  this.state.labels.push({ name: maybeName, kind: kind, statementStart: this.state.start });
  node.body = this.parseStatement(true);
  this.state.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};

pp$1.parseExpressionStatement = function (node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function (allowDirectives) {
  var node = this.startNode();
  this.expect(types.braceL);
  this.parseBlockBody(node, allowDirectives, false, types.braceR);
  return this.finishNode(node, "BlockStatement");
};

pp$1.isValidDirective = function (stmt) {
  return stmt.type === "ExpressionStatement" && stmt.expression.type === "StringLiteral" && !stmt.expression.extra.parenthesized;
};

pp$1.parseBlockBody = function (node, allowDirectives, topLevel, end) {
  node.body = [];
  node.directives = [];

  var parsedNonDirective = false;
  var oldStrict = void 0;
  var octalPosition = void 0;

  while (!this.eat(end)) {
    if (!parsedNonDirective && this.state.containsOctal && !octalPosition) {
      octalPosition = this.state.octalPosition;
    }

    var stmt = this.parseStatement(true, topLevel);

    if (allowDirectives && !parsedNonDirective && this.isValidDirective(stmt)) {
      var directive = this.stmtToDirective(stmt);
      node.directives.push(directive);

      if (oldStrict === undefined && directive.value.value === "use strict") {
        oldStrict = this.state.strict;
        this.setStrict(true);

        if (octalPosition) {
          this.raise(octalPosition, "Octal literal in strict mode");
        }
      }

      continue;
    }

    parsedNonDirective = true;
    node.body.push(stmt);
  }

  if (oldStrict === false) {
    this.setStrict(false);
  }
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function (node, init) {
  node.init = init;
  this.expect(types.semi);
  node.test = this.match(types.semi) ? null : this.parseExpression();
  this.expect(types.semi);
  node.update = this.match(types.parenR) ? null : this.parseExpression();
  this.expect(types.parenR);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, "ForStatement");
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function (node, init, forAwait) {
  var type = void 0;
  if (forAwait) {
    this.eatContextual("of");
    type = "ForAwaitStatement";
  } else {
    type = this.match(types._in) ? "ForInStatement" : "ForOfStatement";
    this.next();
  }
  node.left = init;
  node.right = this.parseExpression();
  this.expect(types.parenR);
  node.body = this.parseStatement(false);
  this.state.labels.pop();
  return this.finishNode(node, type);
};

// Parse a list of variable declarations.

pp$1.parseVar = function (node, isFor, kind) {
  node.declarations = [];
  node.kind = kind.keyword;
  for (;;) {
    var decl = this.startNode();
    this.parseVarHead(decl);
    if (this.eat(types.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (kind === types._const && !(this.match(types._in) || this.isContextual("of"))) {
      this.unexpected();
    } else if (decl.id.type !== "Identifier" && !(isFor && (this.match(types._in) || this.isContextual("of")))) {
      this.raise(this.state.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types.comma)) break;
  }
  return node;
};

pp$1.parseVarHead = function (decl) {
  decl.id = this.parseBindingAtom();
  this.checkLVal(decl.id, true, undefined, "variable declaration");
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseFunction = function (node, isStatement, allowExpressionBody, isAsync, optionalId) {
  var oldInMethod = this.state.inMethod;
  this.state.inMethod = false;

  this.initFunction(node, isAsync);

  if (this.match(types.star)) {
    if (node.async && !this.hasPlugin("asyncGenerators")) {
      this.unexpected();
    } else {
      node.generator = true;
      this.next();
    }
  }

  if (isStatement && !optionalId && !this.match(types.name) && !this.match(types._yield)) {
    this.unexpected();
  }

  if (this.match(types.name) || this.match(types._yield)) {
    node.id = this.parseBindingIdentifier();
  }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);

  this.state.inMethod = oldInMethod;

  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

pp$1.parseFunctionParams = function (node) {
  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR);
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function (node, isStatement, optionalId) {
  this.next();
  this.takeDecorators(node);
  this.parseClassId(node, isStatement, optionalId);
  this.parseClassSuper(node);
  this.parseClassBody(node);
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};

pp$1.isClassProperty = function () {
  return this.match(types.eq) || this.match(types.semi) || this.match(types.braceR);
};

pp$1.isClassMethod = function () {
  return this.match(types.parenL);
};

pp$1.isNonstaticConstructor = function (method) {
  return !method.computed && !method.static && (method.key.name === "constructor" || // Identifier
  method.key.value === "constructor" // Literal
  );
};

pp$1.parseClassBody = function (node) {
  // class bodies are implicitly strict
  var oldStrict = this.state.strict;
  this.state.strict = true;

  var hadConstructorCall = false;
  var hadConstructor = false;
  var decorators = [];
  var classBody = this.startNode();

  classBody.body = [];

  this.expect(types.braceL);

  while (!this.eat(types.braceR)) {
    if (this.eat(types.semi)) {
      if (decorators.length > 0) {
        this.raise(this.state.lastTokEnd, "Decorators must not be followed by a semicolon");
      }
      continue;
    }

    if (this.match(types.at)) {
      decorators.push(this.parseDecorator());
      continue;
    }

    var method = this.startNode();

    // steal the decorators if there are any
    if (decorators.length) {
      method.decorators = decorators;
      decorators = [];
    }

    method.static = false;
    if (this.match(types.name) && this.state.value === "static") {
      var key = this.parseIdentifier(true); // eats 'static'
      if (this.isClassMethod()) {
        // a method named 'static'
        method.kind = "method";
        method.computed = false;
        method.key = key;
        this.parseClassMethod(classBody, method, false, false);
        continue;
      } else if (this.isClassProperty()) {
        // a property named 'static'
        method.computed = false;
        method.key = key;
        classBody.body.push(this.parseClassProperty(method));
        continue;
      }
      // otherwise something static
      method.static = true;
    }

    if (this.eat(types.star)) {
      // a generator
      method.kind = "method";
      this.parsePropertyName(method);
      if (this.isNonstaticConstructor(method)) {
        this.raise(method.key.start, "Constructor can't be a generator");
      }
      if (!method.computed && method.static && (method.key.name === "prototype" || method.key.value === "prototype")) {
        this.raise(method.key.start, "Classes may not have static property named prototype");
      }
      this.parseClassMethod(classBody, method, true, false);
    } else {
      var isSimple = this.match(types.name);
      var _key = this.parsePropertyName(method);
      if (!method.computed && method.static && (method.key.name === "prototype" || method.key.value === "prototype")) {
        this.raise(method.key.start, "Classes may not have static property named prototype");
      }
      if (this.isClassMethod()) {
        // a normal method
        if (this.isNonstaticConstructor(method)) {
          if (hadConstructor) {
            this.raise(_key.start, "Duplicate constructor in the same class");
          } else if (method.decorators) {
            this.raise(method.start, "You can't attach decorators to a class constructor");
          }
          hadConstructor = true;
          method.kind = "constructor";
        } else {
          method.kind = "method";
        }
        this.parseClassMethod(classBody, method, false, false);
      } else if (this.isClassProperty()) {
        // a normal property
        if (this.isNonstaticConstructor(method)) {
          this.raise(method.key.start, "Classes may not have a non-static field named 'constructor'");
        }
        classBody.body.push(this.parseClassProperty(method));
      } else if (isSimple && _key.name === "async" && !this.isLineTerminator()) {
        // an async method
        var isGenerator = this.hasPlugin("asyncGenerators") && this.eat(types.star);
        method.kind = "method";
        this.parsePropertyName(method);
        if (this.isNonstaticConstructor(method)) {
          this.raise(method.key.start, "Constructor can't be an async function");
        }
        this.parseClassMethod(classBody, method, isGenerator, true);
      } else if (isSimple && (_key.name === "get" || _key.name === "set") && !(this.isLineTerminator() && this.match(types.star))) {
        // `get\n*` is an uninitialized property named 'get' followed by a generator.
        // a getter or setter
        method.kind = _key.name;
        this.parsePropertyName(method);
        if (this.isNonstaticConstructor(method)) {
          this.raise(method.key.start, "Constructor can't have get/set modifier");
        }
        this.parseClassMethod(classBody, method, false, false);
        this.checkGetterSetterParamCount(method);
      } else if (this.hasPlugin("classConstructorCall") && isSimple && _key.name === "call" && this.match(types.name) && this.state.value === "constructor") {
        // a (deprecated) call constructor
        if (hadConstructorCall) {
          this.raise(method.start, "Duplicate constructor call in the same class");
        } else if (method.decorators) {
          this.raise(method.start, "You can't attach decorators to a class constructor");
        }
        hadConstructorCall = true;
        method.kind = "constructorCall";
        this.parsePropertyName(method); // consume "constructor" and make it the method's name
        this.parseClassMethod(classBody, method, false, false);
      } else if (this.isLineTerminator()) {
        // an uninitialized class property (due to ASI, since we don't otherwise recognize the next token)
        if (this.isNonstaticConstructor(method)) {
          this.raise(method.key.start, "Classes may not have a non-static field named 'constructor'");
        }
        classBody.body.push(this.parseClassProperty(method));
      } else {
        this.unexpected();
      }
    }
  }

  if (decorators.length) {
    this.raise(this.state.start, "You have trailing decorators with no method");
  }

  node.body = this.finishNode(classBody, "ClassBody");

  this.state.strict = oldStrict;
};

pp$1.parseClassProperty = function (node) {
  this.state.inClassProperty = true;
  if (this.match(types.eq)) {
    if (!this.hasPlugin("classProperties")) this.unexpected();
    this.next();
    node.value = this.parseMaybeAssign();
  } else {
    node.value = null;
  }
  this.semicolon();
  this.state.inClassProperty = false;
  return this.finishNode(node, "ClassProperty");
};

pp$1.parseClassMethod = function (classBody, method, isGenerator, isAsync) {
  this.parseMethod(method, isGenerator, isAsync);
  classBody.body.push(this.finishNode(method, "ClassMethod"));
};

pp$1.parseClassId = function (node, isStatement, optionalId) {
  if (this.match(types.name)) {
    node.id = this.parseIdentifier();
  } else {
    if (optionalId || !isStatement) {
      node.id = null;
    } else {
      this.unexpected();
    }
  }
};

pp$1.parseClassSuper = function (node) {
  node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp$1.parseExport = function (node) {
  this.next();
  // export * from '...'
  if (this.match(types.star)) {
    var specifier = this.startNode();
    this.next();
    if (this.hasPlugin("exportExtensions") && this.eatContextual("as")) {
      specifier.exported = this.parseIdentifier();
      node.specifiers = [this.finishNode(specifier, "ExportNamespaceSpecifier")];
      this.parseExportSpecifiersMaybe(node);
      this.parseExportFrom(node, true);
    } else {
      this.parseExportFrom(node, true);
      return this.finishNode(node, "ExportAllDeclaration");
    }
  } else if (this.hasPlugin("exportExtensions") && this.isExportDefaultSpecifier()) {
    var _specifier = this.startNode();
    _specifier.exported = this.parseIdentifier(true);
    node.specifiers = [this.finishNode(_specifier, "ExportDefaultSpecifier")];
    if (this.match(types.comma) && this.lookahead().type === types.star) {
      this.expect(types.comma);
      var _specifier2 = this.startNode();
      this.expect(types.star);
      this.expectContextual("as");
      _specifier2.exported = this.parseIdentifier();
      node.specifiers.push(this.finishNode(_specifier2, "ExportNamespaceSpecifier"));
    } else {
      this.parseExportSpecifiersMaybe(node);
    }
    this.parseExportFrom(node, true);
  } else if (this.eat(types._default)) {
    // export default ...
    var expr = this.startNode();
    var needsSemi = false;
    if (this.eat(types._function)) {
      expr = this.parseFunction(expr, true, false, false, true);
    } else if (this.match(types._class)) {
      expr = this.parseClass(expr, true, true);
    } else {
      needsSemi = true;
      expr = this.parseMaybeAssign();
    }
    node.declaration = expr;
    if (needsSemi) this.semicolon();
    this.checkExport(node, true, true);
    return this.finishNode(node, "ExportDefaultDeclaration");
  } else if (this.shouldParseExportDeclaration()) {
    node.specifiers = [];
    node.source = null;
    node.declaration = this.parseExportDeclaration(node);
  } else {
    // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers();
    this.parseExportFrom(node);
  }
  this.checkExport(node, true);
  return this.finishNode(node, "ExportNamedDeclaration");
};

pp$1.parseExportDeclaration = function () {
  return this.parseStatement(true);
};

pp$1.isExportDefaultSpecifier = function () {
  if (this.match(types.name)) {
    return this.state.value !== "async";
  }

  if (!this.match(types._default)) {
    return false;
  }

  var lookahead = this.lookahead();
  return lookahead.type === types.comma || lookahead.type === types.name && lookahead.value === "from";
};

pp$1.parseExportSpecifiersMaybe = function (node) {
  if (this.eat(types.comma)) {
    node.specifiers = node.specifiers.concat(this.parseExportSpecifiers());
  }
};

pp$1.parseExportFrom = function (node, expect) {
  if (this.eatContextual("from")) {
    node.source = this.match(types.string) ? this.parseExprAtom() : this.unexpected();
    this.checkExport(node);
  } else {
    if (expect) {
      this.unexpected();
    } else {
      node.source = null;
    }
  }

  this.semicolon();
};

pp$1.shouldParseExportDeclaration = function () {
  return this.state.type.keyword === "var" || this.state.type.keyword === "const" || this.state.type.keyword === "let" || this.state.type.keyword === "function" || this.state.type.keyword === "class" || this.isContextual("async");
};

pp$1.checkExport = function (node, checkNames, isDefault) {
  if (checkNames) {
    // Check for duplicate exports
    if (isDefault) {
      // Default exports
      this.checkDuplicateExports(node, "default");
    } else if (node.specifiers && node.specifiers.length) {
      // Named exports
      for (var _iterator2 = node.specifiers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var specifier = _ref2;

        this.checkDuplicateExports(specifier, specifier.exported.name);
      }
    } else if (node.declaration) {
      // Exported declarations
      if (node.declaration.type === "FunctionDeclaration" || node.declaration.type === "ClassDeclaration") {
        this.checkDuplicateExports(node, node.declaration.id.name);
      } else if (node.declaration.type === "VariableDeclaration") {
        for (var _iterator3 = node.declaration.declarations, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var declaration = _ref3;

          this.checkDeclaration(declaration.id);
        }
      }
    }
  }

  if (this.state.decorators.length) {
    var isClass = node.declaration && (node.declaration.type === "ClassDeclaration" || node.declaration.type === "ClassExpression");
    if (!node.declaration || !isClass) {
      this.raise(node.start, "You can only use decorators on an export when exporting a class");
    }
    this.takeDecorators(node.declaration);
  }
};

pp$1.checkDeclaration = function (node) {
  if (node.type === "ObjectPattern") {
    for (var _iterator4 = node.properties, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var prop = _ref4;

      this.checkDeclaration(prop);
    }
  } else if (node.type === "ArrayPattern") {
    for (var _iterator5 = node.elements, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var elem = _ref5;

      if (elem) {
        this.checkDeclaration(elem);
      }
    }
  } else if (node.type === "ObjectProperty") {
    this.checkDeclaration(node.value);
  } else if (node.type === "RestElement" || node.type === "RestProperty") {
    this.checkDeclaration(node.argument);
  } else if (node.type === "Identifier") {
    this.checkDuplicateExports(node, node.name);
  }
};

pp$1.checkDuplicateExports = function (node, name) {
  if (this.state.exportedIdentifiers.indexOf(name) > -1) {
    this.raiseDuplicateExportError(node, name);
  }
  this.state.exportedIdentifiers.push(name);
};

pp$1.raiseDuplicateExportError = function (node, name) {
  this.raise(node.start, name === "default" ? "Only one default export allowed per module." : "`" + name + "` has already been exported. Exported identifiers must be unique.");
};

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function () {
  var nodes = [];
  var first = true;
  var needsFrom = void 0;

  // export { x, y as z } [from '...']
  this.expect(types.braceL);

  while (!this.eat(types.braceR)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma);
      if (this.eat(types.braceR)) break;
    }

    var isDefault = this.match(types._default);
    if (isDefault && !needsFrom) needsFrom = true;

    var node = this.startNode();
    node.local = this.parseIdentifier(isDefault);
    node.exported = this.eatContextual("as") ? this.parseIdentifier(true) : node.local.__clone();
    nodes.push(this.finishNode(node, "ExportSpecifier"));
  }

  // https://github.com/ember-cli/ember-cli/pull/3739
  if (needsFrom && !this.isContextual("from")) {
    this.unexpected();
  }

  return nodes;
};

// Parses import declaration.

pp$1.parseImport = function (node) {
  this.eat(types._import);

  // import '...'
  if (this.match(types.string)) {
    node.specifiers = [];
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = [];
    this.parseImportSpecifiers(node);
    this.expectContextual("from");
    node.source = this.match(types.string) ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function (node) {
  var first = true;
  if (this.match(types.name)) {
    // import defaultObj, { x, y as z } from '...'
    var startPos = this.state.start;
    var startLoc = this.state.startLoc;
    node.specifiers.push(this.parseImportSpecifierDefault(this.parseIdentifier(), startPos, startLoc));
    if (!this.eat(types.comma)) return;
  }

  if (this.match(types.star)) {
    var specifier = this.startNode();
    this.next();
    this.expectContextual("as");
    specifier.local = this.parseIdentifier();
    this.checkLVal(specifier.local, true, undefined, "import namespace specifier");
    node.specifiers.push(this.finishNode(specifier, "ImportNamespaceSpecifier"));
    return;
  }

  this.expect(types.braceL);
  while (!this.eat(types.braceR)) {
    if (first) {
      first = false;
    } else {
      // Detect an attempt to deep destructure
      if (this.eat(types.colon)) {
        this.unexpected(null, "ES2015 named imports do not destructure. Use another statement for destructuring after the import.");
      }

      this.expect(types.comma);
      if (this.eat(types.braceR)) break;
    }

    this.parseImportSpecifier(node);
  }
};

pp$1.parseImportSpecifier = function (node) {
  var specifier = this.startNode();
  specifier.imported = this.parseIdentifier(true);
  if (this.eatContextual("as")) {
    specifier.local = this.parseIdentifier();
  } else {
    this.checkReservedWord(specifier.imported.name, specifier.start, true, true);
    specifier.local = specifier.imported.__clone();
  }
  this.checkLVal(specifier.local, true, undefined, "import specifier");
  node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
};

pp$1.parseImportSpecifierDefault = function (id, startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.local = id;
  this.checkLVal(node.local, true, undefined, "default import specifier");
  return this.finishNode(node, "ImportDefaultSpecifier");
};

var pp$2 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function (node, isBinding, contextDescription) {
  if (node) {
    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        for (var _iterator = node.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var prop = _ref;

          if (prop.type === "ObjectMethod") {
            if (prop.kind === "get" || prop.kind === "set") {
              this.raise(prop.key.start, "Object pattern can't contain getter or setter");
            } else {
              this.raise(prop.key.start, "Object pattern can't contain methods");
            }
          } else {
            this.toAssignable(prop, isBinding, "object destructuring pattern");
          }
        }
        break;

      case "ObjectProperty":
        this.toAssignable(node.value, isBinding, contextDescription);
        break;

      case "SpreadProperty":
        node.type = "RestProperty";
        var arg = node.argument;
        this.toAssignable(arg, isBinding, contextDescription);
        break;

      case "ArrayExpression":
        node.type = "ArrayPattern";
        this.toAssignableList(node.elements, isBinding, contextDescription);
        break;

      case "AssignmentExpression":
        if (node.operator === "=") {
          node.type = "AssignmentPattern";
          delete node.operator;
        } else {
          this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
        }
        break;

      case "MemberExpression":
        if (!isBinding) break;

      default:
        {
          var message = "Invalid left-hand side" + (contextDescription ? " in " + contextDescription : /* istanbul ignore next */"expression");
          this.raise(node.start, message);
        }
    }
  }
  return node;
};

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function (exprList, isBinding, contextDescription) {
  var end = exprList.length;
  if (end) {
    var last = exprList[end - 1];
    if (last && last.type === "RestElement") {
      --end;
    } else if (last && last.type === "SpreadElement") {
      last.type = "RestElement";
      var arg = last.argument;
      this.toAssignable(arg, isBinding, contextDescription);
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") {
        this.unexpected(arg.start);
      }
      --end;
    }
  }
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) this.toAssignable(elt, isBinding, contextDescription);
  }
  return exprList;
};

// Convert list of expression atoms to a list of

pp$2.toReferencedList = function (exprList) {
  return exprList;
};

// Parses spread element.

pp$2.parseSpread = function (refShorthandDefaultPos) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refShorthandDefaultPos);
  return this.finishNode(node, "SpreadElement");
};

pp$2.parseRest = function () {
  var node = this.startNode();
  this.next();
  node.argument = this.parseBindingIdentifier();
  return this.finishNode(node, "RestElement");
};

pp$2.shouldAllowYieldIdentifier = function () {
  return this.match(types._yield) && !this.state.strict && !this.state.inGenerator;
};

pp$2.parseBindingIdentifier = function () {
  return this.parseIdentifier(this.shouldAllowYieldIdentifier());
};

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function () {
  switch (this.state.type) {
    case types._yield:
      if (this.state.strict || this.state.inGenerator) this.unexpected();
    // fall-through
    case types.name:
      return this.parseIdentifier(true);

    case types.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(types.bracketR, true);
      return this.finishNode(node, "ArrayPattern");

    case types.braceL:
      return this.parseObj(true);

    default:
      this.unexpected();
  }
};

pp$2.parseBindingList = function (close, allowEmpty) {
  var elts = [];
  var first = true;
  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma);
    }
    if (allowEmpty && this.match(types.comma)) {
      elts.push(null);
    } else if (this.eat(close)) {
      break;
    } else if (this.match(types.ellipsis)) {
      elts.push(this.parseAssignableListItemTypes(this.parseRest()));
      this.expect(close);
      break;
    } else {
      var decorators = [];
      while (this.match(types.at)) {
        decorators.push(this.parseDecorator());
      }
      var left = this.parseMaybeDefault();
      if (decorators.length) {
        left.decorators = decorators;
      }
      this.parseAssignableListItemTypes(left);
      elts.push(this.parseMaybeDefault(left.start, left.loc.start, left));
    }
  }
  return elts;
};

pp$2.parseAssignableListItemTypes = function (param) {
  return param;
};

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
  startLoc = startLoc || this.state.startLoc;
  startPos = startPos || this.state.start;
  left = left || this.parseBindingAtom();
  if (!this.eat(types.eq)) return left;

  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};

// Verify that a node is an lval — something that can be assigned
// to.

pp$2.checkLVal = function (expr, isBinding, checkClashes, contextDescription) {
  switch (expr.type) {
    case "Identifier":
      this.checkReservedWord(expr.name, expr.start, false, true);

      if (checkClashes) {
        // we need to prefix this with an underscore for the cases where we have a key of
        // `__proto__`. there's a bug in old V8 where the following wouldn't work:
        //
        //   > var obj = Object.create(null);
        //   undefined
        //   > obj.__proto__
        //   null
        //   > obj.__proto__ = true;
        //   true
        //   > obj.__proto__
        //   null
        var key = "_" + expr.name;

        if (checkClashes[key]) {
          this.raise(expr.start, "Argument name clash in strict mode");
        } else {
          checkClashes[key] = true;
        }
      }
      break;

    case "MemberExpression":
      if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
      break;

    case "ObjectPattern":
      for (var _iterator2 = expr.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var prop = _ref2;

        if (prop.type === "ObjectProperty") prop = prop.value;
        this.checkLVal(prop, isBinding, checkClashes, "object destructuring pattern");
      }
      break;

    case "ArrayPattern":
      for (var _iterator3 = expr.elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var elem = _ref3;

        if (elem) this.checkLVal(elem, isBinding, checkClashes, "array destructuring pattern");
      }
      break;

    case "AssignmentPattern":
      this.checkLVal(expr.left, isBinding, checkClashes, "assignment pattern");
      break;

    case "RestProperty":
      this.checkLVal(expr.argument, isBinding, checkClashes, "rest property");
      break;

    case "RestElement":
      this.checkLVal(expr.argument, isBinding, checkClashes, "rest element");
      break;

    default:
      {
        var message = (isBinding ? /* istanbul ignore next */"Binding invalid" : "Invalid") + " left-hand side" + (contextDescription ? " in " + contextDescription : /* istanbul ignore next */"expression");
        this.raise(expr.start, message);
      }
  }
};

/* eslint max-len: 0 */

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

var pp$3 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function (prop, propHash) {
  if (prop.computed || prop.kind) return;

  var key = prop.key;
  // It is either an Identifier or a String/NumericLiteral
  var name = key.type === "Identifier" ? key.name : String(key.value);

  if (name === "__proto__") {
    if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
    propHash.proto = true;
  }
};

// Convenience method to parse an Expression only
pp$3.getExpression = function () {
  this.nextToken();
  var expr = this.parseExpression();
  if (!this.match(types.eof)) {
    this.unexpected();
  }
  return expr;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function (s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initialization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function (noIn, refShorthandDefaultPos) {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
  if (this.match(types.comma)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types.comma)) {
      node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
    }
    this.toReferencedList(node.expressions);
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function (noIn, refShorthandDefaultPos, afterLeftParse, refNeedsArrowPos) {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;

  if (this.match(types._yield) && this.state.inGenerator) {
    var _left = this.parseYield();
    if (afterLeftParse) _left = afterLeftParse.call(this, _left, startPos, startLoc);
    return _left;
  }

  var failOnShorthandAssign = void 0;
  if (refShorthandDefaultPos) {
    failOnShorthandAssign = false;
  } else {
    refShorthandDefaultPos = { start: 0 };
    failOnShorthandAssign = true;
  }

  if (this.match(types.parenL) || this.match(types.name)) {
    this.state.potentialArrowAt = this.state.start;
  }

  var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos, refNeedsArrowPos);
  if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
  if (this.state.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.state.value;
    node.left = this.match(types.eq) ? this.toAssignable(left, undefined, "assignment expression") : left;
    refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly

    this.checkLVal(left, undefined, undefined, "assignment expression");

    if (left.extra && left.extra.parenthesized) {
      var errorMsg = void 0;
      if (left.type === "ObjectPattern") {
        errorMsg = "`({a}) = 0` use `({a} = 0)`";
      } else if (left.type === "ArrayPattern") {
        errorMsg = "`([a]) = 0` use `([a] = 0)`";
      }
      if (errorMsg) {
        this.raise(left.start, "You're trying to assign to a parenthesized expression, eg. instead of " + errorMsg);
      }
    }

    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression");
  } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
    this.unexpected(refShorthandDefaultPos.start);
  }

  return left;
};

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function (noIn, refShorthandDefaultPos, refNeedsArrowPos) {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;

  return this.parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos);
};

pp$3.parseConditional = function (expr, noIn, startPos, startLoc) {
  if (this.eat(types.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};

// Start the precedence parser.

pp$3.parseExprOps = function (noIn, refShorthandDefaultPos) {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var expr = this.parseMaybeUnary(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  } else {
    return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  }
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.state.type.binop;
  if (prec != null && (!noIn || !this.match(types._in))) {
    if (prec > minPrec) {
      var node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.left = left;
      node.operator = this.state.value;

      if (node.operator === "**" && left.type === "UnaryExpression" && left.extra && !left.extra.parenthesizedArgument && !left.extra.parenthesized) {
        this.raise(left.argument.start, "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.");
      }

      var op = this.state.type;
      this.next();

      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      node.right = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, op.rightAssociative ? prec - 1 : prec, noIn);

      this.finishNode(node, op === types.logicalOR || op === types.logicalAND ? "LogicalExpression" : "BinaryExpression");
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
  }
  return left;
};

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function (refShorthandDefaultPos) {
  if (this.state.type.prefix) {
    var node = this.startNode();
    var update = this.match(types.incDec);
    node.operator = this.state.value;
    node.prefix = true;
    this.next();

    var argType = this.state.type;
    node.argument = this.parseMaybeUnary();

    this.addExtra(node, "parenthesizedArgument", argType === types.parenL && (!node.argument.extra || !node.argument.extra.parenthesized));

    if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
      this.unexpected(refShorthandDefaultPos.start);
    }

    if (update) {
      this.checkLVal(node.argument, undefined, undefined, "prefix operation");
    } else if (this.state.strict && node.operator === "delete" && node.argument.type === "Identifier") {
      this.raise(node.start, "Deleting local variable in strict mode");
    }

    return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  }

  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var expr = this.parseExprSubscripts(refShorthandDefaultPos);
  if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
  while (this.state.type.postfix && !this.canInsertSemicolon()) {
    var _node = this.startNodeAt(startPos, startLoc);
    _node.operator = this.state.value;
    _node.prefix = false;
    _node.argument = expr;
    this.checkLVal(expr, undefined, undefined, "postfix operation");
    this.next();
    expr = this.finishNode(_node, "UpdateExpression");
  }
  return expr;
};

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function (refShorthandDefaultPos) {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var potentialArrowAt = this.state.potentialArrowAt;
  var expr = this.parseExprAtom(refShorthandDefaultPos);

  if (expr.type === "ArrowFunctionExpression" && expr.start === potentialArrowAt) {
    return expr;
  }

  if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
    return expr;
  }

  return this.parseSubscripts(expr, startPos, startLoc);
};

pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
  for (;;) {
    if (!noCalls && this.eat(types.doubleColon)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.callee = this.parseNoCallExpr();
      return this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
    } else if (this.eat(types.dot)) {
      var _node2 = this.startNodeAt(startPos, startLoc);
      _node2.object = base;
      _node2.property = this.parseIdentifier(true);
      _node2.computed = false;
      base = this.finishNode(_node2, "MemberExpression");
    } else if (this.eat(types.bracketL)) {
      var _node3 = this.startNodeAt(startPos, startLoc);
      _node3.object = base;
      _node3.property = this.parseExpression();
      _node3.computed = true;
      this.expect(types.bracketR);
      base = this.finishNode(_node3, "MemberExpression");
    } else if (!noCalls && this.match(types.parenL)) {
      var possibleAsync = this.state.potentialArrowAt === base.start && base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon();
      this.next();

      var _node4 = this.startNodeAt(startPos, startLoc);
      _node4.callee = base;
      _node4.arguments = this.parseCallExpressionArguments(types.parenR, possibleAsync);
      if (_node4.callee.type === "Import" && _node4.arguments.length !== 1) {
        this.raise(_node4.start, "import() requires exactly one argument");
      }
      base = this.finishNode(_node4, "CallExpression");

      if (possibleAsync && this.shouldParseAsyncArrow()) {
        return this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), _node4);
      } else {
        this.toReferencedList(_node4.arguments);
      }
    } else if (this.match(types.backQuote)) {
      var _node5 = this.startNodeAt(startPos, startLoc);
      _node5.tag = base;
      _node5.quasi = this.parseTemplate(true);
      base = this.finishNode(_node5, "TaggedTemplateExpression");
    } else {
      return base;
    }
  }
};

pp$3.parseCallExpressionArguments = function (close, possibleAsyncArrow) {
  var elts = [];
  var innerParenStart = void 0;
  var first = true;

  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma);
      if (this.eat(close)) break;
    }

    // we need to make sure that if this is an async arrow functions, that we don't allow inner parens inside the params
    if (this.match(types.parenL) && !innerParenStart) {
      innerParenStart = this.state.start;
    }

    elts.push(this.parseExprListItem(false, possibleAsyncArrow ? { start: 0 } : undefined, possibleAsyncArrow ? { start: 0 } : undefined));
  }

  // we found an async arrow function so let's not allow any inner parens
  if (possibleAsyncArrow && innerParenStart && this.shouldParseAsyncArrow()) {
    this.unexpected();
  }

  return elts;
};

pp$3.shouldParseAsyncArrow = function () {
  return this.match(types.arrow);
};

pp$3.parseAsyncArrowFromCallExpression = function (node, call) {
  this.expect(types.arrow);
  return this.parseArrowExpression(node, call.arguments, true);
};

// Parse a no-call expression (like argument of `new` or `::` operators).

pp$3.parseNoCallExpr = function () {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function (refShorthandDefaultPos) {
  var canBeArrow = this.state.potentialArrowAt === this.state.start;
  var node = void 0;

  switch (this.state.type) {
    case types._super:
      if (!this.state.inMethod && !this.state.inClassProperty && !this.options.allowSuperOutsideMethod) {
        this.raise(this.state.start, "'super' outside of function or class");
      }

      node = this.startNode();
      this.next();
      if (!this.match(types.parenL) && !this.match(types.bracketL) && !this.match(types.dot)) {
        this.unexpected();
      }
      if (this.match(types.parenL) && this.state.inMethod !== "constructor" && !this.options.allowSuperOutsideMethod) {
        this.raise(node.start, "super() outside of class constructor");
      }
      return this.finishNode(node, "Super");

    case types._import:
      if (!this.hasPlugin("dynamicImport")) this.unexpected();

      node = this.startNode();
      this.next();
      if (!this.match(types.parenL)) {
        this.unexpected(null, types.parenL);
      }
      return this.finishNode(node, "Import");

    case types._this:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression");

    case types._yield:
      if (this.state.inGenerator) this.unexpected();

    case types.name:
      node = this.startNode();
      var allowAwait = this.state.value === "await" && this.state.inAsync;
      var allowYield = this.shouldAllowYieldIdentifier();
      var id = this.parseIdentifier(allowAwait || allowYield);

      if (id.name === "await") {
        if (this.state.inAsync || this.inModule) {
          return this.parseAwait(node);
        }
      } else if (id.name === "async" && this.match(types._function) && !this.canInsertSemicolon()) {
        this.next();
        return this.parseFunction(node, false, false, true);
      } else if (canBeArrow && id.name === "async" && this.match(types.name)) {
        var params = [this.parseIdentifier()];
        this.expect(types.arrow);
        // let foo = bar => {};
        return this.parseArrowExpression(node, params, true);
      }

      if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
        return this.parseArrowExpression(node, [id]);
      }

      return id;

    case types._do:
      if (this.hasPlugin("doExpressions")) {
        var _node6 = this.startNode();
        this.next();
        var oldInFunction = this.state.inFunction;
        var oldLabels = this.state.labels;
        this.state.labels = [];
        this.state.inFunction = false;
        _node6.body = this.parseBlock(false, true);
        this.state.inFunction = oldInFunction;
        this.state.labels = oldLabels;
        return this.finishNode(_node6, "DoExpression");
      }

    case types.regexp:
      var value = this.state.value;
      node = this.parseLiteral(value.value, "RegExpLiteral");
      node.pattern = value.pattern;
      node.flags = value.flags;
      return node;

    case types.num:
      return this.parseLiteral(this.state.value, "NumericLiteral");

    case types.string:
      return this.parseLiteral(this.state.value, "StringLiteral");

    case types._null:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "NullLiteral");

    case types._true:case types._false:
      node = this.startNode();
      node.value = this.match(types._true);
      this.next();
      return this.finishNode(node, "BooleanLiteral");

    case types.parenL:
      return this.parseParenAndDistinguishExpression(null, null, canBeArrow);

    case types.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(types.bracketR, true, refShorthandDefaultPos);
      this.toReferencedList(node.elements);
      return this.finishNode(node, "ArrayExpression");

    case types.braceL:
      return this.parseObj(false, refShorthandDefaultPos);

    case types._function:
      return this.parseFunctionExpression();

    case types.at:
      this.parseDecorators();

    case types._class:
      node = this.startNode();
      this.takeDecorators(node);
      return this.parseClass(node, false);

    case types._new:
      return this.parseNew();

    case types.backQuote:
      return this.parseTemplate(false);

    case types.doubleColon:
      node = this.startNode();
      this.next();
      node.object = null;
      var callee = node.callee = this.parseNoCallExpr();
      if (callee.type === "MemberExpression") {
        return this.finishNode(node, "BindExpression");
      } else {
        this.raise(callee.start, "Binding should be performed on object property.");
      }

    default:
      this.unexpected();
  }
};

pp$3.parseFunctionExpression = function () {
  var node = this.startNode();
  var meta = this.parseIdentifier(true);
  if (this.state.inGenerator && this.eat(types.dot) && this.hasPlugin("functionSent")) {
    return this.parseMetaProperty(node, meta, "sent");
  } else {
    return this.parseFunction(node, false);
  }
};

pp$3.parseMetaProperty = function (node, meta, propertyName) {
  node.meta = meta;
  node.property = this.parseIdentifier(true);

  if (node.property.name !== propertyName) {
    this.raise(node.property.start, "The only valid meta property for new is " + meta.name + "." + propertyName);
  }

  return this.finishNode(node, "MetaProperty");
};

pp$3.parseLiteral = function (value, type, startPos, startLoc) {
  startPos = startPos || this.state.start;
  startLoc = startLoc || this.state.startLoc;

  var node = this.startNodeAt(startPos, startLoc);
  this.addExtra(node, "rawValue", value);
  this.addExtra(node, "raw", this.input.slice(startPos, this.state.end));
  node.value = value;
  this.next();
  return this.finishNode(node, type);
};

pp$3.parseParenExpression = function () {
  this.expect(types.parenL);
  var val = this.parseExpression();
  this.expect(types.parenR);
  return val;
};

pp$3.parseParenAndDistinguishExpression = function (startPos, startLoc, canBeArrow) {
  startPos = startPos || this.state.start;
  startLoc = startLoc || this.state.startLoc;

  var val = void 0;
  this.expect(types.parenL);

  var innerStartPos = this.state.start;
  var innerStartLoc = this.state.startLoc;
  var exprList = [];
  var refShorthandDefaultPos = { start: 0 };
  var refNeedsArrowPos = { start: 0 };
  var first = true;
  var spreadStart = void 0;
  var optionalCommaStart = void 0;

  while (!this.match(types.parenR)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma, refNeedsArrowPos.start || null);
      if (this.match(types.parenR)) {
        optionalCommaStart = this.state.start;
        break;
      }
    }

    if (this.match(types.ellipsis)) {
      var spreadNodeStartPos = this.state.start;
      var spreadNodeStartLoc = this.state.startLoc;
      spreadStart = this.state.start;
      exprList.push(this.parseParenItem(this.parseRest(), spreadNodeStartPos, spreadNodeStartLoc));
      break;
    } else {
      exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem, refNeedsArrowPos));
    }
  }

  var innerEndPos = this.state.start;
  var innerEndLoc = this.state.startLoc;
  this.expect(types.parenR);

  var arrowNode = this.startNodeAt(startPos, startLoc);
  if (canBeArrow && this.shouldParseArrow() && (arrowNode = this.parseArrow(arrowNode))) {
    for (var _iterator = exprList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var param = _ref;

      if (param.extra && param.extra.parenthesized) this.unexpected(param.extra.parenStart);
    }

    return this.parseArrowExpression(arrowNode, exprList);
  }

  if (!exprList.length) {
    this.unexpected(this.state.lastTokStart);
  }
  if (optionalCommaStart) this.unexpected(optionalCommaStart);
  if (spreadStart) this.unexpected(spreadStart);
  if (refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);
  if (refNeedsArrowPos.start) this.unexpected(refNeedsArrowPos.start);

  if (exprList.length > 1) {
    val = this.startNodeAt(innerStartPos, innerStartLoc);
    val.expressions = exprList;
    this.toReferencedList(val.expressions);
    this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
  } else {
    val = exprList[0];
  }

  this.addExtra(val, "parenthesized", true);
  this.addExtra(val, "parenStart", startPos);

  return val;
};

pp$3.shouldParseArrow = function () {
  return !this.canInsertSemicolon();
};

pp$3.parseArrow = function (node) {
  if (this.eat(types.arrow)) {
    return node;
  }
};

pp$3.parseParenItem = function (node) {
  return node;
};

// New's precedence is slightly tricky. It must allow its argument
// to be a `[]` or dot subscript expression, but not a call — at
// least, not without wrapping it in parentheses. Thus, it uses the

pp$3.parseNew = function () {
  var node = this.startNode();
  var meta = this.parseIdentifier(true);

  if (this.eat(types.dot)) {
    var metaProp = this.parseMetaProperty(node, meta, "target");

    if (!this.state.inFunction) {
      this.raise(metaProp.property.start, "new.target can only be used in functions");
    }

    return metaProp;
  }

  node.callee = this.parseNoCallExpr();

  if (this.eat(types.parenL)) {
    node.arguments = this.parseExprList(types.parenR);
    this.toReferencedList(node.arguments);
  } else {
    node.arguments = [];
  }

  return this.finishNode(node, "NewExpression");
};

// Parse template expression.

pp$3.parseTemplateElement = function (isTagged) {
  var elem = this.startNode();
  if (this.state.value === null) {
    if (!isTagged || !this.hasPlugin("templateInvalidEscapes")) {
      this.raise(this.state.invalidTemplateEscapePosition, "Invalid escape sequence in template");
    } else {
      this.state.invalidTemplateEscapePosition = null;
    }
  }
  elem.value = {
    raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
    cooked: this.state.value
  };
  this.next();
  elem.tail = this.match(types.backQuote);
  return this.finishNode(elem, "TemplateElement");
};

pp$3.parseTemplate = function (isTagged) {
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement(isTagged);
  node.quasis = [curElt];
  while (!curElt.tail) {
    this.expect(types.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(types.braceR);
    node.quasis.push(curElt = this.parseTemplateElement(isTagged));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};

// Parse an object literal or binding pattern.

pp$3.parseObj = function (isPattern, refShorthandDefaultPos) {
  var decorators = [];
  var propHash = Object.create(null);
  var first = true;
  var node = this.startNode();

  node.properties = [];
  this.next();

  var firstRestLocation = null;

  while (!this.eat(types.braceR)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma);
      if (this.eat(types.braceR)) break;
    }

    while (this.match(types.at)) {
      decorators.push(this.parseDecorator());
    }

    var prop = this.startNode(),
        isGenerator = false,
        isAsync = false,
        startPos = void 0,
        startLoc = void 0;
    if (decorators.length) {
      prop.decorators = decorators;
      decorators = [];
    }

    if (this.hasPlugin("objectRestSpread") && this.match(types.ellipsis)) {
      prop = this.parseSpread(isPattern ? { start: 0 } : undefined);
      prop.type = isPattern ? "RestProperty" : "SpreadProperty";
      if (isPattern) this.toAssignable(prop.argument, true, "object pattern");
      node.properties.push(prop);
      if (isPattern) {
        var position = this.state.start;
        if (firstRestLocation !== null) {
          this.unexpected(firstRestLocation, "Cannot have multiple rest elements when destructuring");
        } else if (this.eat(types.braceR)) {
          break;
        } else if (this.match(types.comma) && this.lookahead().type === types.braceR) {
          // TODO: temporary rollback
          // this.unexpected(position, "A trailing comma is not permitted after the rest element");
          continue;
        } else {
          firstRestLocation = position;
          continue;
        }
      } else {
        continue;
      }
    }

    prop.method = false;
    prop.shorthand = false;

    if (isPattern || refShorthandDefaultPos) {
      startPos = this.state.start;
      startLoc = this.state.startLoc;
    }

    if (!isPattern) {
      isGenerator = this.eat(types.star);
    }

    if (!isPattern && this.isContextual("async")) {
      if (isGenerator) this.unexpected();

      var asyncId = this.parseIdentifier();
      if (this.match(types.colon) || this.match(types.parenL) || this.match(types.braceR) || this.match(types.eq) || this.match(types.comma)) {
        prop.key = asyncId;
        prop.computed = false;
      } else {
        isAsync = true;
        if (this.hasPlugin("asyncGenerators")) isGenerator = this.eat(types.star);
        this.parsePropertyName(prop);
      }
    } else {
      this.parsePropertyName(prop);
    }

    this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos);
    this.checkPropClash(prop, propHash);

    if (prop.shorthand) {
      this.addExtra(prop, "shorthand", true);
    }

    node.properties.push(prop);
  }

  if (firstRestLocation !== null) {
    this.unexpected(firstRestLocation, "The rest element has to be the last element when destructuring");
  }

  if (decorators.length) {
    this.raise(this.state.start, "You have trailing decorators with no property");
  }

  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};

pp$3.isGetterOrSetterMethod = function (prop, isPattern) {
  return !isPattern && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.match(types.string) || // get "string"() {}
  this.match(types.num) || // get 1() {}
  this.match(types.bracketL) || // get ["string"]() {}
  this.match(types.name) || // get foo() {}
  this.state.type.keyword // get debugger() {}
  );
};

// get methods aren't allowed to have any parameters
// set methods must have exactly 1 parameter
pp$3.checkGetterSetterParamCount = function (method) {
  var paramCount = method.kind === "get" ? 0 : 1;
  if (method.params.length !== paramCount) {
    var start = method.start;
    if (method.kind === "get") {
      this.raise(start, "getter should have no params");
    } else {
      this.raise(start, "setter should have exactly one param");
    }
  }
};

pp$3.parseObjectMethod = function (prop, isGenerator, isAsync, isPattern) {
  if (isAsync || isGenerator || this.match(types.parenL)) {
    if (isPattern) this.unexpected();
    prop.kind = "method";
    prop.method = true;
    this.parseMethod(prop, isGenerator, isAsync);

    return this.finishNode(prop, "ObjectMethod");
  }

  if (this.isGetterOrSetterMethod(prop, isPattern)) {
    if (isGenerator || isAsync) this.unexpected();
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    this.parseMethod(prop);
    this.checkGetterSetterParamCount(prop);

    return this.finishNode(prop, "ObjectMethod");
  }
};

pp$3.parseObjectProperty = function (prop, startPos, startLoc, isPattern, refShorthandDefaultPos) {
  if (this.eat(types.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssign(false, refShorthandDefaultPos);

    return this.finishNode(prop, "ObjectProperty");
  }

  if (!prop.computed && prop.key.type === "Identifier") {
    this.checkReservedWord(prop.key.name, prop.key.start, true, true);

    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else if (this.match(types.eq) && refShorthandDefaultPos) {
      if (!refShorthandDefaultPos.start) {
        refShorthandDefaultPos.start = this.state.start;
      }
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
    } else {
      prop.value = prop.key.__clone();
    }
    prop.shorthand = true;

    return this.finishNode(prop, "ObjectProperty");
  }
};

pp$3.parseObjPropValue = function (prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos) {
  var node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern) || this.parseObjectProperty(prop, startPos, startLoc, isPattern, refShorthandDefaultPos);

  if (!node) this.unexpected();

  return node;
};

pp$3.parsePropertyName = function (prop) {
  if (this.eat(types.bracketL)) {
    prop.computed = true;
    prop.key = this.parseMaybeAssign();
    this.expect(types.bracketR);
  } else {
    prop.computed = false;
    var oldInPropertyName = this.state.inPropertyName;
    this.state.inPropertyName = true;
    prop.key = this.match(types.num) || this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(true);
    this.state.inPropertyName = oldInPropertyName;
  }
  return prop.key;
};

// Initialize empty function node.

pp$3.initFunction = function (node, isAsync) {
  node.id = null;
  node.generator = false;
  node.expression = false;
  node.async = !!isAsync;
};

// Parse object or class method.

pp$3.parseMethod = function (node, isGenerator, isAsync) {
  var oldInMethod = this.state.inMethod;
  this.state.inMethod = node.kind || true;
  this.initFunction(node, isAsync);
  this.expect(types.parenL);
  node.params = this.parseBindingList(types.parenR);
  node.generator = !!isGenerator;
  this.parseFunctionBody(node);
  this.state.inMethod = oldInMethod;
  return node;
};

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function (node, params, isAsync) {
  this.initFunction(node, isAsync);
  node.params = this.toAssignableList(params, true, "arrow function parameters");
  this.parseFunctionBody(node, true);
  return this.finishNode(node, "ArrowFunctionExpression");
};

pp$3.isStrictBody = function (node, isExpression) {
  if (!isExpression && node.body.directives.length) {
    for (var _iterator2 = node.body.directives, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var directive = _ref2;

      if (directive.value.value === "use strict") {
        return true;
      }
    }
  }

  return false;
};

// Parse function body and check parameters.
pp$3.parseFunctionBody = function (node, allowExpression) {
  var isExpression = allowExpression && !this.match(types.braceL);

  var oldInAsync = this.state.inAsync;
  this.state.inAsync = node.async;
  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
  } else {
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldInFunc = this.state.inFunction;
    var oldInGen = this.state.inGenerator;
    var oldLabels = this.state.labels;
    this.state.inFunction = true;this.state.inGenerator = node.generator;this.state.labels = [];
    node.body = this.parseBlock(true);
    node.expression = false;
    this.state.inFunction = oldInFunc;this.state.inGenerator = oldInGen;this.state.labels = oldLabels;
  }
  this.state.inAsync = oldInAsync;

  // If this is a strict mode function, verify that argument names
  // are not repeated, and it does not try to bind the words `eval`
  // or `arguments`.
  var isStrict = this.isStrictBody(node, isExpression);
  // Also check when allowExpression === true for arrow functions
  var checkLVal = this.state.strict || allowExpression || isStrict;

  if (isStrict && node.id && node.id.type === "Identifier" && node.id.name === "yield") {
    this.raise(node.id.start, "Binding yield in strict mode");
  }

  if (checkLVal) {
    var nameHash = Object.create(null);
    var oldStrict = this.state.strict;
    if (isStrict) this.state.strict = true;
    if (node.id) {
      this.checkLVal(node.id, true, undefined, "function name");
    }
    for (var _iterator3 = node.params, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var param = _ref3;

      if (isStrict && param.type !== "Identifier") {
        this.raise(param.start, "Non-simple parameter in strict mode");
      }
      this.checkLVal(param, true, nameHash, "function parameter list");
    }
    this.state.strict = oldStrict;
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function (close, allowEmpty, refShorthandDefaultPos) {
  var elts = [];
  var first = true;

  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(types.comma);
      if (this.eat(close)) break;
    }

    elts.push(this.parseExprListItem(allowEmpty, refShorthandDefaultPos));
  }
  return elts;
};

pp$3.parseExprListItem = function (allowEmpty, refShorthandDefaultPos, refNeedsArrowPos) {
  var elt = void 0;
  if (allowEmpty && this.match(types.comma)) {
    elt = null;
  } else if (this.match(types.ellipsis)) {
    elt = this.parseSpread(refShorthandDefaultPos);
  } else {
    elt = this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem, refNeedsArrowPos);
  }
  return elt;
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdentifier = function (liberal) {
  var node = this.startNode();
  if (!liberal) {
    this.checkReservedWord(this.state.value, this.state.start, !!this.state.type.keyword, false);
  }

  if (this.match(types.name)) {
    node.name = this.state.value;
  } else if (this.state.type.keyword) {
    node.name = this.state.type.keyword;
  } else {
    this.unexpected();
  }

  if (!liberal && node.name === "await" && this.state.inAsync) {
    this.raise(node.start, "invalid use of await inside of an async function");
  }

  node.loc.identifierName = node.name;

  this.next();
  return this.finishNode(node, "Identifier");
};

pp$3.checkReservedWord = function (word, startLoc, checkKeywords, isBinding) {
  if (this.isReservedWord(word) || checkKeywords && this.isKeyword(word)) {
    this.raise(startLoc, word + " is a reserved word");
  }

  if (this.state.strict && (reservedWords.strict(word) || isBinding && reservedWords.strictBind(word))) {
    this.raise(startLoc, word + " is a reserved word in strict mode");
  }
};

// Parses await expression inside async function.

pp$3.parseAwait = function (node) {
  // istanbul ignore next: this condition is checked at the call site so won't be hit here
  if (!this.state.inAsync) {
    this.unexpected();
  }
  if (this.match(types.star)) {
    this.raise(node.start, "await* has been removed from the async functions proposal. Use Promise.all() instead.");
  }
  node.argument = this.parseMaybeUnary();
  return this.finishNode(node, "AwaitExpression");
};

// Parses yield expression inside generator.

pp$3.parseYield = function () {
  var node = this.startNode();
  this.next();
  if (this.match(types.semi) || this.canInsertSemicolon() || !this.match(types.star) && !this.state.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression");
};

// Start an AST node, attaching a start offset.

var pp$4 = Parser.prototype;
var commentKeys = ["leadingComments", "trailingComments", "innerComments"];

var Node = function () {
  function Node(pos, loc, filename) {
    classCallCheck(this, Node);

    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (filename) this.loc.filename = filename;
  }

  Node.prototype.__clone = function __clone() {
    var node2 = new Node();
    for (var key in this) {
      // Do not clone comments that are already attached to the node
      if (commentKeys.indexOf(key) < 0) {
        node2[key] = this[key];
      }
    }

    return node2;
  };

  return Node;
}();

pp$4.startNode = function () {
  return new Node(this.state.start, this.state.startLoc, this.filename);
};

pp$4.startNodeAt = function (pos, loc) {
  return new Node(pos, loc, this.filename);
};

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  node.loc.end = loc;
  this.processComment(node);
  return node;
}

// Finish an AST node, adding `type` and `end` properties.

pp$4.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
};

// Finish node at given position

pp$4.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};

var pp$5 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$5.raise = function (pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  throw err;
};

/* eslint max-len: 0 */

/**
 * Based on the comment attachment algorithm used in espree and estraverse.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function last(stack) {
  return stack[stack.length - 1];
}

var pp$6 = Parser.prototype;

pp$6.addComment = function (comment) {
  if (this.filename) comment.loc.filename = this.filename;
  this.state.trailingComments.push(comment);
  this.state.leadingComments.push(comment);
};

pp$6.processComment = function (node) {
  if (node.type === "Program" && node.body.length > 0) return;

  var stack = this.state.commentStack;

  var firstChild = void 0,
      lastChild = void 0,
      trailingComments = void 0,
      i = void 0,
      j = void 0;

  if (this.state.trailingComments.length > 0) {
    // If the first comment in trailingComments comes after the
    // current node, then we're good - all comments in the array will
    // come after the node and so it's safe to add them as official
    // trailingComments.
    if (this.state.trailingComments[0].start >= node.end) {
      trailingComments = this.state.trailingComments;
      this.state.trailingComments = [];
    } else {
      // Otherwise, if the first comment doesn't come after the
      // current node, that means we have a mix of leading and trailing
      // comments in the array and that leadingComments contains the
      // same items as trailingComments. Reset trailingComments to
      // zero items and we'll handle this by evaluating leadingComments
      // later.
      this.state.trailingComments.length = 0;
    }
  } else {
    var lastInStack = last(stack);
    if (stack.length > 0 && lastInStack.trailingComments && lastInStack.trailingComments[0].start >= node.end) {
      trailingComments = lastInStack.trailingComments;
      lastInStack.trailingComments = null;
    }
  }

  // Eating the stack.
  if (stack.length > 0 && last(stack).start >= node.start) {
    firstChild = stack.pop();
  }

  while (stack.length > 0 && last(stack).start >= node.start) {
    lastChild = stack.pop();
  }

  if (!lastChild && firstChild) lastChild = firstChild;

  // Attach comments that follow a trailing comma on the last
  // property in an object literal or a trailing comma in function arguments
  // as trailing comments
  if (firstChild && this.state.leadingComments.length > 0) {
    var lastComment = last(this.state.leadingComments);

    if (firstChild.type === "ObjectProperty") {
      if (lastComment.start >= node.start) {
        if (this.state.commentPreviousNode) {
          for (j = 0; j < this.state.leadingComments.length; j++) {
            if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
              this.state.leadingComments.splice(j, 1);
              j--;
            }
          }

          if (this.state.leadingComments.length > 0) {
            firstChild.trailingComments = this.state.leadingComments;
            this.state.leadingComments = [];
          }
        }
      }
    } else if (node.type === "CallExpression" && node.arguments && node.arguments.length) {
      var lastArg = last(node.arguments);

      if (lastArg && lastComment.start >= lastArg.start && lastComment.end <= node.end) {
        if (this.state.commentPreviousNode) {
          if (this.state.leadingComments.length > 0) {
            lastArg.trailingComments = this.state.leadingComments;
            this.state.leadingComments = [];
          }
        }
      }
    }
  }

  if (lastChild) {
    if (lastChild.leadingComments) {
      if (lastChild !== node && last(lastChild.leadingComments).end <= node.start) {
        node.leadingComments = lastChild.leadingComments;
        lastChild.leadingComments = null;
      } else {
        // A leading comment for an anonymous class had been stolen by its first ClassMethod,
        // so this takes back the leading comment.
        // See also: https://github.com/eslint/espree/issues/158
        for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
          if (lastChild.leadingComments[i].end <= node.start) {
            node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
            break;
          }
        }
      }
    }
  } else if (this.state.leadingComments.length > 0) {
    if (last(this.state.leadingComments).end <= node.start) {
      if (this.state.commentPreviousNode) {
        for (j = 0; j < this.state.leadingComments.length; j++) {
          if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
            this.state.leadingComments.splice(j, 1);
            j--;
          }
        }
      }
      if (this.state.leadingComments.length > 0) {
        node.leadingComments = this.state.leadingComments;
        this.state.leadingComments = [];
      }
    } else {
      // https://github.com/eslint/espree/issues/2
      //
      // In special cases, such as return (without a value) and
      // debugger, all comments will end up as leadingComments and
      // will otherwise be eliminated. This step runs when the
      // commentStack is empty and there are comments left
      // in leadingComments.
      //
      // This loop figures out the stopping point between the actual
      // leading and trailing comments by finding the location of the
      // first comment that comes after the given node.
      for (i = 0; i < this.state.leadingComments.length; i++) {
        if (this.state.leadingComments[i].end > node.start) {
          break;
        }
      }

      // Split the array based on the location of the first comment
      // that comes after the node. Keep in mind that this could
      // result in an empty array, and if so, the array must be
      // deleted.
      node.leadingComments = this.state.leadingComments.slice(0, i);
      if (node.leadingComments.length === 0) {
        node.leadingComments = null;
      }

      // Similarly, trailing comments are attached later. The variable
      // must be reset to null if there are no trailing comments.
      trailingComments = this.state.leadingComments.slice(i);
      if (trailingComments.length === 0) {
        trailingComments = null;
      }
    }
  }

  this.state.commentPreviousNode = node;

  if (trailingComments) {
    if (trailingComments.length && trailingComments[0].start >= node.start && last(trailingComments).end <= node.end) {
      node.innerComments = trailingComments;
    } else {
      node.trailingComments = trailingComments;
    }
  }

  stack.push(node);
};

var pp$7 = Parser.prototype;

pp$7.estreeParseRegExpLiteral = function (_ref) {
  var pattern = _ref.pattern,
      flags = _ref.flags;

  var regex = null;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    // In environments that don't support these flags value will
    // be null as the regex can't be represented natively.
  }
  var node = this.estreeParseLiteral(regex);
  node.regex = { pattern: pattern, flags: flags };

  return node;
};

pp$7.estreeParseLiteral = function (value) {
  return this.parseLiteral(value, "Literal");
};

pp$7.directiveToStmt = function (directive) {
  var directiveLiteral = directive.value;

  var stmt = this.startNodeAt(directive.start, directive.loc.start);
  var expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);

  expression.value = directiveLiteral.value;
  expression.raw = directiveLiteral.extra.raw;

  stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end);
  stmt.directive = directiveLiteral.extra.raw.slice(1, -1);

  return this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
};

function isSimpleProperty(node) {
  return node && node.type === "Property" && node.kind === "init" && node.method === false;
}

var estreePlugin = function (instance) {
  instance.extend("checkDeclaration", function (inner) {
    return function (node) {
      if (isSimpleProperty(node)) {
        this.checkDeclaration(node.value);
      } else {
        inner.call(this, node);
      }
    };
  });

  instance.extend("checkGetterSetterParamCount", function () {
    return function (prop) {
      var paramCount = prop.kind === "get" ? 0 : 1;
      if (prop.value.params.length !== paramCount) {
        var start = prop.start;
        if (prop.kind === "get") {
          this.raise(start, "getter should have no params");
        } else {
          this.raise(start, "setter should have exactly one param");
        }
      }
    };
  });

  instance.extend("checkLVal", function (inner) {
    return function (expr, isBinding, checkClashes) {
      var _this = this;

      switch (expr.type) {
        case "ObjectPattern":
          expr.properties.forEach(function (prop) {
            _this.checkLVal(prop.type === "Property" ? prop.value : prop, isBinding, checkClashes, "object destructuring pattern");
          });
          break;
        default:
          for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            args[_key - 3] = arguments[_key];
          }

          inner.call.apply(inner, [this, expr, isBinding, checkClashes].concat(args));
      }
    };
  });

  instance.extend("checkPropClash", function () {
    return function (prop, propHash) {
      if (prop.computed || !isSimpleProperty(prop)) return;

      var key = prop.key;
      // It is either an Identifier or a String/NumericLiteral
      var name = key.type === "Identifier" ? key.name : String(key.value);

      if (name === "__proto__") {
        if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
        propHash.proto = true;
      }
    };
  });

  instance.extend("isStrictBody", function () {
    return function (node, isExpression) {
      if (!isExpression && node.body.body.length > 0) {
        for (var _iterator = node.body.body, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var directive = _ref2;

          if (directive.type === "ExpressionStatement" && directive.expression.type === "Literal") {
            if (directive.expression.value === "use strict") return true;
          } else {
            // Break for the first non literal expression
            break;
          }
        }
      }

      return false;
    };
  });

  instance.extend("isValidDirective", function () {
    return function (stmt) {
      return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && typeof stmt.expression.value === "string" && (!stmt.expression.extra || !stmt.expression.extra.parenthesized);
    };
  });

  instance.extend("stmtToDirective", function (inner) {
    return function (stmt) {
      var directive = inner.call(this, stmt);
      var value = stmt.expression.value;

      // Reset value to the actual value as in estree mode we want
      // the stmt to have the real value and not the raw value
      directive.value.value = value;

      return directive;
    };
  });

  instance.extend("parseBlockBody", function (inner) {
    return function (node) {
      var _this2 = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      inner.call.apply(inner, [this, node].concat(args));

      node.directives.reverse().forEach(function (directive) {
        node.body.unshift(_this2.directiveToStmt(directive));
      });
      delete node.directives;
    };
  });

  instance.extend("parseClassMethod", function () {
    return function (classBody, method, isGenerator, isAsync) {
      this.parseMethod(method, isGenerator, isAsync);
      if (method.typeParameters) {
        method.value.typeParameters = method.typeParameters;
        delete method.typeParameters;
      }
      classBody.body.push(this.finishNode(method, "MethodDefinition"));
    };
  });

  instance.extend("parseExprAtom", function (inner) {
    return function () {
      switch (this.state.type) {
        case types.regexp:
          return this.estreeParseRegExpLiteral(this.state.value);

        case types.num:
        case types.string:
          return this.estreeParseLiteral(this.state.value);

        case types._null:
          return this.estreeParseLiteral(null);

        case types._true:
          return this.estreeParseLiteral(true);

        case types._false:
          return this.estreeParseLiteral(false);

        default:
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return inner.call.apply(inner, [this].concat(args));
      }
    };
  });

  instance.extend("parseLiteral", function (inner) {
    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var node = inner.call.apply(inner, [this].concat(args));
      node.raw = node.extra.raw;
      delete node.extra;

      return node;
    };
  });

  instance.extend("parseMethod", function (inner) {
    return function (node) {
      var funcNode = this.startNode();
      funcNode.kind = node.kind; // provide kind, so inner method correctly sets state

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      funcNode = inner.call.apply(inner, [this, funcNode].concat(args));
      delete funcNode.kind;
      node.value = this.finishNode(funcNode, "FunctionExpression");

      return node;
    };
  });

  instance.extend("parseObjectMethod", function (inner) {
    return function () {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      var node = inner.call.apply(inner, [this].concat(args));

      if (node) {
        if (node.kind === "method") node.kind = "init";
        node.type = "Property";
      }

      return node;
    };
  });

  instance.extend("parseObjectProperty", function (inner) {
    return function () {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      var node = inner.call.apply(inner, [this].concat(args));

      if (node) {
        node.kind = "init";
        node.type = "Property";
      }

      return node;
    };
  });

  instance.extend("toAssignable", function (inner) {
    return function (node, isBinding) {
      for (var _len8 = arguments.length, args = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
        args[_key8 - 2] = arguments[_key8];
      }

      if (isSimpleProperty(node)) {
        this.toAssignable.apply(this, [node.value, isBinding].concat(args));

        return node;
      } else if (node.type === "ObjectExpression") {
        node.type = "ObjectPattern";
        for (var _iterator2 = node.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
          }

          var prop = _ref3;

          if (prop.kind === "get" || prop.kind === "set") {
            this.raise(prop.key.start, "Object pattern can't contain getter or setter");
          } else if (prop.method) {
            this.raise(prop.key.start, "Object pattern can't contain methods");
          } else {
            this.toAssignable(prop, isBinding, "object destructuring pattern");
          }
        }

        return node;
      }

      return inner.call.apply(inner, [this, node, isBinding].concat(args));
    };
  });
};

/* eslint max-len: 0 */

var primitiveTypes = ["any", "mixed", "empty", "bool", "boolean", "number", "string", "void", "null"];

var pp$8 = Parser.prototype;

pp$8.flowParseTypeInitialiser = function (tok) {
  var oldInType = this.state.inType;
  this.state.inType = true;
  this.expect(tok || types.colon);

  var type = this.flowParseType();
  this.state.inType = oldInType;
  return type;
};

pp$8.flowParsePredicate = function () {
  var node = this.startNode();
  var moduloLoc = this.state.startLoc;
  var moduloPos = this.state.start;
  this.expect(types.modulo);
  var checksLoc = this.state.startLoc;
  this.expectContextual("checks");
  // Force '%' and 'checks' to be adjacent
  if (moduloLoc.line !== checksLoc.line || moduloLoc.column !== checksLoc.column - 1) {
    this.raise(moduloPos, "Spaces between ´%´ and ´checks´ are not allowed here.");
  }
  if (this.eat(types.parenL)) {
    node.expression = this.parseExpression();
    this.expect(types.parenR);
    return this.finishNode(node, "DeclaredPredicate");
  } else {
    return this.finishNode(node, "InferredPredicate");
  }
};

pp$8.flowParseTypeAndPredicateInitialiser = function () {
  var oldInType = this.state.inType;
  this.state.inType = true;
  this.expect(types.colon);
  var type = null;
  var predicate = null;
  if (this.match(types.modulo)) {
    this.state.inType = oldInType;
    predicate = this.flowParsePredicate();
  } else {
    type = this.flowParseType();
    this.state.inType = oldInType;
    if (this.match(types.modulo)) {
      predicate = this.flowParsePredicate();
    }
  }
  return [type, predicate];
};

pp$8.flowParseDeclareClass = function (node) {
  this.next();
  this.flowParseInterfaceish(node, true);
  return this.finishNode(node, "DeclareClass");
};

pp$8.flowParseDeclareFunction = function (node) {
  this.next();

  var id = node.id = this.parseIdentifier();

  var typeNode = this.startNode();
  var typeContainer = this.startNode();

  if (this.isRelational("<")) {
    typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }

  this.expect(types.parenL);
  var tmp = this.flowParseFunctionTypeParams();
  typeNode.params = tmp.params;
  typeNode.rest = tmp.rest;
  this.expect(types.parenR);
  var predicate = null;

  var _flowParseTypeAndPred = this.flowParseTypeAndPredicateInitialiser();

  typeNode.returnType = _flowParseTypeAndPred[0];
  predicate = _flowParseTypeAndPred[1];

  typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
  typeContainer.predicate = predicate;
  id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");

  this.finishNode(id, id.type);

  this.semicolon();

  return this.finishNode(node, "DeclareFunction");
};

pp$8.flowParseDeclare = function (node) {
  if (this.match(types._class)) {
    return this.flowParseDeclareClass(node);
  } else if (this.match(types._function)) {
    return this.flowParseDeclareFunction(node);
  } else if (this.match(types._var)) {
    return this.flowParseDeclareVariable(node);
  } else if (this.isContextual("module")) {
    if (this.lookahead().type === types.dot) {
      return this.flowParseDeclareModuleExports(node);
    } else {
      return this.flowParseDeclareModule(node);
    }
  } else if (this.isContextual("type")) {
    return this.flowParseDeclareTypeAlias(node);
  } else if (this.isContextual("opaque")) {
    return this.flowParseDeclareOpaqueType(node);
  } else if (this.isContextual("interface")) {
    return this.flowParseDeclareInterface(node);
  } else if (this.match(types._export)) {
    return this.flowParseDeclareExportDeclaration(node);
  } else {
    this.unexpected();
  }
};

pp$8.flowParseDeclareExportDeclaration = function (node) {
  this.expect(types._export);
  if (this.isContextual("opaque") // declare export opaque ...
  ) {
      node.declaration = this.flowParseDeclare(this.startNode());
      node.default = false;

      return this.finishNode(node, "DeclareExportDeclaration");
    }

  throw this.unexpected();
};

pp$8.flowParseDeclareVariable = function (node) {
  this.next();
  node.id = this.flowParseTypeAnnotatableIdentifier();
  this.semicolon();
  return this.finishNode(node, "DeclareVariable");
};

pp$8.flowParseDeclareModule = function (node) {
  this.next();

  if (this.match(types.string)) {
    node.id = this.parseExprAtom();
  } else {
    node.id = this.parseIdentifier();
  }

  var bodyNode = node.body = this.startNode();
  var body = bodyNode.body = [];
  this.expect(types.braceL);
  while (!this.match(types.braceR)) {
    var _bodyNode = this.startNode();

    if (this.match(types._import)) {
      var lookahead = this.lookahead();
      if (lookahead.value !== "type" && lookahead.value !== "typeof") {
        this.unexpected(null, "Imports within a `declare module` body must always be `import type` or `import typeof`");
      }

      this.parseImport(_bodyNode);
    } else {
      this.expectContextual("declare", "Only declares and type imports are allowed inside declare module");

      _bodyNode = this.flowParseDeclare(_bodyNode, true);
    }

    body.push(_bodyNode);
  }
  this.expect(types.braceR);

  this.finishNode(bodyNode, "BlockStatement");
  return this.finishNode(node, "DeclareModule");
};

pp$8.flowParseDeclareModuleExports = function (node) {
  this.expectContextual("module");
  this.expect(types.dot);
  this.expectContextual("exports");
  node.typeAnnotation = this.flowParseTypeAnnotation();
  this.semicolon();

  return this.finishNode(node, "DeclareModuleExports");
};

pp$8.flowParseDeclareTypeAlias = function (node) {
  this.next();
  this.flowParseTypeAlias(node);
  return this.finishNode(node, "DeclareTypeAlias");
};

pp$8.flowParseDeclareOpaqueType = function (node) {
  this.next();
  this.flowParseOpaqueType(node, true);
  return this.finishNode(node, "DeclareOpaqueType");
};

pp$8.flowParseDeclareInterface = function (node) {
  this.next();
  this.flowParseInterfaceish(node);
  return this.finishNode(node, "DeclareInterface");
};

// Interfaces

pp$8.flowParseInterfaceish = function (node) {
  node.id = this.parseIdentifier();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.extends = [];
  node.mixins = [];

  if (this.eat(types._extends)) {
    do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (this.eat(types.comma));
  }

  if (this.isContextual("mixins")) {
    this.next();
    do {
      node.mixins.push(this.flowParseInterfaceExtends());
    } while (this.eat(types.comma));
  }

  node.body = this.flowParseObjectType(true, false, false);
};

pp$8.flowParseInterfaceExtends = function () {
  var node = this.startNode();

  node.id = this.flowParseQualifiedTypeIdentifier();
  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  } else {
    node.typeParameters = null;
  }

  return this.finishNode(node, "InterfaceExtends");
};

pp$8.flowParseInterface = function (node) {
  this.flowParseInterfaceish(node, false);
  return this.finishNode(node, "InterfaceDeclaration");
};

pp$8.flowParseRestrictedIdentifier = function (liberal) {
  if (primitiveTypes.indexOf(this.state.value) > -1) {
    this.raise(this.state.start, "Cannot overwrite primitive type " + this.state.value);
  }

  return this.parseIdentifier(liberal);
};

// Type aliases

pp$8.flowParseTypeAlias = function (node) {
  node.id = this.flowParseRestrictedIdentifier();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.right = this.flowParseTypeInitialiser(types.eq);
  this.semicolon();

  return this.finishNode(node, "TypeAlias");
};

// Opaque type aliases

pp$8.flowParseOpaqueType = function (node, declare) {
  this.expectContextual("type");
  node.id = this.flowParseRestrictedIdentifier();

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  // Parse the supertype
  node.supertype = null;
  if (this.match(types.colon)) {
    node.supertype = this.flowParseTypeInitialiser(types.colon);
  }

  node.impltype = null;
  if (!declare) {
    node.impltype = this.flowParseTypeInitialiser(types.eq);
  }
  this.semicolon();

  return this.finishNode(node, "OpaqueType");
};

// Type annotations

pp$8.flowParseTypeParameter = function () {
  var node = this.startNode();

  var variance = this.flowParseVariance();

  var ident = this.flowParseTypeAnnotatableIdentifier();
  node.name = ident.name;
  node.variance = variance;
  node.bound = ident.typeAnnotation;

  if (this.match(types.eq)) {
    this.eat(types.eq);
    node.default = this.flowParseType();
  }

  return this.finishNode(node, "TypeParameter");
};

pp$8.flowParseTypeParameterDeclaration = function () {
  var oldInType = this.state.inType;
  var node = this.startNode();
  node.params = [];

  this.state.inType = true;

  // istanbul ignore else: this condition is already checked at all call sites
  if (this.isRelational("<") || this.match(types.jsxTagStart)) {
    this.next();
  } else {
    this.unexpected();
  }

  do {
    node.params.push(this.flowParseTypeParameter());
    if (!this.isRelational(">")) {
      this.expect(types.comma);
    }
  } while (!this.isRelational(">"));
  this.expectRelational(">");

  this.state.inType = oldInType;

  return this.finishNode(node, "TypeParameterDeclaration");
};

pp$8.flowParseTypeParameterInstantiation = function () {
  var node = this.startNode();
  var oldInType = this.state.inType;
  node.params = [];

  this.state.inType = true;

  this.expectRelational("<");
  while (!this.isRelational(">")) {
    node.params.push(this.flowParseType());
    if (!this.isRelational(">")) {
      this.expect(types.comma);
    }
  }
  this.expectRelational(">");

  this.state.inType = oldInType;

  return this.finishNode(node, "TypeParameterInstantiation");
};

pp$8.flowParseObjectPropertyKey = function () {
  return this.match(types.num) || this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(true);
};

pp$8.flowParseObjectTypeIndexer = function (node, isStatic, variance) {
  node.static = isStatic;

  this.expect(types.bracketL);
  if (this.lookahead().type === types.colon) {
    node.id = this.flowParseObjectPropertyKey();
    node.key = this.flowParseTypeInitialiser();
  } else {
    node.id = null;
    node.key = this.flowParseType();
  }
  this.expect(types.bracketR);
  node.value = this.flowParseTypeInitialiser();
  node.variance = variance;

  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeIndexer");
};

pp$8.flowParseObjectTypeMethodish = function (node) {
  node.params = [];
  node.rest = null;
  node.typeParameters = null;

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterDeclaration();
  }

  this.expect(types.parenL);
  while (!this.match(types.parenR) && !this.match(types.ellipsis)) {
    node.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(types.parenR)) {
      this.expect(types.comma);
    }
  }

  if (this.eat(types.ellipsis)) {
    node.rest = this.flowParseFunctionTypeParam();
  }
  this.expect(types.parenR);
  node.returnType = this.flowParseTypeInitialiser();

  return this.finishNode(node, "FunctionTypeAnnotation");
};

pp$8.flowParseObjectTypeMethod = function (startPos, startLoc, isStatic, key) {
  var node = this.startNodeAt(startPos, startLoc);
  node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(startPos, startLoc));
  node.static = isStatic;
  node.key = key;
  node.optional = false;
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeProperty");
};

pp$8.flowParseObjectTypeCallProperty = function (node, isStatic) {
  var valueNode = this.startNode();
  node.static = isStatic;
  node.value = this.flowParseObjectTypeMethodish(valueNode);
  this.flowObjectTypeSemicolon();
  return this.finishNode(node, "ObjectTypeCallProperty");
};

pp$8.flowParseObjectType = function (allowStatic, allowExact, allowSpread) {
  var oldInType = this.state.inType;
  this.state.inType = true;

  var nodeStart = this.startNode();
  var node = void 0;
  var propertyKey = void 0;
  var isStatic = false;

  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];

  var endDelim = void 0;
  var exact = void 0;
  if (allowExact && this.match(types.braceBarL)) {
    this.expect(types.braceBarL);
    endDelim = types.braceBarR;
    exact = true;
  } else {
    this.expect(types.braceL);
    endDelim = types.braceR;
    exact = false;
  }

  nodeStart.exact = exact;

  while (!this.match(endDelim)) {
    var optional = false;
    var startPos = this.state.start;
    var startLoc = this.state.startLoc;
    node = this.startNode();
    if (allowStatic && this.isContextual("static") && this.lookahead().type !== types.colon) {
      this.next();
      isStatic = true;
    }

    var variancePos = this.state.start;
    var variance = this.flowParseVariance();

    if (this.match(types.bracketL)) {
      nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance));
    } else if (this.match(types.parenL) || this.isRelational("<")) {
      if (variance) {
        this.unexpected(variancePos);
      }
      nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic));
    } else {
      if (this.match(types.ellipsis)) {
        if (!allowSpread) {
          this.unexpected(null, "Spread operator cannot appear in class or interface definitions");
        }
        if (variance) {
          this.unexpected(variance.start, "Spread properties cannot have variance");
        }
        this.expect(types.ellipsis);
        node.argument = this.flowParseType();
        this.flowObjectTypeSemicolon();
        nodeStart.properties.push(this.finishNode(node, "ObjectTypeSpreadProperty"));
      } else {
        propertyKey = this.flowParseObjectPropertyKey();
        if (this.isRelational("<") || this.match(types.parenL)) {
          // This is a method property
          if (variance) {
            this.unexpected(variance.start);
          }
          nodeStart.properties.push(this.flowParseObjectTypeMethod(startPos, startLoc, isStatic, propertyKey));
        } else {
          if (this.eat(types.question)) {
            optional = true;
          }
          node.key = propertyKey;
          node.value = this.flowParseTypeInitialiser();
          node.optional = optional;
          node.static = isStatic;
          node.variance = variance;
          this.flowObjectTypeSemicolon();
          nodeStart.properties.push(this.finishNode(node, "ObjectTypeProperty"));
        }
      }
    }

    isStatic = false;
  }

  this.expect(endDelim);

  var out = this.finishNode(nodeStart, "ObjectTypeAnnotation");

  this.state.inType = oldInType;

  return out;
};

pp$8.flowObjectTypeSemicolon = function () {
  if (!this.eat(types.semi) && !this.eat(types.comma) && !this.match(types.braceR) && !this.match(types.braceBarR)) {
    this.unexpected();
  }
};

pp$8.flowParseQualifiedTypeIdentifier = function (startPos, startLoc, id) {
  startPos = startPos || this.state.start;
  startLoc = startLoc || this.state.startLoc;
  var node = id || this.parseIdentifier();

  while (this.eat(types.dot)) {
    var node2 = this.startNodeAt(startPos, startLoc);
    node2.qualification = node;
    node2.id = this.parseIdentifier();
    node = this.finishNode(node2, "QualifiedTypeIdentifier");
  }

  return node;
};

pp$8.flowParseGenericType = function (startPos, startLoc, id) {
  var node = this.startNodeAt(startPos, startLoc);

  node.typeParameters = null;
  node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id);

  if (this.isRelational("<")) {
    node.typeParameters = this.flowParseTypeParameterInstantiation();
  }

  return this.finishNode(node, "GenericTypeAnnotation");
};

pp$8.flowParseTypeofType = function () {
  var node = this.startNode();
  this.expect(types._typeof);
  node.argument = this.flowParsePrimaryType();
  return this.finishNode(node, "TypeofTypeAnnotation");
};

pp$8.flowParseTupleType = function () {
  var node = this.startNode();
  node.types = [];
  this.expect(types.bracketL);
  // We allow trailing commas
  while (this.state.pos < this.input.length && !this.match(types.bracketR)) {
    node.types.push(this.flowParseType());
    if (this.match(types.bracketR)) break;
    this.expect(types.comma);
  }
  this.expect(types.bracketR);
  return this.finishNode(node, "TupleTypeAnnotation");
};

pp$8.flowParseFunctionTypeParam = function () {
  var name = null;
  var optional = false;
  var typeAnnotation = null;
  var node = this.startNode();
  var lh = this.lookahead();
  if (lh.type === types.colon || lh.type === types.question) {
    name = this.parseIdentifier();
    if (this.eat(types.question)) {
      optional = true;
    }
    typeAnnotation = this.flowParseTypeInitialiser();
  } else {
    typeAnnotation = this.flowParseType();
  }
  node.name = name;
  node.optional = optional;
  node.typeAnnotation = typeAnnotation;
  return this.finishNode(node, "FunctionTypeParam");
};

pp$8.reinterpretTypeAsFunctionTypeParam = function (type) {
  var node = this.startNodeAt(type.start, type.loc.start);
  node.name = null;
  node.optional = false;
  node.typeAnnotation = type;
  return this.finishNode(node, "FunctionTypeParam");
};

pp$8.flowParseFunctionTypeParams = function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ret = { params: params, rest: null };
  while (!this.match(types.parenR) && !this.match(types.ellipsis)) {
    ret.params.push(this.flowParseFunctionTypeParam());
    if (!this.match(types.parenR)) {
      this.expect(types.comma);
    }
  }
  if (this.eat(types.ellipsis)) {
    ret.rest = this.flowParseFunctionTypeParam();
  }
  return ret;
};

pp$8.flowIdentToTypeAnnotation = function (startPos, startLoc, node, id) {
  switch (id.name) {
    case "any":
      return this.finishNode(node, "AnyTypeAnnotation");

    case "void":
      return this.finishNode(node, "VoidTypeAnnotation");

    case "bool":
    case "boolean":
      return this.finishNode(node, "BooleanTypeAnnotation");

    case "mixed":
      return this.finishNode(node, "MixedTypeAnnotation");

    case "empty":
      return this.finishNode(node, "EmptyTypeAnnotation");

    case "number":
      return this.finishNode(node, "NumberTypeAnnotation");

    case "string":
      return this.finishNode(node, "StringTypeAnnotation");

    default:
      return this.flowParseGenericType(startPos, startLoc, id);
  }
};

// The parsing of types roughly parallels the parsing of expressions, and
// primary types are kind of like primary expressions...they're the
// primitives with which other types are constructed.
pp$8.flowParsePrimaryType = function () {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var node = this.startNode();
  var tmp = void 0;
  var type = void 0;
  var isGroupedType = false;
  var oldNoAnonFunctionType = this.state.noAnonFunctionType;

  switch (this.state.type) {
    case types.name:
      return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());

    case types.braceL:
      return this.flowParseObjectType(false, false, true);

    case types.braceBarL:
      return this.flowParseObjectType(false, true, true);

    case types.bracketL:
      return this.flowParseTupleType();

    case types.relational:
      if (this.state.value === "<") {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
        this.expect(types.parenL);
        tmp = this.flowParseFunctionTypeParams();
        node.params = tmp.params;
        node.rest = tmp.rest;
        this.expect(types.parenR);

        this.expect(types.arrow);

        node.returnType = this.flowParseType();

        return this.finishNode(node, "FunctionTypeAnnotation");
      }
      break;

    case types.parenL:
      this.next();

      // Check to see if this is actually a grouped type
      if (!this.match(types.parenR) && !this.match(types.ellipsis)) {
        if (this.match(types.name)) {
          var token = this.lookahead().type;
          isGroupedType = token !== types.question && token !== types.colon;
        } else {
          isGroupedType = true;
        }
      }

      if (isGroupedType) {
        this.state.noAnonFunctionType = false;
        type = this.flowParseType();
        this.state.noAnonFunctionType = oldNoAnonFunctionType;

        // A `,` or a `) =>` means this is an anonymous function type
        if (this.state.noAnonFunctionType || !(this.match(types.comma) || this.match(types.parenR) && this.lookahead().type === types.arrow)) {
          this.expect(types.parenR);
          return type;
        } else {
          // Eat a comma if there is one
          this.eat(types.comma);
        }
      }

      if (type) {
        tmp = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(type)]);
      } else {
        tmp = this.flowParseFunctionTypeParams();
      }

      node.params = tmp.params;
      node.rest = tmp.rest;

      this.expect(types.parenR);

      this.expect(types.arrow);

      node.returnType = this.flowParseType();

      node.typeParameters = null;

      return this.finishNode(node, "FunctionTypeAnnotation");

    case types.string:
      return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");

    case types._true:case types._false:
      node.value = this.match(types._true);
      this.next();
      return this.finishNode(node, "BooleanLiteralTypeAnnotation");

    case types.plusMin:
      if (this.state.value === "-") {
        this.next();
        if (!this.match(types.num)) this.unexpected(null, "Unexpected token, expected number");

        return this.parseLiteral(-this.state.value, "NumericLiteralTypeAnnotation", node.start, node.loc.start);
      }

      this.unexpected();
    case types.num:
      return this.parseLiteral(this.state.value, "NumericLiteralTypeAnnotation");

    case types._null:
      node.value = this.match(types._null);
      this.next();
      return this.finishNode(node, "NullLiteralTypeAnnotation");

    case types._this:
      node.value = this.match(types._this);
      this.next();
      return this.finishNode(node, "ThisTypeAnnotation");

    case types.star:
      this.next();
      return this.finishNode(node, "ExistentialTypeParam");

    default:
      if (this.state.type.keyword === "typeof") {
        return this.flowParseTypeofType();
      }
  }

  this.unexpected();
};

pp$8.flowParsePostfixType = function () {
  var startPos = this.state.start,
      startLoc = this.state.startLoc;
  var type = this.flowParsePrimaryType();
  while (!this.canInsertSemicolon() && this.match(types.bracketL)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.elementType = type;
    this.expect(types.bracketL);
    this.expect(types.bracketR);
    type = this.finishNode(node, "ArrayTypeAnnotation");
  }
  return type;
};

pp$8.flowParsePrefixType = function () {
  var node = this.startNode();
  if (this.eat(types.question)) {
    node.typeAnnotation = this.flowParsePrefixType();
    return this.finishNode(node, "NullableTypeAnnotation");
  } else {
    return this.flowParsePostfixType();
  }
};

pp$8.flowParseAnonFunctionWithoutParens = function () {
  var param = this.flowParsePrefixType();
  if (!this.state.noAnonFunctionType && this.eat(types.arrow)) {
    var node = this.startNodeAt(param.start, param.loc.start);
    node.params = [this.reinterpretTypeAsFunctionTypeParam(param)];
    node.rest = null;
    node.returnType = this.flowParseType();
    node.typeParameters = null;
    return this.finishNode(node, "FunctionTypeAnnotation");
  }
  return param;
};

pp$8.flowParseIntersectionType = function () {
  var node = this.startNode();
  this.eat(types.bitwiseAND);
  var type = this.flowParseAnonFunctionWithoutParens();
  node.types = [type];
  while (this.eat(types.bitwiseAND)) {
    node.types.push(this.flowParseAnonFunctionWithoutParens());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
};

pp$8.flowParseUnionType = function () {
  var node = this.startNode();
  this.eat(types.bitwiseOR);
  var type = this.flowParseIntersectionType();
  node.types = [type];
  while (this.eat(types.bitwiseOR)) {
    node.types.push(this.flowParseIntersectionType());
  }
  return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
};

pp$8.flowParseType = function () {
  var oldInType = this.state.inType;
  this.state.inType = true;
  var type = this.flowParseUnionType();
  this.state.inType = oldInType;
  return type;
};

pp$8.flowParseTypeAnnotation = function () {
  var node = this.startNode();
  node.typeAnnotation = this.flowParseTypeInitialiser();
  return this.finishNode(node, "TypeAnnotation");
};

pp$8.flowParseTypeAndPredicateAnnotation = function () {
  var node = this.startNode();

  var _flowParseTypeAndPred2 = this.flowParseTypeAndPredicateInitialiser();

  node.typeAnnotation = _flowParseTypeAndPred2[0];
  node.predicate = _flowParseTypeAndPred2[1];

  return this.finishNode(node, "TypeAnnotation");
};

pp$8.flowParseTypeAnnotatableIdentifier = function () {
  var ident = this.flowParseRestrictedIdentifier();
  if (this.match(types.colon)) {
    ident.typeAnnotation = this.flowParseTypeAnnotation();
    this.finishNode(ident, ident.type);
  }
  return ident;
};

pp$8.typeCastToParameter = function (node) {
  node.expression.typeAnnotation = node.typeAnnotation;

  return this.finishNodeAt(node.expression, node.expression.type, node.typeAnnotation.end, node.typeAnnotation.loc.end);
};

pp$8.flowParseVariance = function () {
  var variance = null;
  if (this.match(types.plusMin)) {
    if (this.state.value === "+") {
      variance = "plus";
    } else if (this.state.value === "-") {
      variance = "minus";
    }
    this.next();
  }
  return variance;
};

var flowPlugin = function (instance) {
  // plain function return types: function name(): string {}
  instance.extend("parseFunctionBody", function (inner) {
    return function (node, allowExpression) {
      if (this.match(types.colon) && !allowExpression) {
        // if allowExpression is true then we're parsing an arrow function and if
        // there's a return type then it's been handled elsewhere
        node.returnType = this.flowParseTypeAndPredicateAnnotation();
      }

      return inner.call(this, node, allowExpression);
    };
  });

  // interfaces
  instance.extend("parseStatement", function (inner) {
    return function (declaration, topLevel) {
      // strict mode handling of `interface` since it's a reserved word
      if (this.state.strict && this.match(types.name) && this.state.value === "interface") {
        var node = this.startNode();
        this.next();
        return this.flowParseInterface(node);
      } else {
        return inner.call(this, declaration, topLevel);
      }
    };
  });

  // declares, interfaces and type aliases
  instance.extend("parseExpressionStatement", function (inner) {
    return function (node, expr) {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (this.match(types._class) || this.match(types.name) || this.match(types._function) || this.match(types._var) || this.match(types._export)) {
            return this.flowParseDeclare(node);
          }
        } else if (this.match(types.name)) {
          if (expr.name === "interface") {
            return this.flowParseInterface(node);
          } else if (expr.name === "type") {
            return this.flowParseTypeAlias(node);
          } else if (expr.name === "opaque") {
            return this.flowParseOpaqueType(node, false);
          }
        }
      }

      return inner.call(this, node, expr);
    };
  });

  // export type
  instance.extend("shouldParseExportDeclaration", function (inner) {
    return function () {
      return this.isContextual("type") || this.isContextual("interface") || this.isContextual("opaque") || inner.call(this);
    };
  });

  instance.extend("isExportDefaultSpecifier", function (inner) {
    return function () {
      if (this.match(types.name) && (this.state.value === "type" || this.state.value === "interface" || this.state.value === "opaque")) {
        return false;
      }

      return inner.call(this);
    };
  });

  instance.extend("parseConditional", function (inner) {
    return function (expr, noIn, startPos, startLoc, refNeedsArrowPos) {
      // only do the expensive clone if there is a question mark
      // and if we come from inside parens
      if (refNeedsArrowPos && this.match(types.question)) {
        var state = this.state.clone();
        try {
          return inner.call(this, expr, noIn, startPos, startLoc);
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
            refNeedsArrowPos.start = err.pos || this.state.start;
            return expr;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
        }
      }

      return inner.call(this, expr, noIn, startPos, startLoc);
    };
  });

  instance.extend("parseParenItem", function (inner) {
    return function (node, startPos, startLoc) {
      node = inner.call(this, node, startPos, startLoc);
      if (this.eat(types.question)) {
        node.optional = true;
      }

      if (this.match(types.colon)) {
        var typeCastNode = this.startNodeAt(startPos, startLoc);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        return this.finishNode(typeCastNode, "TypeCastExpression");
      }

      return node;
    };
  });

  instance.extend("parseExport", function (inner) {
    return function (node) {
      node = inner.call(this, node);
      if (node.type === "ExportNamedDeclaration") {
        node.exportKind = node.exportKind || "value";
      }
      return node;
    };
  });

  instance.extend("parseExportDeclaration", function (inner) {
    return function (node) {
      if (this.isContextual("type")) {
        node.exportKind = "type";

        var declarationNode = this.startNode();
        this.next();

        if (this.match(types.braceL)) {
          // export type { foo, bar };
          node.specifiers = this.parseExportSpecifiers();
          this.parseExportFrom(node);
          return null;
        } else {
          // export type Foo = Bar;
          return this.flowParseTypeAlias(declarationNode);
        }
      } else if (this.isContextual("opaque")) {
        node.exportKind = "type";

        var _declarationNode = this.startNode();
        this.next();
        // export opaque type Foo = Bar;
        return this.flowParseOpaqueType(_declarationNode, false);
      } else if (this.isContextual("interface")) {
        node.exportKind = "type";
        var _declarationNode2 = this.startNode();
        this.next();
        return this.flowParseInterface(_declarationNode2);
      } else {
        return inner.call(this, node);
      }
    };
  });

  instance.extend("parseClassId", function (inner) {
    return function (node) {
      inner.apply(this, arguments);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    };
  });

  // don't consider `void` to be a keyword as then it'll use the void token type
  // and set startExpr
  instance.extend("isKeyword", function (inner) {
    return function (name) {
      if (this.state.inType && name === "void") {
        return false;
      } else {
        return inner.call(this, name);
      }
    };
  });

  // ensure that inside flow types, we bypass the jsx parser plugin
  instance.extend("readToken", function (inner) {
    return function (code) {
      if (this.state.inType && (code === 62 || code === 60)) {
        return this.finishOp(types.relational, 1);
      } else {
        return inner.call(this, code);
      }
    };
  });

  // don't lex any token as a jsx one inside a flow type
  instance.extend("jsx_readToken", function (inner) {
    return function () {
      if (!this.state.inType) return inner.call(this);
    };
  });

  instance.extend("toAssignable", function (inner) {
    return function (node, isBinding, contextDescription) {
      if (node.type === "TypeCastExpression") {
        return inner.call(this, this.typeCastToParameter(node), isBinding, contextDescription);
      } else {
        return inner.call(this, node, isBinding, contextDescription);
      }
    };
  });

  // turn type casts that we found in function parameter head into type annotated params
  instance.extend("toAssignableList", function (inner) {
    return function (exprList, isBinding, contextDescription) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr.type === "TypeCastExpression") {
          exprList[i] = this.typeCastToParameter(expr);
        }
      }
      return inner.call(this, exprList, isBinding, contextDescription);
    };
  });

  // this is a list of nodes, from something like a call expression, we need to filter the
  // type casts that we've found that are illegal in this context
  instance.extend("toReferencedList", function () {
    return function (exprList) {
      for (var i = 0; i < exprList.length; i++) {
        var expr = exprList[i];
        if (expr && expr._exprListItem && expr.type === "TypeCastExpression") {
          this.raise(expr.start, "Unexpected type cast");
        }
      }

      return exprList;
    };
  });

  // parse an item inside a expression list eg. `(NODE, NODE)` where NODE represents
  // the position where this function is called
  instance.extend("parseExprListItem", function (inner) {
    return function () {
      var container = this.startNode();

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var node = inner.call.apply(inner, [this].concat(args));
      if (this.match(types.colon)) {
        container._exprListItem = true;
        container.expression = node;
        container.typeAnnotation = this.flowParseTypeAnnotation();
        return this.finishNode(container, "TypeCastExpression");
      } else {
        return node;
      }
    };
  });

  instance.extend("checkLVal", function (inner) {
    return function (node) {
      if (node.type !== "TypeCastExpression") {
        return inner.apply(this, arguments);
      }
    };
  });

  // parse class property type annotations
  instance.extend("parseClassProperty", function (inner) {
    return function (node) {
      delete node.variancePos;
      if (this.match(types.colon)) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return inner.call(this, node);
    };
  });

  // determine whether or not we're currently in the position where a class method would appear
  instance.extend("isClassMethod", function (inner) {
    return function () {
      return this.isRelational("<") || inner.call(this);
    };
  });

  // determine whether or not we're currently in the position where a class property would appear
  instance.extend("isClassProperty", function (inner) {
    return function () {
      return this.match(types.colon) || inner.call(this);
    };
  });

  instance.extend("isNonstaticConstructor", function (inner) {
    return function (method) {
      return !this.match(types.colon) && inner.call(this, method);
    };
  });

  // parse type parameters for class methods
  instance.extend("parseClassMethod", function (inner) {
    return function (classBody, method) {
      if (method.variance) {
        this.unexpected(method.variancePos);
      }
      delete method.variance;
      delete method.variancePos;
      if (this.isRelational("<")) {
        method.typeParameters = this.flowParseTypeParameterDeclaration();
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      inner.call.apply(inner, [this, classBody, method].concat(args));
    };
  });

  // parse a the super class type parameters and implements
  instance.extend("parseClassSuper", function (inner) {
    return function (node, isStatement) {
      inner.call(this, node, isStatement);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual("implements")) {
        this.next();
        var implemented = node.implements = [];
        do {
          var _node = this.startNode();
          _node.id = this.parseIdentifier();
          if (this.isRelational("<")) {
            _node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
            _node.typeParameters = null;
          }
          implemented.push(this.finishNode(_node, "ClassImplements"));
        } while (this.eat(types.comma));
      }
    };
  });

  instance.extend("parsePropertyName", function (inner) {
    return function (node) {
      var variancePos = this.state.start;
      var variance = this.flowParseVariance();
      var key = inner.call(this, node);
      node.variance = variance;
      node.variancePos = variancePos;
      return key;
    };
  });

  // parse type parameters for object method shorthand
  instance.extend("parseObjPropValue", function (inner) {
    return function (prop) {
      if (prop.variance) {
        this.unexpected(prop.variancePos);
      }
      delete prop.variance;
      delete prop.variancePos;

      var typeParameters = void 0;

      // method shorthand
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration();
        if (!this.match(types.parenL)) this.unexpected();
      }

      inner.apply(this, arguments);

      // add typeParameters if we found them
      if (typeParameters) {
        (prop.value || prop).typeParameters = typeParameters;
      }
    };
  });

  instance.extend("parseAssignableListItemTypes", function () {
    return function (param) {
      if (this.eat(types.question)) {
        param.optional = true;
      }
      if (this.match(types.colon)) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      }
      this.finishNode(param, param.type);
      return param;
    };
  });

  instance.extend("parseMaybeDefault", function (inner) {
    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var node = inner.apply(this, args);

      if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
        this.raise(node.typeAnnotation.start, "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`");
      }

      return node;
    };
  });

  // parse typeof and type imports
  instance.extend("parseImportSpecifiers", function (inner) {
    return function (node) {
      node.importKind = "value";

      var kind = null;
      if (this.match(types._typeof)) {
        kind = "typeof";
      } else if (this.isContextual("type")) {
        kind = "type";
      }
      if (kind) {
        var lh = this.lookahead();
        if (lh.type === types.name && lh.value !== "from" || lh.type === types.braceL || lh.type === types.star) {
          this.next();
          node.importKind = kind;
        }
      }

      inner.call(this, node);
    };
  });

  // parse import-type/typeof shorthand
  instance.extend("parseImportSpecifier", function () {
    return function (node) {
      var specifier = this.startNode();
      var firstIdentLoc = this.state.start;
      var firstIdent = this.parseIdentifier(true);

      var specifierTypeKind = null;
      if (firstIdent.name === "type") {
        specifierTypeKind = "type";
      } else if (firstIdent.name === "typeof") {
        specifierTypeKind = "typeof";
      }

      var isBinding = false;
      if (this.isContextual("as")) {
        var as_ident = this.parseIdentifier(true);
        if (specifierTypeKind !== null && !this.match(types.name) && !this.state.type.keyword) {
          // `import {type as ,` or `import {type as }`
          specifier.imported = as_ident;
          specifier.importKind = specifierTypeKind;
          specifier.local = as_ident.__clone();
        } else {
          // `import {type as foo`
          specifier.imported = firstIdent;
          specifier.importKind = null;
          specifier.local = this.parseIdentifier();
        }
      } else if (specifierTypeKind !== null && (this.match(types.name) || this.state.type.keyword)) {
        // `import {type foo`
        specifier.imported = this.parseIdentifier(true);
        specifier.importKind = specifierTypeKind;
        if (this.eatContextual("as")) {
          specifier.local = this.parseIdentifier();
        } else {
          isBinding = true;
          specifier.local = specifier.imported.__clone();
        }
      } else {
        isBinding = true;
        specifier.imported = firstIdent;
        specifier.importKind = null;
        specifier.local = specifier.imported.__clone();
      }

      if ((node.importKind === "type" || node.importKind === "typeof") && (specifier.importKind === "type" || specifier.importKind === "typeof")) {
        this.raise(firstIdentLoc, "`The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements`");
      }

      if (isBinding) this.checkReservedWord(specifier.local.name, specifier.start, true, true);

      this.checkLVal(specifier.local, true, undefined, "import specifier");
      node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
    };
  });

  // parse function type parameters - function foo<T>() {}
  instance.extend("parseFunctionParams", function (inner) {
    return function (node) {
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      inner.call(this, node);
    };
  });

  // parse flow type annotations on variable declarator heads - let foo: string = bar
  instance.extend("parseVarHead", function (inner) {
    return function (decl) {
      inner.call(this, decl);
      if (this.match(types.colon)) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(decl.id, decl.id.type);
      }
    };
  });

  // parse the return type of an async arrow function - let foo = (async (): number => {});
  instance.extend("parseAsyncArrowFromCallExpression", function (inner) {
    return function (node, call) {
      if (this.match(types.colon)) {
        var oldNoAnonFunctionType = this.state.noAnonFunctionType;
        this.state.noAnonFunctionType = true;
        node.returnType = this.flowParseTypeAnnotation();
        this.state.noAnonFunctionType = oldNoAnonFunctionType;
      }

      return inner.call(this, node, call);
    };
  });

  // todo description
  instance.extend("shouldParseAsyncArrow", function (inner) {
    return function () {
      return this.match(types.colon) || inner.call(this);
    };
  });

  // We need to support type parameter declarations for arrow functions. This
  // is tricky. There are three situations we need to handle
  //
  // 1. This is either JSX or an arrow function. We'll try JSX first. If that
  //    fails, we'll try an arrow function. If that fails, we'll throw the JSX
  //    error.
  // 2. This is an arrow function. We'll parse the type parameter declaration,
  //    parse the rest, make sure the rest is an arrow function, and go from
  //    there
  // 3. This is neither. Just call the inner function
  instance.extend("parseMaybeAssign", function (inner) {
    return function () {
      var jsxError = null;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (types.jsxTagStart && this.match(types.jsxTagStart)) {
        var state = this.state.clone();
        try {
          return inner.apply(this, args);
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;

            // Remove `tc.j_expr` and `tc.j_oTag` from context added
            // by parsing `jsxTagStart` to stop the JSX plugin from
            // messing with the tokens
            this.state.context.length -= 2;

            jsxError = err;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
        }
      }

      if (jsxError != null || this.isRelational("<")) {
        var arrowExpression = void 0;
        var typeParameters = void 0;
        try {
          typeParameters = this.flowParseTypeParameterDeclaration();

          arrowExpression = inner.apply(this, args);
          arrowExpression.typeParameters = typeParameters;
          arrowExpression.start = typeParameters.start;
          arrowExpression.loc.start = typeParameters.loc.start;
        } catch (err) {
          throw jsxError || err;
        }

        if (arrowExpression.type === "ArrowFunctionExpression") {
          return arrowExpression;
        } else if (jsxError != null) {
          throw jsxError;
        } else {
          this.raise(typeParameters.start, "Expected an arrow function after this type parameter declaration");
        }
      }

      return inner.apply(this, args);
    };
  });

  // handle return types for arrow functions
  instance.extend("parseArrow", function (inner) {
    return function (node) {
      if (this.match(types.colon)) {
        var state = this.state.clone();
        try {
          var oldNoAnonFunctionType = this.state.noAnonFunctionType;
          this.state.noAnonFunctionType = true;
          var returnType = this.flowParseTypeAndPredicateAnnotation();
          this.state.noAnonFunctionType = oldNoAnonFunctionType;

          if (this.canInsertSemicolon()) this.unexpected();
          if (!this.match(types.arrow)) this.unexpected();
          // assign after it is clear it is an arrow
          node.returnType = returnType;
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
        }
      }

      return inner.call(this, node);
    };
  });

  instance.extend("shouldParseArrow", function (inner) {
    return function () {
      return this.match(types.colon) || inner.call(this);
    };
  });
};

// Adapted from String.fromcodepoint to export the function without modifying String
/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */

// The MIT License (MIT)
// Copyright (c) Mathias Bynens
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var fromCodePoint = String.fromCodePoint;

if (!fromCodePoint) {
  var stringFromCharCode = String.fromCharCode;
  var floor = Math.floor;
  fromCodePoint = function fromCodePoint() {
    var MAX_SIZE = 0x4000;
    var codeUnits = [];
    var highSurrogate = void 0;
    var lowSurrogate = void 0;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return "";
    }
    var result = "";
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
      codePoint < 0 || // not a valid Unicode code point
      codePoint > 0x10FFFF || // not a valid Unicode code point
      floor(codePoint) != codePoint // not an integer
      ) {
          throw RangeError("Invalid code point: " + codePoint);
        }
      if (codePoint <= 0xFFFF) {
        // BMP code point
        codeUnits.push(codePoint);
      } else {
        // Astral code point; split in surrogate halves
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = codePoint % 0x400 + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
      if (index + 1 == length || codeUnits.length > MAX_SIZE) {
        result += stringFromCharCode.apply(null, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result;
  };
}

var fromCodePoint$1 = fromCodePoint;

var XHTMLEntities = {
  quot: "\"",
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  fnof: "\u0192",
  circ: "\u02C6",
  tilde: "\u02DC",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  bull: "\u2022",
  hellip: "\u2026",
  permil: "\u2030",
  prime: "\u2032",
  Prime: "\u2033",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  oline: "\u203E",
  frasl: "\u2044",
  euro: "\u20AC",
  image: "\u2111",
  weierp: "\u2118",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  "int": "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666"
};

var HEX_NUMBER = /^[\da-fA-F]+$/;
var DECIMAL_NUMBER = /^\d+$/;

types$1.j_oTag = new TokContext("<tag", false);
types$1.j_cTag = new TokContext("</tag", false);
types$1.j_expr = new TokContext("<tag>...</tag>", true, true);

types.jsxName = new TokenType("jsxName");
types.jsxText = new TokenType("jsxText", { beforeExpr: true });
types.jsxTagStart = new TokenType("jsxTagStart", { startsExpr: true });
types.jsxTagEnd = new TokenType("jsxTagEnd");

types.jsxTagStart.updateContext = function () {
  this.state.context.push(types$1.j_expr); // treat as beginning of JSX expression
  this.state.context.push(types$1.j_oTag); // start opening tag context
  this.state.exprAllowed = false;
};

types.jsxTagEnd.updateContext = function (prevType) {
  var out = this.state.context.pop();
  if (out === types$1.j_oTag && prevType === types.slash || out === types$1.j_cTag) {
    this.state.context.pop();
    this.state.exprAllowed = this.curContext() === types$1.j_expr;
  } else {
    this.state.exprAllowed = true;
  }
};

var pp$9 = Parser.prototype;

// Reads inline JSX contents token.

pp$9.jsxReadToken = function () {
  var out = "";
  var chunkStart = this.state.pos;
  for (;;) {
    if (this.state.pos >= this.input.length) {
      this.raise(this.state.start, "Unterminated JSX contents");
    }

    var ch = this.input.charCodeAt(this.state.pos);

    switch (ch) {
      case 60: // "<"
      case 123:
        // "{"
        if (this.state.pos === this.state.start) {
          if (ch === 60 && this.state.exprAllowed) {
            ++this.state.pos;
            return this.finishToken(types.jsxTagStart);
          }
          return this.getTokenFromCode(ch);
        }
        out += this.input.slice(chunkStart, this.state.pos);
        return this.finishToken(types.jsxText, out);

      case 38:
        // "&"
        out += this.input.slice(chunkStart, this.state.pos);
        out += this.jsxReadEntity();
        chunkStart = this.state.pos;
        break;

      default:
        if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadNewLine(true);
          chunkStart = this.state.pos;
        } else {
          ++this.state.pos;
        }
    }
  }
};

pp$9.jsxReadNewLine = function (normalizeCRLF) {
  var ch = this.input.charCodeAt(this.state.pos);
  var out = void 0;
  ++this.state.pos;
  if (ch === 13 && this.input.charCodeAt(this.state.pos) === 10) {
    ++this.state.pos;
    out = normalizeCRLF ? "\n" : "\r\n";
  } else {
    out = String.fromCharCode(ch);
  }
  ++this.state.curLine;
  this.state.lineStart = this.state.pos;

  return out;
};

pp$9.jsxReadString = function (quote) {
  var out = "";
  var chunkStart = ++this.state.pos;
  for (;;) {
    if (this.state.pos >= this.input.length) {
      this.raise(this.state.start, "Unterminated string constant");
    }

    var ch = this.input.charCodeAt(this.state.pos);
    if (ch === quote) break;
    if (ch === 38) {
      // "&"
      out += this.input.slice(chunkStart, this.state.pos);
      out += this.jsxReadEntity();
      chunkStart = this.state.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.state.pos);
      out += this.jsxReadNewLine(false);
      chunkStart = this.state.pos;
    } else {
      ++this.state.pos;
    }
  }
  out += this.input.slice(chunkStart, this.state.pos++);
  return this.finishToken(types.string, out);
};

pp$9.jsxReadEntity = function () {
  var str = "";
  var count = 0;
  var entity = void 0;
  var ch = this.input[this.state.pos];

  var startPos = ++this.state.pos;
  while (this.state.pos < this.input.length && count++ < 10) {
    ch = this.input[this.state.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (HEX_NUMBER.test(str)) entity = fromCodePoint$1(parseInt(str, 16));
        } else {
          str = str.substr(1);
          if (DECIMAL_NUMBER.test(str)) entity = fromCodePoint$1(parseInt(str, 10));
        }
      } else {
        entity = XHTMLEntities[str];
      }
      break;
    }
    str += ch;
  }
  if (!entity) {
    this.state.pos = startPos;
    return "&";
  }
  return entity;
};

// Read a JSX identifier (valid tag or attribute name).
//
// Optimized version since JSX identifiers can"t contain
// escape characters and so can be read as single slice.
// Also assumes that first character was already checked
// by isIdentifierStart in readToken.

pp$9.jsxReadWord = function () {
  var ch = void 0;
  var start = this.state.pos;
  do {
    ch = this.input.charCodeAt(++this.state.pos);
  } while (isIdentifierChar(ch) || ch === 45); // "-"
  return this.finishToken(types.jsxName, this.input.slice(start, this.state.pos));
};

// Transforms JSX element name to string.

function getQualifiedJSXName(object) {
  if (object.type === "JSXIdentifier") {
    return object.name;
  }

  if (object.type === "JSXNamespacedName") {
    return object.namespace.name + ":" + object.name.name;
  }

  if (object.type === "JSXMemberExpression") {
    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  }
}

// Parse next token as JSX identifier

pp$9.jsxParseIdentifier = function () {
  var node = this.startNode();
  if (this.match(types.jsxName)) {
    node.name = this.state.value;
  } else if (this.state.type.keyword) {
    node.name = this.state.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "JSXIdentifier");
};

// Parse namespaced identifier.

pp$9.jsxParseNamespacedName = function () {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var name = this.jsxParseIdentifier();
  if (!this.eat(types.colon)) return name;

  var node = this.startNodeAt(startPos, startLoc);
  node.namespace = name;
  node.name = this.jsxParseIdentifier();
  return this.finishNode(node, "JSXNamespacedName");
};

// Parses element name in any form - namespaced, member
// or single identifier.

pp$9.jsxParseElementName = function () {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  var node = this.jsxParseNamespacedName();
  while (this.eat(types.dot)) {
    var newNode = this.startNodeAt(startPos, startLoc);
    newNode.object = node;
    newNode.property = this.jsxParseIdentifier();
    node = this.finishNode(newNode, "JSXMemberExpression");
  }
  return node;
};

// Parses any type of JSX attribute value.

pp$9.jsxParseAttributeValue = function () {
  var node = void 0;
  switch (this.state.type) {
    case types.braceL:
      node = this.jsxParseExpressionContainer();
      if (node.expression.type === "JSXEmptyExpression") {
        this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
      } else {
        return node;
      }

    case types.jsxTagStart:
    case types.string:
      node = this.parseExprAtom();
      node.extra = null;
      return node;

    default:
      this.raise(this.state.start, "JSX value should be either an expression or a quoted JSX text");
  }
};

// JSXEmptyExpression is unique type since it doesn't actually parse anything,
// and so it should start at the end of last read token (left brace) and finish
// at the beginning of the next one (right brace).

pp$9.jsxParseEmptyExpression = function () {
  var node = this.startNodeAt(this.state.lastTokEnd, this.state.lastTokEndLoc);
  return this.finishNodeAt(node, "JSXEmptyExpression", this.state.start, this.state.startLoc);
};

// Parse JSX spread child

pp$9.jsxParseSpreadChild = function () {
  var node = this.startNode();
  this.expect(types.braceL);
  this.expect(types.ellipsis);
  node.expression = this.parseExpression();
  this.expect(types.braceR);

  return this.finishNode(node, "JSXSpreadChild");
};

// Parses JSX expression enclosed into curly brackets.


pp$9.jsxParseExpressionContainer = function () {
  var node = this.startNode();
  this.next();
  if (this.match(types.braceR)) {
    node.expression = this.jsxParseEmptyExpression();
  } else {
    node.expression = this.parseExpression();
  }
  this.expect(types.braceR);
  return this.finishNode(node, "JSXExpressionContainer");
};

// Parses following JSX attribute name-value pair.

pp$9.jsxParseAttribute = function () {
  var node = this.startNode();
  if (this.eat(types.braceL)) {
    this.expect(types.ellipsis);
    node.argument = this.parseMaybeAssign();
    this.expect(types.braceR);
    return this.finishNode(node, "JSXSpreadAttribute");
  }
  node.name = this.jsxParseNamespacedName();
  node.value = this.eat(types.eq) ? this.jsxParseAttributeValue() : null;
  return this.finishNode(node, "JSXAttribute");
};

// Parses JSX opening tag starting after "<".

pp$9.jsxParseOpeningElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.attributes = [];
  node.name = this.jsxParseElementName();
  while (!this.match(types.slash) && !this.match(types.jsxTagEnd)) {
    node.attributes.push(this.jsxParseAttribute());
  }
  node.selfClosing = this.eat(types.slash);
  this.expect(types.jsxTagEnd);
  return this.finishNode(node, "JSXOpeningElement");
};

// Parses JSX closing tag starting after "</".

pp$9.jsxParseClosingElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  node.name = this.jsxParseElementName();
  this.expect(types.jsxTagEnd);
  return this.finishNode(node, "JSXClosingElement");
};

// Parses entire JSX element, including it"s opening tag
// (starting after "<"), attributes, contents and closing tag.

pp$9.jsxParseElementAt = function (startPos, startLoc) {
  var node = this.startNodeAt(startPos, startLoc);
  var children = [];
  var openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
  var closingElement = null;

  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (this.state.type) {
        case types.jsxTagStart:
          startPos = this.state.start;startLoc = this.state.startLoc;
          this.next();
          if (this.eat(types.slash)) {
            closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
            break contents;
          }
          children.push(this.jsxParseElementAt(startPos, startLoc));
          break;

        case types.jsxText:
          children.push(this.parseExprAtom());
          break;

        case types.braceL:
          if (this.lookahead().type === types.ellipsis) {
            children.push(this.jsxParseSpreadChild());
          } else {
            children.push(this.jsxParseExpressionContainer());
          }

          break;

        // istanbul ignore next - should never happen
        default:
          this.unexpected();
      }
    }

    if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
      this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
    }
  }

  node.openingElement = openingElement;
  node.closingElement = closingElement;
  node.children = children;
  if (this.match(types.relational) && this.state.value === "<") {
    this.raise(this.state.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
  }
  return this.finishNode(node, "JSXElement");
};

// Parses entire JSX element from current position.

pp$9.jsxParseElement = function () {
  var startPos = this.state.start;
  var startLoc = this.state.startLoc;
  this.next();
  return this.jsxParseElementAt(startPos, startLoc);
};

var jsxPlugin = function (instance) {
  instance.extend("parseExprAtom", function (inner) {
    return function (refShortHandDefaultPos) {
      if (this.match(types.jsxText)) {
        var node = this.parseLiteral(this.state.value, "JSXText");
        // https://github.com/babel/babel/issues/2078
        node.extra = null;
        return node;
      } else if (this.match(types.jsxTagStart)) {
        return this.jsxParseElement();
      } else {
        return inner.call(this, refShortHandDefaultPos);
      }
    };
  });

  instance.extend("readToken", function (inner) {
    return function (code) {
      if (this.state.inPropertyName) return inner.call(this, code);

      var context = this.curContext();

      if (context === types$1.j_expr) {
        return this.jsxReadToken();
      }

      if (context === types$1.j_oTag || context === types$1.j_cTag) {
        if (isIdentifierStart(code)) {
          return this.jsxReadWord();
        }

        if (code === 62) {
          ++this.state.pos;
          return this.finishToken(types.jsxTagEnd);
        }

        if ((code === 34 || code === 39) && context === types$1.j_oTag) {
          return this.jsxReadString(code);
        }
      }

      if (code === 60 && this.state.exprAllowed) {
        ++this.state.pos;
        return this.finishToken(types.jsxTagStart);
      }

      return inner.call(this, code);
    };
  });

  instance.extend("updateContext", function (inner) {
    return function (prevType) {
      if (this.match(types.braceL)) {
        var curContext = this.curContext();
        if (curContext === types$1.j_oTag) {
          this.state.context.push(types$1.braceExpression);
        } else if (curContext === types$1.j_expr) {
          this.state.context.push(types$1.templateQuasi);
        } else {
          inner.call(this, prevType);
        }
        this.state.exprAllowed = true;
      } else if (this.match(types.slash) && prevType === types.jsxTagStart) {
        this.state.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
        this.state.context.push(types$1.j_cTag); // reconsider as closing tag context
        this.state.exprAllowed = false;
      } else {
        return inner.call(this, prevType);
      }
    };
  });
};

plugins.estree = estreePlugin;
plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

function parse(input, options) {
  return new Parser(options, input).parse();
}

function parseExpression(input, options) {
  var parser = new Parser(options, input);
  if (parser.options.strictMode) {
    parser.state.strict = true;
  }
  return parser.getExpression();
}

exports.parse = parse;
exports.parseExpression = parseExpression;
exports.tokTypes = types;

},{}],"24GTv":[function(require,module,exports) {
'use strict';

const compose = require('compose-function');
const identity = require('identity-function');
const map = require('map-iterable');
const merge = require('transform-spread-iterable');
const tokens = require('../../../utils/tokens');

const expandAlias = (preAliasLexer, resolveAlias) => {
	function * tryExpandToken(token, expandingAliases) {
		if (expandingAliases.indexOf(token.value) !== -1 || !token._.maybeSimpleCommandName) {
			yield token;
			return;
		}

		const result = resolveAlias(token.value);
		if (result === undefined) {
			yield token;
		} else {
			for (const newToken of preAliasLexer(result)) {
				if (newToken.is('WORD')) {
					yield * tryExpandToken(
						newToken,
						expandingAliases.concat(token.value)
					);
				} else if (!newToken.is('EOF')) {
					yield newToken;
				}
			}
		}
	}

	return {
		WORD: tk => {
			return Array.from(tryExpandToken(tk, []));
		}
	};
};

module.exports = (options, mode, previousPhases) => {
	if (typeof options.resolveAlias !== 'function') {
		return identity;
	}

	const preAliasLexer = compose.apply(null, previousPhases.reverse());
	const visitor = expandAlias(preAliasLexer, options.resolveAlias);

	return compose(
		merge,
		map(
			tokens.applyTokenizerVisitor(visitor)
		)
	);
};

},{"compose-function":"4PPUu","identity-function":"4EFmd","map-iterable":"2drce","transform-spread-iterable":"7myx7","../../../utils/tokens":"4SrYh"}],"6wOrm":[function(require,module,exports) {
'use strict';

const toPascal = require('to-pascal-case');
const map = require('map-iterable');

module.exports = () => map(token => {
	const tk = Object.assign({}, token);
	if (tk.type) {
		tk.originalType = token.type;
		// console.log({defaultNodeType, tk})
		if (token.is('WORD') || token.is('NAME') || token.is('ASSIGNMENT_WORD')) {
			tk.type = toPascal(tk.type);
		} else {
			tk.type = token.type.toLowerCase();
		}

		for (const xp of tk.expansion || []) {
			xp.type = toPascal(xp.type);
		}

		delete tk._;
	}
	// Object.freeze(tk);
	return tk;
});


},{"to-pascal-case":"H03XG","map-iterable":"2drce"}],"H03XG":[function(require,module,exports) {

var space = require('to-space-case')

/**
 * Export.
 */

module.exports = toPascalCase

/**
 * Convert a `string` to pascal case.
 *
 * @param {String} string
 * @return {String}
 */

function toPascalCase(string) {
  return space(string).replace(/(?:^|\s)(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}

},{"to-space-case":"2XtJd"}],"2XtJd":[function(require,module,exports) {

var clean = require('to-no-case')

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}

},{"to-no-case":"1QgF7"}],"1QgF7":[function(require,module,exports) {

/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

},{}],"15RIT":[function(require,module,exports) {
'use strict';
const map = require('map-iterable');
const tokens = require('../../../utils/tokens');

const replace = (text, resolveHomeUser) => {
	let replaced = false;
	let result = text.replace(/^~([^\/]*)\//, (match, p1) => {
		replaced = true;
		return resolveHomeUser(p1 || null) + '/';
	});
	// console.log({result, replaced})
	if (!replaced) {
		result = text.replace(/^~(.*)$/, (match, p1) => {
			return resolveHomeUser(p1 || null);
		});
	}

	return result;
};

module.exports = options => map(token => {
	if (token.is('WORD') && typeof options.resolveHomeUser === 'function') {
		return tokens.setValue(token, replace(token.value, options.resolveHomeUser));
	}

	if (token.is('ASSIGNMENT_WORD') && typeof options.resolveHomeUser === 'function') {
		const parts = token.value.split('=', 2);
		const target = parts[0];
		const sourceParts = parts[1];

		const source = sourceParts
			.split(':')
			.map(text => replace(text, options.resolveHomeUser))
			.join(':');

		return tokens.setValue(token, target + '=' + source);
	}

	return token;
});

},{"map-iterable":"2drce","../../../utils/tokens":"4SrYh"}],"6pnVz":[function(require,module,exports) {
'use strict';

const map = require('map-iterable');
const tokens = require('../../../utils/tokens');

module.exports = options => map(token => {
	if (token.is('WORD') && typeof options.resolvePath === 'function') {
		return tokens.setValue(token, options.resolvePath(token.value));
	}

	if (token.is('ASSIGNMENT_WORD') && typeof options.resolvePath === 'function') {
		const parts = token.value.split('=');
		return tokens.setValue(token, parts[0] + '=' + options.resolvePath(parts[1]));
	}

	return token;
});

},{"map-iterable":"2drce","../../../utils/tokens":"4SrYh"}],"4lt99":[function(require,module,exports) {
'use strict';
const parse = require('shell-quote-word');
const unescape = require('unescape-js');
const map = require('map-iterable');
const tokens = require('../../../utils/tokens');

function unquote(text) {
	const unquoted = parse(text);

	if (unquoted.length === 0) {
		return text;
	}

	if (unquoted[0].comment) {
		return '';
	}
	return unescape(unquoted[0]);
}

function unresolvedExpansions(token) {
	if (!token.expansion) {
		return false;
	}
	const unresolved = token.expansion.filter(xp => !xp.resolved);
	return unresolved.length > 0;
}

module.exports = () => map(token => {
	if (token.is('WORD') || token.is('ASSIGNMENT_WORD')) {
		if (!unresolvedExpansions(token)) {
			return tokens.setValue(token, unquote(token.value));
		}
	}
	return token;
});

},{"shell-quote-word":"62wqi","unescape-js":"Qua6Q","map-iterable":"2drce","../../../utils/tokens":"4SrYh"}],"62wqi":[function(require,module,exports) {
'use strict';

var META = '|&;()<> \\t';
var BAREWORD = '(\\\\[\'"' + META + ']|[^\\s\'"' + META + '])+';
var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"';
var DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\'';

var TOKEN = '';
for (var i = 0; i < 4; i++) {
	TOKEN += (Math.pow(16, 8) * Math.random()).toString(16);
}

module.exports = function parse(s) {
	var chunker = new RegExp([
		'(' + BAREWORD + '|' + SINGLE_QUOTE + '|' + DOUBLE_QUOTE + ')*'
	].join('|'), 'g');
	var match = s.match(chunker).filter(Boolean);
	var commented = false;

	if (!match) {
		return [];
	}

	return match.map((s, j) => {
		if (commented) {
			return undefined;
		}

		// Hand-written scanner/parser for Bash quoting rules:
		//
		//  1. inside single quotes, all characters are printed literally.
		//  2. inside double quotes, all characters are printed literally
		//	 except variables prefixed by '$' and backslashes followed by
		//	 either a double quote or another backslash.
		//  3. outside of any quotes, backslashes are treated as escape
		//	 characters and not printed (unless they are themselves escaped)
		//  4. quote context can switch mid-token if there is no whitespace
		//	 between the two quote contexts (e.g. all'one'"token" parses as
		//	 "allonetoken")
		var SQ = '\'';
		var DQ = '"';
		var BS = '\\';
		var quote = false;
		var esc = false;
		var out = '';

		for (var i = 0, len = s.length; i < len; i++) {
			var c = s.charAt(i);
			if (esc) {
				out += c;
				esc = false;
			} else if (quote) {
				if (c === quote) {
					quote = false;
				} else if (quote === SQ) {
					out += c;
				} else if (c === BS) {
					i += 1;
					c = s.charAt(i);
					if (c === DQ || c === BS) {
						out += c;
					} else {
						out += BS + c;
					}
				} else {
					out += c;
				}
			} else if (c === DQ || c === SQ) {
				quote = c;
			} else if (RegExp('^#$').test(c)) {
				commented = true;
				if (out.length) {
					return [out, {comment: s.slice(i + 1) + match.slice(j + 1).join(' ')}];
				}
				return [{comment: s.slice(i + 1) + match.slice(j + 1).join(' ')}];
			} else if (c === BS) {
				esc = true;
			} else {
				out += c;
			}
		}

		return out;
	})
	// finalize parsed aruments
	.reduce((prev, arg) => {
		if (arg === undefined) {
			return prev;
		}
		return prev.concat(arg);
	}, []);
};

},{}],"Qua6Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("string.fromcodepoint");

/**
 * \\ - matches the backslash which indicates the beginning of an escape sequence
 * (
 *   u\{([0-9A-Fa-f]+)\} - first alternative; matches the variable-length hexadecimal escape sequence (\u{ABCD0})
 * |
 *   u([0-9A-Fa-f]{4}) - second alternative; matches the 4-digit hexadecimal escape sequence (\uABCD)
 * |
 *   x([0-9A-Fa-f]{2}) - third alternative; matches the 2-digit hexadecimal escape sequence (\xA5)
 * |
 *   ([1-7][0-7]{0,2}|[0-7]{2,3}) - fourth alternative; matches the up-to-3-digit octal escape sequence (\5 or \512)
 * |
 *   (['"tbrnfv0\\]) - fifth alternative; matches the special escape characters (\t, \n and so on)
 * |
 *   \U([0-9A-Fa-f]+) - sixth alternative; matches the 8-digit hexadecimal escape sequence used by python (\U0001F3B5)
 * )
 */
var jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;
var usualEscapeSequences = {
  '0': '\0',
  'b': '\b',
  'f': '\f',
  'n': '\n',
  'r': '\r',
  't': '\t',
  'v': '\v',
  '\'': '\'',
  '"': '"',
  '\\': '\\'
};

var fromHex = function fromHex(str) {
  return String.fromCodePoint(parseInt(str, 16));
};

var fromOct = function fromOct(str) {
  return String.fromCodePoint(parseInt(str, 8));
};

var _default = function _default(string) {
  return string.replace(jsEscapeRegex, function (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) {
    if (varHex !== undefined) {
      return fromHex(varHex);
    } else if (longHex !== undefined) {
      return fromHex(longHex);
    } else if (shortHex !== undefined) {
      return fromHex(shortHex);
    } else if (octal !== undefined) {
      return fromOct(octal);
    } else if (python !== undefined) {
      return fromHex(python);
    } else {
      return usualEscapeSequences[specialCharacter];
    }
  });
};

exports.default = _default;
module.exports = exports.default;
},{"string.fromcodepoint":"5HOvv"}],"5HOvv":[function(require,module,exports) {
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
	(function() {
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		var stringFromCharCode = String.fromCharCode;
		var floor = Math.floor;
		var fromCodePoint = function(_) {
			var MAX_SIZE = 0x4000;
			var codeUnits = [];
			var highSurrogate;
			var lowSurrogate;
			var index = -1;
			var length = arguments.length;
			if (!length) {
				return '';
			}
			var result = '';
			while (++index < length) {
				var codePoint = Number(arguments[index]);
				if (
					!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
					codePoint < 0 || // not a valid Unicode code point
					codePoint > 0x10FFFF || // not a valid Unicode code point
					floor(codePoint) != codePoint // not an integer
				) {
					throw RangeError('Invalid code point: ' + codePoint);
				}
				if (codePoint <= 0xFFFF) { // BMP code point
					codeUnits.push(codePoint);
				} else { // Astral code point; split in surrogate halves
					// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					codePoint -= 0x10000;
					highSurrogate = (codePoint >> 10) + 0xD800;
					lowSurrogate = (codePoint % 0x400) + 0xDC00;
					codeUnits.push(highSurrogate, lowSurrogate);
				}
				if (index + 1 == length || codeUnits.length > MAX_SIZE) {
					result += stringFromCharCode.apply(null, codeUnits);
					codeUnits.length = 0;
				}
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String, 'fromCodePoint', {
				'value': fromCodePoint,
				'configurable': true,
				'writable': true
			});
		} else {
			String.fromCodePoint = fromCodePoint;
		}
	}());
}

},{}],"5G5at":[function(require,module,exports) {
'use strict';
const lookahead = require('iterable-lookahead');
const compose = require('compose-function');
const map = require('map-iterable');
// const isOperator = require('../enums/io-file-operators').isOperator;
const isValidName = require('../../../utils/is-valid-name');

function couldEndSimpleCommand(scTk) {
	return scTk && (
		scTk.is('SEPARATOR_OP') ||
		scTk.is('NEWLINE') ||
		scTk.is('NEWLINE_LIST') ||
		scTk.value === ';' ||
		scTk.is('PIPE') ||
		scTk.is('OR_IF') ||
		scTk.is('PIPE') ||
		scTk.is('AND_IF')
	);
}

function couldBeCommandName(tk) {
	return tk && tk.is('WORD') && isValidName(tk.value);
}

module.exports = (options, mode) => compose(
	map((tk, idx, iterable) => {
		if (tk._.maybeStartOfSimpleCommand) {
			if (couldBeCommandName(tk)) {
				tk._.maybeSimpleCommandName = true;
			} else {
				const next = iterable.ahead(1);
				if (next && !couldEndSimpleCommand(next)) {
					next._.commandNameNotFoundYet = true;
				}
			}
		}

		if (tk._.commandNameNotFoundYet) {
			const last = iterable.behind(1);

			if (!mode.enums.IOFileOperators.isOperator(last) && couldBeCommandName(tk)) {
				tk._.maybeSimpleCommandName = true;
			} else {
				const next = iterable.ahead(1);
				if (next && !couldEndSimpleCommand(next)) {
					next._.commandNameNotFoundYet = true;
				}
			}
			delete tk._.commandNameNotFoundYet;
		}

		return tk;
	}),
	lookahead
);

},{"iterable-lookahead":"EtGZM","compose-function":"4PPUu","map-iterable":"2drce","../../../utils/is-valid-name":"7fzkW"}],"EtGZM":[function(require,module,exports) {
'use strict';

function lookahead(iterable, size) {
	if (size === undefined) {
		size = 1;
	}

	if (typeof size !== 'number' && !(size instanceof Number)) {
		throw new TypeError('Size argument must be a number');
	}

	if (size < 1) {
		throw new RangeError('Size argument must be greater than 0');
	}

	const behindCache = new Array(size + 1);
	const aheadCache = [];

	const iterator = iterable[Symbol.iterator]();

	return {
		ahead(idx) {
			if (idx > size) {
				throw new RangeError(`Cannot look ahead of ${idx} position, currently depth is ${size}`);
			}

			if (idx < 1) {
				throw new RangeError('Look ahead index must be greater than 0');
			}

			return aheadCache[idx - 1];
		},

		behind(idx) {
			if (idx > size) {
				throw new RangeError(`Cannot look behind of ${idx} position, currently depth is ${size}`);
			}

			if (idx < 1) {
				throw new RangeError('Look behind index must be greater than 0');
			}
			// console.log({behindCache});
			return behindCache[idx];
		},

		[Symbol.iterator]() {
			return this;
		},

		next() {
			let item = iterator.next();
			while (!item.done && aheadCache.length <= size) {
				aheadCache.push(item.value);
				item = iterator.next();
			}
			if (!item.done) {
				aheadCache.push(item.value);
			}

			if (item.done && aheadCache.length === 0) {
				return {done: true};
			}

			const value = aheadCache.shift();

			behindCache.unshift(value);
			behindCache.pop();

			return {done: false, value};
		}
	};
}

lookahead.depth = size => iterable => lookahead(iterable, size);

lookahead.spread = function lookaheadSpread(iterable, size) {
	const it = lookahead(iterable, size);

	it._next = it.next;
	it.next = function () {
		let item = this._next();
		if (!item.done) {
			item.value = [item.value, it];
		}
		return item;
	};

	return it;
};

module.exports = lookahead;

},{}],"52EKe":[function(require,module,exports) {
'use strict';
// const hasOwnProperty = require('has-own-property');
const values = require('object-values');
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');

module.exports = function identifyMaybeSimpleCommands(options, mode) {
	return compose(map((tk, idx, iterable) => {
		const last = iterable.behind(1) || {EMPTY: true, is: type => type === 'EMPTY'};

		// evaluate based on last token
		tk._.maybeStartOfSimpleCommand = Boolean(
			last.is('EMPTY') || last.is('SEPARATOR_OP') || last.is('OPEN_PAREN') ||
			last.is('CLOSE_PAREN') || last.is('NEWLINE') || last.is('NEWLINE_LIST') ||
			last.is('TOKEN') === ';' || last.is('PIPE') ||
			last.is('DSEMI') || last.is('OR_IF') || last.is('PIPE') || last.is('AND_IF') ||
			(!last.is('For') && !last.is('In') && !last.is('Case') && values(mode.enums.reservedWords).some(word => last.is(word)))
		);

		return tk;
	}), lookahead);
};

},{"object-values":"5biiv","compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM"}],"4P3xq":[function(require,module,exports) {
'use strict';
const hasOwnProperty = require('has-own-property');
const map = require('map-iterable');
const tokens = require('../../../utils/tokens');

const reduceToOperatorTokenVisitor = operators => ({
	OPERATOR(tk) {
		if (hasOwnProperty(operators, tk.value)) {
			return tokens.changeTokenType(
				tk,
				operators[tk.value],
				tk.value
			);
		}
		return tk;
	}
});

module.exports = (options, mode) => map(
	tokens.applyTokenizerVisitor(reduceToOperatorTokenVisitor(mode.enums.operators))
);


},{"has-own-property":"64xst","map-iterable":"2drce","../../../utils/tokens":"4SrYh"}],"6oUQP":[function(require,module,exports) {
'use strict';
const hasOwnProperty = require('has-own-property');
const values = require('object-values');
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');
// const words = require('../enums/reserved-words');
/*
function defined(v) {
	return v !== undefined;
}
*/
function isValidReservedWordPosition(tk, iterable, words) {
	const last = iterable.behind(1) || {EMPTY: true, is: type => type === 'EMPTY'};
	const twoAgo = iterable.behind(2) || {EMPTY: true, is: type => type === 'EMPTY'};

	// evaluate based on last token
	const startOfCommand = (
		last.is('EMPTY') || last.is('SEPARATOR_OP') || last.is('OPEN_PAREN') ||
		last.is('CLOSE_PAREN') || last.is('NEWLINE') || last.is('NEWLINE_LIST') ||
		last.is('DSEMI') || last.value === ';' || last.is('PIPE') ||
		last.is('OR_IF') || last.is('PIPE') || last.is('AND_IF')
	);

	const lastIsReservedWord = (!last.value === 'for' && !last.value === 'in' && !last.value === 'case' && values(words).some(word => last.is(word)));

	const thirdInCase = twoAgo.value === 'case' && tk.is('TOKEN') && tk.value.toLowerCase() === 'in';
	const thirdInFor = twoAgo.value === 'for' && tk.is('TOKEN') &&
		(tk.value.toLowerCase() === 'in' || tk.value.toLowerCase() === 'do');

	// console.log({tk, startOfCommand, lastIsReservedWord, thirdInFor, thirdInCase, twoAgo})
	return tk.value === '}' || startOfCommand || lastIsReservedWord || thirdInFor || thirdInCase;
}

module.exports = function reservedWords(options, mode) {
	return compose(map((tk, idx, iterable) => {
		// console.log(tk, isValidReservedWordPosition(tk, iterable), hasOwnProperty(words, tk.value))
		// TOKEN tokens consisting of a reserved word
		// are converted to their own token types
		// console.log({tk, v:isValidReservedWordPosition(tk, iterable)})
		if (isValidReservedWordPosition(tk, iterable, mode.enums.reservedWords) && hasOwnProperty(mode.enums.reservedWords, tk.value)) {
			return tk.changeTokenType(mode.enums.reservedWords[tk.value], tk.value);
		}

		// otherwise, TOKEN tokens are converted to
		// WORD tokens
		if (tk.is('TOKEN')) {
			return tk.changeTokenType('WORD', tk.value);
		}

		// other tokens are amitted as-is
		return tk;
	}), lookahead.depth(2));
};

},{"has-own-property":"64xst","object-values":"5biiv","compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM"}],"6M5m9":[function(require,module,exports) {
'use strict';

const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');
const tokens = require('../../../utils/tokens');
const filterNonNull = require('../../../utils/non-null');

const isSeparator = tk => tk && (
	tk.is('NEWLINE') ||
	tk.is('NEWLINE_LIST') ||
	tk.is('AND') ||
	tk.is('SEMICOLON') ||
	(tk.is('OPERATOR') && tk.value === ';') ||
	(tk.is('OPERATOR') && tk.value === '&')
);

function toSeparatorToken(tk, iterable) {
	if (skipJoined(tk) === null) {
		return null;
	}

	let newTk = tokens.changeTokenType(
		tk,
		'SEPARATOR_OP',
		tk.value
	);

	let i = 1;
	let nextTk = iterable.ahead(i);
	while (isSeparator(nextTk)) {
		nextTk._.joinedToSeparator = true;
		i++;
		newTk = newTk.appendTo(nextTk.value);

		nextTk = iterable.ahead(i);
	}
	return newTk;
}

function skipJoined(tk) {
	if (tk._.joinedToSeparator) {
		return null;
	}
	return tk;
}

const AccumulateSeparators = {
	NEWLINE: skipJoined,
	NEWLINE_LIST: skipJoined,
	SEMICOLON: toSeparatorToken,
	AND: toSeparatorToken,
	OPERATOR: (tk, iterable) => tk.value === '&' || tk.value === ';' ?
		toSeparatorToken(tk, iterable) :
		tk
};

/*
resolve a conflict in grammar by
tokenize the former rule:

separator_op     : '&'
				 | ';'
				 ;
separator       : separator_op
				 | separator_op NEWLINE_LIST
				 | NEWLINE_LIST

with a new separator_op token, the rule became:

separator : separator_op
				 | NEWLINE_LIST
*/
module.exports = () => compose(
	filterNonNull,
	map(
		tokens.applyTokenizerVisitor(AccumulateSeparators)
	),
	lookahead.depth(10)
);

},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM","../../../utils/tokens":"4SrYh","../../../utils/non-null":"5uFjx"}],"5uFjx":[function(require,module,exports) {
'use strict';

const filter = require('./filter');

const nonNull = tk => {
	return tk !== null;
};

module.exports = filter(nonNull);
filter.predicate = nonNull;

},{"./filter":"GZLdQ"}],"GZLdQ":[function(require,module,exports) {
'use strict';
const filterIterator = require('filter-iterator');
const reverse = require('reverse-arguments');
const curry = require('curry');

const filter = curry.to(2, reverse(filterIterator));

module.exports = filter;

},{"filter-iterator":"KRyFT","reverse-arguments":"2w85E","curry":"2r7cF"}],"KRyFT":[function(require,module,exports) {
'use strict';

module.exports = filterIterator;

function* filterIterator(xs, pred) {
  for (let x of xs) {
    if (pred(x)) yield x;
  }
}

},{}],"2w85E":[function(require,module,exports) {
module.exports = function reverseArgs(fn, scope) {
  return function(/*args*/) {
    var args = Array.prototype.slice.call(arguments);
    return fn.apply(scope || this, args.reverse());
  };
};

},{}],"4MFCz":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');
const tokens = require('../../../utils/tokens');
const filterNonNull = require('../../../utils/non-null');

const ReplaceWithLineBreakIn = {
	NEWLINE_LIST(tk, iterable) {
		const nextToken = iterable.ahead(1) || tokens.mkToken('EMPTY');

		if (nextToken.is('In')) {
			return tokens.changeTokenType(
				tk,
				'LINEBREAK_IN',
				'\nin'
			);
		}

		return tk;
	},

	In(tk, iterable) {
		const lastToken = iterable.behind(1) || tokens.mkToken('EMPTY');

		if (lastToken.is('NEWLINE_LIST')) {
			return null;
		}

		return tk;
	}
};

/* resolve a conflict in grammar by tokenize linebreak+in
tokens as a new  linebreak_in */
module.exports = () => compose(
	filterNonNull,
	map(
		tokens.applyTokenizerVisitor(ReplaceWithLineBreakIn)
	),
	lookahead
);

},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM","../../../utils/tokens":"4SrYh","../../../utils/non-null":"5uFjx"}],"4Z6Te":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');
const isValidName = require('../../../utils/is-valid-name');

module.exports = function forNameVariable() {
	return compose(map((tk, idx, iterable) => {
		let lastToken = iterable.behind(1) || {is: () => false};

		// if last token is For and current token form a valid name
		// type of token is changed from WORD to NAME

		if (lastToken.is('For') && tk.is('WORD') && isValidName(tk.value)) {
			return tk.changeTokenType('NAME', tk.value);
		}

		return tk;
	}), lookahead);
};

},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM","../../../utils/is-valid-name":"7fzkW"}],"2OpZk":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');

module.exports = function functionName() {
	return compose(map((tk, idx, iterable) => {
		// apply only on valid positions
		// (start of simple commands)
		// if token can form the name of a function,
		// type of token is changed from WORD to NAME

		/* console.log(
			tk._.maybeStartOfSimpleCommand,
			tk.is('WORD'),
			iterable.ahead(1) &&
				iterable.ahead(1).is('OPEN_PAREN'),
			iterable.ahead(2) &&
				iterable.ahead(2).is('CLOSE_PAREN')
		);*/

		if (
			tk._.maybeStartOfSimpleCommand &&
			tk.is('WORD') &&
			iterable.ahead(2) &&
			iterable.ahead(1).is('OPEN_PAREN') &&
			iterable.ahead(2).is('CLOSE_PAREN')
		) {
			tk = tk.changeTokenType('NAME', tk.value);
		}

		return tk;
	}), lookahead.depth(2));
};

},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM"}],"67MU1":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');

module.exports = function ioNumber(options, mode) {
	return compose(map((tk, idx, iterable) => {
		const next = iterable.ahead(1);

		if (tk && tk.is('WORD') && tk.value.match(/^[0-9]+$/) && mode.enums.IOFileOperators.isOperator(next)) {
			return tk.changeTokenType('IO_NUMBER', tk.value);
		}

		return tk;
	}), lookahead);
};

},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM"}],"4cdot":[function(require,module,exports) {
'use strict';
const compose = require('compose-function');
const map = require('map-iterable');
const lookahead = require('iterable-lookahead');
const tokens = require('../../../utils/tokens');
const filterNonNull = require('../../../utils/non-null');

const SkipRepeatedNewLines = {
	NEWLINE(tk, iterable) {
		const lastToken = iterable.behind(1) || tokens.mkToken('EMPTY');

		if (lastToken.is('NEWLINE')) {
			return null;
		}

		return tokens.changeTokenType(tk, 'NEWLINE_LIST', '\n');
	}
};

/* resolve a conflict in grammar by tokenize multiple NEWLINEs as a
newline_list token (it was a rule in POSIX grammar) */
module.exports = () => compose(
	filterNonNull,
	map(
		tokens.applyTokenizerVisitor(SkipRepeatedNewLines)
	),
	lookahead
);


},{"compose-function":"4PPUu","map-iterable":"2drce","iterable-lookahead":"EtGZM","../../../utils/tokens":"4SrYh","../../../utils/non-null":"5uFjx"}],"7hA4r":[function(require,module,exports) {
'use strict';
const map = require('map-iterable');
const isValidName = require('../../../utils/is-valid-name');

module.exports = function assignmentWord() {
	return map((tk, idx, ctx) => {
		// apply only on valid positions
		// (start of simple commands)
		if (tk._.maybeStartOfSimpleCommand) {
			ctx.commandPrefixNotAllowed = false;
		}

		// check if it is an assignment
		if (!ctx.commandPrefixNotAllowed && tk.is('WORD') && tk.value.indexOf('=') > 0 && (
				// left part must be a valid name
				isValidName(tk.value.slice(0, tk.value.indexOf('=')))
			)) {
			return tk.changeTokenType('ASSIGNMENT_WORD', tk.value);
		}

		ctx.commandPrefixNotAllowed = true;
		return tk;
	});
};

},{"map-iterable":"2drce","../../../utils/is-valid-name":"7fzkW"}],"2wSBx":[function(require,module,exports) {
'use strict';
const map = require('map-iterable');

module.exports = function syntaxerrorOnContinue() {
	return map(tk => {
		if (tk && tk.is('CONTINUE')) {
			throw new SyntaxError('Unclosed ' + tk.value);
		}

		return tk;
	});
};

},{"map-iterable":"2drce"}],"1F5V7":[function(require,module,exports) {
/* eslint-disable max-lines */
/* eslint-disable camelcase */
module.exports = {
	start: 'complete_command',
	bnf: {
		complete_command: [
			[
				'list separator EOF',
				' return yy.checkAsync($list, $separator)'
			],
			[
				'list EOF',
				' return $list '
			],
			[
				'separator list EOF',
				' return $list '
			],
			[
				'separator list separator EOF',
				' return yy.checkAsync($list, $separator)'
			]
		],
		list: [
			[
				'list separator and_or',
				'$$ = yy.listAppend($list, $and_or, $separator);'
			],
			[
				'and_or',
				'$$ = yy.list($and_or);'
			]
		],
		and_or: [
			[
				'pipeline',
				'$$ = $pipeline;'
			],
			[
				'and_or AND_IF linebreak pipeline',
				'$$ = yy.andAndOr($and_or, $pipeline);'
			],
			[
				'and_or OR_IF linebreak pipeline',
				'$$ = yy.orAndOr($and_or, $pipeline);'
			]
		],
		pipeline: [
			[
				'pipe_sequence',
				'$$ = yy.pipeLine($pipe_sequence);'
			],
			[
				'Bang pipe_sequence',
				'$$ = yy.bangPipeLine($pipe_sequence);'
			]
		],
		pipe_sequence: [
			[
				'command',
				'$$ = yy.pipeSequence($command);'
			],
			[
				'pipe_sequence PIPE linebreak command',
				'$$ = yy.pipeSequenceAppend($pipe_sequence, $command);'
			]
		],
		command: [
			'simple_command',
			'compound_command',
			[
				'compound_command redirect_list',
				'$$ = yy.addRedirections($compound_command, $redirect_list)'
			],
			'function_definition'
		],
		compound_command: [
			'brace_group',
			'subshell',
			'for_clause',
			'case_clause',
			'if_clause',
			'while_clause',
			'until_clause'
		],
		subshell: [
			[
				'OPEN_PAREN compound_list CLOSE_PAREN',
				'$$ = yy.subshell($compound_list, $OPEN_PAREN.loc, $CLOSE_PAREN.loc);'
			]
		],
		compound_list: [
			[
				'term',
				'$$ = $term;'
			],
			[
				'NEWLINE_LIST term',
				'$$ = $term;'
			],
			[
				'term separator',
				'$$ = yy.checkAsync($term, $separator);'
			],
			[
				'NEWLINE_LIST term separator',
				'$$ = yy.checkAsync($term, $separator);'
			]
		],
		term: [
			[
				'term separator and_or',
				'$$ = yy.termAppend($term, $and_or, $separator);'
			],
			[
				'and_or',
				'$$ = yy.term($and_or);'
			]
		],
		for_clause: [
			[
				'For name linebreak do_group',
				'$$ = yy.forClauseDefault($name, $do_group, $For.loc);'
			],
			[
				'For name LINEBREAK_IN separator do_group',
				'$$ = yy.forClauseDefault($name, $do_group, $For.loc);'
			],
			[
				'For name In separator do_group',
				'$$ = yy.forClauseDefault($name, $do_group, $For.loc);'
			],
			[
				'For name in wordlist separator do_group',
				'$$ = yy.forClause($name, $wordlist, $do_group, $For.loc);'
				/* todo: here allow only ';' separator */
			]
		],
		name: [
			'NAME'
		],
		in: [
			'In'
		],
		wordlist: [
			'wordlist_repetition_plus0'
		],
		case_clause: [
			[
				'Case WORD linebreak in linebreak case_list Esac',
				'$$ = yy.caseClause($WORD, $case_list, $Case.loc, $Esac.loc);'
			],
			[
				'Case WORD linebreak in linebreak case_list_ns Esac',
				'$$ = yy.caseClause($WORD, $case_list_ns, $Case.loc, $Esac.loc);'
			],
			[
				'Case WORD linebreak in linebreak Esac',
				'$$ = yy.caseClause($WORD, null, $Case.loc, $Esac.loc);'
			]
		],
		case_list_ns: [
			[
				'case_list case_item_ns',
				'$$ = yy.caseListAppend($case_list, $case_item_ns);'
			],
			[
				'case_item_ns',
				'$$ = yy.caseList($case_item_ns);'
			]
		],
		case_list: [
			[
				'case_list case_item',
				'$$ = yy.caseListAppend($case_list, $case_item);'
			],
			[
				'case_item',
				'$$ = yy.caseList($case_item);'
			]
		],
		case_item_ns: [
			[
				'pattern CLOSE_PAREN linebreak',
				'$$ = yy.caseItem($pattern, null, $pattern[0].loc, $CLOSE_PAREN.loc);'
			],
			[
				'pattern CLOSE_PAREN compound_list linebreak',
				'$$ = yy.caseItem($pattern, $compound_list, $pattern[0].loc, $compound_list.loc);'
			],
			[
				'OPEN_PAREN pattern CLOSE_PAREN linebreak',
				'$$ = yy.caseItem($pattern, null, $OPEN_PAREN.loc, $CLOSE_PAREN.loc );'
			],
			[
				'OPEN_PAREN pattern CLOSE_PAREN compound_list linebreak',
				'$$ = yy.caseItem($pattern, $compound_list, $OPEN_PAREN.loc, $compound_list.loc);'
			]
		],
		case_item: [
			[
				'pattern CLOSE_PAREN linebreak DSEMI linebreak',
				'$$ = yy.caseItem($pattern, null, $pattern[0].loc, $DSEMI.loc);'
			],
			[
				'pattern CLOSE_PAREN compound_list DSEMI linebreak',
				'$$ = yy.caseItem($pattern, $compound_list, $pattern[0].loc, $DSEMI.loc);'
			],
			[
				'OPEN_PAREN pattern CLOSE_PAREN linebreak DSEMI linebreak',
				'$$ = yy.caseItem($pattern, null, $OPEN_PAREN.loc, $DSEMI.loc );'
			],
			[
				'OPEN_PAREN pattern CLOSE_PAREN compound_list DSEMI linebreak',
				'$$ = yy.caseItem($pattern, $compound_list, $OPEN_PAREN.loc, $DSEMI.loc);'
			]
		],
		pattern: [
			[
				'WORD',
				'$$ = yy.pattern($WORD);'
			],
			[
				'pattern PIPE WORD',
				'$$ = yy.patternAppend($pattern, $WORD);'
			]
		],
		if_clause: [
			[
				'If compound_list Then compound_list else_part Fi',
				'$$ = yy.ifClause($2, $4, $else_part, $If.loc, $Fi.loc);'
			],
			[
				'If compound_list Then compound_list Fi',
				'$$ = yy.ifClause($2, $4, null, $If.loc, $Fi.loc);'
			]
		],
		else_part: [
			[
				'Elif compound_list Then compound_list',
				'$$ = yy.ifClause($2, $4, null, $Elif.loc, $4.loc);'
			],
			[
				'Elif compound_list Then compound_list else_part',
				'$$ = yy.ifClause($2, $4, $else_part, $Elif.loc, $else_part.loc);'
			],
			[
				'Else compound_list',
				'$$ = yy.elseClause($compound_list, $Else);'
			]
		],
		while_clause: [
			[
				'While compound_list do_group',
				'$$ = yy.while($2, $3, $While);'
			]
		],
		until_clause: [
			[
				'Until compound_list do_group',
				'$$ = yy.until($2, $3, $Until);'
			]
		],
		function_definition: [
			[
				'fname OPEN_PAREN CLOSE_PAREN linebreak function_body',
				'$$ = yy.functionDefinition($fname, $function_body);'
			]
		],
		function_body: [
			[
				'compound_command',
				'$$ = [$compound_command, null];'
			],
			[
				'compound_command redirect_list',
				'$$ = [$compound_command, $redirect_list];'
			]
		],
		fname: [
			'NAME'
		],
		brace_group: [
			[
				'Lbrace compound_list Rbrace',
				'$$ = yy.braceGroup($compound_list, $Lbrace.loc, $Rbrace.loc);'
			]
		],
		do_group: [
			[
				'Do compound_list Done',
				'$$ = yy.doGroup($compound_list, $Do.loc, $Done.loc);'
			]
		],
		simple_command: [
			[
				'cmd_prefix cmd_word cmd_suffix',
				'$$ =yy.command($cmd_prefix, $cmd_word, $cmd_suffix);'
			],
			[
				'cmd_prefix cmd_word',
				'$$ =yy.command($cmd_prefix, $cmd_word, null);'
			],
			[
				'cmd_prefix',
				'$$ =yy.commandAssignment($cmd_prefix);'
			],
			[
				'cmd_name cmd_suffix',
				'$$ =yy.command(null, $cmd_name, $cmd_suffix);'
			],
			[
				'cmd_name',
				'$$ =yy.command(null, $cmd_name);'
			]
		],
		cmd_name: [
			[
				'WORD',
				'$$ =yy.commandName(yytext) /* Apply rule 7a */;'
			]
		],
		cmd_word: [
			[
				'WORD',
				'$$ = yytext	/* Apply rule 7B */;'
			]
		],
		cmd_prefix: [
			[
				'io_redirect',
				'$$ = yy.prefix($io_redirect);'
			],
			[
				'cmd_prefix io_redirect',
				'$$ = yy.prefixAppend($1, $2);'
			],
			[
				'ASSIGNMENT_WORD',
				'$$ = yy.prefix($1);'
			],
			[
				'cmd_prefix ASSIGNMENT_WORD',
				'$$ = yy.prefixAppend($1, $2);'
			]
		],
		cmd_suffix: [
			[
				'io_redirect',
				'$$ = yy.suffix($io_redirect);'
			],
			[
				'cmd_suffix io_redirect',
				'$$ = yy.suffixAppend($cmd_suffix, $io_redirect);'
			],
			[
				'WORD',
				'$$ = yy.suffix($1);'
			],
			[
				'cmd_suffix WORD',
				'$$ = yy.suffixAppend($cmd_suffix, $2);'
			]
		],
		redirect_list: [
			[
				'io_redirect',
				'$$ = [$io_redirect];'
			],
			[
				'redirect_list io_redirect',
				'$$ = $redirect_list.concat($io_redirect);'
			]
		],
		io_redirect: [
			[
				'io_file',
				'$$ = $io_file;'
			],
			[
				'IO_NUMBER io_file',
				'$$ = yy.numberIoRedirect($io_file, $1);'
			],
			'io_here',
			'IO_NUMBER io_here'
		],
		io_file: [
			[
				'LESS filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'LESSAND filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'GREAT filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'GREATAND filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'DGREAT filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'LESSGREAT filename',
				'$$ =yy.ioRedirect($1, $filename);'
			],
			[
				'CLOBBER filename',
				'$$ =yy.ioRedirect($1, $filename);'
			]
		],
		filename: [
			'WORD'
		],
		io_here: [
			'DLESS here_end',
			'DLESSDASH here_end'
		],
		here_end: [
			'WORD'
		],
		linebreak: [
			'NEWLINE_LIST',
			''
		],
		separator: [
			'SEPARATOR_OP',
			'NEWLINE_LIST'
		],
		wordlist_repetition_plus0: [
			[
				'WORD',
				'$$ = [$1];'
			],
			[
				'wordlist_repetition_plus0 WORD',
				'$1.push($2);'
			]
		]
	}
};

},{}],"3vTtt":[function(require,module,exports) {
'use strict';

exports.IOFileOperators = require('./io-file-operators');
exports.operators = require('./operators');
exports.parameterOperators = require('./parameter-operators');
exports.reservedWords = require('./reserved-words');

},{"./io-file-operators":"6N4b0","./operators":"32vdp","./parameter-operators":"20XlY","./reserved-words":"CxIh6"}],"6N4b0":[function(require,module,exports) {
'use strict';

const ioFileOperators = module.exports = [
	'LESS',
	'DLESS',
	'DGREAT',
	'LESSAND',
	'GREATAND',
	'GREAT',
	'LESSGREAT',
	'CLOBBER'
];

ioFileOperators.isOperator = function isOperator(tk) {
	for (const op of ioFileOperators) {
		if (tk.type === op) {
			return true;
		}
	}
	return false;
};

},{}],"20XlY":[function(require,module,exports) {
'use strict';

const name = '[a-zA-Z_][a-zA-Z0-9_]*';

const parameterOps = {
	[`^(${name}):\\-(.*)$`]: {
		op: 'useDefaultValue',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name}):\\=(.*)$`]: {
		op: 'assignDefaultValue',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name}):\\?(.*)$`]: {
		op: 'indicateErrorIfNull',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name}):\\+(.*)$`]: {
		op: 'useAlternativeValue',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\-(.*)$`]: {
		op: 'useDefaultValueIfUnset',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\=(.*)$`]: {
		op: 'assignDefaultValueIfUnset',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\?(.*)$`]: {
		op: 'indicateErrorIfUnset',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\+(.*)$`]: {
		op: 'useAlternativeValueIfUnset',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\%\\%(.*)$`]: {
		op: 'removeLargestSuffixPattern',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\#\\#(.*)$`]: {
		op: 'removeLargestPrefixPattern',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\%(.*)$`]: {
		op: 'removeSmallestSuffixPattern',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^(${name})\\#(.*)$`]: {
		op: 'removeSmallestPrefixPattern',
		parameter: m => m[1],
		word: m => m[2],
		expand: ['word']
	},

	[`^\\#(${name})$`]: {
		op: 'stringLength',
		parameter: m => m[1]
	},

	[`^([1-9][0-9]*)$`]: {
		kind: 'positional',
		parameter: m => Number(m[1])
	},

	'^!$': {
		kind: 'last-background-pid'
	},

	'^\\@$': {
		kind: 'positional-list'
	},

	'^\\-$': {
		kind: 'current-option-flags'
	},

	'^\\#$': {
		kind: 'positional-count'
	},

	'^\\?$': {
		kind: 'last-exit-status'
	},

	'^\\*$': {
		kind: 'positional-string'
	},

	'^\\$$': {
		kind: 'shell-process-id'
	},

	'^0$': {
		kind: 'shell-script-name'
	}
};

module.exports = parameterOps;


},{}],"CxIh6":[function(require,module,exports) {
'use strict';
module.exports = {
	'if': 'If',
	'then': 'Then',
	'else': 'Else',
	'elif': 'Elif',
	'fi': 'Fi',
	'do': 'Do',
	'done': 'Done',
	'case': 'Case',
	'esac': 'Esac',
	'while': 'While',
	'until': 'Until',
	'for': 'For',
	'in': 'In',
	'{': 'Lbrace',
	'}': 'Rbrace',
	'!': 'Bang'
};

},{}],"5AquM":[function(require,module,exports) {
var process = require("process");
/*parser generated by jison 0.4.17*/
/*
Returns a Parser object of the following structure:

Parser: {
yy: {}
}

Parser.prototype: {
yy: {},
trace: function(),
symbols_: {associative list: name ==> number},
terminals_: {associative list: number ==> name},
productions_: [...],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
table: [...],
defaultActions: {...},
parseError: function(str, hash),
parse: function(input),

lexer: {
EOF: 1,
parseError: function(str, hash),
setInput: function(input),
input: function(),
unput: function(str),
more: function(),
less: function(n),
pastInput: function(),
upcomingInput: function(),
showPosition: function(),
test_match: function(regex_match_array, rule_index),
next: function(),
lex: function(),
begin: function(condition),
popState: function(),
_currentRules: function(),
topState: function(),
pushState: function(condition),

options: {
ranges: boolean           (optional: true ==> token location info will include a .range[] member)
flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
},

performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
rules: [...],
conditions: {associative list: name ==> set},
}
}


token location info (@$, _$, etc.): {
first_line: n,
last_line: n,
first_column: n,
last_column: n,
range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
}


the parseError function receives a 'hash' object with these members for lexer and parser errors: {
text:        (matched text)
token:       (the produced terminal token, if any)
line:        (yylineno)
}
while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
loc:         (yylloc)
expected:    (string describing the set of expected tokens)
recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
}
*/
var parser = (function () {
  var o = function (k, v, o, l) {
    for ((o = o || ({}), l = k.length); l--; o[k[l]] = v) ;
    return o;
  }, $V0 = [1, 9], $V1 = [1, 28], $V2 = [1, 6], $V3 = [1, 29], $V4 = [1, 34], $V5 = [1, 30], $V6 = [1, 26], $V7 = [1, 31], $V8 = [1, 32], $V9 = [1, 33], $Va = [1, 27], $Vb = [1, 25], $Vc = [1, 36], $Vd = [1, 38], $Ve = [1, 39], $Vf = [1, 40], $Vg = [1, 41], $Vh = [1, 42], $Vi = [1, 43], $Vj = [1, 44], $Vk = [1, 45], $Vl = [1, 46], $Vm = [1, 5], $Vn = [6, 31, 84], $Vo = [1, 50], $Vp = [1, 51], $Vq = [6, 13, 27, 29, 31, 32, 39, 41, 42, 44, 49, 50, 51, 53, 54, 55, 56, 57, 60, 61, 62, 63, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $Vr = [6, 9, 11, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $Vs = [1, 52], $Vt = [6, 9, 11, 15, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $Vu = [1, 62], $Vv = [6, 9, 11, 15, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vw = [6, 9, 11, 15, 29, 31, 42, 44, 49, 51, 53, 54, 55, 61, 62, 63, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vx = [6, 9, 11, 15, 29, 31, 42, 44, 49, 51, 53, 54, 55, 61, 62, 63, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vy = [1, 66], $Vz = [1, 78], $VA = [1, 86], $VB = [13, 27, 32, 39, 41, 42, 50, 56, 57, 60, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VC = [2, 102], $VD = [1, 93], $VE = [1, 99], $VF = [29, 44, 49, 51, 53, 54, 55, 61, 62, 63], $VG = [29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $VH = [1, 112], $VI = [2, 101], $VJ = [29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63], $VK = [2, 37], $VL = [31, 42, 84], $VM = [27, 42, 44], $VN = [1, 140], $VO = [1, 141], $VP = [1, 151], $VQ = [1, 152], $VR = [1, 161], $VS = [15, 29], $VT = [44, 49], $VU = [1, 166];
  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: {
      "error": 2,
      "complete_command": 3,
      "list": 4,
      "separator": 5,
      "EOF": 6,
      "and_or": 7,
      "pipeline": 8,
      "AND_IF": 9,
      "linebreak": 10,
      "OR_IF": 11,
      "pipe_sequence": 12,
      "Bang": 13,
      "command": 14,
      "PIPE": 15,
      "simple_command": 16,
      "compound_command": 17,
      "redirect_list": 18,
      "function_definition": 19,
      "brace_group": 20,
      "subshell": 21,
      "for_clause": 22,
      "case_clause": 23,
      "if_clause": 24,
      "while_clause": 25,
      "until_clause": 26,
      "OPEN_PAREN": 27,
      "compound_list": 28,
      "CLOSE_PAREN": 29,
      "term": 30,
      "NEWLINE_LIST": 31,
      "For": 32,
      "name": 33,
      "do_group": 34,
      "LINEBREAK_IN": 35,
      "In": 36,
      "in": 37,
      "wordlist": 38,
      "NAME": 39,
      "wordlist_repetition_plus0": 40,
      "Case": 41,
      "WORD": 42,
      "case_list": 43,
      "Esac": 44,
      "case_list_ns": 45,
      "case_item_ns": 46,
      "case_item": 47,
      "pattern": 48,
      "DSEMI": 49,
      "If": 50,
      "Then": 51,
      "else_part": 52,
      "Fi": 53,
      "Elif": 54,
      "Else": 55,
      "While": 56,
      "Until": 57,
      "fname": 58,
      "function_body": 59,
      "Lbrace": 60,
      "Rbrace": 61,
      "Do": 62,
      "Done": 63,
      "cmd_prefix": 64,
      "cmd_word": 65,
      "cmd_suffix": 66,
      "cmd_name": 67,
      "io_redirect": 68,
      "ASSIGNMENT_WORD": 69,
      "io_file": 70,
      "IO_NUMBER": 71,
      "io_here": 72,
      "LESS": 73,
      "filename": 74,
      "LESSAND": 75,
      "GREAT": 76,
      "GREATAND": 77,
      "DGREAT": 78,
      "LESSGREAT": 79,
      "CLOBBER": 80,
      "DLESS": 81,
      "here_end": 82,
      "DLESSDASH": 83,
      "SEPARATOR_OP": 84,
      "$accept": 0,
      "$end": 1
    },
    terminals_: {
      2: "error",
      6: "EOF",
      9: "AND_IF",
      11: "OR_IF",
      13: "Bang",
      15: "PIPE",
      27: "OPEN_PAREN",
      29: "CLOSE_PAREN",
      31: "NEWLINE_LIST",
      32: "For",
      35: "LINEBREAK_IN",
      36: "In",
      39: "NAME",
      41: "Case",
      42: "WORD",
      44: "Esac",
      49: "DSEMI",
      50: "If",
      51: "Then",
      53: "Fi",
      54: "Elif",
      55: "Else",
      56: "While",
      57: "Until",
      60: "Lbrace",
      61: "Rbrace",
      62: "Do",
      63: "Done",
      69: "ASSIGNMENT_WORD",
      71: "IO_NUMBER",
      73: "LESS",
      75: "LESSAND",
      76: "GREAT",
      77: "GREATAND",
      78: "DGREAT",
      79: "LESSGREAT",
      80: "CLOBBER",
      81: "DLESS",
      83: "DLESSDASH",
      84: "SEPARATOR_OP"
    },
    productions_: [0, [3, 3], [3, 2], [3, 3], [3, 4], [4, 3], [4, 1], [7, 1], [7, 4], [7, 4], [8, 1], [8, 2], [12, 1], [12, 4], [14, 1], [14, 1], [14, 2], [14, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [21, 3], [28, 1], [28, 2], [28, 2], [28, 3], [30, 3], [30, 1], [22, 4], [22, 5], [22, 5], [22, 6], [33, 1], [37, 1], [38, 1], [23, 7], [23, 7], [23, 6], [45, 2], [45, 1], [43, 2], [43, 1], [46, 3], [46, 4], [46, 4], [46, 5], [47, 5], [47, 5], [47, 6], [47, 6], [48, 1], [48, 3], [24, 6], [24, 5], [52, 4], [52, 5], [52, 2], [25, 3], [26, 3], [19, 5], [59, 1], [59, 2], [58, 1], [20, 3], [34, 3], [16, 3], [16, 2], [16, 1], [16, 2], [16, 1], [67, 1], [65, 1], [64, 1], [64, 2], [64, 1], [64, 2], [66, 1], [66, 2], [66, 1], [66, 2], [18, 1], [18, 2], [68, 1], [68, 2], [68, 1], [68, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [74, 1], [72, 2], [72, 2], [82, 1], [10, 1], [10, 0], [5, 1], [5, 1], [40, 1], [40, 2]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, /*action[1]*/
    $$, /*action[1]*/
    /*vstack*/
    _$) /*lstack*/
    {
      /*this == yyval*/
      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          return yy.checkAsync($$[$0 - 2], $$[$0 - 1]);
          break;
        case 2:
        case 3:
          return $$[$0 - 1];
          break;
        case 4:
          return yy.checkAsync($$[$0 - 2], $$[$0 - 3]);
          break;
        case 5:
          this.$ = yy.listAppend($$[$0 - 2], $$[$0], $$[$0 - 1]);
          break;
        case 6:
          this.$ = yy.list($$[$0]);
          break;
        case 7:
        case 26:
        case 27:
        case 86:
          this.$ = $$[$0];
          break;
        case 8:
          this.$ = yy.andAndOr($$[$0 - 3], $$[$0]);
          break;
        case 9:
          this.$ = yy.orAndOr($$[$0 - 3], $$[$0]);
          break;
        case 10:
          this.$ = yy.pipeLine($$[$0]);
          break;
        case 11:
          this.$ = yy.bangPipeLine($$[$0]);
          break;
        case 12:
          this.$ = yy.pipeSequence($$[$0]);
          break;
        case 13:
          this.$ = yy.pipeSequenceAppend($$[$0 - 3], $$[$0]);
          break;
        case 16:
          this.$ = yy.addRedirections($$[$0 - 1], $$[$0]);
          break;
        case 25:
          this.$ = yy.subshell($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
          break;
        case 28:
        case 29:
          this.$ = yy.checkAsync($$[$0 - 1], $$[$0]);
          break;
        case 30:
          this.$ = yy.termAppend($$[$0 - 2], $$[$0], $$[$0 - 1]);
          break;
        case 31:
          this.$ = yy.term($$[$0]);
          break;
        case 32:
          this.$ = yy.forClauseDefault($$[$0 - 2], $$[$0], $$[$0 - 3].loc);
          break;
        case 33:
        case 34:
          this.$ = yy.forClauseDefault($$[$0 - 3], $$[$0], $$[$0 - 4].loc);
          break;
        case 35:
          this.$ = yy.forClause($$[$0 - 4], $$[$0 - 2], $$[$0], $$[$0 - 5].loc);
          break;
        case 39:
        case 40:
          this.$ = yy.caseClause($$[$0 - 5], $$[$0 - 1], $$[$0 - 6].loc, $$[$0].loc);
          break;
        case 41:
          this.$ = yy.caseClause($$[$0 - 4], null, $$[$0 - 5].loc, $$[$0].loc);
          break;
        case 42:
        case 44:
          this.$ = yy.caseListAppend($$[$0 - 1], $$[$0]);
          break;
        case 43:
        case 45:
          this.$ = yy.caseList($$[$0]);
          break;
        case 46:
          this.$ = yy.caseItem($$[$0 - 2], null, $$[$0 - 2][0].loc, $$[$0 - 1].loc);
          break;
        case 47:
          this.$ = yy.caseItem($$[$0 - 3], $$[$0 - 1], $$[$0 - 3][0].loc, $$[$0 - 1].loc);
          break;
        case 48:
          this.$ = yy.caseItem($$[$0 - 2], null, $$[$0 - 3].loc, $$[$0 - 1].loc);
          break;
        case 49:
          this.$ = yy.caseItem($$[$0 - 3], $$[$0 - 1], $$[$0 - 4].loc, $$[$0 - 1].loc);
          break;
        case 50:
          this.$ = yy.caseItem($$[$0 - 4], null, $$[$0 - 4][0].loc, $$[$0 - 1].loc);
          break;
        case 51:
          this.$ = yy.caseItem($$[$0 - 4], $$[$0 - 2], $$[$0 - 4][0].loc, $$[$0 - 1].loc);
          break;
        case 52:
          this.$ = yy.caseItem($$[$0 - 4], null, $$[$0 - 5].loc, $$[$0 - 1].loc);
          break;
        case 53:
          this.$ = yy.caseItem($$[$0 - 4], $$[$0 - 2], $$[$0 - 5].loc, $$[$0 - 1].loc);
          break;
        case 54:
          this.$ = yy.pattern($$[$0]);
          break;
        case 55:
          this.$ = yy.patternAppend($$[$0 - 2], $$[$0]);
          break;
        case 56:
          this.$ = yy.ifClause($$[$0 - 4], $$[$0 - 2], $$[$0 - 1], $$[$0 - 5].loc, $$[$0].loc);
          break;
        case 57:
          this.$ = yy.ifClause($$[$0 - 3], $$[$0 - 1], null, $$[$0 - 4].loc, $$[$0].loc);
          break;
        case 58:
          this.$ = yy.ifClause($$[$0 - 2], $$[$0], null, $$[$0 - 3].loc, $$[$0].loc);
          break;
        case 59:
          this.$ = yy.ifClause($$[$0 - 3], $$[$0 - 1], $$[$0], $$[$0 - 4].loc, $$[$0].loc);
          break;
        case 60:
          this.$ = yy.elseClause($$[$0], $$[$0 - 1]);
          break;
        case 61:
          this.$ = yy.while($$[$0 - 1], $$[$0], $$[$0 - 2]);
          break;
        case 62:
          this.$ = yy.until($$[$0 - 1], $$[$0], $$[$0 - 2]);
          break;
        case 63:
          this.$ = yy.functionDefinition($$[$0 - 4], $$[$0]);
          break;
        case 64:
          this.$ = [$$[$0], null];
          break;
        case 65:
          this.$ = [$$[$0 - 1], $$[$0]];
          break;
        case 67:
          this.$ = yy.braceGroup($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
          break;
        case 68:
          this.$ = yy.doGroup($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
          break;
        case 69:
          this.$ = yy.command($$[$0 - 2], $$[$0 - 1], $$[$0]);
          break;
        case 70:
          this.$ = yy.command($$[$0 - 1], $$[$0], null);
          break;
        case 71:
          this.$ = yy.commandAssignment($$[$0]);
          break;
        case 72:
          this.$ = yy.command(null, $$[$0 - 1], $$[$0]);
          break;
        case 73:
          this.$ = yy.command(null, $$[$0]);
          break;
        case 74:
          this.$ = yy.commandName(yytext);
          break;
        case 75:
          this.$ = yytext;
          break;
        case 76:
        case 78:
          this.$ = yy.prefix($$[$0]);
          break;
        case 77:
        case 79:
          this.$ = yy.prefixAppend($$[$0 - 1], $$[$0]);
          break;
        case 80:
        case 82:
          this.$ = yy.suffix($$[$0]);
          break;
        case 81:
        case 83:
          this.$ = yy.suffixAppend($$[$0 - 1], $$[$0]);
          break;
        case 84:
        case 105:
          this.$ = [$$[$0]];
          break;
        case 85:
          this.$ = $$[$0 - 1].concat($$[$0]);
          break;
        case 87:
          this.$ = yy.numberIoRedirect($$[$0], $$[$0 - 1]);
          break;
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
          this.$ = yy.ioRedirect($$[$0 - 1], $$[$0]);
          break;
        case 106:
          $$[$0 - 1].push($$[$0]);
          break;
      }
    },
    table: [{
      3: 1,
      4: 2,
      5: 3,
      7: 4,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      31: $V2,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl,
      84: $Vm
    }, {
      1: [3]
    }, {
      5: 47,
      6: [1, 48],
      31: $V2,
      84: $Vm
    }, {
      4: 49,
      7: 4,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vn, [2, 6], {
      9: $Vo,
      11: $Vp
    }), o($Vq, [2, 103]), o($Vq, [2, 104]), o($Vr, [2, 7]), o($Vr, [2, 10], {
      15: $Vs
    }), {
      12: 53,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vt, [2, 12]), o($Vt, [2, 14]), o($Vt, [2, 15], {
      70: 35,
      72: 37,
      18: 54,
      68: 55,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vt, [2, 17]), o($Vt, [2, 71], {
      70: 35,
      72: 37,
      65: 56,
      68: 57,
      42: [1, 59],
      69: [1, 58],
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vt, [2, 73], {
      70: 35,
      72: 37,
      66: 60,
      68: 61,
      42: $Vu,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vv, [2, 18]), o($Vv, [2, 19]), o($Vv, [2, 20]), o($Vv, [2, 21]), o($Vv, [2, 22]), o($Vv, [2, 23]), o($Vv, [2, 24]), {
      27: [1, 63]
    }, o($Vw, [2, 76]), o($Vw, [2, 78]), o($Vx, [2, 74]), {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 64,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 68,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      33: 69,
      39: [1, 70]
    }, {
      42: [1, 71]
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 72,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 73,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 74,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      27: [2, 66]
    }, o($Vw, [2, 86]), {
      70: 75,
      72: 76,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vw, [2, 88]), {
      42: $Vz,
      74: 77
    }, {
      42: $Vz,
      74: 79
    }, {
      42: $Vz,
      74: 80
    }, {
      42: $Vz,
      74: 81
    }, {
      42: $Vz,
      74: 82
    }, {
      42: $Vz,
      74: 83
    }, {
      42: $Vz,
      74: 84
    }, {
      42: $VA,
      82: 85
    }, {
      42: $VA,
      82: 87
    }, {
      6: [1, 88],
      7: 89,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      1: [2, 2]
    }, {
      5: 91,
      6: [1, 90],
      31: $V2,
      84: $Vm
    }, o($VB, $VC, {
      10: 92,
      31: $VD
    }), o($VB, $VC, {
      10: 94,
      31: $VD
    }), o([27, 32, 39, 41, 42, 50, 56, 57, 60, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VC, {
      10: 95,
      31: $VD
    }), o($Vr, [2, 11], {
      15: $Vs
    }), o($Vt, [2, 16], {
      70: 35,
      72: 37,
      68: 96,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vv, [2, 84]), o($Vt, [2, 70], {
      70: 35,
      72: 37,
      68: 61,
      66: 97,
      42: $Vu,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vw, [2, 77]), o($Vw, [2, 79]), o($Vx, [2, 75]), o($Vt, [2, 72], {
      70: 35,
      72: 37,
      68: 98,
      42: $VE,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vx, [2, 80]), o($Vx, [2, 82]), {
      29: [1, 100]
    }, {
      61: [1, 101]
    }, o($VF, [2, 26], {
      5: 102,
      31: $V2,
      84: $Vm
    }), {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      30: 103,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($VG, [2, 31], {
      9: $Vo,
      11: $Vp
    }), {
      29: [1, 104]
    }, {
      10: 105,
      31: $VD,
      35: [1, 106],
      36: [1, 107],
      37: 108,
      62: $VC
    }, o([31, 35, 36, 62], [2, 36]), {
      10: 109,
      31: $VD,
      36: $VC
    }, {
      51: [1, 110]
    }, {
      34: 111,
      62: $VH
    }, {
      34: 113,
      62: $VH
    }, o($Vw, [2, 87]), o($Vw, [2, 89]), o($Vw, [2, 90]), o($Vw, [2, 97]), o($Vw, [2, 91]), o($Vw, [2, 92]), o($Vw, [2, 93]), o($Vw, [2, 94]), o($Vw, [2, 95]), o($Vw, [2, 96]), o($Vw, [2, 98]), o($Vw, [2, 100]), o($Vw, [2, 99]), {
      1: [2, 1]
    }, o($Vn, [2, 5], {
      9: $Vo,
      11: $Vp
    }), {
      1: [2, 3]
    }, {
      6: [1, 114],
      7: 89,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      8: 115,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o([13, 27, 32, 36, 39, 41, 42, 44, 50, 56, 57, 60, 62, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VI), {
      8: 116,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      14: 117,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vv, [2, 85]), o($Vt, [2, 69], {
      70: 35,
      72: 37,
      68: 98,
      42: $VE,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vx, [2, 81]), o($Vx, [2, 83]), o([27, 32, 41, 50, 56, 57, 60], $VC, {
      10: 118,
      31: $VD
    }), o($Vv, [2, 67]), o($VJ, [2, 28], {
      8: 7,
      12: 8,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      64: 14,
      67: 15,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      58: 23,
      68: 24,
      70: 35,
      72: 37,
      7: 119,
      13: $V0,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      60: $Va,
      69: $Vb,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($VF, [2, 27], {
      5: 120,
      31: $V2,
      84: $Vm
    }), o($Vv, [2, 25]), {
      34: 121,
      62: $VH
    }, {
      5: 122,
      31: $V2,
      84: $Vm
    }, {
      5: 123,
      31: $V2,
      42: $VK,
      84: $Vm
    }, {
      38: 124,
      40: 125,
      42: [1, 126]
    }, {
      36: [1, 128],
      37: 127
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 129,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vv, [2, 61]), {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 130,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vv, [2, 62]), {
      1: [2, 4]
    }, o($Vr, [2, 8]), o($Vr, [2, 9]), o($Vt, [2, 13]), {
      17: 132,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      32: $V3,
      41: $V5,
      50: $V7,
      56: $V8,
      57: $V9,
      59: 131,
      60: $Va
    }, o($VG, [2, 30], {
      9: $Vo,
      11: $Vp
    }), o($VJ, [2, 29], {
      8: 7,
      12: 8,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      64: 14,
      67: 15,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      58: 23,
      68: 24,
      70: 35,
      72: 37,
      7: 119,
      13: $V0,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      60: $Va,
      69: $Vb,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vv, [2, 32]), {
      34: 133,
      62: $VH
    }, {
      34: 134,
      62: $VH
    }, {
      5: 135,
      31: $V2,
      84: $Vm
    }, o([31, 84], [2, 38], {
      42: [1, 136]
    }), o($VL, [2, 105]), o($VM, $VC, {
      10: 137,
      31: $VD
    }), o([27, 31, 42, 44], $VK), {
      52: 138,
      53: [1, 139],
      54: $VN,
      55: $VO
    }, {
      63: [1, 142]
    }, o($Vt, [2, 63]), o($Vt, [2, 64], {
      70: 35,
      72: 37,
      68: 55,
      18: 143,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vv, [2, 33]), o($Vv, [2, 34]), {
      34: 144,
      62: $VH
    }, o($VL, [2, 106]), {
      27: $VP,
      42: $VQ,
      43: 145,
      44: [1, 147],
      45: 146,
      46: 149,
      47: 148,
      48: 150
    }, {
      53: [1, 153]
    }, o($Vv, [2, 57]), {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 154,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 155,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, o($Vv, [2, 68]), o($Vt, [2, 65], {
      70: 35,
      72: 37,
      68: 96,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($Vv, [2, 35]), {
      27: $VP,
      42: $VQ,
      44: [1, 156],
      46: 158,
      47: 157,
      48: 150
    }, {
      44: [1, 159]
    }, o($Vv, [2, 41]), o($VM, [2, 45]), {
      44: [2, 43]
    }, {
      15: $VR,
      29: [1, 160]
    }, {
      42: $VQ,
      48: 162
    }, o($VS, [2, 54]), o($Vv, [2, 56]), {
      51: [1, 163]
    }, {
      53: [2, 60]
    }, o($Vv, [2, 39]), o($VM, [2, 44]), {
      44: [2, 42]
    }, o($Vv, [2, 40]), o($VT, $VC, {
      8: 7,
      12: 8,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      64: 14,
      67: 15,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      58: 23,
      68: 24,
      70: 35,
      72: 37,
      30: 65,
      7: 67,
      10: 164,
      28: 165,
      13: $V0,
      27: $V1,
      31: $VU,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      60: $Va,
      69: $Vb,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), {
      42: [1, 167]
    }, {
      15: $VR,
      29: [1, 168]
    }, {
      7: 67,
      8: 7,
      12: 8,
      13: $V0,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      27: $V1,
      28: 169,
      30: 65,
      31: $Vy,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      58: 23,
      60: $Va,
      64: 14,
      67: 15,
      68: 24,
      69: $Vb,
      70: 35,
      71: $Vc,
      72: 37,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }, {
      44: [2, 46],
      49: [1, 170]
    }, {
      10: 172,
      31: $VD,
      44: $VC,
      49: [1, 171]
    }, o($VT, $VI, {
      8: 7,
      12: 8,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      64: 14,
      67: 15,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      58: 23,
      68: 24,
      70: 35,
      72: 37,
      7: 67,
      30: 103,
      13: $V0,
      27: $V1,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      60: $Va,
      69: $Vb,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), o($VS, [2, 55]), o($VT, $VC, {
      8: 7,
      12: 8,
      14: 10,
      16: 11,
      17: 12,
      19: 13,
      64: 14,
      67: 15,
      20: 16,
      21: 17,
      22: 18,
      23: 19,
      24: 20,
      25: 21,
      26: 22,
      58: 23,
      68: 24,
      70: 35,
      72: 37,
      30: 65,
      7: 67,
      10: 173,
      28: 174,
      13: $V0,
      27: $V1,
      31: $VU,
      32: $V3,
      39: $V4,
      41: $V5,
      42: $V6,
      50: $V7,
      56: $V8,
      57: $V9,
      60: $Va,
      69: $Vb,
      71: $Vc,
      73: $Vd,
      75: $Ve,
      76: $Vf,
      77: $Vg,
      78: $Vh,
      79: $Vi,
      80: $Vj,
      81: $Vk,
      83: $Vl
    }), {
      52: 175,
      53: [2, 58],
      54: $VN,
      55: $VO
    }, o($VM, $VC, {
      10: 176,
      31: $VD
    }), o($VM, $VC, {
      10: 177,
      31: $VD
    }), {
      44: [2, 47]
    }, {
      44: [2, 48],
      49: [1, 178]
    }, {
      10: 180,
      31: $VD,
      44: $VC,
      49: [1, 179]
    }, {
      53: [2, 59]
    }, o($VM, [2, 50]), o($VM, [2, 51]), o($VM, $VC, {
      10: 181,
      31: $VD
    }), o($VM, $VC, {
      10: 182,
      31: $VD
    }), {
      44: [2, 49]
    }, o($VM, [2, 52]), o($VM, [2, 53])],
    defaultActions: {
      34: [2, 66],
      48: [2, 2],
      88: [2, 1],
      90: [2, 3],
      114: [2, 4],
      149: [2, 43],
      155: [2, 60],
      158: [2, 42],
      172: [2, 47],
      175: [2, 59],
      180: [2, 49]
    },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;
        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = {
        yy: {}
      };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      _token_stack: var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
  };
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser();
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && require.main === module) {
    exports.main(process.argv.slice(1));
  }
}

},{"process":"7AgFc","fs":"2RD6T","path":"7rNOE"}],"7AgFc":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    // normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    // normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
// empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};

},{}],"2RD6T":[function(require,module,exports) {
"use strict";
},{}],"7rNOE":[function(require,module,exports) {
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
// 
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var process = require("process");
function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}
// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i); else if (code === 47) /*/*/
    break; else code = 47;
    if (code === 47) /*/*/
    {
      if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || /*.*/
        res.charCodeAt(res.length - 2) !== 46) /*.*/
        {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..'; else res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i); else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && /*.*/
    dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i]; else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);
      // Skip empty entries
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath; else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var isAbsolute = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);
    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';
    if (isAbsolute) return '/' + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined) joined = arg; else joined += '/' + arg;
      }
    }
    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return '';
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return '';
    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47) /*/*/
      break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47) /*/*/
      break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) /*/*/
          {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) /*/*/
          {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break; else if (fromCode === 47) /*/*/
      lastCommonSep = i;
    }
    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) /*/*/
      {
        if (out.length === 0) out += '..'; else out += '/..';
      }
    }
    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep); else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47) /*/*/
      ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd; else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return '';
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end); else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1); else if (isAbsolute) ret.dir = '/';
    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.posix = posix;
module.exports = posix;

},{"process":"7AgFc"}],"5poxb":[function(require,module,exports) {
'use strict';

const map = require('map-iterable');
const tokenOrEmpty = require('../../utils/tokens').tokenOrEmpty;

const convertToWord = () => map(tk => {
	// TOKEN tokens are converted to WORD tokens
	if (tk.is('TOKEN')) {
		return tk.changeTokenType('WORD', tk.value);
	}

	// other tokens are amitted as-is
	return tk;
});

function start(state, source, reducers) {
	const char = source && source.shift();

	if (char === undefined) {
		return {
			nextReduction: reducers.end,
			tokensToEmit: tokenOrEmpty(state),
			nextState: state.resetCurrent().saveCurrentLocAsStart()
		};
	}

	if (state.escaping && char === '\n') {
		return {
			nextReduction: reducers.start,
			nextState: state.setEscaping(false).removeLastChar()
		};
	}

	if (!state.escaping && char === '\\') {
		return {
			nextReduction: reducers.start,
			nextState: state.setEscaping(true).appendChar(char)
		};
	}

	if (!state.escaping && char === '\'') {
		return {
			nextReduction: reducers.singleQuoting,
			nextState: state.appendChar(char)
		};
	}

	if (!state.escaping && char === '"') {
		return {
			nextReduction: reducers.doubleQuoting,
			nextState: state.appendChar(char)
		};
	}

	if (!state.escaping && char === '$') {
		return {
			nextReduction: reducers.expansionStart,
			nextState: state.appendChar(char).appendEmptyExpansion()
		};
	}

	if (!state.escaping && char === '`') {
		return {
			nextReduction: reducers.expansionCommandTick,
			nextState: state.appendChar(char).appendEmptyExpansion()
		};
	}

	return {
		nextReduction: reducers.start,
		nextState: state.appendChar(char).setEscaping(false)
	};
}

module.exports = {
	inherits: 'posix',
	init: posixMode => {
		const phaseCatalog = posixMode.phaseCatalog;
		const lexerPhases = [
			convertToWord,
			phaseCatalog.parameterExpansion,
			phaseCatalog.arithmeticExpansion,
			phaseCatalog.commandExpansion,
			phaseCatalog.tildeExpanding,
			phaseCatalog.parameterExpansion.resolve,
			phaseCatalog.commandExpansion.resolve,
			phaseCatalog.arithmeticExpansion.resolve,
			phaseCatalog.fieldSplitting.split,
			phaseCatalog.pathExpansion,
			phaseCatalog.quoteRemoval,
			phaseCatalog.defaultNodeType
		];
		const reducers = Object.assign({}, posixMode.tokenizer.reducers, {start});

		const tokenizer = () => posixMode.tokenizer({}, reducers);

		return Object.assign({}, posixMode, {lexerPhases, tokenizer});
	}
};

},{"map-iterable":"2drce","../../utils/tokens":"4SrYh"}]},["1sDb8","2X3X1"], "2X3X1", "parcelRequire65a6")

//# sourceMappingURL=main.js.map
