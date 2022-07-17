import {
  Accordion,
  Button,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

interface Heading {
  url: string;
  title: string;
  items?: Heading[];
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const theme = useMantineTheme();
  const lgBreakpoint = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);

  if (!headings) return null;

  return (
    <Paper
      style={{
        position: lgBreakpoint ? "sticky" : "unset",
        top: lgBreakpoint
          ? `calc(${theme.spacing.lg}px + var(--mantine-header-height))`
          : 0,
        alignSelf: "self-start",
        width: lgBreakpoint ? "320px" : "100%",
        minWidth: "280px",
      }}
    >
      <Accordion>
        <Accordion.Item
          label={<Title order={3} children="Table Of Contents" />}
          styles={{
            content: {
              paddingLeft: 0,
            },
            contentInner: {
              display: "flex",
              gap: theme.spacing.xs,
              flexDirection: "column",
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: lgBreakpoint ? "80vh" : "auto",
            },
          }}
        >
          {headings.map(({ title, items, url }) => (
            <React.Fragment key={title}>
              <Button
                component={"a"}
                href={url}
                styles={{
                  inner: {
                    alignItems: "flex-start",
                    justifyContent: "start",
                  },
                }}
                radius="xs"
                size="md"
                variant="subtle"
                p="xs"
                color="dark"
              >
                {title}
              </Button>
              {items &&
                items.map(({ title, url }) => (
                  <Text
                    key={title}
                    color="dimmed"
                    component="a"
                    href={url}
                    ml="lg"
                    px="lg"
                  >
                    {title}
                  </Text>
                ))}
            </React.Fragment>
          ))}
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
};

export default TableOfContents;
export type { Heading };
