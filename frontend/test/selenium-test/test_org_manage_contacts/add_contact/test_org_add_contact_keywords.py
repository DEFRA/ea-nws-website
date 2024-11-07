from common import *

previous_url = url_org_man_cont.get('add').get('details')
current_url = url_org_man_cont.get('add').get('keywords')
next_url = url_org_man_cont.get('add').get('channels')
too_long_input = 'this input s too long'
right_input = 'this input is justok'

def add_keyword(get_browser, keyword):
    enter_input_text(get_browser, 'govuk-text-input', keyword, 'id')
    click_button(get_browser, 'Add keyword', current_url)

def add_keyword_success(get_browser, keyword):
    add_keyword(get_browser, keyword)
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{keyword}']")
    assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{keyword}']")

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert check_h1_heading(get_browser, 'Add keywords for this contact (optional)')
    assert 'You can add new keywords. Or you can remove existing keywords by unticking the relevant box.' in get_browser.page_source
    assert 'Adding keywords for each contact can make it easier for you to filter and create lists of people you can link to locations to get relevant flood messages.' in get_browser.page_source
    click_button(get_browser, 'Add keyword', current_url)

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    enter_input_text(get_browser, 'First name', 'Test')
    enter_input_text(get_browser, 'Last name', 'Test')
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', next_url)
    # TODO assert next page
    # assert check_h1_heading(get_browser, 'Choose how you want')

def test_add_multiple_keywords(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    add_keyword_success(get_browser, 'North')
    add_keyword_success(get_browser, 'South')
    add_keyword_success(get_browser, 'East')
    add_keyword_success(get_browser, 'West')
    click_button(get_browser, 'Continue', next_url)
    # TODO assert next page
    # assert check_h1_heading(get_browser, 'Choose how you want')
    
# The AddKeywordLayout is tested extensively in test_add_keywords.py
