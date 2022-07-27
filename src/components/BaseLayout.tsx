import {
  AppShell,
  AppShellProps,
  Global,
  MantineProvider,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import SeoProvider from "./SeoProvider";
import TopBar from "./TopBar";

const BaseLayout = ({ children, ...props }: AppShellProps) => {
  const theme = useMantineTheme();
  const xsBreakpoint = useMediaQuery(`(max-width:${theme.breakpoints.xs}px)`);
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Global
        styles={theme => ({
          html: {
            scrollBehavior: "smooth",
            scrollPadding: `calc(${theme.spacing.lg}px + var(--mantine-header-height))`,
          },
          h1: {
            color: `${
              colorScheme === "dark"
                ? theme.colors.gray[0]
                : theme.colors.dark[9]
            } !important`,
            fontWeight: "900 !important",
          },
          h2: {
            color: `${
              colorScheme === "dark"
                ? theme.colors.gray[2]
                : theme.colors.dark[7]
            } !important`,
            fontWeight: "800 !important",
          },
          h3: {
            color: `${
              colorScheme === "dark"
                ? theme.colors.gray[4]
                : theme.colors.dark[5]
            } !important`,
            fontWeight: "700 !important",
          },
        })}
      />
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        withCSSVariables
        theme={{
          colorScheme: colorScheme,
          primaryColor: "indigo",
          fontFamily: "Open Sans",
          fontFamilyMonospace: "JetBrains Mono",
          headings: {
            fontFamily: "Open Sans",
            sizes: {
              h1: {
                fontSize: 40,
              },
              h2: {
                fontSize: 32,
              },
              h3: {
                fontSize: 24,
              },
            },
          },
        }}
      >
        <SeoProvider />
        <AppShell
          fixed
          {...props}
          padding={xsBreakpoint ? "xs" : "xl"}
          styles={{
            body: {
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[2],
              minHeight: `calc(100vh - var(--mantine-header-height))`,
              justifyContent: "center",
            },
          }}
          header={<TopBar />}
        >
          {children}
        </AppShell>
      </MantineProvider>
    </>
  );
};

export default BaseLayout;
