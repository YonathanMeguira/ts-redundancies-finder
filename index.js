const  { findRedundancies } = require("./lib/find-code-redundancies");
const { explainCode } = require('./lib/explain-code');

// findRedundancies('./examples');


const badCode = `
function buildTree(data, isChild = false) {
  let html = '<ul>'
  data.forEach(element => {
    html += "coucou"
    // If te current data element
    // has children then call the 
    // buildTree again passing in
    // the children and isChild = true
    if(d.children) {
      html += buildTree(d.children, true)
    }
  });
  html += '</ul>'
  return html
}

let uls = buildTree(data);
console.log(uls);

"""`;

explainCode(badCode);
