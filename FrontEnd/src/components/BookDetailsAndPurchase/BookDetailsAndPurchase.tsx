import React, { useState } from "react";
import {
  Modal,
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  Image,
  Title,
  NumberInput,
  Select,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCard, IconAlertCircle } from "@tabler/icons-react";
import { BookDetailsAndPurchaseProps, FormValues } from "@/types/books";

export function BookDetailsAndPurchase({ book }: BookDetailsAndPurchaseProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      email: "",
      quantity: 1,
      deliveryMethod: "digital",
    },
    validate: {
      name: (value: string) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      cardNumber: (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        return cleaned.length !== 16 ? "Card number must be 16 digits" : null;
      },
      expiryMonth: (value: string) => (!value ? "Select expiry month" : null),
      expiryYear: (value: string) => (!value ? "Select expiry year" : null),
      cvv: (value: string) =>
        !/^\d{3,4}$/.test(value) ? "CVV must be 3 or 4 digits" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      quantity: (value: number) =>
        value < 1 ? "Quantity must be at least 1" : null,
    },
  });

  const handleSubmit = async (values: FormValues): Promise<void> => {
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // eslint-disable-next-line no-console
      console.log("Processing payment:", values);
      close();
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years: string[] = Array.from({ length: 10 }, (_, i) =>
    String(currentYear + i)
  );
  const months: string[] = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    return cleaned.replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <>
      <Button onClick={open} variant="filled">
        <Group gap="xs">
          <IconCreditCard size={18} />
          <span>Get this book</span>
        </Group>
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={3}>Complete your purchase</Title>}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={isSubmitting} />
          <Stack gap="md">
            {/* Book Details Section */}
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Group gap="md">
                <Image
                  src={book.img}
                  alt={book.title}
                  width={100}
                  height={150}
                  fit="cover"
                  fallbackSrc="placeholder.png"
                />
                <Stack gap="xs">
                  <Title order={3}>{book.title}</Title>
                  <Text size="sm" color="dimmed">
                    By {book.author}{" "}
                    <span className="italic">- {book.cover}</span>
                  </Text>
                  <Group gap="xs">
                    <NumberInput
                      label="Quantity"
                      min={1}
                      max={99}
                      {...form.getInputProps("quantity")}
                      styles={{ input: { width: "80px" } }}
                    />
                    <Select
                      label="Delivery Method"
                      data={[
                        { value: "digital", label: "Soft Copy" },
                        { value: "physical", label: "Hard Copy" },
                      ]}
                      {...form.getInputProps("deliveryMethod")}
                    />
                  </Group>
                </Stack>
              </Group>
            </Paper>

            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
              >
                {error}
              </Alert>
            )}

            {/* Customer Details */}
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>Customer Information</Title>
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps("email")}
                />
              </Stack>
            </Paper>

            {/* Payment Form Section */}
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>Payment Details</Title>

                <TextInput
                  label="Name on card"
                  placeholder="Enter your full name"
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="Card number"
                  placeholder="0000 0000 0000 0000"
                  {...form.getInputProps("cardNumber")}
                  onChange={(event) => {
                    const formatted = formatCardNumber(
                      event.currentTarget.value
                    );
                    form.setFieldValue("cardNumber", formatted);
                  }}
                  maxLength={19}
                />

                <Group grow>
                  <Group grow gap="xs">
                    <Select
                      label="Month"
                      placeholder="MM"
                      data={months}
                      {...form.getInputProps("expiryMonth")}
                    />
                    <Select
                      label="Year"
                      placeholder="YYYY"
                      data={years}
                      {...form.getInputProps("expiryYear")}
                    />
                  </Group>
                  <TextInput
                    label="CVV"
                    placeholder="123"
                    {...form.getInputProps("cvv")}
                    maxLength={4}
                  />
                </Group>

                <Button type="submit" fullWidth mt="md" loading={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
