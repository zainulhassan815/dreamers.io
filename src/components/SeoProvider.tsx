import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const SeoProvider = () => {
  return (
    <StaticQuery
      query={graphql`
        query SeoProvider {
          site {
            siteMetadata {
              title
              description
              siteLanguage
              siteUrl
              image
              twitter
            }
          }
        }
      `}
      render={(data: Queries.SeoProviderQuery) => {
        const { title, description, image, siteUrl, siteLanguage, twitter } =
          data.site?.siteMetadata ?? {};

        return (
          <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}

            {siteUrl && <meta property="og:url" content={siteUrl} />}
            <meta property="og:type" content="website" />
            {title && <meta property="og:title" content={title} />}
            {description && (
              <meta property="og:description" content={description} />
            )}
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="dreamerslab.org" />
            {siteUrl && <meta property="twitter:url" content={siteUrl} />}
            {title && <meta name="twitter:title" content={title} />}
            {description && (
              <meta name="twitter:description" content={description} />
            )}
            {image && <meta name="twitter:image" content={image} />}
            {twitter && <meta name="twitter:creator" content={twitter} />}
            {siteLanguage && (
              <meta property="og:locale" content={siteLanguage} />
            )}
          </Helmet>
        );
      }}
    />
  );
};

export default SeoProvider;
