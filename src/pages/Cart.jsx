/* eslint-disable react/prop-types */

import { Drawer, Button, List, Text } from '@mantine/core';

const Cart = ({ cartItems, onClose }) => (
  <Drawer opened={cartItems.length > 0} onClose={onClose} title="Your Cart">
    <List>
      {cartItems.map((item) => (
        <List.Item key={item.id}>
          <Text>{item.title} - ${item.price}</Text>
        </List.Item>
      ))}
    </List>
    <Button fullWidth mt="md">Checkout</Button>
  </Drawer>
);

export default Cart;
