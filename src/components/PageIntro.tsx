import React from 'react';

interface PageIntroProps {
  title: string;
  description?: string;
  kicker?: string;
}

const PageIntro: React.FC<PageIntroProps> = ({
  title,
  description,
  kicker,
}) => (
  <header className="page-intro">
    {kicker && (
      <p className="page-kicker">{kicker}</p>
    )}
    <h1 className="page-title">{title}</h1>
    {description && (
      <p className="page-description">
        {description}
      </p>
    )}
  </header>
);

export default PageIntro;
