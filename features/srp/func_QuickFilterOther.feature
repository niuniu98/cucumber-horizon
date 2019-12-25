@mobile @za @wip
Feature: test quick filter other on mobile srp
    {"metadata": {"author": "Ben", "device": "mobile", "domain": "SRP"}}
    Scenario: quick filter check steps
        Given a live car Ad for "search" with location "Adelaide"
        Given open "home" page
        Given user a cookie with name "AB-SRP-STAGE2" and value "true" on the site
        Given user a cookie with name "AB-SRP-QF" and value "true" on the site
        
        When user open "home""s-cars-bakkies/v1c9077p1" page
        Then element "srp_quickFilterContainer" is displayed on "both" screen
        When user click "srp_btnQuickFilterPriceSkip" on "both" screen
        When user click "srp_btnQuickFilterLocationSkip" on "both" screen
        Then element "srp_quickFilterContainer" is not displayed on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1?_qf=2"

        When user open "home""s-cars-bakkies/eastern-cape/v1c9077l3100197p1" page
        Then element "srp_quickFilterContainer" is displayed on "both" screen
        Then user should see text "What is your budget?" of the element "srp_lblQuickFilterPriceTitle" on "both" screen
        When user click "srp_btnQuickFilterPrice" on "both" screen
        Then the web page should navigate to "SRP" page
        Then user should see text "Your Filter preferences are saved!" of the element "srp_lblQuickFilterFinal" on "both" screen
        Then the web page should navigate to "s-cars-bakkies/eastern-cape/v1c9077l3100197p1?_qf=1&pr=200000,"

        Given a live Ad
        When user open "home""s-camping-gear/v1c9235p1" page
        Then the web page should navigate to "SRP" page
        Then element "srp_quickFilterContainer" is not displayed on "both" screen
        Then the web page should navigate to "/s-camping-gear/v1c9235p1"
