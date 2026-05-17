import { describe, expect, it } from "vitest";
import { formatDisplayDate } from "./format-date";

describe("formatDisplayDate", () => {
  it("formats an ISO date string as DD/MM/YYYY", () => {
    expect(formatDisplayDate("2026-05-16")).toBe("16/05/2026");
  });
});
