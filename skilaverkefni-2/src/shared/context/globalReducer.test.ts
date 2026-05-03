import { describe, it, expect } from "vitest";
import { globalReducer, initialState } from "./globalReducer";
import type { Task } from "@/feature/project/tasks/model/task";

const testProject = {
  description: "Some project for testing",
  id: "1A",
  name: "Test project 1",
  tasksCount: 0,
};

const testTask: Task = {
  completed: false,
  description: "Some task for testing",
  id: "1",
  priority: "low",
  projectId: "1A",
  title: "Test task 1",
};
const stateWithProject = { ...initialState, projects: [testProject] };
const stateWithTask = { ...initialState, tasks: [testTask] };

describe("globalReducer", () => {
  //ADD and REMOVE project tests
  it("ADD_PROJECT adds a project to the projects array in state", () => {
    expect(initialState.projects.length).toBe(0);
    const result = globalReducer(initialState, {
      type: "ADD_PROJECT",
      payload: { project: testProject },
    });
    expect(result.projects.length).toBe(1);
  });
  it("REMOVE_PROJECT removes a project from the projects array in state", () => {
    expect(stateWithProject.projects.length).toBe(1);
    const result = globalReducer(stateWithProject, {
      type: "REMOVE_PROJECT",
      payload: { projectId: testProject.id },
    });
    expect(result.projects.length).toBe(0);
  });

  //ADD and REMOVE task tests
  it("ADD_TASK adds a task to the tasks array in state", () => {
    expect(initialState.tasks.length).toBe(0);
    const result = globalReducer(initialState, {
      type: "ADD_TASK",
      payload: { task: testTask, projectId: testProject.id },
    });
    expect(result.tasks.length).toBe(1);
  });
  it("ADD_TASK updates tasks count on parent project", () => {
    expect(testProject.tasksCount).toBe(0);
    const result = globalReducer(stateWithProject, {
      type: "ADD_TASK",
      payload: { task: testTask, projectId: testProject.id },
    });
    expect(result.projects[0].tasksCount).toBe(1);
  });

  it("REMOVE_TASK removes a task from the tasks array in state", () => {
    expect(stateWithTask.tasks.length).toBe(1);
    const result = globalReducer(stateWithTask, {
      type: "REMOVE_TASK",
      payload: { taskId: testTask.id },
    });
    expect(result.tasks.length).toBe(0);
  });
  it("REMOVE_TASK updates tasks count on parent project", () => {
    const projectWithTask = { ...testProject, tasksCount: 1 };
    const stateWithProjectWithTask = {
      ...stateWithTask,
      projects: [projectWithTask],
    };
    expect(stateWithProjectWithTask.projects[0].tasksCount).toBe(1);
    const result = globalReducer(stateWithProjectWithTask, {
      type: "REMOVE_TASK",
      payload: { taskId: testTask.id },
    });
    expect(result.projects[0].tasksCount).toBe(0);
  });

  //UPDATE tests:
  //UPDATE_TASK should probably have one test for each data point, rather than all 4 in one. But I think this will do for this assignment.
  it("UPDATE_TASK updates task data", () => {
    expect(stateWithTask.tasks[0].completed).toBe(false);
    expect(stateWithTask.tasks[0].priority).toBe("low");
    expect(stateWithTask.tasks[0].title).toBe("Test task 1");
    expect(stateWithTask.tasks[0].description).toBe("Some task for testing");
    const result = globalReducer(stateWithTask, {
      type: "UPDATE_TASK",
      payload: {
        taskId: testTask.id,
        task: {
          ...testTask,
          completed: true,
          priority: "medium",
          title: "Test task A",
          description: "Updated task",
        },
      },
    });
    expect(result.tasks[0].completed).toBe(true);
    expect(result.tasks[0].priority).toBe("medium");
    expect(result.tasks[0].title).toBe("Test task A");
    expect(result.tasks[0].description).toBe("Updated task");
  });

  //A BUG BUSTED!!! UPDATE_PROJECT_TASKS_COUNT would delete any project with no task in it, including newly created ones. However it is never called in the app as is. This action of updating tasks count is performed by ADD_TASK and withSyncedTaskCounts
  // BUG FIX: remove the filter >0 from the function
  it("UPDATE_PROJECT_TASKS_COUNT does not remove project when tasksCount is 0", () => {
    expect(stateWithProject.projects.length).toBe(1);
    const result = globalReducer(stateWithProject, {
      type: "UPDATE_PROJECT_TASKS_COUNT",
      payload: { projectId: testProject.id, tasksCount: 0 },
    });
    expect(result.projects.length).toBe(1);
  });

  it("UPDATE_PROJECT_TASKS_COUNT updates project tasksCount", () => {
    expect(stateWithProject.projects[0].tasksCount).toBe(0);
    const result = globalReducer(stateWithProject, {
      type: "UPDATE_PROJECT_TASKS_COUNT",
      payload: { projectId: testProject.id, tasksCount: 1 },
    });
    expect(result.projects[0].tasksCount).toBe(1);
  });

  //set and clear ACTIVE_PROJECT test
  it("will SET_ACTIVE_PROJECT", () => {
    expect(stateWithProject.activeProject).toBe(null);
    const result = globalReducer(stateWithProject, {
      type: "SET_ACTIVE_PROJECT",
      payload: { project: testProject },
    });
    expect(result.activeProject).toBe(testProject);
  });
  it("will CLEAR_ACTIVE_PROJECT", () => {
    const stateWithActiveProject = {
      ...stateWithProject,
      activeProject: testProject,
    };
    const result = globalReducer(stateWithActiveProject, {
      type: "CLEAR_ACTIVE_PROJECT",
    });
    expect(result.activeProject).toBe(null);
  });
});
