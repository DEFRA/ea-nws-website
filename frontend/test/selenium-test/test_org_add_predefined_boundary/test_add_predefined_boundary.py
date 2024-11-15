from common import *

# Urls
url_add_options = url_org_man_loc.get('add').get('options')
url_add_predefined_boundary = url_org_man_loc.get('add').get('predefinedBoundary').get('add')
url_add_optional_information_action_plan = url_org_man_loc.get('optionalLocation').get('addActionPlan')
url_add_optional_information_notes = url_org_man_loc.get('optionalLocation').get('addNotes')
url_add_another_predefined_boundary = url_org_man_loc.get('add').get('predefinedBoundary').get('addAnother')
url_view_details = url_org_man_loc.get('view').get('details')
url_view_dashboard = url_org_man_loc.get('view').get('dashboard')

# Render add location page
def render_add_loc_page(browser):
    navigate_to_auth_page_via_index(browser, url_add_options)
    assert check_h1_heading(browser, 'How do you want to add locations?')

# Test add location page render with no selection
def test_add_loc_no_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    click_button(browser, 'Continue', url_add_options)
    assert check_error_summary(browser)

# Test add predefined boundary with no selection
def test_add_predefined_boundary_no_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    click_button(browser, 'Add predefined boundary', url_add_predefined_boundary)
    assert check_error_summary(browser)

# Test add predefined boundary with no boundary selected
def test_add_predefined_boundary_no_boundary_selected(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    select_dropdown_option(browser, 'BoundaryType', 'aoi-county')
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_predefined_boundary)
    assert check_error_summary(browser)

# Test add predefined boundary with single boundary selected
def test_add_predefined_boundary_single(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    boundary_type = 'aoi-county'
    select_dropdown_option(browser, 'BoundaryType', boundary_type)
    time.sleep(2)
    boundary = 'Hampshire County'
    select_dropdown_option(browser, 'Boundary', boundary)
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_optional_information_action_plan)
    click_button(browser, 'Continue', url_add_optional_information_notes)
    click_button(browser, 'Continue', url_add_another_predefined_boundary)
    click_link(browser, "I'm finished", url_view_details)
    assert boundary_type + ', ' + boundary in browser.page_source

# Test add predefined boundary with multiple boundaries selected (same type)
def test_add_predefined_boundary_multiple_same_type(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    boundary_type = 'aoi-county'
    select_dropdown_option(browser, 'BoundaryType', boundary_type)
    time.sleep(2)
    boundary = 'Hampshire County'
    select_dropdown_option(browser, 'Boundary', boundary)
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_optional_information_action_plan)
    click_button(browser, 'Continue', url_add_optional_information_notes)
    click_button(browser, 'Continue', url_add_another_predefined_boundary)
    click_button(browser, "Add predefined boundary", url_add_predefined_boundary)
    assert 'Add predefined boundary' in browser.page_source
    boundary = 'West Sussex County'
    time.sleep(2)
    select_dropdown_option(browser, 'Boundary', boundary)
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_optional_information_action_plan)
    click_button(browser, 'Continue', url_add_optional_information_notes)
    click_button(browser, 'Continue', url_add_another_predefined_boundary)
    click_link(browser, "I'm finished", url_view_dashboard)
    assert "Your organisation's locations" in browser.page_source

# Test add predefined boundary with multiple boundaries selected (different types)
def test_add_predefined_boundary_multiple_different_types(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    select_input_radio_option(browser, 'PredefinedBoundaries')
    click_button(browser, 'Continue', url_add_predefined_boundary)
    boundary_type = 'aoi-county'
    select_dropdown_option(browser, 'BoundaryType', boundary_type)
    time.sleep(2)
    boundary = 'Hampshire County'
    select_dropdown_option(browser, 'Boundary', boundary)
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_optional_information_action_plan)
    click_button(browser, 'Continue', url_add_optional_information_notes)
    click_button(browser, 'Continue', url_add_another_predefined_boundary)
    click_button(browser, "Add predefined boundary", url_add_predefined_boundary)
    assert 'Add predefined boundary' in browser.page_source
    time.sleep(2)
    boundary_type = 'aoi-police-force-boundary'
    select_dropdown_option(browser, 'BoundaryType', boundary_type)
    time.sleep(2)
    boundary = 'Thames Valley'
    select_dropdown_option(browser, 'Boundary', boundary)
    time.sleep(2)
    click_button(browser, 'Add predefined boundary', url_add_optional_information_action_plan)
    click_button(browser, 'Continue', url_add_optional_information_notes)
    click_button(browser, 'Continue', url_add_another_predefined_boundary)
    click_link(browser, "I'm finished", url_view_dashboard)
    assert "Your organisation's locations" in browser.page_source
