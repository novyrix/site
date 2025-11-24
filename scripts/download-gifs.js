const https = require('https');
const fs = require('fs');
const path = require('path');

// Create public/gifs directory if it doesn't exist
const gifsDir = path.join(process.cwd(), 'public', 'gifs');
if (!fs.existsSync(gifsDir)) {
  fs.mkdirSync(gifsDir, { recursive: true });
}

// Curated GIF URLs for service cards
const gifs = [
  {
    name: 'web-development',
    url: 'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif',
    filename: 'web-development.gif',
    description: 'Coding animation'
  },
  {
    name: 'mobile-app',
    url: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
    filename: 'mobile-app.gif',
    description: 'Mobile phone animation'
  },
  {
    name: 'automation',
    url: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
    filename: 'automation.gif',
    description: 'Robot/automation'
  },
  {
    name: 'api-integration',
    url: 'https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif',
    filename: 'api-integration.gif',
    description: 'Network connections'
  },
  {
    name: 'database',
    url: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
    filename: 'database.gif',
    description: 'Data flow'
  },
  {
    name: 'security',
    url: 'https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif',
    filename: 'security.gif',
    description: 'Security/lock'
  }
];

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
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

async function downloadAllGifs() {
  console.log('📥 Downloading GIFs...\n');

  for (const gif of gifs) {
    const destination = path.join(gifsDir, gif.filename);

    try {
      console.log(`Downloading ${gif.name} (${gif.description})...`);
      await downloadFile(gif.url, destination);
      console.log(`✅ ${gif.name} downloaded successfully`);
    } catch (error) {
      console.error(`❌ Failed to download ${gif.name}:`, error.message);
      // Continue with next gif even if one fails
    }
  }

  console.log('\n✨ GIF download complete!');
  console.log(`GIFs saved to: ${gifsDir}`);
}

// Run the download
downloadAllGifs().catch(console.error);
