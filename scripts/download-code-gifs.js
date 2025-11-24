const https = require('https');
const fs = require('fs');
const path = require('path');

// Create public/gifs directory if it doesn't exist
const gifsDir = path.join(process.cwd(), 'public', 'gifs');
if (!fs.existsSync(gifsDir)) {
  fs.mkdirSync(gifsDir, { recursive: true });
}

// Updated GIF URLs - code-focused animations
const gifs = [
  {
    name: 'web-development',
    url: 'https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif',
    filename: 'web-development.gif',
    description: 'Code typing animation'
  },
  {
    name: 'api-integration',
    url: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
    filename: 'api-integration.gif',
    description: 'Code/API connections'
  },
  {
    name: 'automation',
    url: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
    filename: 'automation.gif',
    description: 'Code workflow automation'
  },
  {
    name: 'security',
    url: 'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
    filename: 'security.gif',
    description: 'Security code/encryption'
  },
  {
    name: 'mobile-app',
    url: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
    filename: 'mobile-app.gif',
    description: 'Mobile phone animation'
  },
  {
    name: 'database',
    url: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    filename: 'database.gif',
    description: 'Data flow'
  }
];

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, destination).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

async function downloadCodeGifs() {
  console.log('📥 Downloading code-focused GIFs...\n');

  for (const gif of gifs) {
    const destination = path.join(gifsDir, gif.filename);

    try {
      console.log(`Downloading ${gif.name} (${gif.description})...`);
      await downloadFile(gif.url, destination);
      console.log(`✅ ${gif.name} downloaded successfully`);
    } catch (error) {
      console.error(`❌ Failed to download ${gif.name}:`, error.message);
    }
  }

  console.log('\n✨ Code GIF download complete!');
  console.log(`GIFs saved to: ${gifsDir}`);
}

downloadCodeGifs().catch(console.error);
