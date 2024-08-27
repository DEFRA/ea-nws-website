from common import *

# Urls
url_add_options = url_org_man_loc.get('add').get('options')
url_address_info = url_org_man_loc.get('add').get('addressInfo')
url_upload_file = url_org_man_loc.get('add').get('uploadFile')

# Render add location page
def render_add_loc_page(browser):
    navigate_to_auth_page_via_index(browser, 'Organisation add location', url_add_options)
    assert check_h1_heading(browser, 'How do you want to add locations?')

# Render add address information page
def render_add_address_info_page(browser):
    select_input_radio_option(browser, 'BulkAddresses')
    click_button(browser, 'Continue', url_address_info)
    assert check_h1_heading(browser, 'How to upload a file with addresses and postcodes')
    assert not check_error_summary(browser)

# Render upload file page
def render_upload_file_page(browser):
    click_button(browser, 'Continue', url_upload_file)
    assert check_h1_heading(browser, 'Upload file')

# Test add location page render with no selection
def test_add_loc_no_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    click_button(browser, 'Continue', url_add_options)
    assert check_error_summary(browser)

# Test add location information page
def test_add_loc_address_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)

# Test add location upload page and back links
def test_add_loc_address_selection_upload_file(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)
    render_upload_file_page(browser)
    click_link(browser, 'Back', url_address_info)
    click_link(browser, 'Back', url_add_options)

# Test unauthenticated access
def test_unauthenticated_access(get_browser):
    browser = get_browser
    browser.get(url_add_options)
    assert check_sign_back_in_page(browser)
    browser.get(url_address_info)
    assert check_sign_back_in_page(browser)
    browser.get(url_upload_file)
    assert check_sign_back_in_page(browser)


