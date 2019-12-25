@za
Feature: testing my profile dropdown items displayed correctly on navigation bar after an user log in
    {
        "metadata": {
            "author": "Lawrence", 
            "device": "desktop, mobile", 
            "domain": "Header"
            "sites": ["za"]
        }
    }

    @desktop
    Scenario: entries are displayed properly in the my profile dropdown on Desktop after an user log in
        Given a registered user open "HOME" page
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user move mouse "header_lblLiquidMyProfile" on "landscape" screen
        Then elements "header_lnkLiquidMyProfileMyAds, header_lnkLiquidMyProfileMyList, header_lnkLiquidMyProfileSearchAlerts, header_lnkLiquidMyProfileMyMessages, header_lnkLiquidMyProfileMyProfile, header_lnkLiquidMyProfileLogout" should be visible on "landscape" screen

    @mobile    
    Scenario: entries are displayed properly in the my profile dropdown on Mobile after an user log in
        Given a registered user open "HOME" page
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user force browser to click "header_lblLiquidMobileMyProfileIcon" on "both" screen
        Then element "header_pnlLiquidMobileMyProfilePopup" is displayed on "both" screen
        Then elements "header_lnkLiquidMobileMyProfileMyAds, header_lnkLiquidMobileMyProfileMyList, header_lnkLiquidMobileMyProfileSearchAlerts, header_lnkLiquidMobileMyProfileMyMessages, header_lnkLiquidMobileMyProfileMyProfile, header_lnkLiquidMobileMyProfileLogout" should be visible on "both" screen
