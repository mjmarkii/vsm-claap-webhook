import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("Received Claap webhook payload:", payload);

    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Generate filename using eventId and timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const eventId = payload?.eventId || "unknown";
    const filename = `${eventId}_${timestamp}.json`;
    const filePath = path.join(logsDir, filename);

    // Write payload to file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");

    console.log(`Payload saved to: ${filePath}`);

    return NextResponse.json(
      { message: "Webhook received and logged successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing Claap webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
