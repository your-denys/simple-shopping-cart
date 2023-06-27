import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const ItemsListWrapper = styled(Box)(() => ({
  paddingTop: 20,
}));

type ItemsListProps = {
  items: ShoppingCartItem[];
  setItems: Dispatch<SetStateAction<ShoppingCartItem[]>>;
};

const ItemsList: React.FC<ItemsListProps> = ({ items, setItems }) => {
  const del: (id: string) => void = (id: string) => {
    setItems((prev) => {
      return prev.filter((el) => el.productId !== id);
    });
  };

  const inc: (id: string) => void = (id: string) => {
    setItems((prev) => {
      return prev.map((el) => {
        return el.productId == id ? { ...el, quantity: el.quantity + 1 } : el;
      });
    });
  };

  const dec: (id: string) => void = (id: string) => {
    setItems((prev) => {
      return prev.map((el) => {
        return el.productId == id ? { ...el, quantity: el.quantity - 1 } : el;
      });
    });
  };

  return (
    <ItemsListWrapper>
      {items.map((item) => {
        const product = PRODUCTS_MAP[item.productId];
        const price = product?.price || 0;

        return (
          <Grid container key={item.productId}>
            <Grid item xs={12}>
              <Typography>{product?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${item.quantity} x $${price} = $${
                item.quantity * price
              }`}</Typography>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={() => inc(item.productId)}>+</Button>
              <Button onClick={() => dec(item.productId)}>-</Button>
              <Button onClick={() => del(item.productId)}>x</Button>
            </ButtonGroup>
          </Grid>
        );
      })}
    </ItemsListWrapper>
  );
};

export default ItemsList;
