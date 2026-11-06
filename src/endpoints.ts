// Generated from the CaptureKit OpenAPI document. Do not edit by hand.

import type { EndpointDefinition } from "./types.js";

/** Every documented operation, keyed by its snake_case name. */
export const ENDPOINTS = {
  analyze: {
    path: "/v1/analyze",
    methods: ["GET", "POST"],
    response: "json",
    required: ["url"],
  },
  capture: {
    path: "/v1/capture",
    methods: ["GET", "POST"],
    response: "any",
    required: ["url"],
  },
  content: {
    path: "/v1/content",
    methods: ["GET", "POST"],
    response: "json",
    required: ["url"],
  },
  jobs: {
    path: "/v1/jobs/{id}",
    methods: ["GET"],
    response: "json",
    required: ["id"],
  },
  stats: {
    path: "/v1/stats",
    methods: ["GET"],
    response: "json",
    required: [],
  },
  usage: {
    path: "/v1/usage",
    methods: ["GET"],
    response: "json",
    required: [],
  },
  website_crawler: {
    path: "/v1/website/crawler",
    methods: ["GET", "POST"],
    response: "any",
    required: ["query"],
  },
} as const satisfies Record<string, EndpointDefinition>;

export type EndpointName = keyof typeof ENDPOINTS;
