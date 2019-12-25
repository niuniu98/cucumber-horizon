# @za should contains za, but there's no feedback from ad-opts team about why the bottom banner disappears
@mobile @desktop @ie
Feature: bottom banner on zsrp
    {"metadata": {"author": "Ben", "device": "mobile, desktop", "domain": "ZSRP", "TestGroup":"regression", "Priority":"p3"}}
    Scenario: Verify zSRP has bottom banner
        When user open "home""s-iphone+1+test+22+test+3+test/v1q0p1" page
        Then the web page should navigate to "SRP" page
        Then element "zsrp_BottomBanner" is displayed on "both" screen
