import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import Button from "../gov-uk-components/Button";

export default function SignBackIn() {
    function test() {
        console.log("hello");
    }

    return(<>
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
                <h1 class="govuk-heading-l">You need to sign back in to view this page</h1>
                <Button text={"sign in"} className={"govuk-button"} onClick={test} />
            </div>
            <Footer />
    
    </>
    );
}