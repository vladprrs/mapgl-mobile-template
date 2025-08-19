#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all asset files
function getAllAssets() {
  const patterns = [
    'public/assets/**/*.{png,jpg,jpeg,gif,svg,ico,webp}',
    'public/icons/**/*.{png,jpg,jpeg,gif,svg,ico,webp}',
    'public/avatars/**/*.{png,jpg,jpeg,gif,svg,ico,webp}',
    'src/assets/**/*.{png,jpg,jpeg,gif,svg,ico,webp}'
  ];
  
  let allAssets = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    allAssets = allAssets.concat(files);
  });
  
  return allAssets;
}

// Get all source files to search
function getSourceFiles() {
  const patterns = [
    'src/**/*.{ts,tsx,js,jsx,css,scss,json}',
    'public/*.{html,json}',
    '*.md',
    'docs/**/*.md'
  ];
  
  let sourceFiles = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { ignore: ['node_modules/**', '.next/**'] });
    sourceFiles = sourceFiles.concat(files);
  });
  
  return sourceFiles;
}

// Extract asset references from content
function extractAssetReferences(content) {
  const references = new Set();
  
  // Pattern for various asset references
  const patterns = [
    // Direct path references
    /['"`](\/)?assets\/[^'"`\s]+['"`]/g,
    /['"`](\/)?icons\/[^'"`\s]+['"`]/g,
    /['"`](\/)?avatars\/[^'"`\s]+['"`]/g,
    
    // Just filename references (for imports)
    /['"`]([a-f0-9]{40})\.(png|jpg|jpeg|gif|svg|ico|webp)['"`]/g,
    
    // Dynamic references with template literals
    /\$\{[^}]*\}.*\.(png|jpg|jpeg|gif|svg|ico|webp)/g,
    
    // CSS url() references
    /url\(['"`]?([^'"`\)]+)['"`]?\)/g
  ];
  
  patterns.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[0]) {
        // Clean up the reference
        let ref = match[0]
          .replace(/['"`]/g, '')
          .replace(/^\//, '');
        
        // Handle special cases for dynamic references
        if (ref.includes('${')) {
          // Extract the pattern for dynamic references
          const basePattern = ref.replace(/\$\{[^}]+\}/g, '*');
          references.add(basePattern);
        } else {
          references.add(ref);
        }
      }
    }
  });
  
  return references;
}

// Check if an asset is referenced
function isAssetReferenced(assetPath, allReferences) {
  // Normalize the asset path
  const normalizedAsset = assetPath.replace(/^public\//, '');
  const filename = path.basename(assetPath);
  const hash = filename.split('.')[0];
  
  // Check various ways the asset might be referenced
  const possibleReferences = [
    normalizedAsset,
    `/${normalizedAsset}`,
    filename,
    hash,
    assetPath.replace(/^src\//, ''),
    assetPath
  ];
  
  for (const ref of possibleReferences) {
    if (allReferences.has(ref)) {
      return true;
    }
    // Check for partial matches (dynamic references)
    for (const reference of allReferences) {
      if (reference.includes('*')) {
        const pattern = new RegExp('^' + reference.replace(/\*/g, '.*') + '$');
        if (pattern.test(ref)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Get file size in MB
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Main function
function findUnusedAssets() {
  console.log('🔍 Finding unused assets...\n');
  
  // Get all assets
  const allAssets = getAllAssets();
  console.log(`Found ${allAssets.length} total asset files`);
  
  // Get all source files
  const sourceFiles = getSourceFiles();
  console.log(`Scanning ${sourceFiles.length} source files for references\n`);
  
  // Extract all references
  const allReferences = new Set();
  sourceFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const refs = extractAssetReferences(content);
    refs.forEach(ref => allReferences.add(ref));
  });
  
  console.log(`Found ${allReferences.size} unique asset references\n`);
  
  // Find unused assets
  const unusedAssets = [];
  const usedAssets = [];
  
  allAssets.forEach(asset => {
    if (isAssetReferenced(asset, allReferences)) {
      usedAssets.push(asset);
    } else {
      unusedAssets.push(asset);
    }
  });
  
  // Calculate sizes
  let totalUnusedSize = 0;
  const unusedByType = {
    png: [],
    svg: [],
    jpg: [],
    other: []
  };
  
  unusedAssets.forEach(asset => {
    const size = getFileSizeInMB(asset);
    totalUnusedSize += parseFloat(size);
    
    const ext = path.extname(asset).slice(1).toLowerCase();
    const assetInfo = { path: asset, size: size + ' MB' };
    
    if (ext === 'png') unusedByType.png.push(assetInfo);
    else if (ext === 'svg') unusedByType.svg.push(assetInfo);
    else if (ext === 'jpg' || ext === 'jpeg') unusedByType.jpg.push(assetInfo);
    else unusedByType.other.push(assetInfo);
  });
  
  // Sort by size
  Object.keys(unusedByType).forEach(type => {
    unusedByType[type].sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  });
  
  // Generate report
  let report = '# Unused Assets Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += '## Summary\n\n';
  report += `- **Total assets**: ${allAssets.length}\n`;
  report += `- **Used assets**: ${usedAssets.length}\n`;
  report += `- **Unused assets**: ${unusedAssets.length}\n`;
  report += `- **Total size to be saved**: ${totalUnusedSize.toFixed(2)} MB\n\n`;
  
  report += '## Unused Assets by Type\n\n';
  
  // PNG files
  if (unusedByType.png.length > 0) {
    report += `### PNG Files (${unusedByType.png.length} files)\n\n`;
    unusedByType.png.forEach(asset => {
      report += `- ${asset.path} (${asset.size})\n`;
    });
    report += '\n';
  }
  
  // SVG files
  if (unusedByType.svg.length > 0) {
    report += `### SVG Files (${unusedByType.svg.length} files)\n\n`;
    unusedByType.svg.forEach(asset => {
      report += `- ${asset.path} (${asset.size})\n`;
    });
    report += '\n';
  }
  
  // JPG files
  if (unusedByType.jpg.length > 0) {
    report += `### JPG/JPEG Files (${unusedByType.jpg.length} files)\n\n`;
    unusedByType.jpg.forEach(asset => {
      report += `- ${asset.path} (${asset.size})\n`;
    });
    report += '\n';
  }
  
  // Other files
  if (unusedByType.other.length > 0) {
    report += `### Other Files (${unusedByType.other.length} files)\n\n`;
    unusedByType.other.forEach(asset => {
      report += `- ${asset.path} (${asset.size})\n`;
    });
    report += '\n';
  }
  
  // Write report
  fs.writeFileSync('unused-assets.md', report);
  console.log('✅ Report generated: unused-assets.md');
  console.log(`\n📊 Summary:`);
  console.log(`   - Unused assets: ${unusedAssets.length}`);
  console.log(`   - Space to save: ${totalUnusedSize.toFixed(2)} MB`);
  
  // Create list of files to remove
  const filesList = unusedAssets.join('\n');
  fs.writeFileSync('unused-assets-list.txt', filesList);
  console.log(`   - File list saved: unused-assets-list.txt`);
}

// Run the script
findUnusedAssets();