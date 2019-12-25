@mobile @desktop @za
Feature: test srp sectiontitle desktop mobile
    {"metadata": {"author": "Crystal", "device": "mobile desktop", "domain": "SRP"}}
    Scenario Outline: srp section title ads
        Given open "home" page
        Given user a cookie with name "AB-SRP-STAGE2" and value "true" on the site
        Given a live "<typeAd>" Ad
        When user open "home""<url>" page
        When user scroll "srp_pnlResultListView" into view on "both" screen
        Then user should see text "<adTitle>" of the element "srp_lblAdTitle" on "both" screen
        Examples:
            | url                                               | adTitle                                           | typeAd|
            | s-all-the-ads/v1b0p1                              | All Categories in South Africa                    | car|
            | s-automotive-vehicles/eastern-cape/v1c5l3100197p1 | Used Automotive Vehicles for Sale in Eastern Cape | car|
            | s-cars-bakkies/east-london/v1c9077l3100300p1      | Cars & Bakkies in East London                     | car|
            | s-men-s-clothing/alberton/v1c9310l3100368p1       | Men's Clothing in Alberton                        | menClothing|
            | s-men-s-t+shirts/alberton/v1c9329l3100368p1       | Men's T-Shirts in Alberton                        | menTshirts|
