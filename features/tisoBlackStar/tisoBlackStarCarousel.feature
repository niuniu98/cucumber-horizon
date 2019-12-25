Feature: test ZA tisoBlackStar carousel gallery show, and click the item then lead to VIP
  {"metadata": {"author": "Lewis", "device": "desktop, mobile"}}
  @za @desktop @mobile
  Scenario:
      Given a registered user
      Given "1" partner "car" Ads with features "topAd7"
      When user wait for "5" secs
      When user open "home""/widget/carousel?category=autos" page
      Then element "tisoBlackStarContent" is displayed on "both" screen
      When user click "TBSContentActiveItem" on "both" screen
      When user switch to next window on "both" screen
      Then the web page should navigate to "ViewAd" page
