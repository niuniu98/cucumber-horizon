@mobile @za @wip
Feature: test quick filter on mobile srp
    {"metadata": {"author": "Ben", "device": "mobile", "domain": "SRP"}}
    Scenario: quick filter check steps
        Given a live car Ad for "search" with location "Adelaide"
        Given open "home" page
        Given user a cookie with name "AB-SRP-STAGE2" and value "true" on the site
        Given user a cookie with name "AB-SRP-QF" and value "true" on the site
        When user open "home""s-cars-bakkies/v1c9077p1" page
        Then the web page should navigate to "SRP" page
        Then element "srp_quickFilterContainer" is displayed on "both" screen
        Then user should see text "What is your budget?" of the element "srp_lblQuickFilterPriceTitle" on "both" screen
        When user click "srp_btnQuickFilterPrice" on "both" screen
        Then the web page should navigate to "SRP" page
        Then user should see text "What is your location?" of the element "srp_lblQuickFilterLocationTitle" on "both" screen
        When user click "srp_btnQuickFilterLocation" on "both" screen
        Then the web page should navigate to "SRP" page
        Then user should see text "Your Filter preferences are saved!" of the element "srp_lblQuickFilterFinal" on "both" screen
        When user click "srp_btnQuickFilterFinalClose" on "both" screen
        Then element "srp_quickFilterContainer" is not displayed on "both" screen
        Then the web page should navigate to "s-cars-bakkies/eastern-cape/v1c9077l3100197p1?pr=200000,&_qf=2"
