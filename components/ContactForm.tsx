"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Website Leads — ${name || "New enquiry"}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      service ? `Service: ${service}` : null,
      "",
      message,
    ].filter((l): l is string => l !== null);
    const body = lines.join("\n");
    window.location.href = `${CONTACT.leadsEmailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[0.95rem] text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-lime/60";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
            {dict.contact.formName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
            {dict.contact.formEmail}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
            {dict.contact.formCompany}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
            {dict.contact.formService}
          </label>
          <select
            id="service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">{dict.contact.formServiceDefault}</option>
            {dict.services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
          {dict.contact.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 text-[0.95rem] font-semibold text-ink transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
      >
        {dict.contact.formSubmit}
      </button>
      <p className="text-[0.8rem] text-cream/45">{dict.contact.formNote}</p>
    </form>
  );
}
