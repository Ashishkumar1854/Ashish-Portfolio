const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // We want to remove blocks of commented out code.
  // A simple heuristic: if a line starts with `// import`, `// const`, `// export`, 
  // or it's just `// ` followed by code-like syntax (or just `//` empty), we remove it.
  // Actually, since these files were appended to, there's a huge block of `// ...` lines at the top.
  // Let's remove any line that starts with `//` and has code keywords, OR is part of a contiguous block of such lines.
  // Simplest approach: just remove all lines matching `^\s*\/\/\s*` that don't look like purely english text, 
  // or just remove all `^\s*\/\/` lines completely since the user wants commented code removed.
  // Let's remove ALL lines starting with `//` except those containing `eslint-disable`.
  
  const lines = content.split('\n');
  const cleaned = lines.filter(line => {
    if (line.match(/^\s*\/\//)) {
      if (line.includes('eslint-disable') || line.includes('TODO')) {
        return true; // keep
      }
      return false; // remove commented line
    }
    return true;
  });

  content = cleaned.join('\n');
  
  // Also remove multi-line comments /* ... */
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      cleanFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'frontend/src'));
console.log('Cleanup complete.');
