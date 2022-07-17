import {
  Badge,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ExtensionCardProps {
  title?: string | null;
  description?: string | null;
  tags?: ReadonlyArray<string | null> | null;
  thumbnail?: IGatsbyImageData | null;
}

const ExtensionCard = ({
  title,
  description,
  tags,
  thumbnail,
  ...props
}: ExtensionCardProps & Partial<PaperProps<any>>) => {
  return (
    <Paper {...props} withBorder shadow="md" style={{ overflow: "hidden" }}>
      {thumbnail && <GatsbyImage alt={title ?? ""} image={thumbnail} />}
      <Stack spacing="xs" p="md">
        <Title order={3}>{title}</Title>
        <Text size="lg">{description}</Text>
        {tags && tags.length > 0 && (
          <Group spacing="xs">
            {tags.slice(0, 6).map(tag => (
              <Badge key={tag} variant="filled" radius="xs" size="lg">
                {tag}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Paper>
  );
};

export default ExtensionCard;
