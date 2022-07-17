import { Button, Stack, Text, Title } from "@mantine/core";
import { Link } from "gatsby";
import * as React from "react";
import { BaseLayout } from "../components";

const NotFoundPage = () => {
  return (
    <BaseLayout>
      <Stack
        spacing="sm"
        style={{
          minHeight: "calc(100vh - var(--mantine-header-height) * 2)",
        }}
        align="center"
        justify="center"
      >
        <Title
          color="red"
          order={1}
          sx={theme => ({
            fontSize: 124,
            color: `${theme.colors.red[6]} !important`,
          })}
        >
          404
        </Title>
        <Text size="xl">
          Something went <strong>WRONG!</strong>
        </Text>
        <Text color="dimmed" size="xl">
          This page doesn't exist or was removed.
        </Text>
        <Link to="/" replace>
          <Button size="md">Back To HomePage</Button>
        </Link>
      </Stack>
    </BaseLayout>
  );
};

export default NotFoundPage;
