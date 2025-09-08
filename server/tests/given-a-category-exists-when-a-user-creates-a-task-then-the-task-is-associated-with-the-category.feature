Feature: Task Management

  Scenario: Given a category exists, when a user creates a task, then the task is associated with the category.
    Given a category exists
    When a user creates a task
    Then the task is associated with the category