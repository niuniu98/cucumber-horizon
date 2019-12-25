@za
Feature: To check Auto Complete of One Line Header on ZA site
    {
        "metadata":{
            "author": "Edmond",
            "device": [
                "desktop",
                "mobile"
            ],
            "sites": ["za"],
            "domain": "Header"
        }
    }

    @desktop @mobile
    Scenario: Check max number of suggestion list item displayed on desktop and mobile
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user type text "popular" in field "header_txtLiquidSearchBarKeyword" on both screen
        Then user wait for "2" secs
        Then the number of "header_lnkLiquidSearchBarSuggestion" should "=" 10 on "both" screen

    @desktop @mobile
    Scenario: User is able to add and clear recent search record on desktop and mobile
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user type text "popular" in field "header_txtLiquidSearchBarKeyword" on both screen
        Then user wait for "2" secs
        Then user should see text "popularCarsBakkiesChatsworth_1 in Cars & Bakkies" of the element "header_lnkLiquidSearchBarFirstSuggestion" on "both" screen
        When user click "header_lnkLiquidSearchBarFirstSuggestion" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1?q=popularcarsbakkieschatsworth+1"
        Then the web page should navigate to "SRP" page
        When user type key "BACK_SPACE" in field "header_txtLiquidSearchBarKeyword" on both screen
        Then user wait for "3" secs
        Then user should see text "popularCarsBakkiesChatsworth_1 in Cars & Bakkies" of the element "header_lnkLiquidSearchBarFirstRecentSearch" on "both" screen
        Then elements "header_lnkLiquidSearchBarClearRecentSearch" are displayed on "both" screen
        When user click "header_lnkLiquidSearchBarClearRecentSearch" on "both" screen
        Then element "header_lnkLiquidSearchBarFirstRecentSearch" is not existed on "both" screen
