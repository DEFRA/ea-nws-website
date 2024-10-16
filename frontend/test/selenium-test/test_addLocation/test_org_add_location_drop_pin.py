from common import *

# Urls
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_drop_pin_search = url_org_man_loc.get('add').get('dropPinSearch')

# Render add name page
def render_add_name_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_name)
    assert check_h1_heading(browser, 'What is the location name?')

# Render add drop pin search page
def render_add_drop_pin_search_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_drop_pin_search)
    assert check_h1_heading(browser, 'How do you want to find the location on a map?')

# Test add drop pin search page with no input
def test_add_drop_pin_search_no_input(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with no place name
def test_add_drop_pin_search_no_place_name(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'PlaceName')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with invalid place name
def test_add_drop_pin_search_invalid_place_name(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'PlaceName')
    enter_input_text(browser, 'Enter a place name, town or postcode', '?')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with no town
def test_add_drop_pin_search_no_town(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'Town')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with invalid town
def test_add_drop_pin_search_invalid_town(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'Town')
    enter_input_text(browser, 'Enter a place name, town or postcode', '?')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with no postcode
def test_add_drop_pin_search_no_postcode(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'Postcode')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add drop pin search page with invalid postcode
def test_add_drop_pin_search_invalid_postcode(get_browser):
    browser = get_browser
    render_add_drop_pin_search_page(browser)
    select_input_radio_option(browser, 'Postcode')
    enter_input_text(browser, 'Enter a place name, town or postcode', '?')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    assert check_error_summary(browser)

# Test add named location using drop pin
def test_add_named_location_using_drop_pin(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'DropAPinOnAMap')
    click_button(browser, 'Continue', url_add_drop_pin_search)
    select_input_radio_option(browser, 'PlaceName')
    enter_input_text(browser, 'Enter a place name, town or postcode', 'stonehenge')
    # TODO: Need a new function in common.py to allow an item in the drop-down list
    #       to be clicked, e.g. 'Stonehenge Down, SP4'
    # TODO: Continue with this once more of the flow is complete
