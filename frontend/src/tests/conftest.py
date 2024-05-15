import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import subprocess
import time
import os

@pytest.fixture
def get_browser():
    # path to geckodriver so you can access firefox
    geckodriver_path = "/snap/bin/geckodriver"
    driver_service = webdriver.FirefoxService(executable_path=geckodriver_path)

    browser = webdriver.Firefox(service=driver_service)

    yield browser
    browser.quit()