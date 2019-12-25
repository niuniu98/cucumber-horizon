@za @desktop @mobile
Feature: testing messaging bubble section display correctly after an user log in
    {
        "metadata": {
            "author": "Lawrence", 
            "device": "desktop, mobile", 
            "domain": "Header"
            "sites": ["za"]
        }
    }
    
    Scenario: messaging bubble is not displayed on the navigation bar before an user log in
        Given "Home" page is opened
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_lnkLiquidMyProfileMessageBubble" is not existed on "both" screen
        
    Scenario: messaging bubble is displayed on the navigation bar after an user log in
        Given a registered user open "HOME" page
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_lnkLiquidMyProfileMessageBubble" is displayed on "both" screen
