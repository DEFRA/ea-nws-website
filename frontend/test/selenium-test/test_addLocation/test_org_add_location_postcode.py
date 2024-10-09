from common import *

# Urls
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_postcode_search = url_org_man_loc.get('add').get('postcodeSearch')
url_add_postcode_search_results = url_org_man_loc.get('add').get('postcodeSearchResults')

# Render add name page
def render_add_name_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_name)
    assert check_h1_heading(browser, 'What is the location name?')

# Render add postcode search page
def render_add_postcode_search_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_postcode_search)
    assert check_h1_heading(browser, 'What is the location\'s postcode?')

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

# Test add named location using postcode (no-alerts)
def test_add_named_location_using_postcode_no_alerts(get_browser):
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
# TODO: For some reason, click_link is unable to find the link in the line below
#    click_link(browser, 'Acro, Fusion 1, Parkway, Whiteley, Fareham, PO15 7AA', url_add_location_in_area_postcode_search_no_alerts)
#    assert 'Confirm Location' in browser.page_source
#    assert locationName in browser.page_source
#    assert '452947, 108919' in browser.page_source
#    assert 'Flood messages unavailable' in browser.page_source
    # TODO: Continue with this once more of the flow is complete
