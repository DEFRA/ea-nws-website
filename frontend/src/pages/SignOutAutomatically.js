import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import Button from "../gov-uk-components/Button";
export default function SignOutAutomatically(){

        function test() {
            console.log("hello")
        }

    return(
        <>
            <Header />
            <div class="govuk-width-container">
                <h2 class="govuk-heading-l">You've been signed out for secuirty reasons</h2>
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