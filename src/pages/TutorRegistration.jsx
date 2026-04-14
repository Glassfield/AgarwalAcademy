import { Helmet } from 'react-helmet-async';
import TutorRegistrationForm from '@/components/tutors/TutorRegistrationForm';

/**
 * Tutor Registration Page
 * Full-page multi-step form with OTP verification
 */
const TutorRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Tutor Registration | Agarwal Academy</title>
        <meta name="description" content="Register as a tutor with Agarwal Academy" />
      </Helmet>

      <TutorRegistrationForm />
    </>
  );
};

export default TutorRegistration;
