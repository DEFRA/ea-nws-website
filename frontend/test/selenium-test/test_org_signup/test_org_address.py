from common import *

url_address = url_org_signup.get('address')
url_address_search = url_org_signup.get('addressSearch')

def test_empty_input(get_browser):
    browser = get_browser
    browser.get(url_address)
    # Empty input
    click_button(browser, 'Continue', url_address)
    assert "Enter a postcode in England, in the correct format, like KT3 3QQ" in browser.page_source
    # Invalid input
    enter_input_text(browser, 'Postcode', 'invalid postcode')
    click_button(browser, 'Continue', url_address)
    assert "Enter a postcode in the correct format, like KT3 3QQ" in browser.page_source
    # Valid input
    enter_input_text(browser, 'Postcode', 'KT3 3QQ')
    click_button(browser, 'Continue', url_address_search)