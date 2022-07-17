import { Group, Stack, Text, Title } from "@mantine/core";
import * as React from "react";
import { BaseLayout, HeaderLinks } from "../components";

const IndexPage = () => {
  return (
    <BaseLayout>
      <Stack
        spacing="xl"
        style={{
          minHeight: "calc(100vh - var(--mantine-header-height) * 2)",
        }}
        align="center"
        justify="center"
      >
        <Title align="center" order={1}>
          Dreamers Lab
        </Title>
        <Text align="center" size="xl" color="gray" style={{ fontWeight: 500 }}>
          Supercharge ⚔️ your coding skills with free and open-source content.
        </Text>

        <Group
          spacing="sm"
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {<HeaderLinks variant="filled" color="indigo" />}
        </Group>
      </Stack>
    </BaseLayout>
  );
};

export default IndexPage;
