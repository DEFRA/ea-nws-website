from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/account/change-email"
previousPage = "http://localhost:3000/account"
nextPage = "http://localhost:3000/account/change-email/validate"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def setup_changeemail_test(get_browser, session):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session {session}']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Home page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(3)
    account_xpath = f"//a[text()='Your account']"
    account_link = browser.find_element(By.XPATH, account_xpath)
    browser.execute_script("arguments[0].click();", account_link)
    time.sleep(3)
    changeemail_xpath = f"//a[@href='/account/change-email']"
    changeemail_link = browser.find_element(By.XPATH, changeemail_xpath)
    browser.execute_script("arguments[0].click();", changeemail_link)
    time.sleep(3)
    return browser

def test_changeemail_render(get_browser):
    browser = setup_changeemail_test(get_browser, 1) 
    assert browser.current_url == url
    assert "Change your email address for signing in" in browser.page_source

def test_changeemail_empty(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    input_xpath = f"//input[@name='New email address']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.clear()
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Enter your email address" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changeemail_invalid_email(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    input_xpath = f"//input[@name='New email address']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("invalid")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changeemail_same_email(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    input_xpath = f"//input[@name='New email address']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("matthew.pepper@gmail.com")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Enter a different email address to the one you currently sign in with" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changeemail_duplicate_email(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    input_xpath = f"//input[@name='New email address']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("duplicate@email.com")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "You have already registered this email address on your account - you cannot enter it again" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def setup_changeemail_valid(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    input_xpath = f"//input[@name='New email address']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("John.Smith@gmail.com")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    return browser

def test_changeemail_valid_validate_render(get_browser):
    browser = setup_changeemail_valid(get_browser)
    assert browser.current_url == nextPage
    assert "Check your email" in browser.page_source

def test_changeemail_valid_short_code(get_browser):
    browser = setup_changeemail_valid(get_browser)
    input_xpath = f"//input[@name='Enter code']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("123")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == nextPage
    assert "Code must be 6 numbers" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changeemail_valid_empty_code(get_browser):
    browser = setup_changeemail_valid(get_browser)
    input_xpath = f"//input[@name='Enter code']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == nextPage
    assert "Enter code" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changeemail_valid_valid_code(get_browser):
    browser = setup_changeemail_valid(get_browser)
    input_xpath = f"//input[@name='Enter code']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("123456")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == previousPage
    assert "Email address updated" in browser.page_source
    success_xpath = f"//div[contains(@class, 'govuk-notification-banner--success')]"
    assert check_exists_by_xpath(browser, success_xpath)

def test_changeemail_valid_different_email(get_browser):
    browser = setup_changeemail_valid(get_browser)
    different_xpath = f"//a[text()='Enter a different email']"
    different_element = browser.find_element(By.XPATH, different_xpath)
    browser.execute_script("arguments[0].click();", different_element)
    time.sleep(3)
    assert browser.current_url == url

def test_changeemail_valid_back(get_browser):
    browser = setup_changeemail_valid(get_browser)
    back_xpath = f"//a[contains(@class, 'govuk-back-link')]"
    back_element = browser.find_element(By.XPATH, back_xpath)
    browser.execute_script("arguments[0].click();", back_element)
    time.sleep(3)
    assert browser.current_url == url

def test_changeemail_cancel(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    cancel_xpath = f"//a[text()='Cancel']"
    cancel_element = browser.find_element(By.XPATH, cancel_xpath)
    browser.execute_script("arguments[0].click();", cancel_element)
    time.sleep(3)
    assert browser.current_url == previousPage

def test_changeemail_back(get_browser):
    browser = setup_changeemail_test(get_browser, 1)
    back_xpath = f"//a[contains(@class, 'govuk-back-link')]"
    back_element = browser.find_element(By.XPATH, back_xpath)
    browser.execute_script("arguments[0].click();", back_element)
    time.sleep(3)
    assert browser.current_url == previousPage
