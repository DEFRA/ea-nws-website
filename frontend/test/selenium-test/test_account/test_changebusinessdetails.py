from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/account/change-business-details"
previousPage = "http://localhost:3000/account"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def setup_changebusinessdetails_test(get_browser, session):
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
    changebusinessdetails_xpath = f"//a[@href='/account/change-business-details']"
    changebusinessdetails_link = browser.find_element(By.XPATH, changebusinessdetails_xpath)
    browser.execute_script("arguments[0].click();", changebusinessdetails_link)
    time.sleep(3)
    return browser

def test_changebusinessdetails_render(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1) 
    assert browser.current_url == url
    assert "Additional details for business registrations" in browser.page_source

def test_changebusinessdetails_business_too_long(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    input_xpath = f"//input[@name='Business name (optional)']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Business name must be 50 charaters or fewer" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changebusinessdetails_job_too_long(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    input_xpath = f"//input[@name='Job title (optional)']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Job title must be 50 charaters or fewer" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changebusinessdetails_both_too_long(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    input_xpath = f"//input[@name='Business name (optional)']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    job_input_xpath = f"//input[@name='Job title (optional)']"
    job_input_element = browser.find_element(By.XPATH, job_input_xpath)
    job_input_element.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == url
    assert "Job title must be 50 charaters or fewer" in browser.page_source
    assert "Business name must be 50 charaters or fewer" in browser.page_source
    error_xpath = f"//div[contains(@class, 'govuk-error-summary')]"
    assert check_exists_by_xpath(browser, error_xpath)

def test_changebusinessdetails_valid(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    input_xpath = f"//input[@name='Business name (optional)']"
    input_element = browser.find_element(By.XPATH, input_xpath)
    input_element.send_keys("Leidos")
    job_input_xpath = f"//input[@name='Job title (optional)']"
    job_input_element = browser.find_element(By.XPATH, job_input_xpath)
    job_input_element.send_keys("Software Engineer")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    button_element = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", button_element)
    time.sleep(3)
    assert browser.current_url == previousPage
    assert "Business details updated" in browser.page_source
    success_xpath = f"//div[contains(@class, 'govuk-notification-banner--success')]"
    assert check_exists_by_xpath(browser, success_xpath)

def test_changebusinessdetails_cancel(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    cancel_xpath = f"//a[text()='Cancel']"
    cancel_element = browser.find_element(By.XPATH, cancel_xpath)
    browser.execute_script("arguments[0].click();", cancel_element)
    time.sleep(3)
    assert browser.current_url == previousPage

def test_changebusinessdetails_back(get_browser):
    browser = setup_changebusinessdetails_test(get_browser, 1)
    back_xpath = f"//a[contains(@class, 'govuk-back-link')]"
    back_element = browser.find_element(By.XPATH, back_xpath)
    browser.execute_script("arguments[0].click();", back_element)
    time.sleep(3)
    assert browser.current_url == previousPage
