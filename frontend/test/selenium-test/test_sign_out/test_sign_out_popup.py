from selenium.webdriver.common.by import By
import time
from selenium.common.exceptions import NoSuchElementException
from common import *

# Time for popup to appear after inactivity
time_to_popup = 20*60
# Time to auto signout after popup appears
time_to_auto_signout = 2*60
# Time delay for popup
delay_popup = 5
# General time delay
delay = 1

# Function to confirm popup doesn't appear
def popup_not_found(browser):
    try:
        assert browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
    except NoSuchElementException:
        assert True

# Test 'stay signed in' button on popup
def test_popup_stay_signin_button(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    time.sleep(time_to_popup + delay_popup)
    click_button(browser, 'Stay signed in')
    time.sleep(delay)
    popup_not_found(browser)

# Test 'sign out' button on popup
def test_popup_logout_button(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    time.sleep(time_to_popup + delay_popup)
    click_link(browser, 'Sign out')
    time.sleep(delay)
    
    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_signout

# Introduce activity just before popup appears
def test_stay_active(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    time.sleep(time_to_popup - delay)
    click_link(browser, 'Home page')
    time.sleep(delay)
    popup_not_found(browser)

# Auto logout after popup appears
def test_auto_logout(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    time.sleep(time_to_popup + time_to_auto_signout + delay_popup)
    
    # Checks
    popup_not_found(browser)
    assert browser.current_url == url_auto_signout
