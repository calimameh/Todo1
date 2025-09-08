Feature: Delete Category

  Scenario: Given a category exists, when a user deletes the category, then the category is removed from the list.
    Given a category exists
    When a user deletes the category
    Then the category is removed from the list