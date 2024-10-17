from common import *

url_previous = url_org_man_loc.get('add').get('predefinedBoundary').get('optionalInfo')
url_current = url_org_man_loc.get('add').get('predefinedBoundary').get('addKeywords')
url_next = url_org_man_loc.get('add').get('predefinedBoundary').get('addActionPlan')

keywords_max = 50
keyword_error_max = 'You can add a maximum of 50 keywords'
keyword_char_max = 20
keyword_error_char_max = 'Keywords must be 20 characters of less'
keyword_error_duplicate = 'This keyword already exists'

def add_keyword(get_browser, keyword):
    enter_input_text(get_browser, 'govuk-text-input', keyword, 'id')
    click_button(get_browser, 'Add keyword', url_current)

def add_keyword_success(get_browser, keyword):
    add_keyword(get_browser, keyword)
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{keyword}']")
    assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{keyword}']")

def add_keyword_fail(get_browser, keyword, error):
    add_keyword(get_browser, keyword)
    assert check_error_summary(get_browser)
    assert error in get_browser.page_source
    if error == keyword_error_duplicate:
        assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='id{keyword}']")
        assert check_exists_by_xpath(get_browser, f"//input[@class='govuk-checkboxes__input' and @id='id{keyword}']")

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_current)
    assert check_h1_heading(get_browser, 'Keywords for this location (optional)')
    assert 'You can add new keywords. Or you can remove existing keywords associated with this location by unticking the relevant box.' in get_browser.page_source
    click_button(get_browser, 'Add keyword', url_current)

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_previous)
    click_button(get_browser, 'Add useful information now', url_current)
    click_link(get_browser, "Back", url_previous)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_current)
    click_button(get_browser, 'Continue', url_next)

def test_add_multiple_duplicate_keywords(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_current)
    add_keyword_success(get_browser, 'North')
    add_keyword_success(get_browser, 'South')
    add_keyword_success(get_browser, 'East')
    add_keyword_success(get_browser, 'West')
    add_keyword_fail(get_browser, 'South', keyword_error_duplicate)
    add_keyword_fail(get_browser, 'North', keyword_error_duplicate)
    click_button(get_browser, 'Continue', url_next)

def test_remove_multiple_keywords(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_current)
    add_keyword_success(get_browser, 'North')
    add_keyword_success(get_browser, 'South')
    add_keyword_success(get_browser, 'East')
    add_keyword_success(get_browser, 'West')
    click_checkbox(get_browser, 'idSouth')
    click_checkbox(get_browser, 'idEast')
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='idNorth']")
    assert not check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='idSouth']")
    assert not check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='idEast']")
    assert check_exists_by_xpath(get_browser, f"//label[@class='govuk-label govuk-checkboxes__label' and @for='idWest']")
    click_button(get_browser, 'Continue', url_next)

def test_max_keywords(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_current)
    for i in range(keywords_max):
        add_keyword_success(get_browser, 'keyword'+str(i))
    add_keyword_fail(get_browser, 'keyword51', keyword_error_max)

def test_max_char_keyword(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_current)
    long_keyword = "A" * (keyword_char_max+1)
    add_keyword_fail(get_browser, long_keyword, keyword_error_char_max)
