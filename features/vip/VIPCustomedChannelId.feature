Feature: story to check customed channel Id
    {"metadata": {"author": "Lewis", "sites": ["za"], "domain": "VIP"}}
    @za
    Scenario Outline:Check adsense query channel ID in ZA the view ad page
        Given a "car" Ad with location
        When user wait for ad active
        When user open current ad's VIP
        Then the web page should navigate to "VIP" page
        And user fetch the har log
        Then page should send <number> of <channelId> event on both screen
        @desktop
        Examples:
            | number | channelId |
            | "1"      | "0_D_5_VIP_3100003_1"|
        @mobile
        Examples:
            | number | channelId |
            | "2"      | "0_M_5_VIP_3100003_1"|

