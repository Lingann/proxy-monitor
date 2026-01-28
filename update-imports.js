const fs = require('fs');
const path = require('path');

const demosDir = 'apps/balnc-nova-ui-docs/demos';

function updateImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      updateImports(fullPath);
    } else if (file.name.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/components\/bn-form'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/components\/bn-input'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/components\/bn-select'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/components\/bn-select-item'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/components\/bn-form'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/components\/bn-input'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/\.\.\/components\/bn-select'/g, "from '@balnc-nova-ui/core'");
      content = content.replace(/from '\.\.\/\.\.\/components\/demo-container'/g, "from '@gl/vitepress-demo-container'");
      
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`Updated: ${fullPath}`);
    }
  }
}

updateImports(demosDir);
console.log('Done!');
