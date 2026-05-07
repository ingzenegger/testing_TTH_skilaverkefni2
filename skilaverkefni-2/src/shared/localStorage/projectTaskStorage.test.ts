import { describe, it, expect } from "vitest";
import type { Task } from "@/feature/project/tasks/model/task";
import { withSyncedTaskCounts } from "./projectTaskStorage";


//test data
const testTasksArray: Task[] = [
  {
    completed: false,
    description: "Praesentium et quide",
    id: "1",
    priority: "low",
    projectId: "1A",
    title: "Task 1",
  },
  {
    completed: false,
    description: "Commodo culpa sed t",
    id: "2",
    priority: "medium",
    projectId: "1B",
    title: "Task 2",
  },
  {
    completed: false,
    description: "Cumque aperiam accus",
    id: "3",
    priority: "high",
    projectId: "1A",
    title: "Task 3",
  },
];

const testProjectsArray = [
  {
    description: "Project for testing",
    id: "1A",
    name: "Test project 1",
    tasksCount: 0,
  },
  {
    description: "Project for testing",
    id: "1B",
    name: "Test project 2",
    tasksCount: 0,
  },
  {
    description: "Project for testing",
    id: "1C",
    name: "Test project 3",
    tasksCount: 0,
  },
];

describe("withSyncedTaskCounts", () => {
  //function takes projects and tasks arrays and updates tasksCount on projects based on the project id.
  it("returns project in array with an updated number of tasks", () => {
    const tasks1a = testTasksArray.filter((t) => t.projectId === "1A");
    expect(tasks1a.length).toBe(2);
    expect(testProjectsArray[0].tasksCount).toBe(0);
    const result = withSyncedTaskCounts(testProjectsArray, testTasksArray);
    expect(result[0].tasksCount).toBe(2);
  });
  it("does not count tasks belonging to other projects", () => {
    const tasks1c = testTasksArray.filter((t) => t.projectId === "1C");
    expect(tasks1c.length).toBe(0);
    expect(testProjectsArray[2].tasksCount).toBe(0);
    const result = withSyncedTaskCounts(testProjectsArray, testTasksArray);
    expect(result[2].tasksCount).toBe(0);
  });
});
