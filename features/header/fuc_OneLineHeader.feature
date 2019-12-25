@za
Feature: To check One Line Header on ZA site
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
    Scenario: Check One Line Header on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given a registered user open "Home" page
        Then element "header_pnlLiquidLogo" is displayed on "both" screen
        Then element "header_pnlLiquidSearchBar" is displayed on "both" screen
        Then element "header_pnlLiquidMyAcct" is displayed on "both" screen
        Then element "header_pnlLiquidPost" is displayed on "both" screen
        Then element "header_pnlLiquidHeader" is displayed on "both" screen
        When user click "header_btnLiquidSearchAd" on "both" screen
        Then the web page should navigate to "/s-all-the-ads/v1b0p1"
        When user click "header_lnkLiquidLogo" on "both" screen
        Then the web page should navigate to "/"
        When user click "header_lnkLiquidPostAd" on "both" screen
        Then the web page should navigate to "/post"
