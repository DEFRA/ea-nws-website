from common import *
url_current_page = url_org_man_admin.get('details')
url_next_page = url_org_man_admin.get('changeDetails')
url_contact_link = url_org_man_cont.get("add").get("details")

def test_page_loads(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    assert 'Manage administrator details' in browser.page_source

def test_change_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    click_link(browser,'Change',url_next_page)

def test_contactDetails_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    click_link(browser,"add yourself as a contact.",url_contact_link)
