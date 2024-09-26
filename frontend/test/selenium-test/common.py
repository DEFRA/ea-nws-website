from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time

# Local host
local_host = 'http://localhost:3000'

# GOV.UK URLs
url_flood = 'https://www.gov.uk/browse/environment-countryside/flooding-extreme-weather'

# Common URLs
url_contact = local_host + '/contact'
url_feedback = local_host + '/signup/feedback'
url_index = local_host + '/index'

# Citizen URLs
url_cit_contacts = local_host + '/managecontacts'
url_cit_signup = local_host + '/signup'
url_cit_signin = local_host + '/signin'
url_cit_signin_val = local_host + '/signin/validate'
url_cit_sign_back_in = local_host + '/sign-back-in'
url_cit_home = local_host + '/home'
url_cit_account = local_host + '/account'
url_cit_signout = local_host + '/signout'
url_cit_signout_auto = local_host + '/signout-auto'

# ORGANISATION URLS
url_org = local_host + '/organisation'
url_org_home = url_org + '/home'
# Signup urls
url_org_signup_path = url_org + '/sign-up'
url_org_signup = {
    'signup': url_org_signup_path,
    'address': url_org_signup_path + '/address',
    'addressSearch': url_org_signup_path + '/address-search',
    'number': url_org_signup_path + '/number',
    'sector': url_org_signup_path + '/sector',
    'mainAdmin': url_org_signup_path + '/main-admin',
    'adminDetails': url_org_signup_path + '/admin-details',
    'duplicateEmail': url_org_signup_path + '/admin-email-duplicate',
    'duplicateOrg': url_org_signup_path + '/duplicate',
    'alternativeContact': url_org_signup_path + '/alternative-contact',
    'review': url_org_signup_path + '/review',
    'success': url_org_signup_path + '/success'
}
# Signin urls
url_org_signin_path = url_org + '/signin'
url_org_signin = {
    'signin': url_org_signin_path,
    'validate': url_org_signin_path + '/validate',
    'signBackIn': url_org + '/sign-back-in'
}
# Signout urls
url_org_signout = {
    'signout': url_org + '/signout',
    'auto': url_org + '/signout-auto'
}
# Manage locations
url_org_man_loc_path = url_org + '/manage-locations'
url_org_man_loc = {
    'manageLocations': url_org_man_loc_path,
    'add': {
        'options': url_org_man_loc_path + '/add',
        'addressInfo': url_org_man_loc_path + '/add/address-info',
        'uploadFile': url_org_man_loc_path + '/add/upload-file',
        'uploadTemplate': 'http://d39yn09rf1d1o9.cloudfront.net/template.csv',
        'name': url_org_man_loc_path + '/add/name',
        'searchOption': url_org_man_loc_path + '/add/search-option',
        'postcodeSearch': url_org_man_loc_path + '/add/postcode-search',
        'postcodeSearchResults': url_org_man_loc_path + '/add/postcode-search-results',
        'optionalInfo': url_org_man_loc_path + '/add/optional-location-info',
        'optionalAddress': url_org_man_loc_path + '/add/optional-address'
    },
    'error': {
        'cannotFindAddress': url_org_man_loc_path + '/add/cannot-find-address',
    },
    'change': {
        'alternative_contact': local_host + '/',
        'org_details':  local_host + '/',
        'main_admin': local_host + '/'
    }
}

# PAGE NAVIGATION
# Navigate to authenticated page via index page and check url
def navigate_to_auth_page_via_index(browser, url_target, mock_session=1):
    browser.get(url_index)
    button_text = 'Activate/Deactivate Mock Session ' + str(mock_session)
    click_button(browser, button_text, url_index)
    browser.get(url_target)
    assert browser.current_url == url_target

# Navigate to unauthenticated page via index page and check url
def navigate_to_unauth_page_via_index(browser, url_target):
    browser.get(url_index)
    button_text = 'Activate/Deactivate Empty profile - Used for sign up tests'
    click_button(browser, button_text, url_index)
    browser.get(url_target)
    assert browser.current_url == url_target
    return browser

# CLICK / SELECT
# Click on a button and check url
def click_button(browser, button_text, url_button):
    button_xpath = f"//button[text()='{button_text}']"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(1)
    assert browser.current_url == url_button

# Click on link text and check url
def click_link(browser, link_text, url_link):
    link_xpath = f"//a[text()=\"{link_text}\"]"
    link_element = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_element)
    time.sleep(1)
    assert browser.current_url == url_link

# Click on link text and check url - for when there is more than one occurence of the same text
def click_link_more_than_one_text(browser, link_text, link_text_iteration, url_link):
    link_xpath = f"(//a[text()='{link_text}'])[{link_text_iteration}]"
    link_element = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_element)
    time.sleep(1)
    assert browser.current_url == url_link

# Select input radio option
def select_input_radio_option(browser, value, key='value'):
    input_radio_xpath = f"//input[@{key}='{value}']"
    input_radio_element = browser.find_element(By.XPATH, input_radio_xpath)
    browser.execute_script("arguments[0].click();", input_radio_element)

# ENTER TEXT
# Enter input in text box
def enter_input_text(browser, value, input_text, key='name'):
    input_xpath = f"//input[@{key}='{value}']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.clear()
    input_element.send_keys(input_text)

# CHECKS
# Check if xpath exists
def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

# Check h1 heading
def check_h1_heading(browser, page_heading):
    # Use double quotes for text() in case the page_heading contains single quotes.
    # e.g. "What is the location's postcode"
    page_heading_xpath = f"//h1[@class='govuk-heading-l' and text()=\"{page_heading}\"]"
    return check_exists_by_xpath(browser, page_heading_xpath)

# Check for error summary
def check_error_summary(browser):
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    return check_exists_by_xpath(browser, error_xpath)

# Check for sign back in page for unauthenticated access
def check_sign_back_in_page(browser):
    assert '/sign-back-in' in browser.current_url
    return check_h1_heading(browser, 'You need to sign back in to view this page')

# ENTER TEXT
# Enter input in text box
def enter_input_text(browser, value, input_text, key='name'):
    input_xpath = f"//input[@{key}='{value}']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.clear()
    input_element.send_keys(input_text)

#SETUP Mock Profile
def activate_mock_org_1(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Org Session 1', url_index)
    time.sleep(1)
    return browser
