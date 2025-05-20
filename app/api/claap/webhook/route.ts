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

    // Get recording details from payload
    const recording = payload?.event?.recording;
    const recordingId = recording?.id || "unknown";
    const channelName =
      recording?.channel?.name?.replace(/[^a-z0-9]/gi, "_") ||
      "unknown_channel";

    // Get today's date in YYYYMMDD format
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

    // Generate filename using recording ID, channel name, and date
    const filename = `${recordingId}_${channelName}_${today}.json`;
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
