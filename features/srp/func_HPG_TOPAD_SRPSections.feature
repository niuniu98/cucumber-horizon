Feature: HPG_TOPAD_SRPSections
    {
        "metadata":  {
            "author": "Vessel Vatel",
            "device": [
                "desktop",
                "mobile"
            ],
            "domain": "SRP"
        }
    }

    @desktop @mobile @za
    Scenario Outline: no top ad section and change title of ad list
        Given "1" partner "car" Ads with features "topAd7"
        Given "1" partner "car" Ads with features "hpGallery7"
        When user wait for "5" secs

        When user open "home"<path> page
        Then the web page should navigate to <redirect>

        Then elements "srp_lblTopAdTitle, srp_btnTopAdSection" should not be visible on "both" screen
        Then user should see text <adTitle> of the element "srp_lblLegacyAdTitle" on "both" screen

        Examples:
            | path | redirect | adTitle |
            | "s-cars-bakkies/v1c9077p1?fe=1" | "s-cars-bakkies/v1c9077p1?adFeatures=TOP_AD" | "Top Ads" |
            | "s-cars-bakkies/v1c9077p1?fe=2" | "s-cars-bakkies/v1c9077p1?adFeatures=HOME_PAGE_GALLERY" | "Homepage gallery ads" |

    @desktop @mobile @ie
    Scenario Outline: no top ad section and change title of ad list
        Given "1" partner "car" Ads with features "topAd7"
        Given "1" partner "car" Ads with features "hpGallery7"
        When user wait for "5" secs

        When user open "home"<path> page
        Then the web page should navigate to <redirect>

        Then user should see text <adTitle> of the element "srp_lblLegacyAdTitle" on "both" screen

        Examples:
            | path | redirect | adTitle |
            | "s-all-the-ads/v1b0p1?fe=1" | "s-all-the-ads/v1b0p1?adFeatures=TOP_AD" | "Top Ads" |
            | "s-all-the-ads/v1b0p1?fe=2" | "s-all-the-ads/v1b0p1?adFeatures=HOME_PAGE_GALLERY" | "Homepage Gallery Ads" |

    @desktop @mobile @sg
    Scenario Outline: no top ad section and change title of ad list
        Given "1" partner "car" Ads with features "topAd7"
        Given "1" partner "car" Ads with features "hpGallery7"
        When user wait for "5" secs

        When user open "home"<path> page
        Then the web page should navigate to <redirect>

        Then user should see text <adTitle> of the element "srp_lblLegacyAdTitle" on "both" screen

        Examples:
            | path | redirect | adTitle |
            | "s-all-the-ads/v1b0p1?fe=1" | "s-all-the-ads/v1b0p1?adFeatures=TOP_AD" | "Top Ads" |
            | "s-all-the-ads/v1b0p1?fe=2" | "s-all-the-ads/v1b0p1?adFeatures=HOME_PAGE_GALLERY" | "Homepage Gallery Ads" |

    @desktop @mobile @pl
    Scenario Outline: no top ad section and change title of ad list
        Given "1" partner "car" Ads with features "topAd7"
        Given "1" partner "car" Ads with features "hpGallery7"
        When user wait for "5" secs

        When user open "home"<path> page
        Then the web page should navigate to <redirect>

        Then user should see text <adTitle> of the element "srp_lblLegacyAdTitle" on "both" screen

        Examples:
            | path | redirect | adTitle |
            | "s-wszystkie-the-reklamy/v1b0p1?fe=1" | "s-wszystkie-the-reklamy/v1b0p1?adFeatures=TOP_AD" | "Ogłoszenia wyróżnione" |
            | "s-wszystkie-the-reklamy/v1b0p1?fe=2" | "s-wszystkie-the-reklamy/v1b0p1?adFeatures=HOME_PAGE_GALLERY" | "Galeria na Stronie Głównej" |
