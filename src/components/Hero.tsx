"use client";

import { FormEvent, useState } from "react";
import { Input, Select } from "./ui/form";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    guests: "2",
    hasChildren: "no",
    budget: "",
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const createBooking = useMutation(api.bookings.create);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createBooking({
        name: formData.name,
        guests: formData.guests,
        hasChildren: formData.hasChildren,
        budget: formData.budget,
        email: formData.email,
      });
      
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        guests: "2",
        hasChildren: "no",
        budget: "",
        email: ""
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative">
      {/* Hero with background image */}
      <div className="relative">
        <div className="bg-[url('/hero.jpg')] bg-cover bg-center">
          <div className="relative">
            {/* overlay */}
            <div className="absolute inset-0 bg-black/40" aria-hidden />
            <div className="flex flex-col items-center justify-center relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
              <h1 className="flex flex-col items-center justify-center font-sans font-semibold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl drop-shadow">
                A Best Place for Your
                <span className="block pt-3">Leatny Experience</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form below hero */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-8 sm:-mt-10">
        <div className="rounded-xl border border-black/20 bg-white/90 backdrop-blur-md p-4 sm:p-6 shadow-xl">
          {isSubmitted ? (
            <div className="p-6 text-center">
              <div className="p-4 bg-green-50 text-green-800 rounded-md">
                <p className="font-medium text-xl">Thank you for your inquiry!</p>
                <p className="mt-1 text-sm">We&apos;ve received your information and will contact you as soon as we find a suitable room.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      guests: "2",
                      hasChildren: "no",
                      budget: "",
                      email: ""
                    });
                    setIsSubmitted(false);
                  }}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-[#E76B39] text-white h-11 px-5 font-medium hover:opacity-80 transition cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <div className="mb-5 rounded-md bg-[#E76B39]/10 border border-[#E76B39]/20 px-4 py-3 text-[#465C50]">
                  <p className="text-sm sm:text-base leading-6">
                    Please fill out the form below to search for available rooms
                  </p>
                </div>
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Please enter your name, e.g. John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  id="guests"
                  name="guests"
                  label="Number of Guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, '7+'].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </Select>

                <Select
                  id="hasChildren"
                  name="hasChildren"
                  label="Traveling with Children?"
                  value={formData.hasChildren}
                  onChange={handleChange}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>

                <div className="relative">
                  <Input
                    id="budget"
                    name="budget"
                    label="Budget (per night)"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 150"
                    min="0"
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-9 text-gray-500">$</span>
                </div>

                <Input
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center justify-center rounded-md bg-[#E76B39] text-white h-11 px-5 font-medium hover:opacity-90 transition cursor-pointer ${
                      isLoading ? 'opacity-80 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Sending...' : 'Search Rooms'}
                  </button>
                </div>
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                    {error}. Please try again.
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

