import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "node:util";
if (typeof global.TextEncoder === "undefined") {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextDecoder = TextDecoder as typeof TextDecoder;
}
