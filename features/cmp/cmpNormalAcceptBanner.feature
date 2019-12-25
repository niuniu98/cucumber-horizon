Feature: test cmp accept banner for desktop
    {"metadata": {"author": "yuan huang, Lewis", "sites": ["ie", "pl"], "domain": "CMP"}}

    @ie @pl @smoke @desktop @mobile
    Scenario:
        Given open "srp" page
        When user click "CMPManageButtonDesktop" on "landscape" screen
        When user click "CMPManageButtonMobile" on "portrait" screen
        Then the web page should navigate to "CMP" page
        Given open "srp" page
        When user click "CMPAcceptButtonDesktop" on "landscape" screen
        When user click "CMPAcceptButtonMobile" on "portrait" screen
        When user wait for "2" secs
        Then the cmp cookie should be existed
        When user refresh the current page
        Then element "CMPNotice" is not existed on "both" screen
