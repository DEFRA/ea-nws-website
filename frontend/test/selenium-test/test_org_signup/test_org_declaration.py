from common import *
url_org_declaration = url_org_signup.get('declaration')
url_next_page = url_org_signup.get('review')
url_alt_contact_page = url_org_signup.get('alternativeContact')
freedom_info_url = 'https://www.gov.uk/make-a-freedom-of-information-request'
envrironmental_info_url = 'https://ico.org.uk/for-organisations/eir-and-access-to-information/guide-to-the-environmental-information-regulations/what-are-the-eir/'
data_protection_url = 'https://www.gov.uk/data-protection'

def test_page_loads(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    assert 'Check the terms and conditions' in browser.page_source

def test_error(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    click_button(browser,"Continue", url_org_declaration)
    assert "You must tick to confirm that you’ve read and are authorised to agree to these terms and conditions on behalf of your organisation" in browser.page_source

def test_error_disappear(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_alt_contact_page)
    enter_input_text(browser,'Full name','example')
    enter_input_text(browser,'Email address','example@valid.com')
    enter_input_text(browser,'Telephone number','07000000000')
    click_button(browser,"Continue", url_org_declaration)
    click_button(browser,"Continue", url_org_declaration)
    select_input_radio_option(browser,"T&C")
    click_button(browser,"Continue", url_next_page)
    assert 'Check your answers' in browser.page_source


def test_user_agrees(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_alt_contact_page)
    enter_input_text(browser,'Full name','example')
    enter_input_text(browser,'Email address','example@valid.com')
    enter_input_text(browser,'Telephone number','07000000000')
    click_button(browser,"Continue", url_org_declaration)
    select_input_radio_option(browser,"T&C")
    click_button(browser,"Continue", url_next_page)
    assert 'Check your answers' in browser.page_source


def test_freedom_of_info_act_link(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    click_link(browser,'Freedom of Information Act ',freedom_info_url)
    assert 'How to make a freedom of information (FOI) request' in browser.page_source

def test_envrironmental_info_link(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    click_link(browser, 'Environmental Information Regulations',envrironmental_info_url)

def test_data_protection_link(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    click_link(browser, 'Data Protection Act ', data_protection_url)
    assert 'Data protection ' in browser.page_source

def test_privacy_policy_link(get_browser):
    browser = get_browser
    browser.get(url_org_declaration)
    click_link(browser, 'privacy notice ', url_org_privacy_notice)
    assert 'Privacy notice' in browser.page_source