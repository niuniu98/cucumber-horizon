Feature: test oxxo for first user in mx payment page
    {"metadata": {"author": "Jojo", "sites": ["za"], "domain": "Payment"}}
  @mx_vns @desktop
  Scenario: check oxxo payment for user never pay with credit before
      Given a registered user open "home" page
      Given user a cookie with name "AB-PAYMENT-OXXO" and value "true" on the site
      Given open "PostAd" page
      When user type text "NEW POST MAP" in field "postAd_txfTitleInput3.0" on both screen
      When user select option "Servicios para el hogar" of "postAd_pnlL1Category3.0" on page
      When user select option "Herreros" of "postAd_pnlL2Category3.0" on page
      When user type text "polan" in field "postAd_txfLocationInput" on both screen
      When user wait for "2" secs
      When user click "postAd_txfPostMmapAutocomplete" on "both" screen
      When user upload 1 of default pictures to Post page
      When user click "postAd_btnPostAdEnabledButton3.0" on "both" screen
      When user click "bundle_btnBuildOwn" on "both" screen
      Then the web page should navigate to "postupsell" page
      Then user should see text "Seleccionar todo" of the element "postAd_lblPromoteSelectAll" on "both" screen
      When user click "postAd_lblPromoteSelectAll" on "both" screen
      Then user should see text "Desmarcar todo" of the element "postAd_lblPromoteDeselectAll" on "both" screen
      When user click "postAd_btnPromoteCheckoutWithPrice3.0" on "both" screen
      Then the web page should navigate to "payment2dot0" page
      Then user should see text "Pagos en OXXO (10 MXN comisión fija)" of the element "payment_rbOXXOPay" on "both" screen






    #When user click "postAd_btnPostAdEnabledButton3.0" on "both" screen
    # When user clickOn postAd_btnCancelPromoteBundle until element is not present on both screen
    # Then the web page should navigate to ViewAd page
    # When user click "vip_btnClosePostSuccessModal" on "both" screen
    # When user scroll "vip_txfAdLocation" into view on "both" screen
    # Then user should see text 'Polanco' of the element vip_txfAdLocation on both screen
