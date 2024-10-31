from common import *

url_add_contact_details = url_org_man_cont.get('add').get('details')
url_next_page = 'http://localhost:3000/index'
too_long_input = 'this input s too long'
right_input = 'this input is justok'

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    assert 'Contact details' in get_browser.page_source
    assert 'First name' in get_browser.page_source
    assert 'Last name' in get_browser.page_source
    assert 'Job title (optional)' in get_browser.page_source
    assert 'Continue' in get_browser.page_source

def test_click_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    click_button(get_browser, 'Continue', url_add_contact_details)
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter first name' in get_browser.page_source
    assert 'Enter last name' in get_browser.page_source

def test_click_failure_input_firstname_too_long(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    enter_input_text(get_browser, 'First name', too_long_input)
    assert 'There is a problem' in get_browser.page_source
    assert 'First name must be 20 characters or less' in get_browser.page_source
    enter_input_text(get_browser, 'First name', right_input)
    assert 'There is a problem' not in get_browser.page_source
    assert 'First name must be 20 characters or less' not in get_browser.page_source

def test_click_failure_input_lastname_too_long(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    enter_input_text(get_browser, 'Last name', too_long_input)
    assert 'There is a problem' in get_browser.page_source
    assert 'Last name must be 20 characters or less' in get_browser.page_source
    enter_input_text(get_browser, 'Last name', right_input)
    assert 'There is a problem' not in get_browser.page_source
    assert 'Last name must be 20 characters or less' not in get_browser.page_source

def test_click_failure_input_jobtitle_too_long(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    enter_input_text(get_browser, 'Job title (optional)', too_long_input)
    assert 'There is a problem' in get_browser.page_source
    assert 'Job title must be 20 characters or less' in get_browser.page_source
    enter_input_text(get_browser, 'Job title (optional)', right_input)
    assert 'There is a problem' not in get_browser.page_source
    assert 'Job title must be 20 characters or less' not in get_browser.page_source

def test_click_continue_valid_no_jobtitle(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    enter_input_text(get_browser, 'First name', right_input)
    enter_input_text(get_browser, 'Last name', right_input)
    click_button(get_browser, 'Continue', url_next_page)

def test_click_continue_valid_with_jobtitle(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_add_contact_details)
    enter_input_text(get_browser, 'First name', right_input)
    enter_input_text(get_browser, 'Last name', right_input)
    enter_input_text(get_browser, 'Job title (optional)', right_input)
    click_button(get_browser, 'Continue', url_next_page)
