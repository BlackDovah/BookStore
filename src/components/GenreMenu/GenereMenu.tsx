import { Menu, Button } from "@mantine/core";

export function GenreMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Choose Genere</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Genres</Menu.Label>
        <Menu.Item>Fantazy</Menu.Item>
        <Menu.Item>Horror</Menu.Item>
        <Menu.Item>Romance</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
