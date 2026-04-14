import React from "react";

const KeywordPage = ({ keyword }) => (
  <div className="keyword-page">
    <h1>{keyword.replace(/-/g, " ")}</h1>
    <p>Information and resources for "{keyword.replace(/-/g, " ")}" will be available here soon.</p>
  </div>
);

export default KeywordPage;
