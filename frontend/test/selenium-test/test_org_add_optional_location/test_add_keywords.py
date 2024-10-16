from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addKeyInformation')
current_url  = url_org_man_loc.get('optionalLocation').get('addKeywords')
url_next_page = url_org_man_loc.get('optionalLocation').get('addActionPlan')

def add_keyword(get_browser, keyword):
    enter_input_text(get_browser, 'govuk-text-input', keyword, 'id')
    click_button(get_browser, 'Add keyword', current_url)

def add_keyword_success(get_browser, keyword):
    add_keyword(get_browser, keyword)
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{keyword}']")
    assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{keyword}']")

def add_keyword_fail(get_browser, keyword):
    add_keyword(get_browser, keyword)
    assert check_error_summary(get_browser)
    assert 'This keyword already exists' in get_browser.page_source
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{keyword}']")
    assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{keyword}']")

def check_keyword_added(get_browser, text):
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{text}']")
    assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{text}']")

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert check_h1_heading(get_browser, 'Keywords for this location (optional)')
    assert 'You can add new keywords. Or you can remove existing keywords associated with this location by unticking the relevant box.' in get_browser.page_source
    click_button(get_browser, 'Add keyword', current_url)

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', url_next_page)
    assert check_h1_heading(get_browser, 'Action plan (optional)')

def test_add_multiple_keywords(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    add_keyword_success(get_browser, 'North')
    add_keyword_success(get_browser, 'South')
    add_keyword_success(get_browser, 'East')
    add_keyword_success(get_browser, 'West')
    add_keyword_fail(get_browser, 'South')
    add_keyword_fail(get_browser, 'North')


