Feature: To check Logo alt tag on marko home page
  {"metadata": {"author": "yuki", "sites": ["mx"], "domain": "Header"}}

    @mx_vns @desktop
  Scenario Outline: Check Logo alt tag on marko home page

    Given open "home" page
    Then check "title" of the element "hp_lnkLogoTag" should "contains" content <titleCotent> on "landscape" screen
    Then check "title" of the element "hp_lnkLogo3.0" should "contains" content <titleCotent> on "portrait" screen
    @desktop
        Examples:
            | titleCotent |
            | Clasificados Gratis Vivanuncios |
    @mobile
        Examples:
            | titleCotent |
            | Clasificados Gratis Vivanuncios |

