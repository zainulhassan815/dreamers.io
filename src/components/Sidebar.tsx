// import { Card, Navbar, Text, Title } from "@mantine/core";
// import { graphql, Link, StaticQuery } from "gatsby";
// import React from "react";

// const query = graphql`
//   query Sidebar {
//     allMdx {
//       nodes {
//         slug
//         frontmatter {
//           title
//           tags
//           description
//         }
//       }
//     }
//   }
// `;

// const Sidebar = () => {
//   return (
//     <StaticQuery
//       query={query}
//       render={(data: Queries.SidebarQuery) => (
//         <Navbar
//           width={{
//             sm: 300,
//           }}
//           p="md"
//           height={"calc(100vh - 64px)"}
//         >
//           <Navbar.Section
//             sx={theme => ({
//               display: "grid",
//               gap: theme.spacing.md,
//             })}
//           >
//             {data.allMdx.nodes.map(({ slug, frontmatter }) => (
//               <Link
//                 to={`/${slug}`}
//                 key={frontmatter?.title}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Card>
//                   <Title order={3}>{frontmatter?.title}</Title>
//                   <Text color="dimmed" size="sm">
//                     {frontmatter?.description}
//                   </Text>
//                 </Card>
//               </Link>
//             ))}
//           </Navbar.Section>
//         </Navbar>
//       )}
//     ></StaticQuery>
//   );
// };

// export default Sidebar;
