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
              url
              image
              facebook
              twitter
              youtube
            }
          }
        }
      `}
      render={(data: Queries.SeoProviderQuery) => {
        const {
          title,
          description,
          image,
          url,
          siteLanguage,
          facebook,
          twitter,
          youtube,
        } = data.site?.siteMetadata ?? {};

        const imgSrc = `${url}${image}`;
        return (
          <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            <meta name="image" content={imgSrc} />

            {title && <meta name="og:title" content={title} />}
            {title && <meta name="og:site_name" content={title} />}
            <meta name="og:image" content={imgSrc} />
            {url && <meta property="og:url" content={url} />}
            <meta property="og:type" content="website" />

            {youtube && (
              <meta
                name="youtube"
                content={`https://www.youtube.com/channel/${youtube}`}
              />
            )}
            {facebook && (
              <meta
                name="facebook"
                content={`https://www.facebook.com/${facebook}`}
              />
            )}

            <meta name="twitter:card" content="summary_large_image" />
            {twitter && <meta name="twitter:creator" content={twitter} />}
            {title && <meta name="twitter:title" content={title} />}
            {description && (
              <meta name="twitter:description" content={description} />
            )}
            <meta name="twitter:image" content={imgSrc} />
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
