import {
  ActionIcon,
  Button,
  ButtonProps,
  Group,
  Header,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconMoon, IconPlugConnected, IconSchool, IconSearch, IconSun
} from "@tabler/icons";
import { Link } from "gatsby";
import React from "react";
import BrandLogo from "./BrandLogo";

interface HeaderLinkProps extends Partial<ButtonProps<"button">> {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export const HeaderLink = ({ to, label, icon, ...props }: HeaderLinkProps) => {
  return (
    <Link key={label} to={to} style={{ textDecoration: "none" }}>
      <Button
        color="dark"
        variant="default"
        size="md"
        leftIcon={icon}
        {...props}
      >
        {label}
      </Button>
    </Link>
  );
};

export const HeaderLinks = (
  props?: Omit<HeaderLinkProps, "to" | "label" | "icon">
) => {
  const links = [
    {
      to: "/extensions",
      label: "Extensions",
      icon: <IconPlugConnected size={24} />,
    },
    {
      to: "/tutorials",
      label: "Tutorials",
      icon: <IconSchool size={24} />,
    },
  ];
  return (
    <>
      {links.map(link => (
        <HeaderLink key={link.label} {...link} {...props} />
      ))}
    </>
  );
};

const TopBar = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const largeBreakpoint = useMediaQuery(
    `(min-width:${theme.breakpoints.xs}px)`
  );

  return (
    <Header
      height={64}
      px="md"
      py="sm"
      sx={{
        boxShadow: theme.shadows.lg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <BrandLogo />
      </Link>

      {largeBreakpoint && <Group spacing="sm">{HeaderLinks()}</Group>}

      <Group spacing="sm">
        <ActionIcon title="Search" size="xl" variant="default">
          <IconSearch size={24} />
        </ActionIcon>
        <ActionIcon
          title="Toggle Theme"
          size="xl"
          variant="default"
          onClick={() => toggleColorScheme()}
        >
          {colorScheme === "dark" ? (
            <IconSun size={24} />
          ) : (
            <IconMoon size={24} />
          )}
        </ActionIcon>
      </Group>
    </Header>
  );
};

export default TopBar;
