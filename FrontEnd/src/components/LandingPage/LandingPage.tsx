import {
  AppShell,
  Burger,
  Group,
  Text,
  Divider,
  BackgroundImage,
  Center,
  AspectRatio,
  Drawer,
  Title,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Input } from "../BooksFetching/Input";
import { GenreMenu } from "../BooksFetching/GenereMenu";
import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Advertisments } from "@/components/Advertisments/Advertisments";
import { BooksDisplay } from "../BooksFetching/BooksDisplay";

export function LandingPage() {
  const [opened, { open, close }] = useDisclosure();
  const [showFooter, setShowFooter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string | number | undefined>("");
  // const navigate = useNavigate();

  const handleSearch = (search: string | number | undefined) => {
    setSubmittedQuery(search);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // useEffect(() => {
  //   if (selectedCategory) {
  //     navigate(`/books?category=${encodeURIComponent(selectedCategory)}`);
  //   } else if (submittedQuery !== "") {
  //     navigate(`/books?keyword=${encodeURIComponent(submittedQuery)}`);
  //   }
  // }, [selectedCategory, submittedQuery]);

  useEffect(() => {
    if (selectedCategory !== "Choose Genre") {
      setSubmittedQuery("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (submittedQuery !== "") {
      setSelectedCategory("Choose Genre");
    }
    if (submittedQuery === "" && selectedCategory === "Choose Genre") {
      setSelectedCategory("All Genres");
    }
  }, [submittedQuery]);

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
        <Burger opened={opened} onClick={open} hiddenFrom="sm" size="lg" />
        <Center>
          {/* <Link to="/">
            <Title>Mightier Than The Sword</Title>
          </Link> */}
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSubmittedQuery("");
              setSelectedCategory(undefined);
            }}
          >
            <Title>Mightier Than The Sword</Title>
          </button>
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
      </Drawer>
      <AppShell.Main bg="#330000">
        {submittedQuery !== "" || selectedCategory !== undefined ? (
          <BooksDisplay search={submittedQuery} category={selectedCategory} />
        ) : (
          <>
            <AspectRatio
              ratio={16 / 9}
              maw="80%"
              mah="80%"
              mx="auto"
              pos="relative"
            >
              <BackgroundImage src="https://booksliced.com/books/wp-content/uploads/2019/01/iMAGE_Our_Top_20_Online_Bookstores_and_Where_to_Find_Every_Online_Bookstore_-768x510.jpg" />
            </AspectRatio>
            <Title
              c="#557c3e"
              className="flex text-6xl mt-8 mb-8 justify-center"
            >
              Featured Books
            </Title>
            <Advertisments />
          </>
        )}
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
