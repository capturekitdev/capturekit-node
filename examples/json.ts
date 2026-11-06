import { CaptureKitClient } from "@capturekitdev/sdk";

const client = new CaptureKitClient({ apiKey: process.env.CAPTUREKIT_API_KEY });

const response = await client.content({ url: "https://example.com" });
console.log(JSON.stringify(response.data, null, 2));
