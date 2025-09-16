import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookings: defineTable({
    name: v.string(),
    guests: v.string(),
    hasChildren: v.string(),
    budget: v.string(),
    email: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled")
    ),
    submittedAt: v.number(),
  })
  .index("by_email", ["email"])
  .index("by_status", ["status"])
});
