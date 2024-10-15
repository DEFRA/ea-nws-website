from common import *
import time
# Urls
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_xy_coordinates_search = url_org_man_loc.get('add').get('xyCoordinatesSearch')
url_add_xy_coordinates_not_in_england = url_org_man_loc.get('add').get('xyCoordinatesNotInEngland')
url_add_location_in_area_xy_coordinates_search_no_alerts = url_org_man_loc.get('add').get('locationInArea') + '/xy-coordinates-search/no-alerts'
url_add_location_in_area_xy_coordinates_search_all = url_org_man_loc.get('add').get('locationInArea') + '/xy-coordinates-search/all'
url_add_location_in_area_xy_coordinates_search_alerts = url_org_man_loc.get('add').get('locationInArea') + '/xy-coordinates-search/alerts'

# Render add name page
def render_add_name_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_name)
    assert check_h1_heading(browser, 'What is the location name?')

# Render add xy coordinates search page
def render_add_xy_coordinates_search_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_xy_coordinates_search)
    assert check_h1_heading(browser, 'What are the X and Y coordinates?')



# Test add xy coordinate search page with no coordinates
def test_add_xy_coordinate_search_no_coordinates(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with no x coordinate
def test_add_xy_coordinate_search_no_x_coordinate(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'Y coordinate', '123')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with x coordinate non-numeric
def test_add_xy_coordinate_search_x_coordinate_non_numeric(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'X coordinate', 'ABC')
    enter_input_text(browser, 'Y coordinate', '123')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with x coordinate out of range
def test_add_xy_coordinate_search_x_coordinate_out_of_range(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'X coordinate', '700001')
    enter_input_text(browser, 'Y coordinate', '123')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with no y coordinate
def test_add_xy_coordinate_search_no_y_coordinate(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'X coordinate', '123')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with y coordinate non-numeric
def test_add_xy_coordinate_search_y_coordinate_non_numeric(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'X coordinate', '123')
    enter_input_text(browser, 'Y coordinate', 'ABC')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add xy coordinate search page with y coordinate out of range
def test_add_xy_coordinate_search_y_coordinate_out_of_range(get_browser):
    browser = get_browser
    render_add_xy_coordinates_search_page(browser)
    enter_input_text(browser,'Y coordinate',"")
    enter_input_text(browser,'X coordinate',"")
    enter_input_text(browser, 'X coordinate', '123')
    enter_input_text(browser, 'Y coordinate', '1300001')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    assert check_error_summary(browser)

# Test add named location using xy coordinates (no-alerts)
def test_add_named_location_using_xy_coordinates_no_alerts(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'UseXAndYCoordinates')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    x = '465373'
    y = '101250'
    enter_input_text(browser, 'X coordinate', x)
    enter_input_text(browser, 'Y coordinate', y)
    click_button(browser, 'Continue', url_add_location_in_area_xy_coordinates_search_no_alerts)
    assert 'Confirm Location' in browser.page_source
    assert locationName in browser.page_source
    assert x + ', ' + y in browser.page_source
    assert 'Move the pin on the map' in browser.page_source
    assert 'Use different X and Y coordinates' in browser.page_source
    assert 'Flood messages unavailable' in browser.page_source
    # TODO: Continue with this once more of the flow is complete

def test_add_named_location_using_xy_coordinates_all(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'UseXAndYCoordinates')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    x = '530270'
    y = '179545'
    enter_input_text(browser, 'X coordinate', x)
    enter_input_text(browser, 'Y coordinate', y)
    click_button(browser, 'Continue', url_add_location_in_area_xy_coordinates_search_all)
    assert 'Confirm Location' in browser.page_source
    assert locationName in browser.page_source
    assert x + ', ' + y in browser.page_source
    assert 'Move the pin on the map' in browser.page_source
    assert 'Use different X and Y coordinates' in browser.page_source
    assert 'All flood messages available' in browser.page_source
    # TODO: Continue with this once more of the flow is complete

# Test add named location using xy coordinates (alerts)
def test_add_named_location_using_xy_coordinates_alerts(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'UseXAndYCoordinates')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    x = '520814'
    y = '185016'
    enter_input_text(browser, 'X coordinate', x)
    enter_input_text(browser, 'Y coordinate', y)
    click_button(browser, 'Continue', url_add_location_in_area_xy_coordinates_search_alerts)
    assert 'Confirm Location' in browser.page_source
    assert locationName in browser.page_source
    assert x + ', ' + y in browser.page_source
    assert 'Move the pin on the map' in browser.page_source
    assert 'Use different X and Y coordinates' in browser.page_source
    assert 'Severe flood warnings and flood warnings unavailable' in browser.page_source
    # TODO: Continue with this once more of the flow is complete

# Test add named location using xy coordinates not in england followed by
# returning to try a different set of xy coordinates.
def test_add_named_location_using_xy_coordinates_not_in_england(get_browser):
    browser = get_browser
    render_add_name_page(browser)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    assert 'How do you want to find ' + locationName + '?' in browser.page_source
    select_input_radio_option(browser, 'UseXAndYCoordinates')
    click_button(browser, 'Continue', url_add_xy_coordinates_search)
    x = '0'
    y = '0'
    enter_input_text(browser, 'X coordinate', x)
    enter_input_text(browser, 'Y coordinate', y)
    click_button(browser, 'Continue', url_add_xy_coordinates_not_in_england)
    assert check_h1_heading(browser, 'This location is not in England and cannot be added to this account')
    click_link(browser, "Back", url_add_xy_coordinates_search)
