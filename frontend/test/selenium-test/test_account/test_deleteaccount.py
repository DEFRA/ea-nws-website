from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/account/delete"
previous_url = "http://localhost:3000/account"
next_url = "http://localhost:3000/account/delete/confirm"
sleep=3

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

# Setup testcase for account deleteion
def setup_testcase(get_browser, session):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session {session}']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Home page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(sleep)
    account_xpath = f"//a[text()='Your account']"
    account_link = browser.find_element(By.XPATH, account_xpath)
    browser.execute_script("arguments[0].click();", account_link)
    time.sleep(sleep)
    account_delete_xpath = f"//button[text()='Delete your account']"
    account_delete_link = browser.find_element(By.XPATH, account_delete_xpath)
    browser.execute_script("arguments[0].click();", account_delete_link)
    time.sleep(sleep)
    return browser

def account_delete_page_checks(browser):
    assert browser.current_url == url
    assert "Delete your account and cancel flood messages" in browser.page_source

def account_delete_confirm_page_checks(browser):
    assert browser.current_url == next_url
    assert "Account deleted" in browser.page_source

def error_summary_checks(browser):
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def click_button(browser, button_text):
    account_delete_xpath = f"//button[text()='{button_text}']"
    account_delete_link = browser.find_element(By.XPATH, account_delete_xpath)
    browser.execute_script("arguments[0].click();", account_delete_link)    

# Checks rendering
def test_render(get_browser):
    browser = setup_testcase(get_browser, 1) 
    account_delete_page_checks(browser)

# Valid option selected except 'other'
def test_valid_option_selected(get_browser):
    browser = setup_testcase(get_browser, 1)

    # Select 'Other option' with long text
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    time.sleep(sleep)
    click_button(browser, 'Delete account')
 
    # Checks
    time.sleep(sleep)
    account_delete_confirm_page_checks(browser)

# Check for error summary if no option is selected
def test_no_option_selected(get_browser):
    browser = setup_testcase(get_browser, 1)
    click_button(browser, 'Delete account')
 
    # Checks
    time.sleep(sleep)
    account_delete_page_checks(browser)
    error_summary_checks(browser)
    assert "Select a reason for deleting your account" in browser.page_source

# Check for error summary if other option is selected and no text entered
def test_other_option_selected_no_text(get_browser):
    browser = setup_testcase(get_browser, 1)

    # Select 'Other option' without any text
    input_xpath = f"//input[@value='Other']"
    browser.find_element(By.XPATH, input_xpath).click()
    
    time.sleep(sleep)
    input_xpath = f"//input[@name='Reason for deleting account']"
    browser.find_element(By.XPATH, input_xpath).clear()
    click_button(browser, 'Delete account')
 
    # Checks
    time.sleep(sleep)
    account_delete_page_checks(browser)
    error_summary_checks(browser)
    assert "Enter reason for deleting your account" in browser.page_source

# Check for error summary if other option is selected and long text entered
def test_other_option_selected_long_text(get_browser):
    browser = setup_testcase(get_browser, 1)

    # Select 'Other option' with long text
    input_xpath = f"//input[@value='Other']"
    browser.find_element(By.XPATH, input_xpath).click()
    time.sleep(sleep)
    input_xpath = f"//input[@name='Reason for deleting account']"
    sampleText = "A" * 2001
    browser.find_element(By.XPATH, input_xpath).send_keys(sampleText)
    click_button(browser, 'Delete account')
 
    # Checks
    time.sleep(sleep)
    account_delete_page_checks(browser)
    error_summary_checks(browser)
    assert "Your answer must be 2000 characters or fewer" in browser.page_source

# Other option selected with valid text
def test_other_option_selected_valid_text(get_browser):
    browser = setup_testcase(get_browser, 1)

    # Select 'Other option' with valid text
    input_xpath = f"//input[@value='Other']"
    browser.find_element(By.XPATH, input_xpath).click()
    time.sleep(sleep)
    input_xpath = f"//input[@name='Reason for deleting account']"
    browser.find_element(By.XPATH, input_xpath).send_keys("test")
    click_button(browser, 'Delete account')

    # Checks
    time.sleep(sleep)
    account_delete_confirm_page_checks(browser)

# Check for error summary if long text is entered in further information
def test_further_info_long_text(get_browser):
    browser = setup_testcase(get_browser, 1)

    # Select 'Other option' with long text
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    time.sleep(sleep)
    sampleText = "A" * 2001
    browser.find_element(By.CLASS_NAME, "govuk-textarea").send_keys(sampleText)
    click_button(browser, 'Delete account')
 
    # Checks
    time.sleep(sleep)
    account_delete_page_checks(browser)
    error_summary_checks(browser)
    assert "Your answer must be 2000 characters or fewer" in browser.page_source

# Test back page
def test_changename_back(get_browser):
    browser = setup_testcase(get_browser, 1)
    back_xpath = f"//a[contains(@class, 'govuk-back-link')]"
    back_element = browser.find_element(By.XPATH, back_xpath)
    browser.execute_script("arguments[0].click();", back_element)
    time.sleep(sleep)
    assert browser.current_url == previous_url