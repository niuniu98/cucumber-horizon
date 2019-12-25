Feature: test mx re vip adsense
  {"metadata": {"author": "yuan huang", "device": "desktop, mobile", "domain": "VIP"}}
  @mx_vns
  Scenario Outline: check re vip adsense
  Given a live "house" Ad
  When user open current ad's VIP
  When user fetch the har log
  And user wait for "1" secs
  Then page should send <number> of <query> event on both screen
  @desktop
  Examples:
    | number | query |
    | "1"      | "post%20house%20for%20test%20insertion%20fee%20en%20Bustamante%2CEnsenada%2CBaja%20California%2CM%C3%A9xico%20en%20Inmuebles%20en%20venta"|
  @mobile
  Examples:
    | number | query |
    | "1"      | "post%20house%20for%20test%20insertion%20fee%20en%20Bustamante%2CEnsenada%2CBaja%20California%2CM%C3%A9xico%20en%20Inmuebles%20en%20venta"|
