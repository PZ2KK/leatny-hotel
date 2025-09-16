import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    guests: v.string(),
    hasChildren: v.string(),
    budget: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const booking = {
      ...args,
      status: "pending" as const,
      submittedAt: Date.now(),
    };
    
    await ctx.db.insert("bookings", booking);
    return { success: true };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});
