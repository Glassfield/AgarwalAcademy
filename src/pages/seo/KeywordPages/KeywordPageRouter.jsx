
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { keywordSlugs } from "./keywordSlugs";


// Only slugs that are about tutor registration or jobs should redirect to tutor registration
const tutorRegistrationKeywords = [
  "register", "registration", "job", "become-a-tutor", "apply-for-home-tutor", "apply-for-tuition-teacher", "become-a-private-teacher", "become-a-tutor-as-a-student", "tutor-jobs", "at-home-tutor-jobs"
];

const KeywordPageRouter = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    if (!keywordSlugs.includes(slug)) return; // Only act for valid slugs
    // Only redirect to tutor registration for specific registration/job slugs
    const isTutorReg = tutorRegistrationKeywords.some(kw => slug.includes(kw));
    if (isTutorReg) {
      navigate("/tutor-registration", { replace: true });
    } else {
      navigate(`/enquiry?topic=${encodeURIComponent(slug)}`, { replace: true });
    }
  }, [slug]);

  if (!slug || !keywordSlugs.includes(slug)) {
    return <div>Page not found</div>;
  }
  // While redirecting, render nothing
  return null;
};

export default KeywordPageRouter;
