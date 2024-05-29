def mock_session(browser):
    mock_session_script = """
    function mockSession() {        
        const authToken = 'MockAuthToken';
        const registration = { partner: '4', name: 'NWS England' };
        const profile = {
            id: '1',
            enabled: true,
            firstName: 'John',
            lastName: 'Smith',
            emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
            mobilePhones: ['07343 454590', '07889 668367'],
            homePhones: ['01475 721535'],
            language: 'EN',
            additionals: [],
            unverified: {
                emails: [],
                mobilePhones: [],
                homePhones: [
                    {
                        address: '+336********'
                    }
                ]
            },
            pois: [
                {
                    address: 'Exeter, Royaume-Uni',
                    coordinates: {
                        latitude: 50726037,
                        longitude: -3527489
                    }
                }
            ]
        };

        window.store.dispatch({ type: 'SET_AUTH_TOKEN', payload: authToken });
        window.store.dispatch({ type: 'SET_REGISTRATION', payload: registration });
        window.store.dispatch({ type: 'SET_PROFILE', payload: profile });
    }

    mockSession();
    """
    browser.execute_script(mock_session_script)
