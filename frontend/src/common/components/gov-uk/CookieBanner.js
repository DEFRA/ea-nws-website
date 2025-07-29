import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";


export default function CookieBanner(){
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['CookieControl'])
    const [choice, setChoice] = useState(null)
    const location = useLocation()

    const acceptCookies = (event) => {
        event.preventDefault()
        setCookie('CookieControl', {analytics: true, preferencesSet: true, popup: true}, {maxAge: 60*60*24*365})
        setChoice('accepted')
    }
    const rejectCookies = (event) => {
        event.preventDefault()
        setCookie('CookieControl', {analytics: false, preferencesSet: true, popup: true}, {maxAge: 60*60*24*365})
        setChoice('rejected')
    }
    const hideMessage = (event) => {
        event.preventDefault()
        setCookie('CookieControl', {...cookies.CookieControl, popup: false}, {maxAge: 60*60*24*365})
    }

    const choiceMessage = (
        <div class="govuk-cookie-banner__message govuk-width-container" role="alert">
            <div class="govuk-grid-row">
            <div class="govuk-grid-column-two-thirds">
                <div class="govuk-cookie-banner__content">
                <p class="govuk-body">You’ve {choice} analytics cookies. You can{' '}
                <Link
                    className='govuk-link'
                    to={
                      location.pathname.includes('organisation')
                        ? '/organisation/cookies'
                        : '/cookies'
                    }
                  >
                    change your cookie settings
                  </Link> at any time.</p>
                </div>
            </div>
            </div>
            <div class="govuk-button-group">
            <Button
                text='Hide cookie message'
                className='govuk-button'
                onClick={hideMessage}
              />
            </div>
        </div>
    )

    const cookieMessage = (
        <div className="govuk-cookie-banner__message govuk-width-container">
            <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
                <h2 className="govuk-cookie-banner__heading govuk-heading-m">
                Cookies on the Get flood warnings service
                </h2>
                <div className="govuk-cookie-banner__content">
                <p className="govuk-body">We use some essential cookies to make this service work.</p>
                <p className="govuk-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
                </div>
            </div>
            </div>
            <div className="govuk-button-group">
            <Button
                text='Accept analytics cookies'
                className='govuk-button'
                onClick={acceptCookies}
              />
            <Button
                text='Reject analytics cookies'
                className='govuk-button'
                onClick={rejectCookies}
              />
            <Link
                className='govuk-link'
                to={
                    location.pathname.includes('organisation')
                    ? '/organisation/cookies'
                    : '/cookies'
                }
                >
                    View cookies
            </Link>
            </div>
        </div>
    )
    return (
        cookies?.CookieControl?.popup && (
            <div className="govuk-cookie-banner" data-nosnippet role="region" aria-label="Cookies on the Get flood warnings service">
                {!cookies.CookieControl?.preferencesSet ? cookieMessage : choiceMessage}
            </div>
        )
    )
}