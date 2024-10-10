from common import *
from selenium.webdriver.common.by import By
url = url_org_man_loc.get('optionalLocation').get('optionalInfo')
url_next_page = url_org_man_loc.get('optionalLocation').get('optionalAddress')

def test_optional_loc_page_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    assert "Add optional information for this location" in get_browser.page_source

def test_do_later_link(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    # common.py is set up to error with apostrophie in the link text
    element = get_browser.find_element(By.XPATH,f"//a[text()=\"I'll do this later\"]")
    get_browser.execute_script("arguments[0].scrollIntoView(true); arguments[0].click();",element)
    assert "Get flood warnings by text, phone or email" in get_browser.page_source

def test_add_optional_info_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,url)
    click_button(get_browser,"Add optional information now",url_next_page)
    assert "What is the address?" in get_browser.page_source