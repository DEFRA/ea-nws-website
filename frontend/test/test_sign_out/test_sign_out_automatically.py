from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# these tests need re writing for the user to be signed in
url2 = "http://localhost:3000/signoutautomatically"
url1 = "http://localhost:3000/signin"
# need to re write these