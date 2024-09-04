from common import *

url_main_admin = url_org_signup.get('mainAdmin')
url_admin_details = url_org_signup.get('adminDetails')
url_duplicate_email = url_org_signup.get('duplicateEmail')
url_signin_validate = url_org_signin.get('validate')

def duplicate_email_render(browser):
    browser = navigate_to_unauth_page_via_index(browser, url_main_admin)
    select_input_radio_option(browser, 'adminRadio')
    click_button(browser, 'Continue', url_admin_details)
    enter_input_text(browser, 'Full name', 'FirstName LastName')
    enter_input_text(browser, 'Email address', 'duplicate@email.com')
    click_button(browser, 'Continue', url_duplicate_email)
    check_h1_heading(browser, 'The email address you entered is already being used')
    return browser

def test_get_signin_code_button(get_browser):
    browser = duplicate_email_render(get_browser)
    click_button(browser, 'Get code to sign in', url_signin_validate)

def test_enter_different_email_link(get_browser):
    browser = duplicate_email_render(get_browser)
    click_link(browser, 'Go back and enter a different email address', url_admin_details)
