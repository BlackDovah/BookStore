/* eslint-disable react/prop-types */

import { Card, Image, Text, Button, Group } from '@mantine/core';

const BookCard = ({ title, author, price, cover }) => (
  <Card shadow="sm" padding="lg">
    <Card.Section>
      <Image src={cover} alt={title} height={160} />
    </Card.Section>
    <Text weight={500} size="lg" mt="md">{title}</Text>
    <Text size="sm" color="dimmed">{author}</Text>
    <Group position="apart" mt="md">
      <Text size="sm" weight={700}>${price}</Text>
      <Button variant="light" color="blue" size="sm">Add to Cart</Button>
    </Group>
  </Card>
);

export default BookCard;
