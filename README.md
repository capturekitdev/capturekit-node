# CaptureKit Node.js SDK

The official Node.js and TypeScript SDK for the [CaptureKit](https://www.capturekit.dev) screenshot API.

Capture websites as PNG, JPEG, WebP or PDF, extract their content, or analyse them with AI.

The SDK exposes **7 typed methods**, one per documented endpoint, plus a generic `request()` for anything else.

## Requirements

- Node.js 20 or newer

## Installation

```sh
npm install @capturekitdev/sdk
```

The SDK works with TypeScript and JavaScript (ES modules). The examples below use TypeScript; JavaScript users can use the same API by omitting TypeScript-only syntax.

## Get your API key

[Sign up for CaptureKit](https://app.capturekit.dev/register) or sign in to your existing account, then copy your API key from the [dashboard](https://app.capturekit.dev). Store it securely, for example in the `CAPTUREKIT_API_KEY` environment variable, which the client reads by default.

## Quick start

```ts
import { CaptureKitClient } from "@capturekitdev/sdk";

const client = new CaptureKitClient({ apiKey: process.env.CAPTUREKIT_API_KEY });

const response = await client.content({ url: "https://example.com" });
console.log(response.data);
```

Every method takes a parameter object that mirrors the [API reference](https://app.capturekit.dev/openapi) (snake_case names, exactly as documented) and an optional `RequestOptions` object.

## Binary responses

Some endpoints return a file (image, PDF…) instead of JSON. Their methods return an `ApiResponse`, so check `kind`:

```ts
import { writeFile } from "node:fs/promises";

const response = await client.capture({
  url: "https://example.com",
  format: "png",
});
if (response.kind === "binary") {
  await writeFile("screenshot.png", response.bytes);
} else {
  console.log(response.data);
}
```

## Async jobs

Any call accepts `is_async: true` (useful past the 60-second server limit): the response is then a `job_id`. `waitForJob()` polls `GET /v1/jobs/{id}` until the job reaches a terminal status (`CompletedJob`, `Error`, `NotFound`, `BadRequest`):

```ts
const submitted = await client.content({
  url: "https://example.com",
  is_async: true,
});
const job = await client.waitForJob(submitted.data.job_id, {
  onProgress: (j) => console.log(`${j.status} ${j.progress ?? 0}%`),
});
console.log(JSON.stringify(job.data, null, 2));
```

## GET or POST

Methods use GET when the endpoint supports it: parameters travel in the query string. POST sends the same parameters as a JSON body.

```ts
await client.analyze({ url: "test" }, { method: "POST" });
```

`null`, `undefined` and empty arrays are omitted, `false` and `0` are sent, and arrays repeat the parameter name (`a=1&a=2`).

## Any endpoint

`request()` reaches any path, including endpoints released after this SDK version:

```ts
const response = await client.request("GET", "/v1/usage");
```

## Responses

- `JsonResponse` — `kind: "json"`, the parsed body in `data` (pass a type argument to type it: `client.content<MyType>(…)`).
- `BinaryResponse` — `kind: "binary"`, the body in `bytes` and its `contentType`.

Both keep the buffered `rawResponse` (status, headers, content type, body bytes).

## Errors

```ts
import { CaptureKitApiError } from "@capturekitdev/sdk";

try {
  await client.content({ url: "https://example.com" });
} catch (error) {
  if (error instanceof CaptureKitApiError) {
    console.error(error.status, error.message, error.responseBody);
  }
  throw error;
}
```

| Error                             | When                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `CaptureKitConfigurationError`    | Missing API key, invalid options or unsupported method.                       |
| `CaptureKitSerializationError`    | A required parameter is missing or a value can't be sent.                     |
| `CaptureKitTransportError`        | Network failure or client-side timeout.                                       |
| `CaptureKitApiError`              | The API answered with a non-2xx status (`status`, `message`, `responseBody`). |
| `CaptureKitResponseDecodingError` | A success response could not be decoded.                                      |

All of them extend `CaptureKitError`. Common statuses: `400` invalid parameters, `401` invalid API key, `402` no credits left, `429` rate limit exceeded.

## Retries

Requests are retried up to 3 times after a network error, a `408`, `500`, `502`, `503` or `504`, or a rate limit — which the API returns as `401` (or `429`) with a `Rate limit exceeded` message. Per-key quota errors (`…: quota daily`) are not retried, nor are `400`, `402`, `404` or client-side timeouts. The delay starts at 1 second and grows 1.5× per retry (capped at 30 seconds); a `Retry-After` header wins.

```ts
const client = new CaptureKitClient({ maxRetries: 5, retryDelay: 500 });

// or for one request
await client.content({ url: "https://example.com" }, { maxRetries: 0 });
```

## Batch requests

`batch()` runs a task per item with at most 10 in flight (`concurrency`), and returns one result per item in input order, shaped like `Promise.allSettled`. One failure never stops the others.

```ts
const inputs = [
  "https://example.com",
  "https://www.capturekit.dev",
  "https://github.com",
];
const results = await client.batch(inputs, (url) => client.content({ url }), {
  concurrency: 5,
});

for (const result of results) {
  if (result.status === "fulfilled") console.log(result.value.data);
  else console.error(inputs[result.index], result.reason);
}
```

| Constant                 | Default  | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| `DEFAULT_CONCURRENCY`    | `10`     | Tasks run at the same time by batch                             |
| `DEFAULT_TIMEOUT_MS`     | `120000` | Request timeout (milliseconds)                                  |
| `MAX_RETRIES`            | `3`      | Retry attempts after a network error, a 408/5xx or a rate limit |
| `RETRY_BACKOFF_FACTOR`   | `1.5`    | Exponential backoff multiplier                                  |
| `DEFAULT_RETRY_DELAY_MS` | `1000`   | Delay before the first retry (milliseconds)                     |

## Timeouts and cancellation

```ts
const client = new CaptureKitClient({ timeout: 60_000 }); // default 120000 ms, 0 disables

await client.content(
  { url: "https://example.com" },
  {
    signal: AbortSignal.timeout(30_000),
  },
);
```

## Advanced: custom Fetch transport

```ts
import { CaptureKitClient, type CaptureKitFetch } from "@capturekitdev/sdk";

const loggingFetch: CaptureKitFetch = async (input, init) => {
  const response = await fetch(input, init);
  console.log(init.method, String(input), response.status);
  return response;
};

const client = new CaptureKitClient({ fetch: loggingFetch });
```

## Endpoints

7 methods, generated from the [OpenAPI document](https://app.capturekit.dev/openapi).

| Method             | HTTP                             | Description                                                                                                                                  |
| ------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `analyze()`        | GET / POST `/v1/analyze`         | AI Content API analyzes any webpage and returns AI insights summary, value proposition, features, categories, use cases, and optional conta… |
| `capture()`        | GET / POST `/v1/capture`         | Browser-like Screenshot API that captures webpages as PNG/JPEG/WebP or PDF for previews, QA, reporting, monitoring, and archiving no headle… |
| `content()`        | GET / POST `/v1/content`         | CaptureKit Content API extracts structured webpage data, metadata, links, HTML/Markdown: in one request for SEO, monitoring, indexing and a… |
| `jobs()`           | GET `/v1/jobs/{id}`              | Poll the status, progress (0–100) and result of a job started with is_async=true. Polling is free. Poll until status is terminal: Completed… |
| `stats()`          | GET `/v1/stats`                  | Infrastructure health for an engine or endpoint over the last hour. Not scoped to your account or tenant. Enabled per account: HTTP 403 mea… |
| `usage()`          | GET `/v1/usage`                  | Retrieve real-time usage statistics and credit balance for your CaptureKit account.                                                          |
| `websiteCrawler()` | GET / POST `/v1/website/crawler` | Website Crawler API fetches raw HTML from any webpage in request mode (no rendering) for fast scraping, audits, monitoring, and link/metada… |

## All CaptureKit SDKs

| SDK        | Package                                                                      | Install                                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| Node.js    | [`@capturekitdev/sdk`](https://www.npmjs.com/package/@capturekitdev/sdk)     | `npm install @capturekitdev/sdk`                |
| Python     | [`capturekitdev`](https://pypi.org/project/capturekitdev/)                   | `pip install capturekitdev`                     |
| Go         | [`capturekit-go`](https://pkg.go.dev/github.com/capturekitdev/capturekit-go) | `go get github.com/capturekitdev/capturekit-go` |
| .NET       | [`CaptureKit`](https://www.nuget.org/packages/CaptureKit)                    | `dotnet add package CaptureKit`                 |
| Ruby       | [`capturekitdev`](https://rubygems.org/gems/capturekitdev)                   | `gem install capturekitdev`                     |
| PHP        | [`capturekitdev/sdk`](https://packagist.org/packages/capturekitdev/sdk)      | `composer require capturekitdev/sdk`            |
| Java       | [`capturekit-java`](https://github.com/capturekitdev/capturekit-java)        | build from source, see its README               |
| CLI        | [`@capturekitdev/cli`](https://www.npmjs.com/package/@capturekitdev/cli)     | `npm install -g @capturekitdev/cli`             |
| MCP server | [`@capturekitdev/mcp`](https://www.npmjs.com/package/@capturekitdev/mcp)     | `npx -y @capturekitdev/mcp`                     |

## License

MIT — see [LICENSE](LICENSE).
