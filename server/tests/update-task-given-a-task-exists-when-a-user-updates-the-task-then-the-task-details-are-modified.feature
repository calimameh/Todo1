Feature: Update Task

  Scenario: Given a task exists, when a user updates the task, then the task details are modified.
    Given a task exists
    When a user updates the task
    Then the task details are modified