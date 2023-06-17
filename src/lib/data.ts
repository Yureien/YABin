export const languageKeysByName = new Map([
	['Plain text', 'plaintext'],
	['Markup', 'markup'],
	['HTML', 'html'],
	['XML', 'xml'],
	['SVG', 'svg'],
	['MathML', 'mathml'],
	['SSML', 'ssml'],
	['Atom', 'atom'],
	['RSS', 'rss'],
	['CSS', 'css'],
	['C-like', 'clike'],
	['JavaScript', 'javascript'],
	['ABAP', 'abap'],
	['ABNF', 'abnf'],
	['ActionScript', 'actionscript'],
	['Ada', 'ada'],
	['Agda', 'agda'],
	['AL', 'al'],
	['ANTLR4', 'antlr4'],
	['Apache Configuration', 'apacheconf'],
	['Apex', 'apex'],
	['APL', 'apl'],
	['AppleScript', 'applescript'],
	['AQL', 'aql'],
	['Arduino', 'arduino'],
	['ARFF', 'arff'],
	['ARM Assembly', 'armasm'],
	['Arturo', 'arturo'],
	['AsciiDoc', 'asciidoc'],
	['ASP.NET (C#)', 'aspnet'],
	['6502 Assembly', 'asm6502'],
	['Atmel AVR Assembly', 'asmatmel'],
	['AutoHotkey', 'autohotkey'],
	['AutoIt', 'autoit'],
	['AviSynth', 'avisynth'],
	['Avro IDL', 'avro-idl'],
	['AWK', 'awk'],
	['GAWK', 'gawk'],
	['Bash', 'bash'],
	['Shell', 'sh'],
	['Shell', 'shell'],
	['BASIC', 'basic'],
	['Batch', 'batch'],
	['BBcode', 'bbcode'],
	['Shortcode', 'shortcode'],
	['BBj', 'bbj'],
	['Bicep', 'bicep'],
	['Birb', 'birb'],
	['Bison', 'bison'],
	['BNF', 'bnf'],
	['RBNF', 'rbnf'],
	['BQN', 'bqn'],
	['Brainfuck', 'brainfuck'],
	['BrightScript', 'brightscript'],
	['Bro', 'bro'],
	['BSL (1C:Enterprise)', 'bsl'],
	['OneScript', 'oscript'],
	['C', 'c'],
	['C#', 'csharp'],
	['C++', 'cpp'],
	['CFScript', 'cfscript'],
	['ChaiScript', 'chaiscript'],
	['CIL', 'cil'],
	['Cilk/C', 'cilkc'],
	['Cilk/C++', 'cilkcpp'],
	['Clojure', 'clojure'],
	['CMake', 'cmake'],
	['COBOL', 'cobol'],
	['CoffeeScript', 'coffeescript'],
	['Concurnas', 'concurnas'],
	['Content-Security-Policy', 'csp'],
	['Cooklang', 'cooklang'],
	['Coq', 'coq'],
	['Crystal', 'crystal'],
	['CSS Extras', 'css-extras'],
	['CSV', 'csv'],
	['CUE', 'cue'],
	['Cypher', 'cypher'],
	['D', 'd'],
	['Dart', 'dart'],
	['DataWeave', 'dataweave'],
	['DAX', 'dax'],
	['Dhall', 'dhall'],
	['Diff', 'diff'],
	['Django/Jinja2', 'django'],
	['DNS zone file', 'dns-zone-file'],
	['Docker', 'docker'],
	['DOT (Graphviz)', 'dot'],
	['EBNF', 'ebnf'],
	['EditorConfig', 'editorconfig'],
	['Eiffel', 'eiffel'],
	['EJS', 'ejs'],
	['Eta', 'eta'],
	['Elixir', 'elixir'],
	['Elm', 'elm'],
	['Embedded Lua templating', 'etlua'],
	['ERB', 'erb'],
	['Erlang', 'erlang'],
	['Excel Formula', 'excel-formula'],
	['F#', 'fsharp'],
	['Factor', 'factor'],
	['False', 'false'],
	['Firestore security rules', 'firestore-security-rules'],
	['Flow', 'flow'],
	['Fortran', 'fortran'],
	['FreeMarker Template Language', 'ftl'],
	['GameMaker Language', 'gml'],
	['GAP (CAS)', 'gap'],
	['G-code', 'gcode'],
	['GDScript', 'gdscript'],
	['GEDCOM', 'gedcom'],
	['gettext', 'gettext'],
	['Gherkin', 'gherkin'],
	['Git', 'git'],
	['GLSL', 'glsl'],
	['GN', 'gn'],
	['GNU Linker Script', 'linker-script'],
	['Go', 'go'],
	['Go module', 'go-module'],
	['Gradle', 'gradle'],
	['GraphQL', 'graphql'],
	['Groovy', 'groovy'],
	['Haml', 'haml'],
	['Handlebars', 'handlebars'],
	['Mustache', 'mustache'],
	['Haskell', 'haskell'],
	['Haxe', 'haxe'],
	['HCL', 'hcl'],
	['HLSL', 'hlsl'],
	['Hoon', 'hoon'],
	['HTTP', 'http'],
	['HTTP Public-Key-Pins', 'hpkp'],
	['HTTP Strict-Transport-Security', 'hsts'],
	['IchigoJam', 'ichigojam'],
	['Icon', 'icon'],
	['ICU Message Format', 'icu-message-format'],
	['Idris', 'idris'],
	['.ignore', 'ignore'],
	['.gitignore', 'gitignore'],
	['.hgignore', 'hgignore'],
	['.npmignore', 'npmignore'],
	['Inform 7', 'inform7'],
	['Ini', 'ini'],
	['Io', 'io'],
	['J', 'j'],
	['Java', 'java'],
	['JavaDoc', 'javadoc'],
	['JavaDoc-like', 'javadoclike'],
	['Java stack trace', 'javastacktrace'],
	['Jexl', 'jexl'],
	['Jolie', 'jolie'],
	['JQ', 'jq'],
	['JSDoc', 'jsdoc'],
	['JS Extras', 'js-extras'],
	['JSON', 'json'],
	['Web App Manifest', 'webmanifest'],
	['JSON5', 'json5'],
	['JSONP', 'jsonp'],
	['JS stack trace', 'jsstacktrace'],
	['JS Templates', 'js-templates'],
	['Julia', 'julia'],
	['Keepalived Configure', 'keepalived'],
	['Keyman', 'keyman'],
	['Kotlin', 'kotlin'],
	['Kotlin Script', 'kts'],
	['KuMir (КуМир)', 'kumir'],
	['Kusto', 'kusto'],
	['LaTeX', 'latex'],
	['TeX', 'tex'],
	['ConTeXt', 'context'],
	['Latte', 'latte'],
	['Less', 'less'],
	['LilyPond', 'lilypond'],
	['Liquid', 'liquid'],
	['Lisp', 'lisp'],
	['LiveScript', 'livescript'],
	['LLVM IR', 'llvm'],
	['Log file', 'log'],
	['LOLCODE', 'lolcode'],
	['Lua', 'lua'],
	['Magma (CAS)', 'magma'],
	['Makefile', 'makefile'],
	['Markdown', 'markdown'],
	['Markup templating', 'markup-templating'],
	['Mata', 'mata'],
	['MATLAB', 'matlab'],
	['MAXScript', 'maxscript'],
	['MEL', 'mel'],
	['Mermaid', 'mermaid'],
	['METAFONT', 'metafont'],
	['Mizar', 'mizar'],
	['MongoDB', 'mongodb'],
	['Monkey', 'monkey'],
	['MoonScript', 'moonscript'],
	['N1QL', 'n1ql'],
	['N4JS', 'n4js'],
	['Nand To Tetris HDL', 'nand2tetris-hdl'],
	['Naninovel Script', 'naniscript'],
	['NASM', 'nasm'],
	['NEON', 'neon'],
	['Nevod', 'nevod'],
	['nginx', 'nginx'],
	['Nim', 'nim'],
	['Nix', 'nix'],
	['NSIS', 'nsis'],
	['Objective-C', 'objectivec'],
	['OCaml', 'ocaml'],
	['Odin', 'odin'],
	['OpenCL', 'opencl'],
	['OpenQasm', 'openqasm'],
	['Oz', 'oz'],
	['PARI/GP', 'parigp'],
	['Parser', 'parser'],
	['Pascal', 'pascal'],
	['Object Pascal', 'objectpascal'],
	['Pascaligo', 'pascaligo'],
	['PATROL Scripting Language', 'psl'],
	['PC-Axis', 'pcaxis'],
	['PeopleCode', 'peoplecode'],
	['Perl', 'perl'],
	['PHP', 'php'],
	['PHPDoc', 'phpdoc'],
	['PHP Extras', 'php-extras'],
	['PlantUML', 'plant-uml'],
	['PL/SQL', 'plsql'],
	['PowerQuery', 'powerquery'],
	['PowerShell', 'powershell'],
	['Processing', 'processing'],
	['Prolog', 'prolog'],
	['PromQL', 'promql'],
	['.properties', 'properties'],
	['Protocol Buffers', 'protobuf'],
	['Pug', 'pug'],
	['Puppet', 'puppet'],
	['Pure', 'pure'],
	['PureBasic', 'purebasic'],
	['PureScript', 'purescript'],
	['Python', 'python'],
	['Q#', 'qsharp'],
	['Q (kdb+ database)', 'q'],
	['QML', 'qml'],
	['Qore', 'qore'],
	['R', 'r'],
	['Racket', 'racket'],
	['Razor C#', 'cshtml'],
	['React JSX', 'jsx'],
	['React TSX', 'tsx'],
	['Reason', 'reason'],
	['Regex', 'regex'],
	['Rego', 'rego'],
	["Ren'py", 'renpy'],
	['ReScript', 'rescript'],
	['reST (reStructuredText)', 'rest'],
	['Rip', 'rip'],
	['Roboconf', 'roboconf'],
	['Robot Framework', 'robotframework'],
	['Ruby', 'ruby'],
	['Rust', 'rust'],
	['SAS', 'sas'],
	['Sass (Sass)', 'sass'],
	['Sass (SCSS)', 'scss'],
	['Scala', 'scala'],
	['Scheme', 'scheme'],
	['Shell session', 'shell-session'],
	['Smali', 'smali'],
	['Smalltalk', 'smalltalk'],
	['Smarty', 'smarty'],
	['SML', 'sml'],
	['SML/NJ', 'smlnj'],
	['Solidity (Ethereum)', 'solidity'],
	['Solution file', 'solution-file'],
	['Soy (Closure Template)', 'soy'],
	['SPARQL', 'sparql'],
	['Splunk SPL', 'splunk-spl'],
	['SQF: Status Quo Function (Arma 3)', 'sqf'],
	['SQL', 'sql'],
	['Squirrel', 'squirrel'],
	['Stan', 'stan'],
	['Stata Ado', 'stata'],
	['Structured Text (IEC 61131-3)', 'iecst'],
	['Stylus', 'stylus'],
	['SuperCollider', 'supercollider'],
	['Swift', 'swift'],
	['Systemd configuration file', 'systemd'],
	['T4 templating', 't4-templating'],
	['T4 Text Templates (C#)', 't4-cs'],
	['T4 Text Templates (VB)', 't4-vb'],
	['TAP', 'tap'],
	['Tcl', 'tcl'],
	['Template Toolkit 2', 'tt2'],
	['Textile', 'textile'],
	['TOML', 'toml'],
	['Tremor', 'tremor'],
	['trickle', 'trickle'],
	['troy', 'troy'],
	['Turtle', 'turtle'],
	['TriG', 'trig'],
	['Twig', 'twig'],
	['TypeScript', 'typescript'],
	['TypoScript', 'typoscript'],
	['TSConfig', 'tsconfig'],
	['UnrealScript', 'unrealscript'],
	['UO Razor Script', 'uorazor'],
	['URI', 'uri'],
	['URL', 'url'],
	['V', 'v'],
	['Vala', 'vala'],
	['VB.Net', 'vbnet'],
	['Velocity', 'velocity'],
	['Verilog', 'verilog'],
	['VHDL', 'vhdl'],
	['vim', 'vim'],
	['Visual Basic', 'visual-basic'],
	['VBA', 'vba'],
	['WarpScript', 'warpscript'],
	['WebAssembly', 'wasm'],
	['Web IDL', 'web-idl'],
	['WGSL', 'wgsl'],
	['Wiki markup', 'wiki'],
	['Wolfram language', 'wolfram'],
	['Mathematica', 'mathematica'],
	['Mathematica Notebook', 'nb'],
	['Wren', 'wren'],
	['Xeora', 'xeora'],
	['XeoraCube', 'xeoracube'],
	['XML doc (.net)', 'xml-doc'],
	['Xojo (REALbasic)', 'xojo'],
	['XQuery', 'xquery'],
	['YAML', 'yaml'],
	['YANG', 'yang'],
	['Zig', 'zig']
]);

