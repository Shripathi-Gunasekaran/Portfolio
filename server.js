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

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valParts] = trimmed.split('=');
        const val = valParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    });
  }
}
loadEnv();

async function sendContactEmail(payload) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const toAddress = process.env.EMAIL_TO || user || 'shrisekar3@gmail.com';

  if (!nodemailer || !host || !user || !pass || !toAddress) {
    return { status: 'saved-only' };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user,
      pass
    },
    tls: { rejectUnauthorized: false }
  });

  await transporter.sendMail({
    from: user,
    to: toAddress,
    replyTo: payload.email,
    subject: `Project Enquiry for Shri Pathi G — ${payload.service || payload.subject || 'General Collaboration'}`,
    text: `Hello Shri Pathi,\n\n${payload.name} has submitted a new project enquiry through your portfolio.\n\nCONTACT DETAILS\nName: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.phone || 'Not provided'}\nService requested: ${payload.service || 'General enquiry'}\n\nMESSAGE\n${payload.message}\n\nPlease reply directly to this email to continue the conversation.\n\n— Shri Pathi G Portfolio Contact System`
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

function createAppServer() {
  return http.createServer(async (req, res) => {
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
        const phone = String(payload.phone || '').trim();
        const service = String(payload.service || '').trim();
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
          phone,
          service,
          subject: subject || (service ? `Service Request: ${service}` : 'Portfolio contact message'),
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

    // ── Interview Appointment Endpoint ──────────────────────────────────
    if (req.method === 'POST' && url.pathname === '/api/interview') {
      try {
        const d = await parseBody(req);
        const name    = String(d.name    || '').trim();
        const email   = String(d.email   || '').trim();
        const company = String(d.company || '').trim();
        const role    = String(d.role    || '').trim();
        const date    = String(d.date    || '').trim();
        const time    = String(d.time    || '').trim();
        const mode    = String(d.mode    || 'Google Meet').trim();
        const meetingLink = String(d.meetingLink || '').trim();

        if (!name || !email || !company || !role || !date || !time) {
          sendJson(res, 400, { success: false, message: 'Required fields missing.' });
          return;
        }

        const appointmentTime = new Date(`${date}T${time}:00`);
        if (Number.isNaN(appointmentTime.getTime()) || appointmentTime <= new Date()) {
          sendJson(res, 400, { success: false, message: 'Interview date and time must be in the future.' });
          return;
        }

        const onlineModes = ['Google Meet', 'Zoom', 'Microsoft Teams'];
        if (onlineModes.includes(mode) && !meetingLink) {
          sendJson(res, 400, { success: false, message: `${mode} interviews require a meeting link.` });
          return;
        }
        if (mode === 'In Person' && !meetingLink) {
          sendJson(res, 400, { success: false, message: 'In-person interviews require a venue.' });
          return;
        }
        if (meetingLink && onlineModes.includes(mode)) {
          try {
            const link = new URL(meetingLink);
            if (!['http:', 'https:'].includes(link.protocol) || !link.hostname.includes('.')) throw new Error('invalid');
          } catch (_) {
            sendJson(res, 400, { success: false, message: 'Meeting link must be a complete http or https URL.' });
            return;
          }
        }

        // Save to interviews.json
        const interviewFile = path.join(DATA_DIR, 'interviews.json');
        ensureDataFile();
        let interviews = [];
        try { interviews = JSON.parse(fs.readFileSync(interviewFile, 'utf8') || '[]'); } catch (_) {}
        const record = { id: crypto.randomUUID(), ...d, createdAt: new Date().toISOString() };
        interviews.push(record);
        fs.writeFileSync(interviewFile, JSON.stringify(interviews, null, 2), 'utf8');

        // Send email if SMTP is configured
        let emailResult = 'saved-only';
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
        const emailTo  = process.env.EMAIL_TO || smtpUser || 'shrisekar3@gmail.com';

        if (nodemailer && smtpHost && smtpUser && smtpPass) {
          try {
            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: Number(process.env.SMTP_PORT || 587),
              secure: Number(process.env.SMTP_PORT) === 465,
              auth: { user: smtpUser, pass: smtpPass },
              tls: { rejectUnauthorized: false }
            });

            const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#0e1014;color:#fff;margin:0;padding:0}
  .wrap{max-width:580px;margin:0 auto;background:#181b22;border-radius:12px;overflow:hidden;border-top:4px solid #e8394a}
  .header{background:#e8394a;padding:28px 32px;text-align:center}
  .header h1{margin:0;font-size:22px;color:#fff;font-weight:800;letter-spacing:0.5px}
  .header p{margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px}
  .body{padding:28px 32px}
  .row{display:flex;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:14px}
  .label{color:#949cae;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;min-width:130px;padding-top:2px}
  .value{color:#fff;font-size:14px;line-height:1.5}
  .footer{background:#14171e;padding:18px 32px;text-align:center;font-size:12px;color:#5a6275;border-top:1px solid rgba(255,255,255,0.06)}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>📅 Scheduled Interview for Shri Pathi G</h1>
    <p>${name} from ${company} has requested an interview</p>
  </div>
  <div class="body">
    <div class="row"><div class="label">Name</div><div class="value">${name}</div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${email}" style="color:#e8394a">${email}</a></div></div>
    <div class="row"><div class="label">Company</div><div class="value">${company}</div></div>
    <div class="row"><div class="label">Role</div><div class="value">${role}</div></div>
    <div class="row"><div class="label">Date</div><div class="value">${date}</div></div>
    <div class="row"><div class="label">Time</div><div class="value">${time}</div></div>
    <div class="row"><div class="label">Duration</div><div class="value">${d.duration || 60} minutes</div></div>
    <div class="row"><div class="label">Mode</div><div class="value">${d.mode || 'Google Meet'}</div></div>
    ${d.meetingLink ? `<div class="row"><div class="label">${d.mode === 'In Person' ? 'Venue' : 'Meeting Link'}</div><div class="value">${d.mode === 'In Person' ? d.meetingLink : `<a href="${d.meetingLink}" style="color:#e8394a">${d.meetingLink}</a>`}</div></div>` : ''}
    ${d.notes ? `<div class="row"><div class="label">Notes</div><div class="value">${d.notes}</div></div>` : ''}
  </div>
  <div class="footer">Portfolio Interview System &nbsp;•&nbsp; Shri Pathi G</div>
</div>
</body>
</html>`;

            await transporter.sendMail({
              from: `"Portfolio Interview" <${smtpUser}>`,
              to: emailTo,
              replyTo: email,
              subject: `Scheduled Interview for Shri Pathi G — ${role} at ${company}`,
              html: htmlBody,
              text: `SCHEDULED INTERVIEW FOR SHRI PATHI G\n\nHello Shri Pathi, ${name} from ${company} has requested an interview.\n\nAPPOINTMENT DETAILS\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nRole: ${role}\nDate: ${date}\nTime: ${time}\nDuration: ${d.duration || 60} minutes\nMode: ${d.mode || 'Google Meet'}\n${d.mode === 'In Person' ? 'Venue' : 'Meeting link'}: ${d.meetingLink || 'Not provided'}\nNotes: ${d.notes || 'None'}\n\nPlease review the details and reply directly to the employer if any changes are needed.\n\n— Shri Pathi G Interview Scheduling System`
            });
            emailResult = 'email-sent';
            console.log(`✅ Interview email sent for ${name} (${company})`);
          } catch (mailErr) {
            console.error('Interview email failed:', mailErr.message);
            emailResult = 'email-failed';
          }
        }

        sendJson(res, 200, { success: true, delivery: emailResult });
      } catch (err) {
        console.error('Interview API error:', err.message);
        sendJson(res, 500, { success: false, message: 'Server error.' });
      }
      return;
    }


    let cleanUrl;
    try {
      cleanUrl = decodeURIComponent(url.pathname.split('?')[0]);
    } catch (_) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Invalid URL');
      return;
    }
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
}

function startServer(portToTry) {
  const server = createAppServer();

  server.listen(portToTry, () => {
    console.log(`Portfolio server running at http://localhost:${portToTry}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} in use, trying ${portToTry + 1}...`);
      startServer(portToTry + 1);
      return;
    }

    console.error(err);
  });
}

ensureDataFile();
startServer(PORT);
