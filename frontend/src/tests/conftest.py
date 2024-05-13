import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import subprocess
import time

@pytest.fixture
def get_browser():
    # path to geckodriver so you can access firefox
    geckodriver_path = "/snap/bin/geckodriver"
    driver_service = webdriver.FirefoxService(executable_path=geckodriver_path)

    browser = webdriver.Firefox(service=driver_service)
    
    yield browser

# Fixture to compile TypeScript API code
@pytest.fixture(scope="session")
def compile_api():
    # Compile TypeScript code to JavaScript
    subprocess.run(["tsc", "--project", "../../../api/tsconfig.json"])

@pytest.fixture(scope="session", autouse=True)
def start_api(compile_api):
    api_process = subprocess.Popen(["node", "api/dist/server.js"])
    time.sleep(2)
    yield
    api_process.terminate()
    api_process.wait()

@pytest.fixture(scope="session", autouse=True)
def start_backend():
    backend_process = subprocess.Popen(["node", "../../../backend/index.js"])
    time.sleep(2)
    yield
    # Cleanup: stop the frontend server
    backend_process.terminate()
    backend_process.wait()


@pytest.fixture(scope="session", autouse=True)
def start_frontend():
    frontend_process = subprocess.Popen(["npm", "start", "../../"])
    time.sleep(2)
    yield

    # Cleanup: stop the frontend server
    frontend_process.terminate()
    frontend_process.wait()

