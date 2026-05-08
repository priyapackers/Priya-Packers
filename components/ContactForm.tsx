"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-lg border border-[#e6e0d7] bg-white p-6 shadow-[0_18px_60px_rgba(17,24,32,0.06)]"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#111820]">
          Name
          <input
            required
            name="name"
            className="min-h-12 rounded-md border border-[#ddd5ca] px-4 text-sm outline-none transition focus:border-[#0b2341]"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#111820]">
          Company
          <input
            name="company"
            className="min-h-12 rounded-md border border-[#ddd5ca] px-4 text-sm outline-none transition focus:border-[#0b2341]"
            placeholder="Company name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#111820]">
          Email
          <input
            required
            type="email"
            name="email"
            className="min-h-12 rounded-md border border-[#ddd5ca] px-4 text-sm outline-none transition focus:border-[#0b2341]"
            placeholder="name@company.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#111820]">
          Phone
          <input
            name="phone"
            className="min-h-12 rounded-md border border-[#ddd5ca] px-4 text-sm outline-none transition focus:border-[#0b2341]"
            placeholder="+91 XXXXX XXXXX"
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-semibold text-[#111820]">
        Requirement
        <textarea
          required
          name="message"
          rows={6}
          className="rounded-md border border-[#ddd5ca] px-4 py-3 text-sm outline-none transition focus:border-[#0b2341]"
          placeholder="Tell us about box size, quantity, printing, destination, and timeline."
        />
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345d]"
      >
        Send Inquiry
        <Send className="size-4" />
      </button>
      {submitted ? (
        <p className="mt-4 rounded-md bg-[#eef7f1] px-4 py-3 text-sm font-semibold text-[#1f6f4d]">
          Thanks. This placeholder form is ready for integration with your
          preferred email or CRM service.
        </p>
      ) : null}
    </form>
  );
}
