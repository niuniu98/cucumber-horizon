Feature: test mx vip scheduling view function
  {"metadata": {"author": "Carol", "device": "desktop, tablet, mobile", "domain": "VIP"}}
  @mx_vns @mobile @test
  Scenario: check vip scheduling view function for mx
      Given a live "house" Ad
      When user open current ad's VIP
      When user scroll "vip_lblSchedulingAppt" into view on "both" screen
      And user click "vip_lblSchedulingAppt" on "both" screen
      Then element "vip_txtReplyAvailableDate" is displayed on "both" screen
      Then element "vip_txtReplyAvailableTime" is not displayed on "both" screen
      When user type text "testName" in field "revip_txfReplyName" on both screen
      When user type text "test@ebay.com" in field "revip_txfReplyEmail" on both screen
      When user type text "06/06/2019" in field "vip_txtReplyAvailableDate" on both screen
      #Then element "cvip_txtReplyAvailableTime" is displayed on "both" screen
      #When user type text "17:00" in field "vip_txtReplyAvailableTime" on both screen
      When user type text "0123456789" in field "revip_txfReplyPhone" on both screen
      And user click "cvip_lblSubmitReplyButton" on "both" screen
      Then the web page url contains text "?replied" on "both" screen

