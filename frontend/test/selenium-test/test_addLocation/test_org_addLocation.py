from common import *

# Urls
url_add_options = url_org_add_loc.get('options')
url_address_info = url_org_add_loc.get('addressInfo')
url_upload_file = url_org_add_loc.get('uploadFile')

# Render add location page
def render_add_loc_page(browser):
    navigate_to_auth_page_via_index(browser, 'Organisation add location', url_add_options)
    assert check_h1_heading(browser, 'How do you want to add locations?')

# Render add address information page
def render_add_address_info_page(browser):
    select_input_radio_option(browser, 'BulkAddresses')
    click_button(browser, 'Continue')
    assert check_h1_heading(browser, 'How to upload a file with addresses and postcodes')
    assert not check_error_summary(browser)
    assert browser.current_url == url_address_info

# Render upload file page
def render_upload_file_page(browser):
    click_button(browser, 'Continue')
    assert check_h1_heading(browser, 'Upload file')
    assert browser.current_url == url_upload_file

# Test add location page render with no selection
def test_add_loc_no_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    click_button(browser, 'Continue')
    assert check_error_summary(browser)
    assert browser.current_url == url_add_options

# Test add location information page
def test_add_loc_address_selection(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)

# Test add location upload page
def test_add_loc_address_selection_upload_file(get_browser):
    browser = get_browser
    render_add_loc_page(browser)
    render_add_address_info_page(browser)
    render_upload_file_page(browser)

# Test unauthenticated access
def test_unauthenticated_access(get_browser):
    browser = get_browser
    browser.get(url_add_options)
    assert check_sign_back_in_page(browser)
    browser.get(url_address_info)
    assert check_sign_back_in_page(browser)
    browser.get(url_upload_file)
    assert check_sign_back_in_page(browser)


