import { Divider, Text } from "@mantine/core";
import { MDXProvider } from "@mdx-js/react";
import type { GatsbySSR } from "gatsby";
import React from "react";
import { ThemeProvider } from "./src/utils";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  const components = {
    p: props => <Text {...props} size="lg" color="gray" weight={500} mb="sm" />,
    hr: props => <Divider {...props} variant="dashed" size="sm" color="dark" />,
  };

  return (
    <ThemeProvider>
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  );
};
