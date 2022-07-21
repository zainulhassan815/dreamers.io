import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCode } from "@tabler/icons";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Helmet } from "react-helmet";
import {
  AuthorCard,
  BaseLayout,
  Heading,
  TableOfContents,
} from "../components";

const CardTemplate = ({ data }: PageProps<Queries.CardTemplateQuery>) => {
  const {
    title,
    description,
    tags,
    thumbnail,
    publishedAt,
    github,
    youtube,
    contributor,
  } = data?.mdx?.frontmatter ?? {};

  const tableOfContents = data.mdx?.tableOfContents;
  const theme = useMantineTheme();
  const query = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  return (
    <BaseLayout>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}

        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {thumbnail && (
          <meta
            property="og:image"
            content={thumbnail.childImageSharp?.original?.src ?? undefined}
          />
        )}
        {contributor?.name && (
          <meta property="article:author" content={contributor.name} />
        )}
        {publishedAt && (
          <meta name="article:published_time" content={publishedAt} />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="dreamerslab.org" />
        {title && <meta name="twitter:title" content={title} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {thumbnail && (
          <meta
            property="twitter:image"
            content={thumbnail.childImageSharp?.original?.src ?? undefined}
          />
        )}
      </Helmet>
      <Group
        spacing="lg"
        style={{
          flexWrap: query ? "nowrap" : "wrap-reverse",
          alignItems: "flex-start",
        }}
      >
        <Stack style={{ flexGrow: 1 }}>
          <Card>
            <Stack spacing="md">
              {youtube && (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    width="100%"
                    height="auto"
                    src={`https://www.youtube.com/embed/${youtube}`}
                    title={title ?? ""}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
              )}
              {!youtube && thumbnail && (
                <GatsbyImage
                  alt={title ?? ""}
                  image={thumbnail.childImageSharp!.gatsbyImageData}
                />
              )}
              <Title order={1}>{title}</Title>
              <Text size="lg">{description}</Text>
              {publishedAt && (
                <Text color="gray" size="md" weight="bold">
                  Published At: {publishedAt}
                </Text>
              )}
              {tags && tags.length > 0 && (
                <Group spacing="xs">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      children={tag}
                      variant="filled"
                      radius="xs"
                      size="lg"
                    />
                  ))}
                </Group>
              )}
              {github && (
                <Button
                  style={{ alignSelf: "flex-start" }}
                  color="dark"
                  size="lg"
                  radius="sm"
                  component={"a"}
                  href={github}
                  target="_blank"
                  leftIcon={<IconCode />}
                >
                  Code
                </Button>
              )}
              <Divider color="gray" size="sm" variant="dashed" />
              <AuthorCard
                p={0}
                name={contributor?.name}
                featuredImage={
                  contributor?.featuredImage?.childImageSharp?.gatsbyImageData
                }
                description={contributor?.description}
                links={contributor?.links as Queries.SocialLinks}
              />
            </Stack>
          </Card>

          {data.mdx?.body && (
            <TypographyStylesProvider>
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </TypographyStylesProvider>
          )}
        </Stack>

        {tableOfContents && (
          <TableOfContents headings={tableOfContents.items as Heading[]} />
        )}
      </Group>
    </BaseLayout>
  );
};

export const query = graphql`
  query CardTemplate($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            original {
              src
            }
          }
        }
        publishedAt(formatString: "MMMM DD, YYYY")
        github
        youtube
        contributor {
          name
          description
          links {
            github
            youtube
            twitter
            facebook
          }
          featuredImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      tableOfContents(maxDepth: 3)
      body
    }
  }
`;

export default CardTemplate;
