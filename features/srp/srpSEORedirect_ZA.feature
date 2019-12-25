Feature: srp SEO redirect mapping
    {"metadata": {"author": "yuan huang", "sites": ["za"], "domain": "srp"}}
    @za @smoke @desktop @mobile
    Scenario:
        When user open "home""/s-adelaide/toyota+verso/v1l3100611q0p1" page
        Then the web page should navigate to "/s-cars-bakkies/adelaide/toyota~verso/v1c9077l3100611a2mamop1"
