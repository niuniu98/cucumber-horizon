@za @ie @sg @pl
Feature: HPG_TOPAD_SRPContent
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

    @desktop @mobile
    Scenario Outline: SRP content shows HPG ads or TOPAD ads instead of normal ads
        Given "10" partner "car" Ads with features <feature>

        When user open "home"<path> page

        Then ads "srp_lastAd" should have features <expectedFeature>

        Examples:
            | feature | path | expectedFeature |
            | "topAd7"  | "s-cars-bakkies/v1c9077p1?fe=1" | "TOP_AD" |
            | "hpGallery7" | "s-cars-bakkies/v1c9077p1?fe=2" | "HOME_PAGE_GALLERY" |
