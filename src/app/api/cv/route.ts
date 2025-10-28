// app/api/cv/route.ts
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { html } = await req.json();

    const genCv = async () => {

      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
      });

      await browser.close();
      return pdf;

    };

    const pdf = await genCv();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="cv.pdf"',
      },
    });

  } catch (err: any) {

    console.error("PDF generation failed:", err);

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
    
  }
}
