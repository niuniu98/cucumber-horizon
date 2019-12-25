@za
Feature: price presentation
    {
        "metadata":  {
            "author": "Vessel Vatel",
            "device": [
                "desktop",
                "mobile"
            ],
            "domain": "price presentation"
        }
    }

    Background: price presentation initialization
        Given a registered user open "home" page

        Given "myads" page is opened

        # post car ads so that the promotion features are predictable.
        Given "10" live "car" Ads

        Given user a cookie with name "AB-za-upsell" and value "true" on the site

        When user refresh the current page

    @desktop
    Scenario Outline: feature selection
        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        Then element "myAds_general_upsellV2_featuresOfTheFirstAd" should be visible on "both" screen

        When user click <feature> on "both" screen
        Then element <checkBox> should be visible on "both" screen

        When user click <feature> on "both" screen
        Then element <checkBox> should not be visible on "both" screen

        Examples:
        | feature | checkBox |
        | "myAds_desktop_upsellV2_firstFeatureOfTheFirstAd" | "myAds_general_upsellV2_checkedCheckBoxOfTheFirstFeatureOfTheFirstAd" |
        | "myAds_desktop_upsellV2_lastFeatureOfTheFirstAd" | "myAds_general_upsellV2_checkedCheckBoxOfTheLastFeatureOfTheFirstAd" |

    @desktop
    Scenario: desktop checkout
        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        Then elements "myAds_general_upsellV2_featuresOfTheFirstAd" are displayed on "both" screen

        When user click "myAds_desktop_upsellV2_firstFeatureOfTheFirstAd" on "both" screen
        When user click "myAds_desktop_upsellV2_secondFeatureOfTheFirstAd" on "both" screen

        When user click "myAds_desktop_upsellV2_checkoutOfTheFirstAd" on "both" screen

        Then the web page should navigate to "payment/payment"

    @mobile
    Scenario Outline: mobile ad selection (checkout button visibility, ad focus)
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should not be visible on "both" screen

        When user click <ad> on "both" screen
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should be visible on "both" screen

        When user click <ad> on "both" screen
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should not be visible on "both" screen

        Examples:
        | ad |
        | "myAds_general_upsellV2_firstAdPromote"  |
        | "myAds_general_upsellV2_lastAdPromote"  |

    @mobile
    Scenario Outline: mobile ad switch (checkout button visibility, ad focus)
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should not be visible on "both" screen

        When user click <fromAd> on "both" screen
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should be visible on "both" screen

        When user click <toAd> on "both" screen
        Then element "myAds_mobile_upsellV2_visibleStickyCheckout" should be visible on "both" screen

        Examples:
        | fromAd | toAd |
        | "myAds_general_upsellV2_firstAdPromote" | "myAds_general_upsellV2_secondAdPromote" |
        | "myAds_general_upsellV2_firstAdPromote" | "myAds_general_upsellV2_lastAdPromote" |
        | "myAds_general_upsellV2_lastAdPromote" | "myAds_general_upsellV2_firstAdPromote" |

    @mobile
    Scenario Outline: feature selection
        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        Then element "myAds_general_upsellV2_featuresOfTheFirstAd" should be visible on "both" screen

        When user click <feature> on "both" screen
        Then element <checkBox> should be visible on "both" screen

        When user click <feature> on "both" screen
        Then element <checkBox> should not be visible on "both" screen

        Examples:
        | feature | checkBox |
        | "myAds_mobile_upsellV2_firstFeatureOfTheFirstAd" | "myAds_general_upsellV2_checkedCheckBoxOfTheFirstFeatureOfTheFirstAd" |
        | "myAds_mobile_upsellV2_lastFeatureOfTheFirstAd" | "myAds_general_upsellV2_checkedCheckBoxOfTheLastFeatureOfTheFirstAd" |

    @mobile
    Scenario: mobile checkout
        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen
        Then elements "myAds_general_upsellV2_featuresOfTheFirstAd" are displayed on "both" screen

        When user click "myAds_mobile_upsellV2_firstFeatureOfTheFirstAd" on "both" screen
        When user click "myAds_mobile_upsellV2_secondFeatureOfTheFirstAd" on "both" screen
        When user click "myAds_mobile_upsellV2_thirdFeatureOfTheFirstAd" on "both" screen

        When user click "myAds_mobile_upsellV2_visibleStickyCheckout" on "both" screen

        ## polyfill
        When user wait for "5" secs

        Then the web page should navigate to "payment/payment"

