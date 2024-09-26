from common import *

url_main_admin = url_org_signup.get('mainAdmin')
url_admin_details = url_org_signup.get('adminDetails')
url_duplicate_email = url_org_signup.get('duplicateEmail')
url_signin_validate = url_org_signin.get('validate')

def duplicate_email_render(browser, radioValue):
    browser = navigate_to_unauth_page_via_index(browser, url_main_admin)
    select_input_radio_option(browser, radioValue)
    click_button(browser, 'Continue', url_admin_details)
    enter_input_text(browser, 'Full name', 'FirstName LastName')
    enter_input_text(browser, 'Email address', 'duplicate@email.com')
    click_button(browser, 'Continue', url_duplicate_email)
    check_h1_heading(browser, 'The email address you entered is already being used')
    if (radioValue == 'adminRadio'):
        assert 'If this is your account, you can sign in by getting a code' in browser.page_source
        assert check_exists_by_xpath(browser, "//button[text()='Get code to sign in']")
    elif (radioValue == 'notAdminRadio'):
        assert 'If they already have an account, they can sign in and use the service.' in browser.page_source
        assert not check_exists_by_xpath(browser, "//button[text()='Get code to sign in']")
    return browser

def test_get_signin_code_button_admin(get_browser):
    browser = duplicate_email_render(get_browser, 'adminRadio')
    click_button(browser, 'Get code to sign in', url_signin_validate)

def test_enter_different_email_link_admin(get_browser):
    browser = duplicate_email_render(get_browser, 'adminRadio')
    click_link(browser, 'Go back and enter a different email address', url_admin_details)

def test_enter_different_email_link_not_admin(get_browser):
    browser = duplicate_email_render(get_browser, 'notAdminRadio')
    click_link(browser, 'Go back and enter a different email address', url_admin_details)

def test_back_link_admin(get_browser):
    browser = duplicate_email_render(get_browser, 'adminRadio')
    click_link(browser, 'Back', url_admin_details)

def test_back_link_not_admin(get_browser):
    browser = duplicate_email_render(get_browser, 'notAdminRadio')
    click_link(browser, 'Back', url_admin_details)