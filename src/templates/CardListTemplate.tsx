import {
  Center,
  Divider,
  Pagination,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { graphql, Link, PageProps, navigate } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { BaseLayout, ExtensionCard } from "../components";

interface PageContextType {
  sourceInstanceName: string;
  totalPages: number;
  currentPage: number;
}

const CardListTemplate = ({
  data,
  pageContext,
}: PageProps<Queries.CardListTemplateQuery, PageContextType>) => {
  const theme = useMantineTheme();
  const { sourceInstanceName, totalPages, currentPage } = pageContext;

  const pageTitles: Record<string, string> = {
    extensions: "Extensions for AppInventor & Distros",
    tutorials: "Toturials",
  };

  const title = pageTitles[sourceInstanceName];

  return (
    <BaseLayout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Title order={1} my="md">
        {title}
      </Title>
      <Divider color="dark" size="sm" mb="md" variant="dashed" />
      <div
        style={{
          display: "grid",
          gap: theme.spacing.md,
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,500px))",
          justifyContent: "center",
        }}
      >
        {data.allFile.nodes.map(({ childMdx }) => {
          const { id, slug, frontmatter } = childMdx ?? {};
          return (
            <ExtensionCard
              key={id}
              component={Link}
              to={slug}
              title={frontmatter?.title}
              description={frontmatter?.description}
              tags={frontmatter?.tags}
              thumbnail={
                frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData
              }
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <Center my="xl">
          <Pagination
            size="xl"
            radius="xs"
            total={totalPages}
            page={currentPage}
            onChange={page => {
              const path =
                page === 1
                  ? `/${sourceInstanceName}`
                  : `/${sourceInstanceName}/${page}`;
              navigate(path);
            }}
          />
        </Center>
      )}
    </BaseLayout>
  );
};

export const query = graphql`
  query CardListTemplate(
    $limit: Int!
    $skip: Int!
    $sourceInstanceName: String!
  ) {
    allFile(
      limit: $limit
      skip: $skip
      filter: {
        sourceInstanceName: { eq: $sourceInstanceName }
        internal: { mediaType: { eq: "text/mdx" } }
      }
      sort: { fields: childrenMdx___frontmatter___publishedAt, order: DESC }
    ) {
      nodes {
        childMdx {
          id
          slug
          frontmatter {
            title
            description
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;

export default CardListTemplate;
