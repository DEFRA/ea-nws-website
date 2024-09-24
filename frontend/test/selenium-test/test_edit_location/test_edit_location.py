from common import *

url_next_page = url_org_man_loc.get('add').get('xyCoordinatesSearch')
url = url_org_man_loc.get('edit').get('options')


def setup(browser):
    navigate_to_auth_page_via_index(browser,url)

def test_page_loads(get_browser):
    browser =  get_browser
    setup(browser)
    assert 'How do you want to change the existing location?' in browser.page_source

def test_error_message_shows(get_browser):
    browser =  get_browser
    setup(browser)
    click_button(browser, 'Continue',url)
    assert 'Select how you want to edit locations' in browser.page_source

def test_error_dissapears_when_clicked(get_browser):
    browser =  get_browser
    setup(browser)
    click_button(browser, 'Continue',url)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    assert 'Select how you want to edit locations' not in browser.page_source

def test_next_page(get_browser):
    browser =  get_browser
    setup(browser)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    click_button(browser, 'Continue',url_next_page)
    # cant assert text yet as page is not there