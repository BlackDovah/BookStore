import { Carousel } from "@mantine/carousel";
import {
  Button,
  Paper,
  Text,
  Title,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Book, CategoryBooks } from "@/types/books";
import { fetchBooks } from "@/services/api";
import { useState, useEffect } from "react";
import classes from "./Advertisments.module.css";

function Card({ img, title, author }: Book) {
  return (
    <Paper p="xl" bg="#330000">
      <Image
        src={img}
        alt={`${title} cover`}
        style={{
          width: "60%",
          height: "90%",
          marginRight: "10px",
          marginBottom: "30px",    
        }}
      />
      <div>
        <Text className={classes.author} size="lg">
          {author}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Get this book
      </Button>
    </Paper>
  );
}

export function Advertisments() {
  const [books, setBooks] = useState<CategoryBooks>({});

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error); //eslint-disable-line
      });
  }, []);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = Object.values(books).map((items) =>
    Object.values(items).map((item) => (
      <Carousel.Slide key={item.title}>
        <Card {...item} />
      </Carousel.Slide>
    ))
  );

  return (
    <Carousel
      slideSize={{ base: "100%", sm: "25%" }}
      slideGap={{ base: 2, sm: "sm" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      withIndicators
      loop
    >
      {slides}
    </Carousel>
  );
}
