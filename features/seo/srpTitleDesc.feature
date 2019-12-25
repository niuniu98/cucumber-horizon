Feature: SRP SEO title and description
  {"metadata": {"author": "lin du", "sites": ["mx"], "domain": "SEO"}}

    @mx_vns @desktop @mobile
  Scenario Outline: search a keyword under a category and a location

    Given user open "home"<url> page
    Then the page seo title is <title>
    And the page seo description is <description>

    Examples:
      | url    | title                                              | description |
      | "/s-venta-inmuebles/distrito-federal/bapi/v1c1097l1008q0p1"  | "Bapi en DF CDMX \| Vivanuncios Casas y Departamentos en venta" | "Encuentra bapi en DF CDMX en Vivanuncios, anuncios clasificados gratuitos \| Casas y Departamentos en venta "  |


    @mx_vns @desktop @mobile
  Scenario Outline: browse under a category and some attributes

    Given user open "home"<url> page
    Then the page seo title is <title>
    And the page seo description is <description>

    Examples:
      | url    | title                                              | description |
      | "/s-venta-inmuebles/v1c1097p1?dw=house,development"  | "Casas y Departamentos en venta en México \| Clasificados Vivanuncios" | "Encuentra Casas y Departamentos en venta en Vivanuncios México. En nuestro nuevo sitio web puedes hacer búsquedas, comparaciones, explorar fotos y encontrar lo que buscas rápidamente."  |
