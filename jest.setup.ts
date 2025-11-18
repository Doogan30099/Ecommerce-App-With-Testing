import "@testing-library/jest-dom";
// Polyfill TextEncoder/TextDecoder required by react-router & other libs under jsdom
import { TextEncoder, TextDecoder } from "node:util";
if (typeof global.TextEncoder === "undefined") {
  // assign polyfill
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextDecoder = TextDecoder as typeof TextDecoder;
}
