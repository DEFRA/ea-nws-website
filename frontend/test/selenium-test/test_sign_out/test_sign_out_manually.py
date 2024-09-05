from common import *

# CITIZEN TESTS
# Test signout and signin buttons
def test_cit_signout_signin_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_cit_home)
    click_link(browser, 'Sign Out', url_cit_signout)
    click_button(browser, 'Sign in', url_cit_signin)

# Test flood link
def test_cit_flood_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_cit_home)
    click_link(browser, 'Sign Out', url_cit_signout)
    click_link(browser, 'protect yourself and your property online from flooding', url_flood)

# Test feedback link
def test_cit_feedback_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_cit_home)
    click_link(browser, 'Sign Out', url_cit_signout)
    click_link(browser, 'What do you think of this service?', url_feedback)

# ORGANISATION TESTS
# Test signout and signin button
def test_org_signout_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_org_home)
    click_link(browser, 'Sign Out', url_org_signout)
    assert "More about flooding" not in browser.page_source
    click_button(browser, 'Sign in', url_org_signin)

# Test feedback link
def test_org_feedback_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_org_home)
    click_link(browser, 'Sign Out', url_org_signout)
    click_link(browser, 'What do you think of this service?', url_feedback)