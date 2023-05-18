import { Stack } from "@mui/material";
import Anonce from "./Anonce.jsx";
import React from "react";

export default function List({ anonces, id_anonce_chosen, setIdAnonce }) {
  function createAnoncesArray() {
    let Array = [];
    for (let i = 0; i < 30; i++) {
      Array.push(<Anonce />);
    }
    return Array;
  }

  function orderAnonces(Anonces) {
    let array = [];
    let gap = 4;
    for (let i = 0; i < Anonces.length - (Anonces.length % 4); i = i + 4) {
      array.push(
        <Stack
          paddingTop={gap}
          direction="row"
          flexWrap="wrap"
          gap={gap}
          justifyContent="center"
        >
          <Stack
            justifyContent="center"
            direction="row"
            flexWrap="wrap"
            gap={gap}
          >
            {Anonces[i]}
            {Anonces[i + 1]}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={gap}
          >
            {Anonces[i + 2]}
            {Anonces[i + 3]}
          </Stack>
        </Stack>
      );
    }
    switch (Anonces.length % 4) {
      case 1: {
        array.push(
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            paddingTop={gap}
          >
            {Anonces[Anonces.length - 1]}
          </Stack>
        );
        break;
      }
      case 2: {
        array.push(
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={gap}
            paddingTop={gap}
          >
            {Anonces[Anonces.length - 2]}
            {Anonces[Anonces.length - 1]}
          </Stack>
        );
        break;
      }
      case 3: {
        array.push(
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={gap}
            paddingTop={gap}
          >
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              gap={gap}
            >
              {Anonces[Anonces.length - 3]}
              {Anonces[Anonces.length - 2]}
            </Stack>
            <Stack direction="row" justifyContent="center" flexWrap="wrap">
              {Anonces[Anonces.length - 1]}
            </Stack>
          </Stack>
        );
        break;
      }
      default: {
        console.log(Anonces.length + " is a multiple of 4 !");
      }
    }
    return array;
  }

  return orderAnonces(createAnoncesArray());
}
