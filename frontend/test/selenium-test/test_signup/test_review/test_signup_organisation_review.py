import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index_page = "http://localhost:3000/index"
home_page = "http://localhost:3000/organisation/home"
review_page = "http://localhost:3000/organisation/sign-up/review"
change_organisationdetails_page = "http://localhost:3000/"
change_main_administrator_page = "http://localhost:3000/"
finish_page = "http://localhost:3000/organisation/sign-up/success"
change_alternative_contact_page = ""

def setup_reviewpage_test(get_browser):
    browser = get_browser
    browser.get(index_page)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Org Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Sign up organisation review']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    return browser

def test_reviewpage_render(get_browser):
    browser = setup_reviewpage_test(get_browser)
    assert browser.current_url == review_page
    assert "Check your answers" in browser.page_source
    assert "Organisation" in browser.page_source
    assert "Main administrator" in browser.page_source
    assert "Alternative contact" in browser.page_source

def test_reviewpage_successpage(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//button[text()='Finish and submit']"
    finish_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", finish_link)
    time.sleep(1)
    assert browser.current_url == finish_page

def test_reviewpage_change_orgname(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//a[text()='Change']"
    change_orgName_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", change_orgName_link)
    assert browser.current_url == change_organisationdetails_page   

def test_reviewpage_change_mainAdmin_name(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//a[text()='Change']"
    change_admin_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[5].click();", change_admin_link)
    assert browser.current_url == change_main_administrator_page  

def test_reviewpage_change_alternativeContact_name(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//a[text()='Change']"
    change_alternate_contact_name_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[7].click();", change_alternate_contact_name_link)
    assert browser.current_url == change_alternative_contact_page 
