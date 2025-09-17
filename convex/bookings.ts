import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";
import { api } from "./_generated/api";

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

// Webhook handler for Make.com
const handleWebhook = httpAction(async (ctx, request) => {
  const payload = await request.json();
  
  // Validate required fields
  if (!payload.name || !payload.email) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create booking from webhook data
  await ctx.runMutation(api.bookings.create, {
    name: payload.name,
    email: payload.email,
    guests: payload.guests?.toString() || '1',
    hasChildren: payload.hasChildren ? 'yes' : 'no',
    budget: payload.budget?.toString() || 'medium',
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

// HTTP router for webhooks
// const http = httpRouter();
// http.route({
//   path: '/webhook/make',
//   method: 'POST',
//   handler: handleWebhook,
// });

// export default http;
