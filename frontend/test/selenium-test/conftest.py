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

# Fixture to compile TypeScript API code
@pytest.fixture(scope="session")
def compile_api():
    # Compile TypeScript code to JavaScript
    result = subprocess.run(["tsc", "--project", "../api/tsconfig.json"], capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr)
        raise Exception("TypeScript compilation failed")

@pytest.fixture(scope="session", autouse=True)
def start_api(compile_api):
    port = "9000"
    env = os.environ.copy()
    env["PORT"] = port
    api_process = subprocess.Popen(["node", "../api/index.js"], env=env, cwd="../api")
    time.sleep(2)
    yield
    api_process.terminate()
    api_process.wait()

@pytest.fixture(scope="session", autouse=True)
def start_backend():
    port = "5000"
    env = os.environ.copy()
    env["PORT"] = port
    backend_process = subprocess.Popen(["node", "../backend/index.js"], env=env)
    time.sleep(2)
    yield
    # Cleanup: stop the frontend server
    backend_process.terminate()
    backend_process.wait()


@pytest.fixture(scope="session", autouse=True)
def start_frontend():
    port = "3000"
    env = os.environ.copy()
    env["PORT"] = port
    frontend_process = subprocess.Popen(["npm", "start"], env=env)
    time.sleep(2)
    yield

    # Cleanup: stop the frontend server
    frontend_process.terminate()
    frontend_process.wait()


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

# Fixture to compile TypeScript API code
@pytest.fixture(scope="session")
def compile_api():
    # Compile TypeScript code to JavaScript
    result = subprocess.run(["tsc", "--project", "../api/tsconfig.json"], capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr)
        raise Exception("TypeScript compilation failed")

@pytest.fixture(scope="session", autouse=True)
def start_api(compile_api):
    port = "9000"
    env = os.environ.copy()
    env["PORT"] = port
    api_process = subprocess.Popen(["node", "../api/index.js"], env=env, cwd="../api")
    time.sleep(2)
    yield
    api_process.terminate()
    api_process.wait()

@pytest.fixture(scope="session", autouse=True)
def start_backend():
    port = "3000"
    env = os.environ.copy()
    env["PORT"] = port
    backend_process = subprocess.Popen(["node", "../backend/index.js"], env=env)
    time.sleep(2)
    yield
    # Cleanup: stop the frontend server
    backend_process.terminate()
    backend_process.wait()


@pytest.fixture(scope="session", autouse=True)
def start_frontend():
    port = "3001"
    env = os.environ.copy()
    env["PORT"] = port
    frontend_process = subprocess.Popen(["npm", "start"], env=env)
    time.sleep(2)
    yield

    # Cleanup: stop the frontend server
    frontend_process.terminate()
    frontend_process.wait()