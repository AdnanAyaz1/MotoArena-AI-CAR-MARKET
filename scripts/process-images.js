const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const outputDir = path.join(publicDir, 'cars');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all ChatGPT images
const chatgptFiles = fs.readdirSync(publicDir).filter(f => f.startsWith('ChatGPT'));

// Car names for the images (we have 14 ChatGPT images + 5 already split)
const carNames = [
  'ferrari-sf90', 'mclaren-720s', 'porsche-911-gt3', 'lamborghini-aventador',
  'aston-martin-db12', 'rolls-royce-ghost', 'bugatti-chiron', 'mclaren-750s',
  'porsche-cayenne', 'mercedes-amg-gt', 'toyota-supra', 'honda-civic-type-r',
  'hyundai-ioniq-5', 'rivian-r1t'
];

async function processImages() {
  console.log(`Found ${chatgptFiles.length} ChatGPT images to process`);
  
  for (let i = 0; i < chatgptFiles.length; i++) {
    const file = chatgptFiles[i];
    const carName = carNames[i] || `car-${i + 1}`;
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(outputDir, `${carName}.png`);
    
    try {
      await sharp(inputPath)
        .resize(1200, 800, { fit: 'cover' })
        .png({ quality: 90 })
        .toFile(outputPath);
      
      console.log(`Processed: ${file} -> ${carName}.png`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  // Also copy existing split images to cars folder
  const existingImages = ['audi-rs-e-tron-gt.png', 'bentley-continental-gt.png', 'bmw-m8.png', 'lexus-lc-500.png', 'maserati-levante.png'];
  
  for (const img of existingImages) {
    const srcPath = path.join(publicDir, img);
    const destPath = path.join(outputDir, img);
    
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${img}`);
    }
  }
  
  console.log('Image processing complete!');
  console.log('Images saved to:', outputDir);
}

processImages().catch(console.error);
