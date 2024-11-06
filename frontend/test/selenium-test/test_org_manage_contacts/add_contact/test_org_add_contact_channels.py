from common import *

current_url = url_org_man_cont.get('add').get('channels')
#TODO update previous and next pages
previous_url = ''
next_url = url_org_man_cont.get('add').get('notes')

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Choose how you want ' in get_browser.page_source
    assert 'You need to add at least 1 way for contacts to get sent flood messages.' in get_browser.page_source
    assert 'Email addresses (optional)' in get_browser.page_source
    assert 'UK mobile numbers for text messages (optional)' in get_browser.page_source
    assert 'UK telephone numbers for voice messages (optional)' in get_browser.page_source
    assert 'Continue' in get_browser.page_source

def test_click_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', current_url)
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter at least 1 email address, mobile number or telephone number' in get_browser.page_source

def test_click_continue_empty_error_disappears_when_input(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', current_url)
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter at least 1 email address, mobile number or telephone number' in get_browser.page_source
    enter_input_text(get_browser, 'Email addresses (optional)', 'valid@email.com')
    assert 'There is a problem' not in get_browser.page_source
    assert 'Enter at least 1 email address, mobile number or telephone number' not in get_browser.page_source

def test_click_failure_input_invalid_email(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'Email addresses (optional)', 'invalid')
    click_button(get_browser, 'Continue', current_url) 
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter email address 1 in the correct format, like name@example.com' in get_browser.page_source

def test_click_failure_input_invalid_mobile(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'UK mobile numbers for text messages (optional)', '0796857')
    click_button(get_browser, 'Continue', current_url) 
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter 1st UK mobile telephone number in the correct format' in get_browser.page_source

def test_click_failure_input_invalid_homephone(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    get_browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(2)
    enter_input_text(get_browser, 'UK telephone numbers for voice messages (optional)', '01631')
    click_button(get_browser, 'Continue', current_url) 
    assert 'There is a problem' in get_browser.page_source
    assert 'Enter 1st UK telephone number in the correct format' in get_browser.page_source

def test_click_continue_valid_1_input(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'Email addresses (optional)', 'valid@email.com')
    click_button(get_browser, 'Continue', next_url)

def test_click_continue_valid_one_of_each_input(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'Email addresses (optional)', 'valid@email.com')
    enter_input_text(get_browser, 'UK mobile numbers for text messages (optional)', '07887766655')
    get_browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(2)
    enter_input_text(get_browser, 'UK telephone numbers for voice messages (optional)', '01632960001')
    click_button(get_browser, 'Continue', next_url)   


