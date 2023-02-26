const fs = require('fs');
const ts = require('typescript');


let map = {};


function read(folder) {
  fs.readdirSync(folder).forEach(file => {
    if (file.includes('ts')) {
      extractFunctionsFromFile(`${folder}/${file}`);
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


function findDoubles() {
  const doubles = Object.keys(map).filter(key => map[key].length > 1);
  console.log(`Here are the Doubles: ${doubles}`);
}

function findRedundancies(directory) {
    read(directory);
    findDoubles();
} 

module.exports = {findRedundancies}