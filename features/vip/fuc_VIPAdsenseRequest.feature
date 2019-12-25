Feature: test mx normal vip adsense
  {"metadata": {"author": "yuan huang", "device": "desktop, mobile", "domain": "VIP"}}
  @mx_vns
  Scenario Outline: check normal vip adsense
  Given a live Ad
  When user open current ad's VIP
  When user fetch the har log
  Then page should send <number> of <query> event on both screen
  @desktop
  Examples:
    | number | query |
    | "1"      | "Redesign%20BAPI%20post%20an%20ad%20en%20Barrio%20La%20Concepci%C3%B3n%2CCoyoac%C3%A1n%2CDistrito%20Federal%2CM%C3%A9xico%20en%20Inmuebles"|
  @mobile
  Examples:
    | number | query |
    | "1"      | "Redesign%20BAPI%20post%20an%20ad%20en%20Barrio%20La%20Concepci%C3%B3n%2CCoyoac%C3%A1n%2CDistrito%20Federal%2CM%C3%A9xico%20en%20Inmuebles"|
