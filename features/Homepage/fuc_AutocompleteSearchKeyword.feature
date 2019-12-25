Feature: use a misspelled word  can get search result for correct word

    @za @desktop
    Scenario Outline: check search result contain word 'popular' when use misspelled word 'populra'
        When user open "home""<url>" page
        When user type text "<misspelledWord>" in field "hp_keywordsSearchInput" on both screen
        Then user wait for "2" secs
        Then check "text" of the element "hp_keywordsSearchResult" should "contains" content <correctWord> on "both" screen
        Examples:
            | url                                          | misspelledWord | correctWord                    |
            |                                              | popularwd      | popularword001                 |
            | /s-cars-bakkies/chatsworth/v1c9077l3100421p1 | Popularac      | popularCarsBakkiesChatsworth_1 |
