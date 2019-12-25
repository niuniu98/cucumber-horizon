Feature: test cmp manage page sorting and version check
    {"metadata": {"author": "yuan huang, Lewis", "sites": ["ie", "pl"], "domain": "CMP"}}

    @smoke @desktop @mobile
    Scenario Outline:
        Given open "srp" page
        When user click "CMPBannerLinkDesktop" on "landscape" screen
        When user click "CMPBannerLinkMobile" on "portrait" screen
        Then the web page should navigate to "CMP" page
        Then the version of vendor list should be the newest version
        Then the number of "CMPInformationBlock" should "=" 2 on "both" screen
        And the sort of content selection vendors should be alphabetic
        And all the toggle is off
        And some features detail <featureName> can be seen behind vendor name
        When user click "CMPHidePartnerLink" on "both" screen
        Then element "CMPContentSelection" is not displayed on "both" screen
        And the length of google partner is 1454
        When user click "CMPAcceptButton" on "both" screen
        Then the cmp cookie should be existed
    @ie
        Examples:
            | featureName |
            | Features: |
    @pl
        Examples:
            | featureName |
            | Cechy:    |

