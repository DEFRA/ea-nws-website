from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addKeyInformation')
current_url  = url_org_man_loc.get('optionalLocation').get('addKeywords')
url_next_page = url_org_man_loc.get('optionalLocation').get('addActionPlan')

def add_keyword(get_browser, keyword):
    enter_input_text(get_browser, 'govuk-text-input', keyword, 'id')
    click_button(get_browser, 'Add keyword', current_url)

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

def test_add_keyword(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    add_keyword(get_browser, 'Midlands')
    assert 'Midlands' in get_browser.page_source

