Feature: check srp dotdotdot for seo
    {"metadata": {"author": "yuan huang", "sites": ["za"], "domain": "Search"}}
    @za @smoke @desktop @mobile
    Scenario:
        Given a registered user open "home" page
        And user a cookie with name "B20" and value "srp" on the site
        And a live "for_search_seo" Ad
        And user wait for "10" secs
        And user open "home""/s-post+car+ad+for+search+seo/v1q0p1" page
        And user scroll "srp_ad_area" into view on "both" screen
        And user click "srp_btnDotDotDot" on "both" screen
        Then element "srp_description_span2" is displayed on "both" screen
