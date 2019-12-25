Feature: story to check recently viewed ad slide on HP
  @za @desktop @mobile @Riven @P2
  Scenario:Check the recently viewed ad slide on HP
      Given "home" page is opened
      Given user a cookie with name "AB-V2-HP" and value "true" on the site
      Given user a cookie with name "AB-RecentlyViewed" and value "true" on the site
      Given a live "car" Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given a live Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given a live "car" Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given a live Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given a live "car" Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given a live "car" Ad
      When user open current ad's VIP
      Then the web page should navigate to "ViewAd" page
      Given "home" page is opened
      Then the number of "hp_txfRecentlyViewedActiveAd" should "=" 4 on "landscape" screen
      Then the number of "hp_txfRecentlyViewedActiveAd" should "=" 2 on "portrait" screen
      When user save "text" of "hp_txfRecentlyViewedAdTitle" to param on "both" screen
      When user click "hp_txfRecentlyViewedNextBtn" on "both" screen
      Then the user should the "text" of "hp_txfRecentlyViewedAdTitle" content is "different" with saved one on "both" screen
      Then the number of "hp_txfRecentlyViewedActiveAd" should "=" 4 on "landscape" screen
      Then the number of "hp_txfRecentlyViewedActiveAd" should "=" 2 on "portrait" screen
      When user click "hp_txfRecentlyViewedPreBtn" on "both" screen
      Then the user should the "text" of "hp_txfRecentlyViewedAdTitle" content is "same" with saved one on "both" screen
