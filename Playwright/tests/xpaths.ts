module.exports = {
    //Login
    login_home_header:                  "xpath=//ul[@class='header-links header-options']//a//span[contains(text(), 'Login')]",
    login_submit_button:                "xpath=//button[@type='submit']",
    login_submit_button_Rijksstudio:    "xpath=//input[@data-uitest='user-submit-login']",
    login_email_input:                  "xpath=//input[@id='email']",
    login_password_input:               "xpath=//input[@id='wachtwoord']",

    //Search results
    search_results_view_all:            "xpath=//h2[contains(text(),'Works of art')]//following-sibling::a",

    //Advanced search
    advanced_search_material:           "xpath=//input[@id='token-input-QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_Material']",
    advanced_search_searchbar:          "xpath=//input[@id='advanced-search-field']",

    //'task1_1_UI'
    search_results:                     "xpath=//p[@class='search-results-count']",

    //Profile settings
    profile_settings_profile_pic_input: "xpath=//input[contains(@accept,'image/jpeg')]",
    profile_settings_upload_profile:    "xpath=//a[@id='upload-file-button']",
    profile_settings_profile_pic_save:  "xpath=//label[text()='Choose your cutout']/parent::fieldset/following-sibling::fieldset//button[contains(text(),'Save')]",

    //You need a Rijksstudio account to save this work
    Rijksstudio_account_login_title:    "xpath=//h1[contains(text(),'you need a Rijksstudio')]",
    Rijksstudio_account_login_already_have_account:    "xpath=//button[contains(text(),'I already have a Rijksstudio')]",

    //Ticketshop
    select_ticketshop_button:           "xpath=//a[contains(text(),'Rijksmuseum tickets')]",
    add_adult_ticket_button:            "xpath=//button[@aria-label='Add one Entrance adult ticket']",
    select_ticket_tour_option:          "xpath=//span[contains(text(),'Museum entrance')]",
    select_last_timeslot_tour:          "xpath=//label[@for='block-time-option-20']",
    continue_Button_TicketShop:         "xpath=//button[@type='submit']/span[contains(text(),'Continue')]",
    input_FirstName_TicketForm:         "xpath=//input[@class='input-firstname']",
    input_LastName_TicketForm:          "xpath=//input[@id='PersonalDetails_LastName']",
    input_Email_TicketForm:             "xpath=//input[@id='PersonalDetails_Email']",
    input_Email_Conf_TicketForm:        "xpath=//input[@id='PersonalDetails_ConfirmEmail']",
    checkBox_Terms_Conditions:          "xpath=//label[@data-uitest='acceptterms']",
    title_Payment_Methods:              "xpath=//h2[text()='Payment method']",
    
    //Giftshop
    open_giftshop_home:                 "xpath=//li[@class='header-link']/a/span[contains(text(),'Giftshop')]",
    select_mizuno_category_giftshop:    "xpath=//a[contains(@title, 'mizuno')]",
    open_product_mizuno_wave_rider_27:  "xpath=//div[@class='product--actions']/../a[@title='Wave Rider 27' and contains(text(),'Wave Rider 27')]",
    add_product_to_shopping_cart:       "xpath=//button[@name='Add to shopping cart']",
    view_shopping_cart:                 "xpath=//a[@title='View shopping cart']",
  };