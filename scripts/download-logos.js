const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create public/logos directory if it doesn't exist
const logosDir = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Logo URLs to download
const logos = [
  {
    name: 'mpesa',
    url: 'https://www.safaricom.co.ke/images/Safaricom_M-PESA_logo.png',
    filename: 'mpesa.png'
  },
  {
    name: 'kra',
    url: 'https://www.kra.go.ke/images/kra-logo.png',
    filename: 'kra.png'
  },
  // Fallback: High-quality CDN logos
  {
    name: 'nextjs',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    filename: 'nextjs.svg'
  },
  {
    name: 'react',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    filename: 'react.svg'
  },
  {
    name: 'nodejs',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    filename: 'nodejs.svg'
  },
  {
    name: 'typescript',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    filename: 'typescript.svg'
  },
  {
    name: 'postgresql',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    filename: 'postgresql.svg'
  },
  {
    name: 'docker',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    filename: 'docker.svg'
  },
  {
    name: 'aws',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    filename: 'aws.svg'
  }
];

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destination);

    protocol.get(url, (response) => {
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

async function downloadAllLogos() {
  console.log('📥 Downloading logos...\n');

  for (const logo of logos) {
    const destination = path.join(logosDir, logo.filename);

    try {
      console.log(`Downloading ${logo.name}...`);
      await downloadFile(logo.url, destination);
      console.log(`✅ ${logo.name} downloaded successfully`);
    } catch (error) {
      console.error(`❌ Failed to download ${logo.name}:`, error.message);
      // Continue with next logo even if one fails
    }
  }

  console.log('\n✨ Logo download complete!');
  console.log(`Logos saved to: ${logosDir}`);
}

// Run the download
downloadAllLogos().catch(console.error);
