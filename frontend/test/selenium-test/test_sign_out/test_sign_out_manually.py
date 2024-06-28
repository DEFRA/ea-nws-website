from re import A
import pytest
from requests import get
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url_index = "http://localhost:3000/index"
def test_sign_out_renders_and_button_header(get_browser):
    url_sign_out = "http://localhost:3000/signout"
    browser = get_browser
    browser.get(url_index)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    browser.find_element(By.LINK_TEXT,"Home page").click()
    browser.find_element(By.LINK_TEXT,"Sign Out").click()
    assert browser.current_url == url_sign_out


def test_sign_out_page_sign_in_button(get_browser):
    url_target = "http://localhost:3000/signin"
    browser = get_browser
    browser.get(url_index)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    browser.find_element(By.LINK_TEXT,"Home page").click()
    browser.find_element(By.LINK_TEXT,"Sign Out").click()
    browser.find_element(By.CLASS_NAME,'govuk-button').click()
    assert browser.current_url == url_target


def test_protect_from_flooding_link(get_browser):
    target_url = "https://www.gov.uk/browse/environment-countryside/flooding-extreme-weather"
    browser = get_browser
    browser.get(url_index)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    browser.find_element(By.LINK_TEXT,"Home page").click()
    browser.find_element(By.LINK_TEXT,"Sign Out").click()
    browser.find_element(By.LINK_TEXT, "protect yourself and your property online from flooding").click()
    assert browser.current_url == target_url


def test_survey_link(get_browser):
    target_url = "http://localhost:3000/signup/feedback"
    browser = get_browser
    browser.get(url_index)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    browser.find_element(By.LINK_TEXT,"Home page").click()
    browser.find_element(By.LINK_TEXT,"Sign Out").click()
    browser.find_element(By.LINK_TEXT, "What do you think of this service?").click()
    assert browser.current_url == target_url