from common import *

url_current = url_org_man_loc.get('add').get('predefinedBoundary').get('optionalInfo')
url_next = url_org_man_loc.get('optionalLocation').get('addKeywords')

def test_optional_loc_page_render(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_current)
    assert check_h1_heading(get_browser, 'Useful information you can include to help you easily identify this location')
    assert 'Predefined boundary location added' in get_browser.page_source

def test_do_later_link(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_current)
    click_link(get_browser, "I'll do this later", 'http://localhost:3000/')
    assert check_h1_heading(get_browser, 'Get flood warnings by text, phone or email')

def test_add_useful_info_button(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_current)
    click_button(get_browser,"Add useful information now", url_next)
    assert check_h1_heading(get_browser, 'Keywords for this location (optional)')