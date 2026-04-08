const path = require('path');
function include(file, root) {
  const rel = path.relative(root, file);
  const excludes = ['.git', 'node_modules', 'constitution.snapshot.json', 'constitution.signature.json'];
  if (excludes.some(e => rel.includes(e))) return false;

  // Temporal Critical Set
  return rel.startsWith('state/') || 
         rel === '.anchor' || 
         rel === 'package.json' ||
         rel.endsWith('.js');
}
module.exports = { include };
