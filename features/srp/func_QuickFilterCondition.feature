@mobile @za @wip
Feature: test quick filter condition on mobile srp
    {"metadata": {"author": "Ben", "device": "mobile", "domain": "SRP"}}
    Background: quick filter initialization
        Given a live car Ad for "search" with location "Adelaide"
        Given open "home" page
        Given user a cookie with name "AB-SRP-STAGE2" and value "true" on the site
        Given user a cookie with name "AB-SRP-QF" and value "true" on the site

    Scenario Outline: quick filter check steps conditions
        When user open "home""s-cars-bakkies/v1c9077p1" page
        When user click <priceSelection> on "both" screen
        Then the web page should navigate to "SRP" page
        When user click <locationSelection> on "both" screen
        Then the web page should navigate to "SRP" page
        Then user should see text "Your Filter preferences are saved!" of the element "srp_lblQuickFilterFinal" on "both" screen
        Then the web page should navigate to <url>

        Examples:
            | priceSelection                | locationSelection                | url |
            | "srp_btnQuickFilterPrice"     | "srp_btnQuickFilterLocationSkip" | "s-cars-bakkies/v1c9077p1?pr=200000,&_qf=2"           |
            | "srp_btnQuickFilterPriceSkip" | "srp_btnQuickFilterLocation"     | "s-cars-bakkies/eastern-cape/v1c9077l3100197p1?_qf=2" |
