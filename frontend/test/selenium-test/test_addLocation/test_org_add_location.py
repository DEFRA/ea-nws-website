from common import *

# Urls
url_add_options = url_org_man_loc.get('add').get('options')
url_address_info = url_org_man_loc.get('add').get('addressInfo')
url_upload_file = url_org_man_loc.get('add').get('uploadFile')
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_postcode_search = url_org_man_loc.get('add').get('postcodeSearch')
url_add_postcode_search_results = url_org_man_loc.get('add').get('postcodeSearchResults')

# Render add location page
def render_add_loc_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_options)
    assert check_h1_heading(browser, 'How do you want to add locations?')

# Render add address information page
def render_add_address_info_page(browser):
    select_input_radio_option(browser, 'BulkAddresses')
    click_button(browser, 'Continue', url_address_info)
    assert check_h1_heading(browser, 'How to upload a file with addresses and postcodes')
    assert not check_error_summary(browser)

# Render upload file page
def render_upload_file_page(browser):
    click_button(browser, 'Continue', url_upload_file)
    assert check_h1_heading(browser, 'Upload file')

# Render add name page
def render_add_name_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_name)
    assert check_h1_heading(browser, 'What is the location name?')

# Render add postcode search page
def render_add_postcode_search_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_postcode_search)
    assert check_h1_heading(browser, 'What is the location\'s postcode?')

# Test add location page render with no selection
def test_add_loc_no_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    click_button(browser, 'Continue', url_add_options)
    assert check_error_summary(browser)

# Test add location information page
def test_add_loc_address_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)

# Test add location upload page and back links
def test_add_loc_address_selection_upload_file(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)
    render_upload_file_page(browser)
    click_link(browser, 'Back', url_address_info)
    click_link(browser, 'Back', url_add_options)

# Test unauthenticated access
def test_unauthenticated_access(get_browser):
    browser = get_browser
    browser.get(url_add_options)
    assert check_sign_back_in_page(browser)
    browser.get(url_address_info)
    assert check_sign_back_in_page(browser)
    browser.get(url_upload_file)
    assert check_sign_back_in_page(browser)

# Test add name page with no name
def test_add_name_no_name(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    click_button(browser, 'Continue', url_add_name)
    assert check_error_summary(browser)

# Test add name page with name that is too long
def test_add_name_too_long(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    # This assumes maximum length of location name is 50 chars
    enter_input_text(browser, 'Location name', 51 * 'X')
    click_button(browser, 'Continue', url_add_name)
    assert check_error_summary(browser)

# Test add search option page with no option selected
def test_add_search_option_no_selection(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    click_button(browser, 'Continue', url_add_search_option)
    assert check_error_summary(browser)

# Test add postcode search page with no postcode
def test_add_postcode_search_no_postcode(get_browser):
    browser = get_browser
    render_add_postcode_search_page(browser)
    click_button(browser, 'Continue', url_add_postcode_search)
    assert check_error_summary(browser)

# Test add postcode search page with invalid postcode
def test_add_postcode_search_invalid_postcode(get_browser):
    browser = get_browser
    render_add_postcode_search_page(browser)
    enter_input_text(browser, 'Postcode', 'Xyzzy')
    click_button(browser, 'Continue', url_add_postcode_search)
    assert check_error_summary(browser)

# Test add named location using postcode
def test_add_named_location_using_postcode(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'UseAPostcode')
    click_button(browser, 'Continue', url_add_postcode_search)
    postcode = 'PO15 7AA'
    enter_input_text(browser, 'Postcode', postcode)
    click_button(browser, 'Continue', url_add_postcode_search_results)
    assert check_h1_heading(browser, 'Select an address')
    assert 'Postcode: ' + postcode in browser.page_source
    # TODO: Continue with this once more of the flow is complete
