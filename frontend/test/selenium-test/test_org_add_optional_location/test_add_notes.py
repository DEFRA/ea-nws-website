import time
from common import *

# Urls
url_add_options = url_org_man_loc.get('add').get('options')
url_add_predefined_boundary = url_org_man_loc.get('add').get('predefinedBoundary').get('add')
url_action_plan= url_org_man_loc.get('optionalLocation').get('addActionPlan')
url_notes  = url_org_man_loc.get('optionalLocation').get('addNotes')
url_next_page = url_org_man_loc.get('add').get('predefinedBoundary').get('addAnother')

max_chars = 500
text_too_long = 'a' * (max_chars + 1)
text_just_right = 'b' * max_chars
text_under_req  = 'c' * (max_chars - 1)

def render_add_location_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_options)
    assert check_h1_heading(browser, 'How do you want to add locations?')

# When Continue is clicked on the Notes page, the next page is determined
# by the current flow. For these tests we will use the Add Predefined Boundary
# flow. This will allow us to know which page should be the next page when
# Continue is clicked.
def navigate_to_notes_page_via_boundary_flow(browser):
    render_add_location_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    select_dropdown_option(browser, 'BoundaryType', 'aoi-county')
    time.sleep(2)
    select_dropdown_option(browser, 'Boundary', 'Hampshire County')
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_action_plan)
    click_button(browser, 'Continue', url_notes)

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_notes)
    assert 'Notes (optional)' in get_browser.page_source
    assert 'Any notes that may be helpful to someone not familiar with this location.' in get_browser.page_source
    assert 'You can enter up to 500 characters' in get_browser.page_source

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser, url_action_plan)
    click_button(get_browser, 'Continue', url_notes)
    click_link(get_browser, "Back", url_action_plan)

def test_continue_empty(get_browser):
    navigate_to_notes_page_via_boundary_flow(get_browser)
    click_button(get_browser, 'Continue', url_next_page)

def test_continue_filled_text_length_just_right(get_browser):
    navigate_to_notes_page_via_boundary_flow(get_browser)
    enter_textarea_text(get_browser, 'govuk-textarea', text_just_right, 'id')
    click_button(get_browser, 'Continue', url_next_page)

def test_continue_filled_text_length_too_long_failure(get_browser):
    navigate_to_notes_page_via_boundary_flow(get_browser)
    enter_textarea_text(get_browser, 'govuk-textarea', text_too_long, 'id')
    click_button(get_browser, 'Continue', url_notes)
    assert check_error_summary(get_browser)

def test_continue_filled_text_length_under_req(get_browser):
    navigate_to_notes_page_via_boundary_flow(get_browser)
    enter_textarea_text(get_browser, 'govuk-textarea', text_under_req, 'id')
    click_button(get_browser, 'Continue', url_next_page)
