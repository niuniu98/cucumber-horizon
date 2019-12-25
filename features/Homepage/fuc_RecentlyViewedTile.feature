Feature: story to check recently viewed ad tile on HP
  @za @desktop @mobile @Riven @P2
  Scenario:Check the recently viewed ad tile display on HP
      Given "home" page is opened
      Given user a cookie with name "AB-V2-HP" and value "true" on the site
      Given user a cookie with name "AB-RecentlyViewed" and value "true" on the site
#      Given "home" page is opened
#      Then element "hp_txfRecentlyViewedTitle" is not displayed on "both" screen
      Given a registered user open "Home" page
      Given a live "car" Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given "home" page is opened
#      Then element "hp_txfRecentlyViewedTitle" is not displayed on "both" screen
      When user force browser to click "hp_txfLogout2dot" on "both" screen
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given "home" page is opened
      Then user should see text "Recently Viewed" of the element "hp_txfRecentlyViewedTitle" on "both" screen
      Then user should see text "3 Photos" of the element "hp_txfRecentlyViewedAdPhotoCount" on "both" screen
      Then user should see text "BAPI post car ad for vip" of the element "hp_txfRecentlyViewedAdTitle" on "both" screen
      Then user should see text "R 488" of the element "hp_txfRecentlyViewedAdPrice" on "both" screen
      Then user should see text "East London" of the element "hp_txfRecentlyViewedAdLocText" on "both" screen
      Then elements "hp_lblRecentlyViewedAdImg,hp_txfRecentlyViewedAdLocIcon" are displayed on "both" screen
