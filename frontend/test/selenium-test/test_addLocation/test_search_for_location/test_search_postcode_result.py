from common import *

# Urls
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_postcode_search = url_org_man_loc.get('add').get('postcodeSearch')
url_add_postcode_search_results = url_org_man_loc.get('add').get('postcodeSearchResults')

def setup(browser):
    navigate_to_auth_page_via_index(browser, url_add_name)
    locationName = 'LOCATION_1'
    enter_input_text(browser, 'Location name', locationName)
    click_button(browser, 'Continue', url_add_search_option)
    select_input_radio_option(browser, 'UseAPostcode')
    click_button(browser, 'Continue', url_add_postcode_search)
    postcode = 'PO15 7AA'
    enter_input_text(browser, 'Postcode', postcode)
    click_button(browser, 'Continue', url_add_postcode_search_results)

def test_add_named_location_using_postcode(get_browser):
    setup(get_browser)
    assert "I cannot find the address" in get_browser.page_source