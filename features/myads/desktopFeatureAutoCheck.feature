@za @desktop
Feature: desktopFeatureAutoCheck
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

    Scenario Outline:
        Given a registered user open "home" page
        Given "myads" page is opened

        Given "1" live "car" Ad
        Given user a cookie with name "AB-za-upsell" and value "true" on the site
        When user refresh the current page

        When user click "myAds_general_upsellV2_firstAdPromote" on "both" screen

        When user click "myAds_desktop_upsellV2_selectionOfTheFirstFeatureOfTheFirstAd" on "both" screen

        When user click <option> on "both" screen

        Then element "myAds_general_upsellV2_checkedCheckBoxOfTheFirstFeatureOfTheFirstAd" should be visible on "both" screen

        Examples:
        | option |
        | "myAds_desktop_upsellV2_firstOptionOfSelectionOfTheFirstFeatureOfTheFirstAd" |
        | "myAds_desktop_upsellV2_secondOptionOfSelectionOfTheFirstFeatureOfTheFirstAd" |
        | "myAds_desktop_upsellV2_thirdOptionOfSelectionOfTheFirstFeatureOfTheFirstAd" |
