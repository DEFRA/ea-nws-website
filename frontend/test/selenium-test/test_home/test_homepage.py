from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/home"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        assert False

def setup_homepage_test(get_browser, session):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session {session}']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Home page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    return browser

def test_homepage_render(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    assert browser.current_url == url
    assert "Home" in browser.page_source

def test_homepage_render_table(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    table_xpath = f"//table[@class='govuk-table']"
    check_exists_by_xpath(browser, table_xpath)

def test_homepage_render_button(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    button_xpath = f"//button[@class='govuk-button govuk-button--secondary']"
    check_exists_by_xpath(browser, button_xpath)

def test_homepage_render_details(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    details_xpath = f"//summary[@class='govuk-details__summary']"
    check_exists_by_xpath(browser, details_xpath)

def test_homepage_expand_details(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    details_xpath = f"//summary[@class='govuk-details__summary']"
    details_link = browser.find_element(By.XPATH, details_xpath)
    browser.execute_script("arguments[0].click();", details_link)
    time.sleep(1)
    assert browser.find_element(By.XPATH,f"//summary[@class='govuk-details__text']").isDisplayed()

def test_homepage_no_remove(get_browser):
    browser = setup_homepage_test(get_browser, 1) 
    remove_xpath = f"//a[text()='Remove']"
    not check_exists_by_xpath(browser, remove_xpath)

def test_homepage_no_details(get_browser):
    browser = setup_homepage_test(get_browser, 2) 
    details_xpath = f"//summary[@class='govuk-details__summary']"
    check_exists_by_xpath(browser, details_xpath)

def test_homepage_render_remove(get_browser):
    browser = setup_homepage_test(get_browser, 2) 
    remove_xpath = f"//a[text()='Remove']"
    check_exists_by_xpath(browser, remove_xpath)

def test_homepage_render_pagination(get_browser):
    browser = setup_homepage_test(get_browser, 3) 
    pagination_xpath = f"//a[@class='govuk-link govuk-pagination__link']"
    check_exists_by_xpath(browser, pagination_xpath)

def test_homepage_click_pagination(get_browser):
    browser = setup_homepage_test(get_browser, 3) 
    pagination_xpath = f"//a[@class='govuk-link govuk-pagination__link']"
    pagination_link = browser.find_element(By.XPATH, pagination_xpath)
    browser.execute_script("arguments[0].click();", pagination_link)
    time.sleep(1)
    pagination_xpath = f"//a[@rel='prev']"
    check_exists_by_xpath(browser, pagination_xpath)

