from common import *

# Urls
url_add_options = url_org_man_loc.get('add').get('options')
url_add_predefined_boundary = url_org_man_loc.get('add').get('predefinedBoundary').get('add')

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
    click_button(browser, 'Add predefined boundary', url_add_predefined_boundary)
    # TODO:
    # Need to fix this function because it does not appear to select the option
    select_dropdown_option(browser, 'BoundaryType', 'aoi-county')
    assert check_error_summary(browser)
