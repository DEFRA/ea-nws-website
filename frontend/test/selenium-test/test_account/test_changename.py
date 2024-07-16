from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/account/change-name"
previousPage = "http://localhost:3000/account"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def setup_changename_test(get_browser, session):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session {session}']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Home page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    account_xpath = f"//a[text()='Your account']"
    account_link = browser.find_element(By.XPATH, account_xpath)
    browser.execute_script("arguments[0].click();", account_link)
    time.sleep(1)
    changename_xpath = f"//a[@href='/account/change-name']"
    changename_link = browser.find_element(By.XPATH, changename_xpath)
    browser.execute_script("arguments[0].click();", changename_link)
    time.sleep(1)
    return browser

def test_changename_render(get_browser):
    browser = setup_changename_test(get_browser, 1) 
    assert browser.current_url == url
    assert "Change your name" in browser.page_source

def test_changename_empty(get_browser):
    browser = setup_changename_test(get_browser, 1)
    input_xpath = f"//input[@name='Full name']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.clear()
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(1)
    assert browser.current_url == url
    assert "Enter your full name" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changename_too_long(get_browser):
    browser = setup_changename_test(get_browser, 1)
    input_xpath = f"//input[@name='Full name']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(1)
    assert browser.current_url == url
    assert "Full name must be 50 characters or fewer" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changename_valid(get_browser):
    browser = setup_changename_test(get_browser, 1)
    input_xpath = f"//input[@name='Full name']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("John Smith")
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(1)
    assert browser.current_url == previousPage
    assert "Name updated" in browser.page_source
    success_xpath = f"//div[contains(@class, 'govuk-notification-banner--success')]"
    assert check_exists_by_xpath(browser, success_xpath)

def test_changename_cancel(get_browser):
    browser = setup_changename_test(get_browser, 1)
    cancel_xpath = f"//a[text()='Cancel']"
    cancel_element = browser.find_element(By.XPATH, cancel_xpath)
    browser.execute_script("arguments[0].click();", cancel_element)
    time.sleep(1)
    assert browser.current_url == previousPage

def test_changename_back(get_browser):
    browser = setup_changename_test(get_browser, 1)
    back_xpath = f"//a[contains(@class, 'govuk-back-link')]"
    back_element = browser.find_element(By.XPATH, back_xpath)
    browser.execute_script("arguments[0].click();", back_element)
    time.sleep(1)
    assert browser.current_url == previousPage
