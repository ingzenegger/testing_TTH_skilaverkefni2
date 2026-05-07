// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { readJson, writeJson } from "./jsonLocalStorage";

beforeEach(() => localStorage.clear());

describe("readJson reads data from localStorage", () => {
  it("returns the correct data provided by key", () => {
    localStorage.setItem("test-key", JSON.stringify("test-value"));
    localStorage.setItem("test-key2", JSON.stringify("test-value2"));
    const result = readJson("test-key");
    expect(result).toEqual("test-value");
  });
  it("returns undefined with key that doesn't exist", () => {
    localStorage.setItem("test-key", JSON.stringify("test-value"));
    const result = readJson("wrong-test-key");
    expect(result).toBe(undefined);
  });
  it("returns undefined with invalid JSON", () => {
    localStorage.setItem("test-key", "invalid-JSON");
    const result = readJson("wrong-test-key");
    expect(result).toBe(undefined);
  });
});

describe("writeJson writes data to localStorage", () => {
  it("writes valid data", () => {
    writeJson("test-key", "test value");
    const result = localStorage.getItem("test-key");
    expect(JSON.parse(result!)).toBe("test value");
  });
  it("can be read back by readJson", () => {
    writeJson("test-key-B", "test another value");
    const result = readJson("test-key-B");
    expect(result).toEqual("test another value");
  });
});
