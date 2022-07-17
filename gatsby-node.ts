import type { GatsbyNode } from "gatsby";
import path from "path";

type GroupedDataQuery = {
  readonly allFile: {
    readonly group: ReadonlyArray<{
      readonly nodes: ReadonlyArray<{
        readonly sourceInstanceName: string;
        readonly childMdx: {
          readonly id: string;
          readonly slug: string | null;
        } | null;
      }>;
    }>;
  };
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const result: {
    errors?: any;
    data?: GroupedDataQuery;
  } = await graphql(`
    query GroupedData {
      allFile(filter: { internal: { mediaType: { eq: "text/mdx" } } }) {
        group(field: sourceInstanceName) {
          nodes {
            sourceInstanceName
            childMdx {
              id
              slug
            }
          }
        }
      }
    }
  `);

  const { data, errors } = result;

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`, errors);
    return;
  }

  if (data) {
    const groups = data.allFile.group;
    groups.forEach(group => {
      const nodes = group.nodes;
      const perPage = 20;
      const numPages = Math.ceil(nodes.length / perPage);

      Array.from({ length: numPages }).forEach((_, index) => {
        const { sourceInstanceName } = nodes[index];
        createPage({
          path:
            index === 0
              ? `/${sourceInstanceName}`
              : `/${sourceInstanceName}/${index + 1}`,
          component: path.resolve("./src/templates/CardListTemplate.tsx"),
          context: {
            totalPages: numPages,
            limit: perPage,
            skip: index * perPage,
            perPage,
            currentPage: index + 1,
            sourceInstanceName,
          },
        });
      });

      nodes.forEach(({ sourceInstanceName, childMdx }) => {
        createPage({
          path: `/${sourceInstanceName}/${childMdx?.slug}`,
          component: path.resolve("./src/templates/CardTemplate.tsx"),
          context: {
            id: childMdx?.id,
          },
        });
      });
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
      type Mdx implements Node @infer {
        frontmatter: MdxFrontmatter!
      }

      type MdxFrontmatter @infer {
        title: String
        description: String
        publishedAt: Date @dateformat
        tags: [String!]
        youtube: String
        github: String
        thumbnail: File @fileByRelativePath
        author: String
        contributor: ContributorsJson
      }

      type ContributorsJson implements Node @infer {
        name: String!
        description: String
        featuredImage: File @fileByRelativePath
        links: SocialLinks
      }

      type SocialLinks {
        github: String
        youtube: String
        twitter: String
        facebook: String
      }

    `);
  };

export const createResolvers: GatsbyNode["createResolvers"] = ({
  createResolvers,
}) => {
  const resolvers = {
    MdxFrontmatter: {
      contributor: {
        type: "ContributorsJson",
        resolve: async (source, _args, context, _info) => {
          return await context.nodeModel.findOne({
            type: "ContributorsJson",
            query: {
              filter: {
                name: {
                  eq: source.author,
                },
              },
            },
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
