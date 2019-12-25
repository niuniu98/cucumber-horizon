@za
Feature: to check category bar function below search bar
    {
        "metadata":{
            "author": "Hallie",
            "device": [ "desktop","mobile" ],
            "sites": [ "za" ],
            "domain": "Header"
        }
    }
    @desktop
    Scenario: Check category menu below search bar on desktop on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_pnlLiquidCategoryBar" is displayed on "both" screen
        Then the number of "header_pnlCategoryLists" should ">" 4 on "both" screen
        Then check "innerText" of the element "header_lnkCategoryBarCarsText" should "equals" content Cars & Bakkies on "both" screen
        When user force browser to click "header_lnkCategoryBarCars" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1"
        When user move mouse "header_btnMoreCategories" on "both" screen
        Then element "header_ddCategoryList" is displayed on "both" screen
        Then the number of "header_pnlCategoryDropdown" should ">" 7 on "both" screen
        Then check "innerText" of the element "header_lnkCategoryEventsText" should "equals" content Events on "both" screen
        When user force browser to click "header_lnkCategoryEvents" on "both" screen
        Then the web page should navigate to "/s-events/v1c9067p1"
        When user open "SRP""/s-eastern-cape/v1l3100197p1" page
        When user force browser to click "header_lnkCategoryBarCars" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/eastern-cape/v1c9077l3100197p1"
        When user move mouse "header_btnMoreCategories" on "both" screen
        Then element "header_ddCategoryList" is displayed on "both" screen
        When user force browser to click "header_lnkCategoryEvents" on "both" screen
        Then the web page should navigate to "/s-events/eastern-cape/v1c9067l3100197p1"

    @mobile
    Scenario: Check category menu below search bar on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        Then element "header_pnlLiquidCategoryBar" is displayed on "both" screen
        Then the number of "header_pnlCategoryLists" should ">" 4 on "both" screen
        Then check "innerText" of the element "header_lnkCategoryBarCarsTextMobile" should "equals" content Cars on "both" screen
        When user force browser to click "header_lnkCategoryBarCars" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1"
        When user open "SRP""/s-eastern-cape/v1l3100197p1" page
        When user force browser to click "header_lnkCategoryBarCars" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/eastern-cape/v1c9077l3100197p1"

    @mobile
    Scenario: Be able to open and close category accordion popup on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user click "header_btnMoreCategories" on "both" screen
        Then check "class" of the element "header_pnlCategoryPopup" should "contains" content show-as-modal on "both" screen
        Then user should see text "Browse Categories" of the element "header_lblCategoryPopupTitle" on "both" screen
        When user click "header_btnCloseCategoryPopup" on "both" screen
        Then check "class" of the element "header_pnlCategoryPopup" should "notContains" content show-as-modal on "both" screen

    @mobile
    Scenario: Be able to go ALL Category SRP from category accordion popup on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupAllCategory" on "both" screen
        Then the web page should navigate to "/s-all-the-ads/v1b0p1"
        When user open "SRP""/s-eastern-cape/v1l3100197p1" page
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupAllCategory" on "both" screen
        Then the web page should navigate to "/s-eastern-cape/v1l3100197p"

    @mobile
    Scenario: Be able to expand and collapse L2 category list in the category accordion popup on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is displayed on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is not displayed on "both" screen

    @mobile
    Scenario: Be able to go L1 Category SRP from category accordion popup on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is displayed on "both" screen
        When user click "header_lnkCategoryPopupL1Automotive" on "both" screen
        Then the web page should navigate to "/s-automotive-vehicles/v1c5p1"
        When user open "SRP""/s-eastern-cape/v1l3100197p1" page
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is displayed on "both" screen
        When user click "header_lnkCategoryPopupL1Automotive" on "both" screen
        Then the web page should navigate to "s-automotive-vehicles/eastern-cape/v1c5l3100197p1"

    @mobile
    Scenario: Be able to go L2 Category SRP from category accordion popup on mobile on ZA site
        Given "Home" page is opened
        Given user a cookie with name "AB-CATEGORY-LIQUID" and value "true" on the site
        Given user a cookie with name "AB-HEADER-LIQUID" and value "true" on the site
        Given "Home" page is opened
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is displayed on "both" screen
        When user click "header_lnkCategoryPopupL2CarBakkies" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/v1c9077p1"
        When user open "SRP""/s-eastern-cape/v1l3100197p1" page
        When user click "header_btnMoreCategories" on "both" screen
        When user click "header_lnkCategoryPopupToggleL2OfAutomotive" on "both" screen
        Then element "header_pnlCategoryPopupL2OfAutomotive" is displayed on "both" screen
        When user click "header_lnkCategoryPopupL2CarBakkies" on "both" screen
        Then the web page should navigate to "/s-cars-bakkies/eastern-cape/v1c9077l3100197p1"


