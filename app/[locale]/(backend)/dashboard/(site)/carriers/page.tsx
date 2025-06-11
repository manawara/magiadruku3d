"use client";
import { fetchCarriers } from "@/app/action/furgonetka";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CarriersPage = () => {
  const { data: carriers } = useQuery({
    queryKey: ["carriers"],
    queryFn: fetchCarriers,
  });

  console.log(carriers);

  return (
    <div>
      <h1>sss</h1>
      <div></div>
    </div>
  );
};

export default CarriersPage;
