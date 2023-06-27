import React, { useState, SetStateAction, Dispatch } from "react";
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px",
}));

const ItemSelect = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px",
}));

const QuantityInput = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px",
}));

type AddItemFormProps = {
  setItems: Dispatch<SetStateAction<ShoppingCartItem[]>>;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ setItems }) => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const add: (() => void) = () => {
    setItems((prev) => {
        const coincidence = prev.some((el) => el.productId == productId);

        if (coincidence) {
            return prev.map((el) => {
            if (el.productId == productId) {
              return { ...el, quantity: el.quantity + quantity };
            } else {
              return el
            }
          });
        } else {
          return [...prev, { productId, quantity }];
        }
      });
      setQuantity(0)
      setProductId("")
  }

  return (
    <AddItemBox>
      <ItemSelect>
        <TextField
          select
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          value={productId}
          label="Product"
        >
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelect>
      <QuantityInput>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => {
            if (parseInt(e.target.value) >= 0) {
              setQuantity(parseInt(e.target.value));
            }
          }}
        />
      </QuantityInput>
      <Button
        variant="contained"
        disabled={!quantity || !productId}
        onClick={add}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
