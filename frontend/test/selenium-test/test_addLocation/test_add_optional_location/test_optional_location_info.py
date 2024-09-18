from common import *
from selenium.webdriver.common.by import By
url = url_org_man_loc.get('add').get('optionalInfo')
url_next_page = url_org_man_loc.get('add').get('optionalAddress')
def setup(browser):
    navigate_to_auth_page_via_index(browser,url)


def test_optional_loc_page_render(get_browser):
    browser = get_browser
    setup(browser)
    assert "Add optional information for this location" in browser.page_source

def test_do_later_link(get_browser):
    browser = get_browser
    setup(browser)
    # common.py is set up to error with apostrophie in the link text
    element = browser.find_element(By.XPATH,f"//a[text()=\"I'll do this later\"]")
    browser.execute_script("arguments[0].scrollIntoView(true); arguments[0].click();",element)
    assert "Get flood warnings by text, phone or email" in browser.page_source

def test_add_optional_info_button(get_browser):
    browser = get_browser
    setup(browser)
    click_button(browser,"Add optional information now",url_next_page)
    assert "What is the address?" in browser.page_source