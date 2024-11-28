from common import *

url_signin = url_org_signin.get('signin')
url_signin_validate = url_org_signin.get('validate')

def test_signInStart_render(get_browser):
    browser = get_browser
    browser.get(url_signin)
    assert "Sign in to your organisation's flood warnings account" in browser.page_source

def test_signInStart_backButton(get_browser):
    browser = get_browser
    browser.get(url_signin)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == url_signin

def test_signInStart_emptyEmail(get_browser):
    browser = get_browser
    browser.get(url_signin)
    browser.find_element(By.NAME, "Email address").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your email address" in browser.page_source
    assert browser.current_url == url_signin

def test_signInStart_incorrectFormatEmail(get_browser):
    browser = get_browser
    browser.get(url_signin)
    browser.find_element(By.NAME, "Email address").send_keys("invalid@.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source
    assert browser.current_url == url_signin

def test_signInStart_invalidEmail(get_browser):
    browser = get_browser
    browser.get(url_signin)
    browser.find_element(By.NAME, "Email address").send_keys("invalid@email.com")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Email address not recognised" in browser.page_source
    assert browser.current_url == url_signin

def test_signInStart_validEmail(get_browser):
    browser = get_browser
    browser.get(url_signin)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == url_signin_validate
