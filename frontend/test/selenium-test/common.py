from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import time

#------------------------------------------------------------------------------
# CONSTANTS
#------------------------------------------------------------------------------

# Keywords
keywords_max = 50
keyword_char_max = 20
keyword_error_max = f'You can add a maximum of {keywords_max} keywords'
keyword_error_char_max = f'Keywords must be {keyword_char_max} characters or less'
keyword_error_duplicate = 'This keyword already exists'
keyword_error_comma = 'Keywords cannot include commas'

#------------------------------------------------------------------------------
# URLS
#------------------------------------------------------------------------------

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
    'success': url_org_signup_path + '/success',
    'declaration': url_org_signup_path + '/declaration'
}
# Signin urls
url_org_signin_path = url_org + '/signin'
url_org_signin = {
    'signin': url_org_signin_path,
    'validate': url_org_signin_path + '/validate',
    'signBackIn': url_org + '/sign-back-in',
    'pending': url_org_signin_path + '/account-pending'
}
# Signout urls
url_org_signout = {
    'signout': url_org + '/signout',
    'auto': url_org + '/signout-auto'
}
# Change admin URLS
url_org_man_admin_path = url_org + '/manage-admin'
url_org_man_admin = {
    'details': url_org_man_admin_path + '/admin-details',
    'changeDetails': url_org_man_admin_path + '/change-admin-details',
    'verifyEmail': url_org_man_admin_path + '/verify-email'
}
# Manage keywords
url_org_man_keywords_path = url_org + '/manage-keywords'
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
        'xyCoordinatesSearch': url_org_man_loc_path + '/add/xy-coordinates-search',
        'locationInArea': url_org_man_loc_path + '/add/location-in-area',
        'xyCoordinatesNotInEngland': url_org_man_loc_path + '/add/xy-coordinates-not-in-england',
        'dropPinNotInEngland': url_org_man_loc_path + '/add/drop-pin-not-in-england',
        'dropPinSearch': url_org_man_loc_path + '/add/drop-pin-search',
        'predefinedBoundary': {
            'optionalInfo': url_org_man_loc_path + '/add/predefined-boundary/optional-information',
            'add': url_org_man_loc_path + '/add/predefined-boundary',
            'addAnother': url_org_man_loc_path + '/add/another-predefined-boundary'
        }
    },
    'optionalLocation':{
        'optionalInfo': url_org_man_loc_path + '/add/optional-information',
        'optionalAddress': url_org_man_loc_path + '/add/optional-information/address',
        'addKeyInformation': url_org_man_loc_path + '/add/optional-information/key-information',
        'addKeywords': url_org_man_loc_path + '/add/optional-information/keywords',
        'addActionPlan': url_org_man_loc_path + '/add/optional-information/action-plan',
        'addNotes': url_org_man_loc_path + '/add/optional-information/notes'
    },
    'error': {
        'cannotFindAddress': url_org_man_loc_path + '/add/cannot-find-address',
        'alreadyExists': url_org_man_loc_path + '/add/location-already-exists'
    },
    'optional':{
        'optionalAddress': url_org_man_loc_path + '/add/optional-address/optional-location',
        'optionalInfo': url_org_man_loc_path + '/add/optional-address/info',
    },
    'change': {
        'alternative_contact': local_host + '/',
        'org_details':  local_host + '/',
        'main_admin': local_host + '/'
    },
    'unmatched_location': {
        'manually_find_locations': url_org_man_loc_path + '/unmatched-locations/manually-find',
        'select_how': url_org_man_loc_path + '/unmatched-locations/manually-find/select-how',
        'find_by_address': url_org_man_loc_path + '/unmatched-locations/manually-find/address',
    },
    'edit': {
        'cannot_change_location_polygon': url_org_man_loc_path + '/edit/edit-polygon',
        'cannot_change_location_line': url_org_man_loc_path + '/edit/edit-line',
        'options': url_org_man_loc_path + '/edit/select-location-options',
        'xyCoordinatesSearch': url_org_man_loc_path + '/edit/xy-coordinates-search',
        'locationInArea': url_org_man_loc_path + '/edit/location-in-area',
        'notInEngland': url_org_man_loc_path + '/edit/xy-coordinates-not-in-england',
        'dropPinEdit': url_org_man_loc_path + '/edit/drop-pin-edit'
    },
   'view':{
        'dashboard': url_org_man_loc_path + '/view-locations',
        'details': url_org_man_loc_path + '/location/view-location',
        'messages': url_org_man_loc_path + '/location/view-messages'
    }
}

