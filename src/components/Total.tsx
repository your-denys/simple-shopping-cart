import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40,
}));

type TotalProps = {
  items: ShoppingCartItem[];
  setItems: Dispatch<SetStateAction<ShoppingCartItem[]>>;
};

const Total: React.FC<TotalProps> = ({ items, setItems }) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let sum = 0;
    items.forEach((item) => {
      const product = PRODUCTS_MAP[item.productId];
      const price = product?.price || 0;
      sum += item.quantity * price;
    });
    setTotal(sum);
  }, [items]);

  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: ${total}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => setItems([])}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;
