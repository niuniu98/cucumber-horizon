@za
Feature: PopularCarCrossLink
    {
        "metadata":  {
            "author": "Vessel Vatel",
            "device": [
                "desktop",
                "mobile"
            ],
            "domain": "SRP"
        }
    }

    @desktop
    Scenario: test popular car cross link on desktop
        Given "1" partner "car_bmw_1series" Ads
        Given "1" partner "car_bmw_2002" Ads

        When user open "home""/s-cars-bakkies/bmw/v1c9077a1map1" page
        Then user should not see text "Popular BMW Cars by Model" of the element "srp_crossLinkTitle" on "both" screen

        When user open "home""/s-cars-bakkies/bmw~1-series/v1c9077a2mamop1" page
        Then user should see text "Popular BMW Cars by Model" of the element "srp_crossLinkTitle" on "both" screen
        Then the number of "srp_crossLinkLi" should ">" 0 on "both" screen

    @mobile
    Scenario: test popular car cross link on mobile
        Given "1" partner "car_bmw_1series" Ads
        Given "1" partner "car_bmw_2002" Ads

        When user open "home""/s-cars-bakkies/bmw/v1c9077a1map1" page
        # When user scroll "srp_crossLink" into view on "both" screen
        Then user should not see text "Popular BMW Cars by Model" of the element "srp_crossLinkTitle" on "both" screen

        When user open "home""/s-cars-bakkies/bmw~1-series/v1c9077a2mamop1" page
        # When user scroll "srp_crossLink" into view on "both" screen
        Then user should see text "Popular BMW Cars by Model" of the element "srp_crossLinkTitle" on "both" screen

        Then the number of "srp_crossLinkLi" should ">" 0 on "both" screen
