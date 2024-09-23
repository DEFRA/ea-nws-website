from common import *

url_add_location_name = url_org_man_loc.get('add').get('name')
url_location_already_exists = url_org_man_loc.get('add').get('duplicateLocation')

def setup(browser,location_to_send):
    navigate_to_auth_page_via_index(browser,url_add_location_name)
    enter_input_text(browser,'Location name',location_to_send)
    click_button(browser,"Continue", url_location_already_exists)

def test_location_already_exists_renders(get_browser):
    browser = get_browser
    location_to_send = "Example location"
    setup(browser,location_to_send)
    assert f"{location_to_send} already exists in this account" in browser.page_source

def test_back_button(get_browser):
    browser = get_browser
    location_to_send = "Example location"
    setup(browser,location_to_send)
    click_link(browser,"Back", url_add_location_name)
    assert "What is the location name?" in browser.page_source



# do a test that checks it sends off to the right route 
# afet it is unblocked