Feature: testing trending keywords are displayed on onsite SRP properly
  {"metadata": {"author": "Lawrence", "device": "desktop, mobile", "domain": "SRP"}}
  @za @desktop @mobile
  Scenario: trending keywords are displayed on onsite SRP in Bethlehem location
      When user open "HOME""/s-cars-bakkies/bethlehem/bmw/v1c9077l3100456q0p1" page
      When user scroll down till end
      Then element "footer_TrendingList" is displayed on "both" screen
