from selenium.webdriver.common.by import By
import time
from selenium.common.exceptions import NoSuchElementException
from common import *
from selenium.webdriver import ActionChains

# Time for popup to appear after inactivity
time_to_popup = 10
# Time to auto signout after popup appears
time_to_auto_signout = 5
# Time delay
delay = 1

# FUNCTIONS
# Confirm popup doesn't appear
def popup_not_found(browser):
    try:
        assert browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
    except NoSuchElementException:
        assert True

# Mouse hover to make session active
def mouse_hover(browser):
    hoverable = browser.find_element(By.CLASS_NAME, "govuk-heading-l")
    ActionChains(browser).move_to_element(hoverable).perform()

# CITIZEN TESTS
# Test 'stay signed in' button on popup
def test_cit_popup_stay_signin_button(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Home page', url_cit_home)
    time.sleep(time_to_popup + delay)
    click_button(browser, 'Stay signed in')
    time.sleep(delay)
    popup_not_found(browser)

# Test 'sign out' button on popup
def test_cit_popup_logout_button(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Home page', url_cit_home)
    time.sleep(time_to_popup + delay)
    click_link(browser, 'Sign out')
    time.sleep(delay)

    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_cit_signout

# Introduce activity just before popup appears
def test_cit_stay_active(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Home page', url_cit_home)
    time.sleep(time_to_popup - delay)
    mouse_hover(browser)
    time.sleep(delay)
    popup_not_found(browser)

# Auto logout after popup appears
def test_cit_auto_logout(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Home page', url_cit_home)
    time.sleep(time_to_popup + time_to_auto_signout + delay)

    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_cit_signout_auto

# ORGANISATION TESTS
# Test 'stay signed in' button on popup
def test_org_popup_stay_signin_button(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Organisation home page', url_org_home)
    time.sleep(time_to_popup + delay)
    click_button(browser, 'Stay signed in')
    time.sleep(delay)
    popup_not_found(browser)

# Test 'sign out' button on popup
def test_org_popup_logout_button(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Organisation home page', url_org_home)
    time.sleep(time_to_popup + delay)
    click_link(browser, 'Sign out')
    time.sleep(delay)

    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_org_signout

# Introduce activity just before popup appears
def test_org_stay_active(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Organisation home page', url_org_home)
    time.sleep(time_to_popup - delay)
    mouse_hover(browser)
    time.sleep(delay)

    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_org_home

# Auto logout after popup appears
def test_org_auto_logout(get_browser):
    browser = get_browser
    navigate_to_home_and_check_url(browser, 'Organisation home page', url_org_home)
    time.sleep(time_to_popup + time_to_auto_signout + delay)

    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_org_signout_auto