export interface LanguageData {
	ext: string;
}

// Not fully accurate, generated with (mostly) ChatGPT 4
export const languageDataByKey = new Map<string, LanguageData>([
	['plaintext', { ext: 'txt' }],
	['markup', { ext: 'txt' }],
	['html', { ext: 'html' }],
	['xml', { ext: 'xml' }],
	['svg', { ext: 'svg' }],
	['mathml', { ext: 'txt' }],
	['ssml', { ext: 'ssml' }],
	['atom', { ext: 'xml' }],
	['rss', { ext: 'xml' }],
	['css', { ext: 'css' }],
	['clike', { ext: 'txt' }],
	['javascript', { ext: 'js' }],
	['abap', { ext: 'abap' }],
	['abnf', { ext: 'txt' }],
	['actionscript', { ext: 'as' }],
	['ada', { ext: 'ada' }],
	['agda', { ext: 'agda' }],
	['al', { ext: 'al' }],
	['antlr4', { ext: 'g4' }],
	['apacheconf', { ext: 'conf' }],
	['apex', { ext: 'cls' }],
	['apl', { ext: 'apl' }],
	['applescript', { ext: 'applescript' }],
	['aql', { ext: 'txt' }],
	['arduino', { ext: 'ino' }],
	['arff', { ext: 'arff' }],
	['armasm', { ext: 's' }],
	['arturo', { ext: 'arturo' }],
	['asciidoc', { ext: 'adoc' }],
	['aspnet', { ext: 'aspx' }],
	['asm6502', { ext: 'asm' }],
	['asmatmel', { ext: 'txt' }],
	['autohotkey', { ext: 'ahk' }],
	['autoit', { ext: 'au3' }],
	['avisynth', { ext: 'avs' }],
	['avro-idl', { ext: 'avdl' }],
	['awk', { ext: 'awk' }],
	['gawk', { ext: 'awk' }],
	['bash', { ext: 'sh' }],
	['shell', { ext: 'sh' }],
	['basic', { ext: 'bas' }],
	['batch', { ext: 'bat' }],
	['bbcode', { ext: 'txt' }],
	['shortcode', { ext: 'txt' }],
	['bbj', { ext: 'bbj' }],
	['bicep', { ext: 'bicep' }],
	['birb', { ext: 'birb' }],
	['bison', { ext: 'y' }],
	['bnf', { ext: 'txt' }],
	['rbnf', { ext: 'txt' }],
	['bqn', { ext: 'bqn' }],
	['brainfuck', { ext: 'bf' }],
	['brightscript', { ext: 'brs' }],
	['bro', { ext: 'bro' }],
	['bsl', { ext: 'bsl' }],
	['oscript', { ext: 'os' }],
	['c', { ext: 'c' }],
	['csharp', { ext: 'cs' }],
	['cpp', { ext: 'cpp' }],
	['cfscript', { ext: 'cfc' }],
	['chaiscript', { ext: 'chai' }],
	['cil', { ext: 'cil' }],
	['cilkc', { ext: 'txt' }],
	['cilkcpp', { ext: 'txt' }],
	['clojure', { ext: 'clj' }],
	['cmake', { ext: 'txt' }],
	['cobol', { ext: 'cbl' }],
	['coffeescript', { ext: 'coffee' }],
	['concurnas', { ext: 'conc' }],
	['csp', { ext: 'txt' }],
	['cooklang', { ext: 'ckl' }],
	['coq', { ext: 'v' }],
	['crystal', { ext: 'cr' }],
	['css-extras', { ext: 'css' }],
	['csv', { ext: 'csv' }],
	['cue', { ext: 'cue' }],
	['cypher', { ext: 'cyp' }],
	['d', { ext: 'd' }],
	['dart', { ext: 'dart' }],
	['dataweave', { ext: 'dwl' }],
	['dax', { ext: 'txt' }],
	['dhall', { ext: 'dhall' }],
	['diff', { ext: 'diff' }],
	['django', { ext: 'py' }],
	['dns-zone-file', { ext: 'zone' }],
	['docker', { ext: 'dockerfile' }],
	['dot', { ext: 'dot' }],
	['ebnf', { ext: 'ebnf' }],
	['editorconfig', { ext: 'editorconfig' }],
	['eiffel', { ext: 'e' }],
	['ejs', { ext: 'ejs' }],
	['eta', { ext: 'eta' }],
	['elixir', { ext: 'ex' }],
	['elm', { ext: 'elm' }],
	['etlua', { ext: 'lua' }],
	['erb', { ext: 'erb' }],
	['erlang', { ext: 'erl' }],
	['excel-formula', { ext: 'xlsx' }],
	['fsharp', { ext: 'fs' }],
	['factor', { ext: 'factor' }],
	['false', { ext: 'fls' }],
	['firestore-security-rules', { ext: 'rules' }],
	['flow', { ext: 'txt' }],
	['fortran', { ext: 'f' }],
	['ftl', { ext: 'ftl' }],
	['gml', { ext: 'gml' }],
	['gap', { ext: 'g' }],
	['gcode', { ext: 'gcode' }],
	['gdscript', { ext: 'gd' }],
	['gedcom', { ext: 'ged' }],
	['gettext', { ext: 'po' }],
	['gherkin', { ext: 'feature' }],
	['git', { ext: 'txt' }],
	['glsl', { ext: 'glsl' }],
	['gn', { ext: 'gn' }],
	['linker-script', { ext: 'lds' }],
	['go', { ext: 'go' }],
	['go-module', { ext: 'mod' }],
	['gradle', { ext: 'gradle' }],
	['graphql', { ext: 'graphql' }],
	['groovy', { ext: 'groovy' }],
	['haml', { ext: 'haml' }],
	['handlebars', { ext: 'hbs' }],
	['mustache', { ext: 'mustache' }],
	['haskell', { ext: 'hs' }],
	['haxe', { ext: 'hx' }],
	['hcl', { ext: 'hcl' }],
	['hlsl', { ext: 'hlsl' }],
	['hoon', { ext: 'hoon' }],
	['http', { ext: 'http' }],
	['hpkp', { ext: 'txt' }],
	['hsts', { ext: 'txt' }],
	['ichigojam', { ext: 'txt' }],
	['icon', { ext: 'icn' }],
	['icu-message-format', { ext: 'txt' }],
	['idris', { ext: 'idr' }],
	['ignore', { ext: 'ignore' }],
	['gitignore', { ext: 'gitignore' }],
	['hgignore', { ext: 'hgignore' }],
	['npmignore', { ext: 'npmignore' }],
	['inform7', { ext: 'ni' }],
	['ini', { ext: 'ini' }],
	['io', { ext: 'io' }],
	['j', { ext: 'ijs' }],
	['java', { ext: 'java' }],
	['javadoc', { ext: 'txt' }],
	['javadoclike', { ext: 'txt' }],
	['javastacktrace', { ext: 'txt' }],
	['jexl', { ext: 'txt' }],
	['jolie', { ext: 'ol' }],
	['jq', { ext: 'jq' }],
	['jsdoc', { ext: 'txt' }],
	['js-extras', { ext: 'txt' }],
	['json', { ext: 'json' }],
	['webmanifest', { ext: 'webmanifest' }],
	['json5', { ext: 'json5' }],
	['jsonp', { ext: 'txt' }],
	['jsstacktrace', { ext: 'txt' }],
	['js-templates', { ext: 'txt' }],
	['julia', { ext: 'jl' }],
	['keepalived', { ext: 'conf' }],
	['keyman', { ext: 'kmn' }],
	['kotlin', { ext: 'kt' }],
	['kts', { ext: 'kts' }],
	['kumir', { ext: 'kum' }],
	['kusto', { ext: 'csl' }],
	['latex', { ext: 'tex' }],
	['tex', { ext: 'tex' }],
	['context', { ext: 'tex' }],
	['latte', { ext: 'latte' }],
	['less', { ext: 'less' }],
	['lilypond', { ext: 'ly' }],
	['liquid', { ext: 'liquid' }],
	['lisp', { ext: 'lisp' }],
	['livescript', { ext: 'ls' }],
	['llvm', { ext: 'll' }],
	['log', { ext: 'log' }],
	['lolcode', { ext: 'lol' }],
	['lua', { ext: 'lua' }],
	['magma', { ext: 'magma' }],
	['makefile', { ext: 'make' }],
	['markdown', { ext: 'md' }],
	['markup-templating', { ext: 'txt' }],
	['mata', { ext: 'ado' }],
	['matlab', { ext: 'm' }],
	['maxscript', { ext: 'ms' }],
	['mel', { ext: 'mel' }],
	['mermaid', { ext: 'mmd' }],
	['metafont', { ext: 'mf' }],
	['mizar', { ext: 'miz' }],
	['mongodb', { ext: 'txt' }],
	['monkey', { ext: 'monkey' }],
	['moonscript', { ext: 'moon' }],
	['n1ql', { ext: 'txt' }],
	['n4js', { ext: 'n4js' }],
	['nand2tetris-hdl', { ext: 'hdl' }],
	['naniscript', { ext: 'nani' }],
	['nasm', { ext: 'asm' }],
	['neon', { ext: 'neon' }],
	['nevod', { ext: 'txt' }],
	['nginx', { ext: 'conf' }],
	['nim', { ext: 'nim' }],
	['nix', { ext: 'nix' }],
	['nsis', { ext: 'nsi' }],
	['objectivec', { ext: 'm' }],
	['ocaml', { ext: 'ml' }],
	['odin', { ext: 'odin' }],
	['opencl', { ext: 'cl' }],
	['openqasm', { ext: 'qasm' }],
	['oz', { ext: 'oz' }],
	['parigp', { ext: 'gp' }],
	['parser', { ext: 'txt' }],
	['pascal', { ext: 'pas' }],
	['objectpascal', { ext: 'pas' }],
	['pascaligo', { ext: 'ligo' }],
	['psl', { ext: 'psl' }],
	['pcaxis', { ext: 'txt' }],
	['peoplecode', { ext: 'ppl' }],
	['perl', { ext: 'pl' }],
	['php', { ext: 'php' }],
	['phpdoc', { ext: 'txt' }],
	['php-extras', { ext: 'txt' }],
	['plant-uml', { ext: 'txt' }],
	['plsql', { ext: 'pls' }],
	['powerquery', { ext: 'txt' }],
	['powershell', { ext: 'ps1' }],
	['processing', { ext: 'pde' }],
	['prolog', { ext: 'pl' }],
	['promql', { ext: 'promql' }],
	['properties', { ext: 'properties' }],
	['protobuf', { ext: 'proto' }],
	['pug', { ext: 'pug' }],
	['puppet', { ext: 'pp' }],
	['pure', { ext: 'pure' }],
	['purebasic', { ext: 'pb' }],
	['purescript', { ext: 'purs' }],
	['python', { ext: 'py' }],
	['qsharp', { ext: 'qs' }],
	['q', { ext: 'q' }],
	['qml', { ext: 'qml' }],
	['qore', { ext: 'q' }],
	['r', { ext: 'r' }],
	['racket', { ext: 'rkt' }],
	['cshtml', { ext: 'cshtml' }],
	['jsx', { ext: 'jsx' }],
	['tsx', { ext: 'tsx' }],
	['reason', { ext: 're' }],
	['regex', { ext: 'regex' }],
	['rego', { ext: 'rego' }],
	['renpy', { ext: 'rpy' }],
	['rescript', { ext: 'res' }],
	['rest', { ext: 'txt' }],
	['rip', { ext: 'rip' }],
	['roboconf', { ext: 'txt' }],
	['robotframework', { ext: 'robot' }],
	['ruby', { ext: 'rb' }],
	['rust', { ext: 'rs' }],
	['sas', { ext: 'sas' }],
	['sass', { ext: 'sass' }],
	['scss', { ext: 'scss' }],
	['scala', { ext: 'scala' }],
	['scheme', { ext: 'scm' }],
	['shell-session', { ext: 'txt' }],
	['smali', { ext: 'smali' }],
	['smalltalk', { ext: 'st' }],
	['smarty', { ext: 'tpl' }],
	['sml', { ext: 'sml' }],
	['smlnj', { ext: 'sml' }],
	['solidity', { ext: 'sol' }],
	['solution-file', { ext: 'sln' }],
	['soy', { ext: 'soy' }],
	['sparql', { ext: 'rq' }],
	['splunk-spl', { ext: 'spl' }],
	['sqf', { ext: 'sqf' }],
	['sql', { ext: 'sql' }],
	['squirrel', { ext: 'nut' }],
	['stan', { ext: 'stan' }],
	['stata', { ext: 'do' }],
	['iecst', { ext: 'st' }],
	['stylus', { ext: 'styl' }],
	['supercollider', { ext: 'sc' }],
	['swift', { ext: 'swift' }],
	['systemd', { ext: 'service' }],
	['t4-templating', { ext: 't4' }],
	['t4-cs', { ext: 't4' }],
	['t4-vb', { ext: 't4' }],
	['tap', { ext: 'tap' }],
	['tcl', { ext: 'tcl' }],
	['tt2', { ext: 'tt2' }],
	['textile', { ext: 'textile' }],
	['toml', { ext: 'toml' }],
	['tremor', { ext: 'trickle' }],
	['trickle', { ext: 'trickle' }],
	['troy', { ext: 'troy' }],
	['turtle', { ext: 'ttl' }],
	['trig', { ext: 'trig' }],
	['twig', { ext: 'twig' }],
	['typescript', { ext: 'ts' }],
	['typoscript', { ext: 'ts' }],
	['tsconfig', { ext: 'json' }],
	['unrealscript', { ext: 'uc' }],
	['uorazor', { ext: 'txt' }],
	['uri', { ext: 'uri' }],
	['url', { ext: 'url' }],
	['v', { ext: 'v' }],
	['vala', { ext: 'vala' }],
	['vbnet', { ext: 'vb' }],
	['velocity', { ext: 'vm' }],
	['verilog', { ext: 'v' }],
	['vhdl', { ext: 'vhd' }],
	['vim', { ext: 'vim' }],
	['visual-basic', { ext: 'vb' }],
	['vba', { ext: 'bas' }],
	['warpscript', { ext: 'warpscript' }],
	['wasm', { ext: 'wasm' }],
	['web-idl', { ext: 'idl' }],
	['wgsl', { ext: 'wgsl' }],
	['wiki', { ext: 'wiki' }],
	['wolfram', { ext: 'wl' }],
	['mathematica', { ext: 'nb' }],
	['nb', { ext: 'nb' }],
	['wren', { ext: 'wren' }],
	['xeora', { ext: 'x' }],
	['xeoracube', { ext: 'txt' }],
	['xml-doc', { ext: 'xml' }],
	['xojo', { ext: 'xojo_code' }],
	['xquery', { ext: 'xq' }],
	['yaml', { ext: 'yml' }],
	['yang', { ext: 'yang' }],
	['zig', { ext: 'zig' }]
]);
