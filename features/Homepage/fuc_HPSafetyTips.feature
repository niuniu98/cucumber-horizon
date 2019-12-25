@za @P3
Feature: To check safetyTips on hp
    {
        "metadata":{
            "author": "Riven",
            "device": [
                "desktop",
                "mobile"
            ],
            "sites": ["za"],
            "domain": "Homepage"
        }
    }
    @desktop @mobile
    Scenario: To check safetyTips on hp
        Given "Home" page is opened
        When user click "hp_safetyTips" on "both" screen
        When user switch to next window on "both" screen
        Then the web page should navigate to "https://help.gumtree.co.za/?cu=1&fs=ContactUs&l=en_US&topic=Ad%20Checker"
