from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

# URLs
url_index = "http://localhost:3000/index"
url_signout = "http://localhost:3000/signout"
url_auto_signout = "http://localhost:3000/signout-auto"

# Check if xpath exists
def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

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