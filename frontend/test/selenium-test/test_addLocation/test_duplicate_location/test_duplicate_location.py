from common import *

duplicateLocation_url = url_org_man_loc.get('error').get('alreadyExists')
location_name_page_url = url_org_man_loc.get('add').get('name')
#ToDo
# some tests cant be properly wrote due to bamboo not being able to upload
# csv files of locations to be added and will be awaiting regular location upload for tests to be properly written
# therefore functionality of the backend can not be tested in UI test at this point

def back_to_name_page(browser, method_of_backPage):
    navigate_to_auth_page_via_index(browser,location_name_page_url)
    # ToDo remake this so it adds a single location and tries to add again 
    browser.get(duplicateLocation_url)
    if method_of_backPage == "backLink":
        click_link(browser,"Back", location_name_page_url)
    else:
        click_link(browser, "use a different location name for this location", location_name_page_url)
    assert "What is the location name?" in browser.page_source


def test_page_load(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, duplicateLocation_url)
    assert "already exists in this account" in browser.page_source

def test_backLink(get_browser):
    browser = get_browser
    back_to_name_page(browser,"backLink")

def test_use_different_name_link(get_browser):
    browser = get_browser
    back_to_name_page(browser,"different name link")