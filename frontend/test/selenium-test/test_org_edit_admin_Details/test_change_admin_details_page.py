from common import *
import time 

url_current_page = url_org_man_admin.get("changeDetails")
url_validate_email = url_org_man_admin.get('verifyEmail')
url_admin_details = url_org_man_admin.get("details")

def test_page_renders(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    assert 'Change administrator details' in browser.page_source

def test_email_error(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    enter_input_text(browser,"Email address", "invalid")
    click_button(browser,"Save",url_current_page)
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source


def test_change_name(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    enter_input_text(browser,"Full name", "new name")
    click_button(browser,"Save",url_admin_details)
    assert "Name changed" in browser.page_source

# admin validate email page tested in this test due to the fact an email must be passed here to test it
def test_change_email(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    enter_input_text(browser,"Email address", "updated@email.com")
    click_button(browser,"Save",url_validate_email)
    enter_input_text(browser,"Enter code","123456")
    click_button(browser,"Continue",url_admin_details)
    assert "Email address changed" in browser.page_source

def test_change_email_and_name(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_current_page)
    enter_input_text(browser,"Full name", "new name")
    enter_input_text(browser,"Email address", "updated@email.com")
    click_button(browser,"Save",url_validate_email)
    enter_input_text(browser,"Enter code","123456")
    click_button(browser,"Continue",url_admin_details)
    assert "Email address changed" in browser.page_source
    assert "Name changed" in browser.page_source
