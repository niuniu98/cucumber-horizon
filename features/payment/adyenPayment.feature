Feature: test adyen flow for za site
    {"metadata": {"author": "Jojo", "sites": ["za"], "domain": "Payment"}}
  @za @desktop
  Scenario: check adyen payment normal flow works on za site
    Given a live "car" Ad
    Given a registered user open "home" page
    Given user a cookie with name "B20" and value "PAYMENT" on the site
    When user open payment page with features "topAd7,urgent7"
    Then user should see text "Order Summary" of the element "payment_txfOrderTitle" on "both" screen
    Then user should see text "BAPI post car ad for vip" of the element "payment_txfTitle2dot0" on "both" screen
    When user type text "10/20" in field "payment_expiryDate" on both screen
    When user click "payment_adyenCheckout" on "both" screen
    When user wait for "5" secs
    Then user should see text "Congratulations on Your Purchase!" of the element "payment_txfPaymentResultHeader" on "both" screen



    #When user click "postAd_btnPostAdEnabledButton3.0" on "both" screen
    # When user clickOn postAd_btnCancelPromoteBundle until element is not present on both screen
    # Then the web page should navigate to ViewAd page
    # When user click "vip_btnClosePostSuccessModal" on "both" screen
    # When user scroll "vip_txfAdLocation" into view on "both" screen
    # Then user should see text 'Polanco' of the element vip_txfAdLocation on both screen
