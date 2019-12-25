@za
Feature: To check Category Drop down of One Line Header on ZA site
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
    Scenario: Check Category Drop down on desktop on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then check "placeholder" of the element "header_txfLiquidCategory" should "equals" content Category on "both" screen
        Then element "header_lblLiquidAllCategoryIcon" is displayed on "both" screen
        When user move mouse "header_lblLiquidCategoryFilterBox" on "both" screen
        When user force browser to click "header_lnkLiquidCategoryCarBakkies" on "both" screen
        Then check "value" of the element "header_txfLiquidCategory" should "equals" content Cars & Bakkies on "both" screen
        Then element "header_lblLiquidCarCategoryIcon" is displayed on "both" screen
        Then element "header_lblLiquidAllCategoryIcon" is not existed on "both" screen
        When user click "header_btnLiquidSearchAd" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1"

    @mobile
    Scenario: Check Category Drop down on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_lblLiquidCategoryFilterBox" is not displayed on "both" screen
