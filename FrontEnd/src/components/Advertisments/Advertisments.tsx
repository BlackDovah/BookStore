import { Carousel } from "@mantine/carousel";
import { Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Book, CategoryBooks } from "@/types/books";
import { fetchBooks } from "@/services/api";
import { useState, useEffect } from "react";
import { BookDetailsAndPurchase } from "@/components/BookDetailsAndPurchase/BookDetailsAndPurchase";
import classes from "./Advertisments.module.css";

function Card({ img, title, author, ISBN, cover, field }: Book) {
  return (
    <div className="flex relative">
      <Paper
        p="xl"
        radius="md"
        style={{
          backgroundImage: `url(${img})`,
          height: "440px",
          width: "100%",
        }}
      >
        <div>
          <Text className={classes.author} size="lg">
            {author}
          </Text>
          <div className="absolute">
            <Title order={3} className={classes.title}>
              {title}
            </Title>
          </div>
          <div className="absolute bottom-5">
            <BookDetailsAndPurchase
              book={{ img, title, author, ISBN, cover, field }}
            />
          </div>
        </div>
      </Paper>
    </div>
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
      h="500px"
      slideSize={{ base: "100%", sm: "25%", height: "500" }}
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
