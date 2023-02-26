const  { findRedundancies } = require("./lib/find-code-redundancies");
const { explainCode } = require('./lib/explain-code');

// findRedundancies('./examples');


const code = `
function read(folder) {
  fs.readdirSync(folder).forEach(file => {
    if (file.includes('ts')) {
      extractFunctionsFromFile('folder');
      console.log(map);
    } else {
      throw 'Not a valid file'
    }
  });
}



function extractFunctionsFromFile(fileName) {
  const program = ts.createProgram([fileName], {});
  const sourceFile = program.getSourceFile(fileName);

  function walk(node) {
    if (ts.isClassDeclaration(node)) {
      const className = node.name.escapedText;
      node.members.forEach(member => {
        if (ts.isMethodDeclaration(member)) {
          const methodName = member.name.escapedText;
          map[methodName] = map[methodName] ? [...map[methodName], className] : [className];
        }
      });
    }
    ts.forEachChild(node, walk);
  }

  walk(sourceFile);
}

"""`;

explainCode(code);
