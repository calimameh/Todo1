Feature: Delete Task

  Scenario: Given a task exists, when a user deletes the task, then the task is removed from the list.
    Given a task exists
    When a user deletes the task
    Then the task is removed from the list