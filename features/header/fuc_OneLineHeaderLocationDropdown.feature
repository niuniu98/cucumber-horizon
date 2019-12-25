@za
Feature: To check Location Drop down of One Line Header on ZA site
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

    @desktop
    Scenario: Check Location Drop down on desktop on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then check "placeholder" of the element "header_txfLiquidLocation" should "equals" content All South Africa on "both" screen
        Then element "header_lblLiquidLocationIcon" is displayed on "both" screen
        When user move mouse "header_lblLiquidLocationFilterBox" on "both" screen
        When user click "header_lnkLiquidLocationWesternCape" on "both" screen
        Then check "value" of the element "header_txfLiquidLocation" should "equals" content Western Cape on "both" screen
        Then element "header_lblLiquidLocationIcon" is displayed on "both" screen
        When user click "header_btnLiquidSearchAd" on "both" screen
        Then the web page should navigate to "/s-western-cape/v1l3100001p1"

    @mobile
    Scenario: Check Location Drop down on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_lblLiquidLocationFilterBox" is not displayed on "both" screen
