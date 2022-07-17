import {
  Avatar,
  Button,
  Card,
  CardProps,
  Group,
  MantineColor,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface Author {
  name?: string;
  featuredImage?: IGatsbyImageData | null;
  description?: string | null;
  links?: Queries.SocialLinks;
}

const linkStyles: Record<
  string,
  { color: MantineColor; icon: React.ReactNode }
> = {
  github: {
    color: "dark",
    icon: <IconBrandGithub />,
  },
  facebook: {
    color: "blue",
    icon: <IconBrandFacebook />,
  },
  youtube: {
    color: "red",
    icon: <IconBrandYoutube />,
  },
  twitter: {
    color: "cyan",
    icon: <IconBrandTwitter />,
  },
};

const AuthorCard = ({
  name,
  featuredImage,
  description,
  links,
  ...props
}: Author & Partial<CardProps<"div">>) => {
  return (
    <Card {...props}>
      <Group spacing="sm" align="flex-start">
        {name && featuredImage && (
          <Avatar size="lg">
            <GatsbyImage image={featuredImage} alt={name} />
          </Avatar>
        )}
        <Stack spacing={0} align="flex-start">
          <Text size="md" weight="bold">
            {name}
          </Text>
          <Text color="dimmed">{description}</Text>
        </Stack>
      </Group>
      {links && Object.keys(links).length > 0 && (
        <>
          <Space h="sm" />
          <Group spacing="xs">
            {Object.keys(links)
              .filter(key => links[key as keyof Queries.SocialLinks])
              .map(key => {
                const { color, icon } = linkStyles[key];
                return (
                  <Button
                    px="sm"
                    key={key}
                    component={"a"}
                    href={links[key as keyof Queries.SocialLinks]!}
                    target="_blank"
                    size="md"
                    color={color}
                    variant="filled"
                    children={icon}
                  />
                );
              })}
          </Group>
        </>
      )}
    </Card>
  );
};

export default AuthorCard;

export type { Author };
