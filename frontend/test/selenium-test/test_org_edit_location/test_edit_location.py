from common import *
import time

url_XYSearch = url_org_man_loc.get('edit').get('xyCoordinatesSearch')
url = url_org_man_loc.get('edit').get('options')
url_no_alert = url_org_man_loc.get('edit').get('confirm')
url_alerts = url_org_man_loc.get('edit').get('confirm') 
url_all_alert = url_org_man_loc.get('edit').get('confirm')
url_not_in_england = url_org_man_loc.get('edit').get('xyCoordsNotInEngland')
url_next_page_drop_pin = url_org_man_loc.get('edit').get('dropPinEdit')

def setup(browser):
    navigate_to_auth_page_via_index(browser,url)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    click_button(browser, 'Continue',url_XYSearch)

def setup2(browser,X_coord,Y_coord,Check_for_error = False, url = url_XYSearch):
    setup(browser)
    enter_input_text(browser,'X coordinate',X_coord)
    enter_input_text(browser,'Y coordinate',Y_coord)
    if Check_for_error == True:
        click_button(browser, 'Continue', url)
        assert check_error_summary(browser)
    else:
       click_button(browser, 'Continue', url)
       assert 'Confirm Location' in browser.page_source
       assert X_coord + ', ' + Y_coord in browser.page_source
       assert 'Move pin position' in browser.page_source
       
def test_page_loads(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    time.sleep(5)
    assert 'How do you want to change the existing location?' in browser.page_source

def test_error_message_shows(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    click_button(browser, 'Continue',url)
    assert 'Select if you want to use X and Y coordinates or drop a pin on a map' in browser.page_source

def test_error_dissapears_when_clicked(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser,url)
    click_button(browser, 'Continue',url)
    select_input_radio_option(browser,'idUse X and Y coordinates','id')
    assert 'Select if you want to use X and Y coordinates or drop a pin on a map' not in browser.page_source

def test_xySearch_page_loads_with_prev_values(get_browser):
    browser =  get_browser
    setup(browser)
    assert 'What are the X and Y coordinates?' in browser.page_source
    # ToDo may need changing these values when previous coords are taken from dashbaord rather than hard code
    x_prev_coord_value = '520814'
    y_prev_coord_value = '185016'
    # TODO: we need to find a way to pre-populate redux variables before this test can work
    # assert y_prev_coord_value in browser.page_source
    # assert x_prev_coord_value in browser.page_source

def test_noXY_given(get_browser):
    browser = get_browser
    setup2(browser,'','',True)

def test_no_X_given(get_browser):
    browser = get_browser
    setup2(browser,'','179545',True)

def test_no_Y_given(get_browser):
    browser = get_browser
    setup2(browser,'530270','',True)

def test_X_non_numeric(get_browser):
    browser = get_browser
    setup2(browser,'ABC','179545',True)
    

def test_Y_non_numeric(get_browser):
    browser = get_browser
    setup2(browser,'530270','ABC',True)
    

def test_X_out_of_range(get_browser):
    browser = get_browser
    setup2(browser,'700001','179545',True)

def test_Y_out_of_Range(get_browser):
    browser = get_browser
    setup2(browser,'700001','1300001',True)
    
def test_no_alerts(get_browser):
    browser = get_browser
    setup2(browser,'465373','101250',False,url_no_alert)
    assert 'Confirm Location' in browser.page_source

def test_alerts(get_browser):
    browser = get_browser
    setup2(browser,'520814','185016',False,url_alerts)
    time.sleep(3)
    assert 'Confirm Location' in browser.page_source

def test_all_alerts(get_browser):
    browser = get_browser
    setup2(browser,'530270','179545',False,url_all_alert)
    time.sleep(3)
    assert 'Confirm Location' in browser.page_source

def test_not_in_england(get_browser):
    browser = get_browser
    X_coord = '123'
    Y_coord = '700001'
    setup(browser)
    enter_input_text(browser,'X coordinate',X_coord)
    enter_input_text(browser,'Y coordinate',Y_coord)
    click_button(browser, 'Continue', url_not_in_england)
    time.sleep(3)
    assert 'This location is not in England and cannot be added to this account' in browser.page_source

def test_next_page_drop_pin(get_browser):
    browser =  get_browser
    navigate_to_auth_page_via_index(browser, url)
    select_input_radio_option(browser, 'idDrop a pin on a map','id')
    click_button(browser, 'Continue', url_next_page_drop_pin)
    assert 'Find location on a map' in browser.page_source
