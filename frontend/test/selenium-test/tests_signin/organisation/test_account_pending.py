from common import *
import time
signin_url = url_org_signin.get('signin')
account_pending_url = url_org_signin.get('pending')
org_signup_url = url_org_signup.get('signup')

def setup(browser):
    browser.get(signin_url)
    enter_input_text(browser,'Email address',"invalid@email.com")
    click_button(browser,"Continue",account_pending_url)

def test_page_renders(get_browser):
    browser = get_browser
    setup(browser)
    assert 'Email address not recognised' in browser.page_source


def test_enter_email_again_link(get_browser):
    browser = get_browser
    setup(browser)
    click_link(browser,"entering your email again.", signin_url)
    assert "Sign in to your organisation's flood warnings account" in browser.page_source


def test_cit_signup_link(get_browser):
    browser = get_browser
    setup(browser)
    click_link(browser,"Get flood warnings by text, email or phone", url_cit_signup)
    assert "Enter an email address - you'll use this to sign in to your account" in browser.page_source
    

def test_org_signup_link(get_browser):
    browser = get_browser
    setup(browser)
    click_link(browser,"Get flood warnings for your organisation", org_signup_url)
    assert "Your organisation's name" in browser.page_source


def test_contact_us_link(get_browser):
    browser = get_browser
    setup(browser)
    click_link(browser,"contact us", url_contact)
    assert "Contact us" in browser.page_source