url_org_man_cont_path = url_org + '/manage-contacts'
url_org_man_cont = {
    'add': {
        'details': url_org_man_cont_path + '/add',
        'notes':url_org_man_cont_path + '/add/notes',
        'keywords': url_org_man_cont_path + '/add/keywords',
        'channels': url_org_man_cont_path + '/add/channels'
    },
}

# org footer urls
url_org_privacy_notice = url_org + '/privacy'

#------------------------------------------------------------------------------
# PAGE NAVIGATION FUNCTIONS
#------------------------------------------------------------------------------

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

# Navigate to authenticated page via index page and check url
def navigate_to_auth_org_page_via_index(browser, url_target):
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Org Session 1', url_index)
    browser.get(url_target)
    assert browser.current_url == url_target
    return browser

#------------------------------------------------------------------------------
# CLICK / SELECT FUNCTIONS
#------------------------------------------------------------------------------

# Click on a button and check url
def click_button(browser, button_text, url_button):
    button_xpath = f"//button[text()='{button_text}']"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(2)
    assert browser.current_url == url_button

# Click on link text and check url
def click_link(browser, link_text, url_link):
    link_xpath = f"//a[text()=\"{link_text}\"]"
    link_element = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_element)
    time.sleep(1)
    assert browser.current_url == url_link

def click_span(browser, span_text):
    span_xpath = f"//span[text()=\"{span_text}\"]"
    span_element = browser.find_element(By.XPATH, span_xpath)
    browser.execute_script("arguments[0].click();", span_element)
    time.sleep(1)

# Click on link text and check url - for when there is more than one occurence of the same text
def click_link_more_than_one_text(browser, link_text, link_text_iteration, url_link):
    link_xpath = f"(//a[text()='{link_text}'])[{link_text_iteration}]"
    link_element = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_element)
    time.sleep(1)
    assert browser.current_url == url_link

# Click checkbox
def click_checkbox(browser, value, key='id'):
    input_checkbox_xpath = f"//input[@class='govuk-checkboxes__input' and @{key}='{value}']"
    input_checkbox_element = browser.find_element(By.XPATH, input_checkbox_xpath)
    browser.execute_script("arguments[0].scrollIntoView(true); arguments[0].click();", input_checkbox_element)

# Select input radio option
def select_input_radio_option(browser, value, key='value'):
    input_radio_xpath = f"//input[@{key}='{value}']"
    input_radio_element = browser.find_element(By.XPATH, input_radio_xpath)
    browser.execute_script("arguments[0].click();", input_radio_element)

# Select input dropdown option
def select_dropdown_option(browser, dropdown_name, value):
    select = Select(browser.find_element(By.NAME, dropdown_name))
    select.select_by_value(value)

#------------------------------------------------------------------------------
# ENTER INPUT TEXT
#------------------------------------------------------------------------------

# Enter input in text box
def enter_input_text(browser, value, input_text, key='name'):
    input_xpath = f"//input[@{key}='{value}']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    browser.execute_script("arguments[0].scrollIntoView(true);", input_element)
    time.sleep(1)
    input_element.clear()
    input_element.send_keys(input_text)

# Enter input in text box
def enter_textarea_text(browser, value, input_text, key='name'):
    input_xpath = f"//textarea[@{key}='{value}']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.clear()
    input_element.send_keys(input_text)

#------------------------------------------------------------------------------
# CHECKS (RETURNS TRUE/FALSE)
#------------------------------------------------------------------------------

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
