@example @mx_vns @za @desktop @test
Feature: gherkinExample
    {"metadata": {"author": "nniu", "domain": "example","Jira":"BOLT-000000","site":"za,mx_vns","device":"desktop","TestGroup":"regression","Priority":"p3"}}

    this is a free-form descriptions
    can be placed underneath Feature, Scenario, Background, Scenario Outline
  # The first primary keyword in a Gherkin document must always be Feature
  # do not add anything between Feature... and descriptions
  # reference:https://docs.cucumber.io/gherkin/reference/#keywords
  Background:
    # it works for all scenario in the same feature
    Given a background step
    @example1
    Scenario: test basic value
       # int
        Given a test int value 5
        # String
        Given a test string value "test string"
        # multi-line string
        Given a test doc string value:
        """
        this is the test string
        for multi_line with two lines
        """
        Given a double value 5.6
        Given a double value 5.6
        Given a double value "5.6"
        Given another string value test string
        Given a test data table:
            |key  |value|
            |1    |test value|
            |2    |test value|
            |3    |test value|

    @example2
    Scenario Outline: test examples
        Given a double value 5.6 for test
        Given a test string value <valueS>
        Given a test string value "<valueSO>"
        When value A <valueA> equal B <valueB>
        Then the result is <result>
        Then the result is 10
        @example
        Examples:
            |valueA   |valueB |valueS|valueSO   |  result |
            |test a   |test b |"string"|string  |19     |


