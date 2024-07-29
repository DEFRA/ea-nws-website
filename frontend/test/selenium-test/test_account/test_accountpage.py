from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/account"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def setup_accountpage_test(get_browser, session):
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
    return browser

def test_accountpage_render(get_browser):
    browser = setup_accountpage_test(get_browser, 1) 
    assert browser.current_url == url
    assert "Home" in browser.page_source

def test_accountpage_render_table(get_browser):
    browser = setup_accountpage_test(get_browser, 1) 
    table_xpath = f"//table[@class='govuk-table']"
    assert check_exists_by_xpath(browser, table_xpath)

def test_accountpage_render_button(get_browser):
    browser = setup_accountpage_test(get_browser, 1) 
    button_xpath = f"//button[@class='govuk-button govuk-button--warning']"
    assert check_exists_by_xpath(browser, button_xpath)

