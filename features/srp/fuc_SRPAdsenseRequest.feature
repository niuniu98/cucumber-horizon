Feature: test mx normal SRP adsense
  {"metadata": {"author": "Lewis", "device": "desktop, mobile", "domain": "SRP"}}
  @mx_vns
  Scenario Outline: check normal SRP adsense
      When user open "home""/s-venta-motos/v1c69p1" page
      Then the web page should navigate to "SRP" page
      When user fetch the har log
      Then page should send <number> of <query> event on both screen
      @desktop
      Examples:
        | number | query |
        | "1"      | "M%C3%A9xico%20en%20Motos&adpage=1&adrep=3&r=m&client=ebay-vivanuncios-mx-search"|
      @mobile
      Examples:
        | number | query |
        | "1"      | "M%C3%A9xico%20en%20Motos&adpage=1&adrep=3&r=m&client=ebay-mobile-vivanuncios-mx"|
