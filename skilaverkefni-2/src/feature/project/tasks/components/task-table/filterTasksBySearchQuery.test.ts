import { describe, it, expect } from "vitest";
import { filterTasksBySearchQuery } from "./filterTasksBySearchQuery";
import type { Task } from "@/feature/project/tasks/model/task";

//some things to test:
//what happens if the searchQuery is an empty string
//what is returned if nothing matches
//will it match uppercase search query with lowercase, and vice versa
//will it search and return tasks from all 3 fields (title, description, priority)
//can it handle an accidental space in the beginnig of a query

const testData: Task[] = [
  {
    completed: false,
    description: "Praesentium et quide",
    id: "7d7a4054-b19e-4c5a-b1af-60db74071a3c",
    priority: "low",
    projectId: "84835a8d-263c-4a07-8e0e-16d8ba9a2004",
    title: "Rerum iste esse haru",
  },
  {
    completed: false,
    description: "Commodo culpa sed t",
    id: "58beb5de-1a34-4f17-bbee-2b9fd2f57916",
    priority: "medium",
    projectId: "84835a8d-263c-4a07-8e0e-16d8ba9a2004",
    title: "Qui quibusdam lorem",
  },
  {
    completed: false,
    description: "Cumque aperiam accus",
    id: "dd7f9630-622d-4426-bc04-4a8bda2aa085",
    priority: "high",
    projectId: "84835a8d-263c-4a07-8e0e-16d8ba9a2004",
    title: "Eum quae vero consec",
  },
];

describe("filter", () => {
  it("returns the complete tasks array if searchQuery is empty string", () => {
    const result = filterTasksBySearchQuery(testData, "");
    expect(result.length).toBe(3);
  });

  it("returns empty array if there are no matches to searchQuery", () => {
    const result = filterTasksBySearchQuery(testData, "blorb");
    expect(result.length).toBe(0);
  });

  it("will return results from lowercase data with uppercase searchQuery", () => {
    const result = filterTasksBySearchQuery(testData, "CULPA");
    expect(result.length).toBe(1);
  });

  it("will return results from uppercase data with lowercase searchQuery", () => {
    const result = filterTasksBySearchQuery(testData, "eum");
    expect(result.length).toBe(1);
  });

  it("will return results from priority field", () => {
    const result = filterTasksBySearchQuery(testData, "low");
    expect(result.length).toBe(1);
  });

  it("will return results from both title and description fields", () => {
    const result = filterTasksBySearchQuery(testData, "qui");
    expect(result.length).toBe(2);
  });

  it("can handle whitespace in the Query", () => {
    const result = filterTasksBySearchQuery(testData, "   vero");
    expect(result.length).toBe(1);
  });
});
