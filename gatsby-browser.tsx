import { Divider, Text } from "@mantine/core";
import { MDXProvider } from "@mdx-js/react";
import type { GatsbyBrowser } from "gatsby";
import React from "react";
import { ThemeProvider } from "./src/utils";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  const components = {
    p: props => <Text {...props} size="lg" color="gray" weight={500} mb="sm" />,
    hr: props => <Divider {...props} variant="dashed" size="sm" color="dark" />,
  };

  return (
    <MDXProvider components={components}>
      <ThemeProvider>{element}</ThemeProvider>
    </MDXProvider>
  );
};
