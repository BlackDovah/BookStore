import {
  AppShell,
  Burger,
  Group,
  Text,
  Divider,
  BackgroundImage,
  Center,
  Overlay,
  AspectRatio,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { TextInput } from "../TextInput/TextInput";
import { GenreMenu } from "../GenreMenu/GenereMenu";

export function LandingPage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 150 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/* <Box maw={300} mx="auto"> */}
          <AspectRatio ratio={2560 / 100} mx="auto" pos="relative">
            <BackgroundImage
              src="https://booksliced.com/books/wp-content/uploads/2019/01/iMAGE_Our_Top_20_Online_Bookstores_and_Where_to_Find_Every_Online_Bookstore_-768x510.jpg"
            >
              <Center p="md">
                <Text c="brown" size="xl" fw={1000}>
                  BlackDovah's Book Store
                </Text>
              </Center>
            </BackgroundImage>
            <Overlay color="#000" backgroundOpacity={0.30} />
          </AspectRatio>
        {/* </Box> */}
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ColorSchemeToggle />
        <Divider my="md" size="lg" />
        <Text size="xl" fw={800}>
          Filters
        </Text>
        <Divider my="md" size="lg" />
        <Text size="md">Pick by genre</Text>
        <GenreMenu />
        <Divider my="md" size="lg" />
        <Text size="md">Search by keyword</Text>
        <TextInput />
      </AppShell.Navbar>
      <AppShell.Main>
        Aside is hidden on on md breakpoint and cannot be opened when it is
        collapsed
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}
