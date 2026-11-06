import { writeFile } from "node:fs/promises";
import { CaptureKitClient } from "@capturekitdev/sdk";

const client = new CaptureKitClient({ apiKey: process.env.CAPTUREKIT_API_KEY });

const response = await client.capture({
  url: "https://example.com",
  format: "png",
});
if (response.kind === "binary") {
  await writeFile("screenshot.png", response.bytes);
  console.log(
    `Saved screenshot.png (${response.contentType}, ${response.bytes.length} bytes)`,
  );
} else {
  console.log(JSON.stringify(response.data, null, 2));
}
