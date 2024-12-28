import {
  AppShell,
  Burger,
  Group,
  Text,
  Divider,
  Center,
  Drawer,
  Title,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { Input } from "../BooksFetching/TextInput";
import { GenreMenu } from "../BooksFetching/GenereMenu";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BooksDisplay } from "../BooksFetching/BooksDisplay";

export function BooksPage() {
  const [opened, { open, close }] = useDisclosure();
  const [showFooter, setShowFooter] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "All Genres");
  const [searchQuery, setSearchQuery] = useState<string | number>(searchParams.get("keyword") || "");
  const [submittedQuery, setSubmittedQuery] = useState<string | number>(searchParams.get("keyword") || "");

  
  const handleSearch = () => {
    setSubmittedQuery(searchQuery);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowFooter(scrollY + viewportHeight >= documentHeight - 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppShell header={{ height: 150 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header bg="#f6b319" c="#557c3e">
        <Burger opened={opened} onClick={open} hiddenFrom="sm" size="sm" />
        <Center>
          <Link to="/">
            <Title>BlackDovah's Book Store</Title>
          </Link>
        </Center>
        <Group h="100%" px="md" visibleFrom="sm" className="justify-end">
          <Text size="md">Search by keyword</Text>
          <Input
            searchQuery={searchQuery}
            onSearchChange={(value) => setSearchQuery(value)}
            onSearchSubmit={handleSearch}
          />
          <Divider my="md" size="lg" />
          <Text size="md">Pick by genre</Text>
          <GenreMenu
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategory}
          />
          <Divider my="md" size="lg" />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="75%"
        title="Options"
      >
        <Text size="md">Search by keyword</Text>
        <Input
            searchQuery={searchQuery}
            onSearchChange={(value) => setSearchQuery(value)}
            onSearchSubmit={handleSearch}
          />
        <Divider my="md" size="lg" />
        <Text size="md">Pick by genre</Text>
        <GenreMenu
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategory}
          />
        <Divider my="md" size="lg" />
        <ColorSchemeToggle />
      </Drawer>
      <AppShell.Main bg="#330000">
        <BooksDisplay search={submittedQuery} category={selectedCategory} />
      </AppShell.Main>
      <Transition
        mounted={showFooter}
        transition="slide-up"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <AppShell.Footer style={styles} p="md">
            <Center>
              <Text>
                ©2024 BlackDovah's Book Store | Made with react | tailwindCSS |
                Mantine.
              </Text>
            </Center>
          </AppShell.Footer>
        )}
      </Transition>
    </AppShell>
  );
}
