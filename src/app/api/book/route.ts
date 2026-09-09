import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, phone, requirements } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const leadData = {
      timestamp: new Date().toISOString(),
      name: String(name).trim(),
      company: String(company || "").trim(),
      phone: String(phone).trim(),
      requirements: String(requirements || "").trim(),
    };

    // 1. Local backup JSON storage
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          leads = JSON.parse(content);
        } catch {
          leads = [];
        }
      }
      leads.push(leadData);
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
    } catch (err) {
      console.error("Local lead save error:", err);
    }

    // 2. Google Sheets Webhook Integration
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const gResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(leadData),
          redirect: "follow",
        });

        const respText = await gResponse.text();
        console.log("Google Sheets Webhook response status:", gResponse.status, respText.substring(0, 150));
      } catch (webhookErr) {
        console.error("Google Sheets Webhook dispatch failed:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your booking request has been submitted successfully! We will get in touch soon.",
      lead: leadData,
    });
  } catch (error) {
    console.error("API /api/book error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving your request." },
      { status: 500 }
    );
  }
}
