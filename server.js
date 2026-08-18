const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const MESSAGE_FILE = path.join(DATA_DIR, 'messages.json');

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (error) {
  nodemailer = null;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(MESSAGE_FILE)) {
    fs.writeFileSync(MESSAGE_FILE, '[]', 'utf8');
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1e6) {
        req.destroy();
        reject(new Error('Request too large'));
      }
    });

    req.on('end', () => {
      try {
        if (!raw) {
          resolve({});
          return;
        }

        const contentType = req.headers['content-type'] || '';

        if (contentType.includes('application/json')) {
          resolve(JSON.parse(raw));
          return;
        }

        const params = new URLSearchParams(raw);
        const obj = Object.fromEntries(params.entries());
        resolve(obj);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function readMessages() {
  ensureDataFile();
  try {
    const json = fs.readFileSync(MESSAGE_FILE, 'utf8') || '[]';
    return JSON.parse(json);
  } catch (error) {
    return [];
  }
}

function writeMessages(messages) {
  ensureDataFile();
  fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages, null, 2), 'utf8');
}

async function sendContactEmail(payload) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toAddress = process.env.EMAIL_TO || user;

  if (!nodemailer || !host || !user || !pass || !toAddress) {
    return { status: 'saved-only' };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from: user,
    to: toAddress,
    replyTo: payload.email,
    subject: payload.subject || 'Portfolio contact message',
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
  });

  return { status: 'email-sent' };
}

function sendFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    const headers = { 'Content-Type': type };

    if (ext === '.pdf') {
      const filename = path.basename(filePath);
      headers['Content-Disposition'] = `attachment; filename="${filename}"`;
    }

    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    try {
      const payload = await parseBody(req);
      const name = String(payload.name || '').trim();
      const email = String(payload.email || '').trim();
      const subject = String(payload.subject || '').trim();
      const message = String(payload.message || '').trim();

      if (!name || !email || !message) {
        sendJson(res, 400, {
          success: false,
          message: 'Name, email, and message are required.'
        });
        return;
      }

      ensureDataFile();
      const messages = readMessages();
      const record = {
        id: crypto.randomUUID(),
        name,
        email,
        subject: subject || 'Portfolio contact message',
        message,
        createdAt: new Date().toISOString()
      };

      messages.push(record);
      writeMessages(messages);

      try {
        const emailResult = await sendContactEmail(record);
        sendJson(res, 200, {
          success: true,
          message: 'Your message has been sent successfully.',
          delivery: emailResult.status
        });
      } catch (error) {
        console.error('Email delivery failed:', error.message);
        sendJson(res, 200, {
          success: true,
          message: 'Your message has been saved successfully.',
          delivery: 'saved-only'
        });
      }
    } catch (error) {
      console.error('Contact submission error:', error.message);
      sendJson(res, 500, {
        success: false,
        message: 'Something went wrong while sending your message.'
      });
    }
    return;
  }

  const cleanUrl = url.pathname.split('?')[0];
  const requestPath = cleanUrl === '/' ? '/index.html' : cleanUrl;
  const normalized = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(ROOT, normalized);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    sendFile(filePath, res);
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`Portfolio server running at http://localhost:${portToTry}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} in use, trying ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error(err);
    }
  });
}

ensureDataFile();
startServer(PORT);