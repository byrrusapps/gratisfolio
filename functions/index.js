// functions/src/index.js
const functions = require("firebase-functions/v2");
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

const app = express();

// JSON parser
app.use(express.json({ limit: "10mb" }));

// CORS config
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.130:3000",
  "https://gratisfolio.web.app",
  "https://gratisfolio.firebaseapp.com",
  "https://gratisfolio.vercel.app",
];
app.use(cors({
  origin: function (origin, callback) {a
    if (!origin) return callback(null, true); // allow curl/postman
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS blocked: ${origin}`), false);
    }
    return callback(null, true);
  },
}));

// PDF generation route
app.post("/", async (req, res) => {
  try {
    const { html } = req.body;
    if (!html) return res.status(400).json({ error: "Missing 'html'" });

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cv.pdf"',
    });
    res.send(pdfBuffer);

  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// Export as Firebase Function
exports.generateCvPdf = functions.https.onRequest({memory:"2GiB"}, app);
