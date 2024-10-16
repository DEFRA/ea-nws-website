from common import *

url = url_org_man_loc.get('edit').get('cannot_change_location_line')

def test_render(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    assert 'You cannot change the location of a line manually in this account' in browser.page_source
    assert 'If you want to change the location of the line your organisation has created, you need to upload the new location as a shapefile in a .zip file.' in browser.page_source