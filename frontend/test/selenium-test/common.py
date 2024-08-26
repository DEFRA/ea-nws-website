from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

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
url_org_signup = url_org + '/register'
url_org_signin = url_org + '/signin'
url_org_signin_val = url_org + '/signin/validate'
url_org_sign_back_in = url_org + '/sign-back-in'
url_org_home = url_org + '/home'
url_org_signout = url_org + '/signout'
url_org_signout_auto = url_org + '/signout-auto'
# Manage locations
url_org_man_loc = url_org + '/manage-locations'
url_org_add_loc = url_org_man_loc + '/add'
url_org_add_loc = {
    'options': url_org_add_loc,
    'addressInfo': url_org_add_loc + '/address-info',
    'uploadFile': url_org_add_loc + '/upload-file',
}

# PAGE NAVIGATION
# Navigate to authenticated page via index page and check url
def navigate_to_auth_page_via_index(browser, link_text, url_check):
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    click_link(browser, link_text)
    assert browser.current_url == url_check

# CLICK / SELECT
# Click on a button
def click_button(browser, button_text):
    button_xpath = f"//button[text()='{button_text}']"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)

# Click on link text
def click_link(browser, link_text):
    link_xpath = f"//a[text()='{link_text}']"
    link_element = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_element)

# Select input radio option
def select_input_radio_option(browser, radio_id):
    input_radio_xpath = f"//input[@value='{radio_id}']"
    input_radio_element = browser.find_element(By.XPATH, input_radio_xpath)
    browser.execute_script("arguments[0].click();", input_radio_element)

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
    page_heading_xpath = f"//h1[@class='govuk-heading-l' and text()='{page_heading}']"
    return check_exists_by_xpath(browser, page_heading_xpath)

# Check for error summary
def check_error_summary(browser):
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    return check_exists_by_xpath(browser, error_xpath)

# Check for sign back in page for unauthenticated access
def check_sign_back_in_page(browser):
    return check_h1_heading(browser, 'You need to sign back in to view this page')