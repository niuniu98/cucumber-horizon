Feature: Show error code in error page
    {"metadata": {"author": "spliu", "domain": "Error"}}
    @desktop @mobile @mx_vns @za @ie
    # @sg @pl is waiting for R2N VIP fully released
    Scenario: Check error code in 404 error page
        Given open "errorV2" page
        Then user should see text "404" of the element "error-code" on "both" screen
