import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url_add_xyCoordnotInEngland = url_org_man_loc.get('add').get('xyCoordinatesNotInEngland')
url_add_dropPinNotInEngland = url_org_man_loc.get('add').get('dropPinNotInEngland')

def test__render_page(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_add_xyCoordnotInEngland)
    assert 'This location is not in England and cannot be added to this account' in browser.page_source
    assert 'use a different set of X and Y coordinates' in browser.page_source
    assert browser.current_url == url_add_xyCoordnotInEngland

def test__render_page(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url_add_dropPinNotInEngland)
    assert 'This location is not in England and cannot be added to this account' in browser.page_source
    assert browser.current_url == url_add_dropPinNotInEngland