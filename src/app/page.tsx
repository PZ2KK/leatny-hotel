"use client";

import Hero from "../components/Hero";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";


export default function Home() {
  const bookings = useQuery(api.bookings.list);
  return (
    <main>
      {bookings?.map(({ _id, name }) => (
        <div key={_id}>{name}</div>
      ))}
      <Hero />
    </main>
  );
}
