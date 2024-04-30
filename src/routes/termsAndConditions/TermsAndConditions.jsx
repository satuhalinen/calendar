import { Col, Container, Row } from "react-bootstrap";
import "./termsAndConditions.css";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <Container className="mainContent terms-container">
      <Col className="terms-wrap">
        <Row>
          <h1 className="termsTitle">Terms and Conditions</h1>
        </Row>
        <div className="termscontent">
          <p>
            Welcome to our Calendar App! These Terms and Conditions outline the
            rules and regulations for the use of our app, located <Link className="linkToAccount" to="https://voca-voluntary-calendar.netlify.app/">here</Link>.
          </p>

          <p>
            By accessing this app, we assume you accept these terms and
            conditions. Do not continue to use our app if you do not agree to
            all of the terms and conditions stated on this page.
          </p>

          <h2>1. License to Use the App</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable, and
            revocable license to use our app for your personal and
            non-commercial purposes.
          </p>

          <h2>2. User Account</h2>
          <p>
            You may be required to create an account to access certain features
            of the app. You are responsible for maintaining the confidentiality
            of your account and password.
          </p>

          <h2>3. User Content</h2>
          <p>
            You are solely responsible for any content you upload, submit, or
            display on the app. You agree not to upload, submit, or display any
            content that is unlawful, harmful, threatening, abusive, harassing,
            defamatory, vulgar, obscene, libelous, invasive of another's
            privacy, hateful, or racially, ethnically, or otherwise
            objectionable.
          </p>

          <h2>4. Privacy Policy</h2>
          <p>
            Our Privacy Policy governs the use of your personal information. By
            using our app, you agree to our Privacy Policy.
          </p>

          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your access to our app immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the terms.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these terms at any time.
            Your continued use of the app after any such changes constitutes
            your acceptance of the new terms.
          </p>

          <h2>7. Disclaimer</h2>
          <p>
            Our app is provided "as is," with all faults, and we make no express
            or implied representations or warranties of any kind related to our
            app or the materials contained on our app.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any indirect, incidental,
            special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the app; (ii) any conduct or content of
            any third party on the app.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of Finland, and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>

          <p>
            If you have any questions about these Terms and Conditions, please
            contact us.
          </p>
        </div>
      </Col>
    </Container>
  );
}
