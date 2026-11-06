import { CaptureKitClient } from "@capturekitdev/sdk";

const client = new CaptureKitClient({ apiKey: process.env.CAPTUREKIT_API_KEY });

const submitted = await client.content({
  url: "https://example.com",
  is_async: true,
});
const job = await client.waitForJob(submitted.data.job_id, {
  onProgress: (j) => console.log(`${j.status} ${j.progress ?? 0}%`),
});
console.log(JSON.stringify(job.data, null, 2));
