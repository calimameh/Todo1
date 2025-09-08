Feature: Create Category

  Scenario: Given no categories exist, when a user creates a category, then the category is added to the list.
    Given no categories exist
    When a user creates a category
    Then the category is added to the list