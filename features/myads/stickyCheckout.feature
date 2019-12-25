@za
Feature: sticky checkout
    {
        "metadata":  {
            "author": "Vessel Vatel",
            "device": [
                "mobile"
            ],
            "domain": "price presentation"
        }
    }

    Background:
        Given a registered user open "home" page

        Given "myads" page is opened

        # post car ads so that the promotion features are predictable.
        Given "5" live "car" Ads

        Given user a cookie with name "AB-za-upsell" and value "true" on the site

        When user refresh the current page

    @mobile
    Scenario: sticky checkout state preserve and checksum
        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        When user click "myAds_mobile_upsellV2_secondFeatureOfTheFirstAd" on "both" screen
        When user click "myAds_mobile_upsellV2_thirdFeatureOfTheFirstAd" on "both" screen
        Then user should see text "Checkout (R 88)" of the element "myAds_mobile_upsellV2_visibleStickyCheckout" on "both" screen
        Then check "class" of the element "myAds_mobile_upsellV2_AnchorVisibleStickyCheckout" should "notContains" content disabled on "both" screen

        When user click "myAds_general_upsellV2_secondAdPromote" on "both" screen

        Then user should see text "Checkout" of the element "myAds_mobile_upsellV2_visibleStickyCheckout" on "both" screen
        Then check "class" of the element "myAds_mobile_upsellV2_AnchorVisibleStickyCheckout" should "contains" content disabled on "both" screen

        When user click "myAds_mobile_upsellV2_fourthFeatureOfTheSecondAd" on "both" screen
        Then user should see text "Checkout (R 10)" of the element "myAds_mobile_upsellV2_visibleStickyCheckout" on "both" screen
        Then check "class" of the element "myAds_mobile_upsellV2_AnchorVisibleStickyCheckout" should "notContains" content disabled on "both" screen

        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        Then user should see text "Checkout (R 88)" of the element "myAds_mobile_upsellV2_visibleStickyCheckout" on "both" screen
        Then check "class" of the element "myAds_mobile_upsellV2_AnchorVisibleStickyCheckout" should "notContains" content disabled on "both" screen
