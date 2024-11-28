from common import *

url_previous = url_org_man_loc.get('add').get('predefinedBoundary').get('optionalInfo')
url_current = url_org_man_loc.get('optionalLocation').get('addKeywords')

# Only check back button as the rest of the functionality is tested in test_add_keywords.py
def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_previous)
    click_button(get_browser, 'Add useful information now', url_current)
    click_link(get_browser, "Back", url_previous)