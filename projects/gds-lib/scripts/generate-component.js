const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('especifica el nombre del componente. Ejemplo: npm run gc mi-componente');
  process.exit(1);
}

console.log(`Generando componente: ${componentName}`);