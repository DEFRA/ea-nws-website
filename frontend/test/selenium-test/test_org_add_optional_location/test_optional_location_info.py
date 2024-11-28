from common import *

url = url_org_man_loc.get('optionalLocation').get('optionalInfo')
url_next_page = url_org_man_loc.get('optionalLocation').get('optionalAddress')

def test_optional_loc_page_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    assert check_h1_heading(get_browser, 'Add optional information for this location')

def test_do_later_link(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    click_link(get_browser, "I'll do this later", 'http://localhost:3000/')
    assert check_h1_heading(get_browser, 'Get flood warnings by text, phone or email')

def test_add_optional_info_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    click_button(get_browser,"Add optional information now",url_next_page)
    assert check_h1_heading(get_browser, 'What is the address?')
