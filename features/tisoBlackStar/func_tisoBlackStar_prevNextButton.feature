Feature: test ZA tisoBlackStar carousel gallery prev and next button function
    {"metadata": {"author": "Lewis", "device": "desktop, mobile"}}
    @za
    Scenario Outline:
        Given a live "car" Ad
        Given a registered user open "home" page
        Given user a cookie with name "B20" and value "PAYMENT" on the site
        When user open payment page with features "topAd7,urgent7"
        Then user should see text "Order Summary" of the element "payment_txfOrderTitle" on "both" screen
        Then user should see text "BAPI post car ad for vip" of the element "payment_txfTitle2dot0" on "both" screen
        When user type text "10/20" in field "payment_expiryDate" on both screen
        When user click "payment_adyenCheckout" on "both" screen
        When user wait for "5" secs
        Given a registered user
        Given "5" partner "car" Ads with features "topAd7"
        When user wait for "5" secs
        When user open "home""/widget/carousel?category=autos" page
        Then element "tisoBlackStarContent" is displayed on "both" screen
        Then the number of "TBSContentItem" should "<" <itemsNumber> on "both" screen
        When user click "nextButton" on "both" screen
        Then check "data-slick-index" of the element "TBSContentActiveItem" should "equals" content <currentNextIndex> on "both" screen
        When user click "prevButton" on "both" screen
        Then check "data-slick-index" of the element "TBSContentActiveItem" should "equals" content <currentPrevIndex> on "both" screen
    @desktop
        Examples:
            | itemsNumber | currentNextIndex | currentPrevIndex |
            | 6    | 5   | 0 |
    @mobile
        Examples:
            | itemsNumber | currentNextIndex | currentPrevIndex |
            | 4    | 3 | 0 |
