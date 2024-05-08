import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import Button from "../gov-uk-components/Button";


export default function SignOutAutomatically() {
    function test() {
        console.log("hello")
    }
        

    return(
        <>
            <Header />
            <div class="govuk-phase-banner">
                <p class="govuk-phase-banner__content">
                    <strong class="govuk-tag govuk-phase-banner__content__tag">
                    Alpha
                    </strong>
                    <span class="govuk-phase-banner__text">
                    This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.
                    </span>
                </p>
            </div>
            <div class="govuk-width-container">
                <h2 class="govuk-heading-l">You've been signed out for security reasons</h2>
                <p class="govuk-body">You can sign back in if you need to.</p>
                <Button text={"sign in"} className={"govuk-button"} onClick={test} />

                <h3 class="govuk-heading-s">More about flooding</h3>

                <p class="govuk-body">
                    Find out how to {" "}
                    <a href="#" class="govuk-link">
                        protect yourself and your property online from flooding
                    </a>
                    .
                </p>

                <p class="govuk-body">
                    <a href="#" class="govuk-link">
                        What do you think of this service?</a>
                    {""} Takes 30 seconds
                </p>
            </div>
            <Footer />
        </>
    );
}