import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  it("returns the initialValue when nothing is stored under that key", () => {
    const { result } = renderHook(() => useLocalStorage("nonexistent-key", 42));

    expect(result.current[0]).toBe(42);
  });

  it("updates the value when the setter is called", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current[1](99);
    });

    expect(result.current[0]).toBe(99);
  });
});
