Feature: story to check View ad page on Production
  @mx_vns
  Scenario Outline:Check the view ad page is working and components exist
      Given a live "car" Ad
      When user open "home""/s-venta-motos/v1c69p1" page
      Then the web page should navigate to "SRP" page
      When user click "srp_lnkFirstAdNew" on "both" screen
      When user switch to next window on "both" screen
      Then the web page should navigate to "ViewAd" page
      When user scroll down till end
      Then elements <elements> are displayed on "both" screen

      @desktop
      Examples:
          |elements			  |
          |"vip_txfMyAdsTitle,vip_txfAdDescription,vip_btnFavorite,vip_lnkSimilarAds,vip_pnlGoogleMap,vip_lnkSubmitReply,vip_lnkSharingFacebook,vip_lnkSharingFBMessenger,vip_lnkSharingEmail,vip_lnkSharingCopyLink"|

      @mobile
      Examples:
          |elements			  |
          |"vip_txfMyAdsTitle,vip_txfAdDescription,vip_btnFavorite,vip_lnkSimilarAds,vip_pnlGoogleMap,vip_lnkSharingFacebook,vip_lnkSharingFBMessenger,vip_lnkSharingWhatsApp,vip_lnkSharingEmail,vip_lnkSharingCopyLink"|
