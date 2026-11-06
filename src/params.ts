// Generated from the CaptureKit OpenAPI document. Do not edit by hand.

import type { OpenString } from "./types.js";

/** Parameters for operations that take none. */
export type EmptyParams = Record<string, never>;

/** Parameters for `analyze()` — `GET / POST /v1/analyze`. */
export interface AnalyzeParams {
  /** The URL of the webpage to capture. */
  url: string;
  /** Pass custom response fields to be included in the AI response. */
  custom_response?: string | undefined;
  /** Add your own instructions to guide the AI’s analysis. */
  custom_prompt?: string | undefined;
  /** Specify a proxy server to route your request through. */
  proxy?: string | undefined;
  /** Cache the response. Default: `false`. */
  cache?: boolean | undefined;
  /** Cache the response for a custom TTL (in seconds). Default: `2592000`. */
  cache_ttl?: number | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `capture()` — `GET / POST /v1/capture`. */
export interface CaptureParams {
  /** The URL of the webpage to capture. Examples:  https://www.amazon.com/s?k=pokemon */
  url: string;
  /** The output format of the screenshot. Default: `"png"`. */
  format?: OpenString<"jpeg" | "jpg" | "pdf" | "png" | "webp"> | undefined;
  /** The device type to emulate for the screenshot. */
  device?:
    | OpenString<
        | "galaxy_fold4"
        | "galaxy_s23"
        | "galaxy_s23_ultra"
        | "galaxy_s8"
        | "huawei_mate_50_pro"
        | "huawei_p60_pro"
        | "ipad"
        | "iphone_12"
        | "iphone_13_mini"
        | "iphone_13_pro_max"
        | "iphone_14_pro"
        | "iphone_14_pro_max"
        | "iphone_x"
        | "pixel_5"
        | "pixel_6a"
        | "pixel_7_pro"
        | "redmi_note_11"
        | "redmi_note_12_pro"
      >
    | undefined;
  /** Capture the entire page instead of just the visible viewport. Default: `false`. */
  full_page?: boolean | undefined;
  /** Scroll the page to fully load lazy-loaded elements before capturing a full-page screenshot. Default: `false`. */
  full_page_scroll?: boolean | undefined;
  /** Time in milliseconds for scrolling before capturing the full page. Default: `400`. */
  full_page_scroll_duration?: number | undefined;
  /** The width of the browser viewport in pixels. Default: `1280`. */
  viewport_width?: number | undefined;
  /** The height of the browser viewport in pixels. Default: `1024`. */
  viewport_height?: number | undefined;
  /** The scale factor for high-resolution screenshots. Default: `1`. */
  scale_factor?: number | undefined;
  /** Generate images with custom quality settings. Default: `"80"`. */
  image_quality?: string | undefined;
  /** Capture a specific element on the page instead of the full viewport. */
  selector?: string | undefined;
  /** Cache the response. Default: `false`. */
  cache?: boolean | undefined;
  /** Cache the response for a custom TTL (in seconds). Default: `2592000`. */
  cache_ttl?: number | undefined;
  /** A comma-separated list of elements to hide before capturing (e.g., ads, popups). */
  remove_selectors?: string | undefined;
  /** Automatically remove cookie banners before capturing. Default: `false`. */
  remove_cookie_banners?: boolean | undefined;
  /** Automatically remove ads before capturing. Default: `false`. */
  remove_ads?: boolean | undefined;
  /** Comma-separated list of resource types to block (e.g., “image,stylesheet,font”). */
  block_resources?:
    | OpenString<
        | "document"
        | "eventsource"
        | "fetch"
        | "font"
        | "image"
        | "manifest"
        | "media"
        | "other"
        | "script"
        | "stylesheet"
        | "texttrack"
        | "websocket"
        | "xhr"
      >
    | undefined;
  /** Comma-separated list of URL patterns to block (e.g., “analytics,tracking,advertisement”). */
  block_urls?: string | undefined;
  /** Delay in seconds before capturing the screenshot. Default: `0`. */
  delay?: number | undefined;
  /** Define when to capture. */
  wait_until?:
    | readonly OpenString<
        "domcontentloaded" | "load" | "networkidle0" | "networkidle2"
      >[]
    | undefined;
  /** Wait for a specific element to appear before taking the screenshot. */
  wait_for_selector?: string | undefined;
  /** Specify a proxy server to route your request through. */
  proxy?: string | undefined;
  /** AWS S3 secret access key. */
  s3_secret_key?: string | undefined;
  /** AWS S3 access key ID. */
  s3_access_key_id?: string | undefined;
  /** The S3 bucket name where the screenshot will be uploaded. */
  s3_bucket?: string | undefined;
  /** The filename for the S3 object (auto-generated if not provided). */
  s3_object_key?: string | undefined;
  /** AWS S3 region for storage. */
  s3_region?: string | undefined;
  /** Leave this field empty for AWS S3. Only specify a value if required. S3-compatible storage services are supported, for example, use https://<accountId>.r2.cloudflarestorage.com for Cloudflare R2. */
  storage_endpoint?: string | undefined;
  /** Use S3 storage for screenshots. The S3 URL will be returned in the response. Default: `false`. */
  s3_url?: boolean | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `content()` — `GET / POST /v1/content`. */
export interface ContentParams {
  /** The URL of the webpage to capture. */
  url: string;
  /** Include the raw HTML of the webpage in the response. Default: `false`. */
  include_html?: boolean | undefined;
  /** Include the Markdown of the webpage in the response. Default: `false`. */
  include_markdown?: boolean | undefined;
  /** Include the sitemap of the website in the response. Default: `false`. */
  include_sitemap?: boolean | undefined;
  /** Use Defuddle to clean and extract the main content from web pages. This popular library removes unnecessary elements like comments, sidebars, headers, footers, and other non-essential elements, leaving only the primary content. When enabled, the HTML response will be processed through Defuddle befo… Default: `false`. */
  use_defuddle?: boolean | undefined;
  /** A comma-separated list of elements to hide before capturing (e.g., ads, popups). */
  remove_selectors?: string | undefined;
  /** Automatically remove cookie banners before capturing. Default: `false`. */
  remove_cookie_banners?: boolean | undefined;
  /** Automatically remove ads before capturing. Default: `false`. */
  remove_ads?: boolean | undefined;
  /** Comma-separated list of resource types to block (e.g., “image,stylesheet,font”). */
  block_resources?:
    | OpenString<
        | "document"
        | "eventsource"
        | "fetch"
        | "font"
        | "image"
        | "manifest"
        | "media"
        | "other"
        | "script"
        | "stylesheet"
        | "texttrack"
        | "websocket"
        | "xhr"
      >
    | undefined;
  /** Comma-separated list of URL patterns to block (e.g., “analytics,tracking,advertisement”). */
  block_urls?: string | undefined;
  /** Delay in seconds before capturing the screenshot. Default: `0`. */
  delay?: number | undefined;
  /** Define when to capture. */
  wait_until?:
    | readonly OpenString<
        "domcontentloaded" | "load" | "networkidle0" | "networkidle2"
      >[]
    | undefined;
  /** Wait for a specific element to appear before taking the screenshot. */
  wait_for_selector?: string | undefined;
  /** Specify a proxy server to route your request through. */
  proxy?: string | undefined;
  /** Cache the response. Default: `false`. */
  cache?: boolean | undefined;
  /** Cache the response for a custom TTL (in seconds). Default: `2592000`. */
  cache_ttl?: number | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `jobs()` — `GET /v1/jobs/{id}`. */
export interface JobsParams {
  /** The job_id returned by an endpoint called with is_async=true. */
  id: string;
}

/** Parameters for `stats()` — `GET /v1/stats`. */
export interface StatsParams {
  /** API family to check, for example capture. Provide at least engine or path. */
  engine?: string | undefined;
  /** Specific endpoint to check, for example /v1/capture. If you also pass engine, use an endpoint from that API. */
  path?: string | undefined;
}

/** Parameters for `websiteCrawler()` — `GET / POST /v1/website/crawler`. */
export interface WebsiteCrawlerParams {
  /** A website URL with either the http or https protocol. */
  query: string;
  /** If set to false, do not follow redirects. Default: `true`. */
  allow_redirects?: boolean | undefined;
  /** If set to true, the response will be the HTML source of the page. Default: `false`. */
  return_page_source?: boolean | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}
