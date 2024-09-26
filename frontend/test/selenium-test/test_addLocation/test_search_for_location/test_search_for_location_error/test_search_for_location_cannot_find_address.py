from common import *

# Urls
url_add_name = url_org_man_loc.get('add').get('name')
url_add_search_option = url_org_man_loc.get('add').get('searchOption')
url_add_postcode_search = url_org_man_loc.get('add').get('postcodeSearch')
url_add_postcode_search_results = url_org_man_loc.get('add').get('postcodeSearchResults')
url_cannot_find_address = url_org_man_loc.get('error').get('cannotFindAddress')
url_map_search = 'http://localhost:3000/organisation/manage-locations/add' # update when map search added

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
    time.sleep(1)
    click_button(browser, 'I cannot find the address', url_cannot_find_address)

def test_render(get_browser):
    setup(get_browser)
    assert "If you cannot find the address:" in get_browser.page_source
    assert "This might be because the address is not recognised, for example it may be a new address, or it uses a building name instead of a street address." in get_browser.page_source
    assert "use a different postcode" in get_browser.page_source
    assert "find the location on a map" in get_browser.page_source

def test_back_button(get_browser):
    setup(get_browser)
    click_link(get_browser, "Back", url_add_postcode_search_results)

def test_click_differentpostcode_link(get_browser):
    setup(get_browser)
    click_link(get_browser, "use a different postcode", url_add_postcode_search)

def test_click_findonmap_link(get_browser):
    setup(get_browser)
    click_link(get_browser, "find the location on a map", url_map_search)