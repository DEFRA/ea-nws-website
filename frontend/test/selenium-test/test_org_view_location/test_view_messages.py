from common import *
from selenium.webdriver.common.by import By

url_dashboard= url_org_man_loc.get('view').get('dashboard')
url_details= url_org_man_loc.get('view').get('details')
url_current= url_org_man_loc.get('view').get('messages')
url_flood_areas= url_org_man_loc.get('view').get('floodAreasInfo')

def go_to_messages(get_browser):
    navigate_to_auth_page_via_index(get_browser,url_dashboard)
    assert check_h1_heading(get_browser, "Your organisation's locations")
    click_link(get_browser, "View or edit", url_details)
    click_link(get_browser, "Message settings and flood areas", url_current)

def is_radio_checked(get_browser, radioValue):
    xpath = f"//input[@value='{radioValue}']"
    element = get_browser.find_element(By.XPATH, xpath)
    return element.get_attribute('checked') is not None

def test_no_changes(get_browser):
    go_to_messages(get_browser)
    click_button(get_browser, 'Save message settings', url_current)
    assert not check_success_banner(get_browser)

def test_changes(get_browser):
    go_to_messages(get_browser)

    # Select a different option for 'Severe flood warnings'
    onSelected = False
    if is_radio_checked(get_browser, 'Radio_On_0'):
        select_input_radio_option(get_browser, 'Radio_Off_0')
    else:
        onSelected = True
        select_input_radio_option(get_browser, 'Radio_On_0')
    click_button(get_browser, 'Save message settings', url_current)
    assert check_success_banner(get_browser)

    # Navigate back to check the saved setting
    click_link(get_browser, "Location details", url_details)
    click_link(get_browser, "Message settings and flood areas", url_current)
    if onSelected:
        assert is_radio_checked(get_browser, 'Radio_On_0')
        assert not is_radio_checked(get_browser, 'Radio_Off_0')
    else:
        assert not is_radio_checked(get_browser, 'Radio_On_0')
        assert is_radio_checked(get_browser, 'Radio_Off_0')


def test_links(get_browser):
    go_to_messages(get_browser)
    click_link(get_browser, "Back", url_dashboard)
    click_link(get_browser, "View or edit", url_details)
    click_link(get_browser, "Message settings and flood areas", url_current)
    click_link(get_browser, "What are flood areas?", url_flood_areas)