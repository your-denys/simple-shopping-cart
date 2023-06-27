import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { ShoppingCartItem } from "../models";
import AddItemForm from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500,
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24,
}));

const ShoppingCart = () => {
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItemForm setItems={setItems} />
      {!!items.length && (
        <>
          <ItemsList items={items} setItems={setItems} /> 
          <Total items={items} setItems={setItems} />
        </>
      )}
    </ShoppingCardWrapper>
  );
};

export default ShoppingCart;
