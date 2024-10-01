from common import *

url = url_org_man_loc.get('optional').get('optionalAddress')
# change below when next page is added
url_next_page = "http://localhost:3000/"

def setup (browser):
    navigate_to_auth_page_via_index(browser,url)

def test_option_address_renders(get_browser):
    browser = get_browser
    setup(browser)
    assert browser.current_url == url
    assert "What is the address?" in browser.page_source

def test_proceed_with_no_optional_info(get_browser):
    browser = get_browser
    setup(browser)
    click_button(browser, "Continue", url_next_page )
    assert browser.current_url == url_next_page
    assert "Get flood warnings by text, phone or email" in browser.page_source

def test_postcode_error(get_browser):
    browser = get_browser
    setup(browser)
    element = browser.find_element(By.NAME,'Postcode (optional)')
    browser.execute_script("arguments[0].scrollIntoView(true);",element)
    element.send_keys("kt3")
    click_button(browser, 'Continue', url)
    assert "Enter a full postcode in England, in the correct format, like KT3 3QQ" in browser.page_source

def test_valid_postcode(get_browser):
    browser = get_browser
    setup(browser)
    element = browser.find_element(By.NAME,'Postcode (optional)')
    browser.execute_script("arguments[0].scrollIntoView(true);",element)
    element.send_keys("kt3 3qq")
    click_button(browser, 'Continue', url_next_page)