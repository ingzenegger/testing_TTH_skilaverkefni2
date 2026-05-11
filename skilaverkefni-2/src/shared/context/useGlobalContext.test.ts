import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGlobalContext } from "./useGlobalContext";

describe("useGlobalContext", () => {
  it("throws an error when used outside of GlobalProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useGlobalContext())).toThrow(
      "useGlobalContext must be used within GlobalProvider",
    );
  });
});
