import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./Price";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Chart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
