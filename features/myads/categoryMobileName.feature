Feature: Check category mobile name in my ads
    {"metadata": {"author": "Joyce", "sites": ["za"], "domain": "MyAds"}}
    @za @desktop @mobile
    Scenario:
        Given a live "c9319" Ad
        And a registered user open "Home" page
        And "MyAds" page is opened
        Then user should see text "Women's Swimwear" of the element "myAds_txfAdCategory" on "portrait" screen
        And user should see text "Swimwear" of the element "myAds_txfAdCategory" on "landscape" screen
