from common import *

url = url_org_man_loc.get('edit').get('options')
url_next_page_xy_coordinates = url_org_man_loc.get('add').get('xyCoordinatesSearch')
url_next_page_drop_pin = url_org_man_loc.get('edit').get('dropPinEdit')


def test_page_loads(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    assert 'How do you want to change the existing location?' in browser.page_source

def test_error_message_shows(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    click_button(browser, 'Continue',url)
    assert 'Select if you want to use X and Y coordinates or drop a pin on a map' in browser.page_source

def test_error_dissapears_when_clicked(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    click_button(browser, 'Continue',url)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    assert 'Select if you want to use X and Y coordinates or drop a pin on a map' not in browser.page_source

def test_next_page_xy_coordinates(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    click_button(browser, 'Continue',url_next_page_xy_coordinates)
    # cant assert text yet as page is not there

def test_next_page_drop_pin(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser, url)
    select_input_radio_option(browser, 'idDrop a pin on a map','id')
    click_button(browser, 'Continue', url_next_page_drop_pin)
    assert 'Find location on a map' in browser.page_source
