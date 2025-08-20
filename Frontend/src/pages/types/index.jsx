/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [name]
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} taskId
 * @property {string} authorId
 * @property {string} authorName
 * @property {string} body
 * @property {string} created
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {"Low" | "Medium" | "High"} priority
 * @property {string} assigneeId
 * @property {string} assigneeName
 * @property {"Backlog" | "In Progress" | "Review" | "Done"} status
 * @property {string} dueDate
 * @property {string} created
 * @property {string} updated
 * @property {Comment[]} [comments]
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} token
 */

/**
 * @typedef {Object} TaskFilters
 * @property {string} [assignee]
 * @property {"Low" | "Medium" | "High"} [priority]
 */

// Example usage in React
import React from "react";

const ExampleComponent = () => {
  /** @type {User} */
  const user = { id: "1", email: "test@example.com", name: "Rajesh" };

  /** @type {Task} */
  const task = {
    id: "t1",
    title: "Finish assignment",
    priority: "High",
    assigneeId: "1",
    assigneeName: "Rajesh",
    status: "In Progress",
    dueDate: "2025-08-20",
    created: "2025-08-15",
    updated: "2025-08-16",
    comments: [
      {
        id: "c1",
        taskId: "t1",
        authorId: "1",
        authorName: "Rajesh",
        body: "Need to complete this ASAP",
        created: "2025-08-16",
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assigneeName}</p>
    </div>
  );
};

export default ExampleComponent;
