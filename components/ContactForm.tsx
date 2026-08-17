"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { WEB3FORMS_ACCESS_KEY, PHONE_COUNTRIES } from "@/lib/site";
import { SuccessModal } from "@/components/SuccessModal";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryDial, setCountryDial] = useState<string>(PHONE_COUNTRIES[0].dial);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const phone = `${countryDial} ${phoneNumber}`.trim();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Website Leads — ${name || "New enquiry"}`,
          from_name: "Glomark Website",
          name,
          email,
          phone,
          company: company || undefined,
          service: service || undefined,
          message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setCountryDial(PHONE_COUNTRIES[0].dial);
        setPhoneNumber("");
        setCompany("");
        setService("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[0.95rem] text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-lime/60";

  return (
    <>
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
            <label htmlFor="phone" className="mb-1.5 block text-[0.8rem] font-medium text-cream/70">
              {dict.contact.formPhone}
            </label>
            <div className="flex gap-2">
              <select
                aria-label={dict.contact.formCountry}
                value={countryDial}
                onChange={(e) => setCountryDial(e.target.value)}
                className={`${inputClass} w-[6.5rem] shrink-0 appearance-none px-2.5 text-center`}
              >
                {PHONE_COUNTRIES.map((c) => (
                  <option key={c.iso} value={c.dial}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="9101 8000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${inputClass} min-w-0 flex-1`}
              />
            </div>
          </div>
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
            <option value={dict.contact.formServiceOther}>
              {dict.contact.formServiceOther}
            </option>
          </select>
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
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 text-[0.95rem] font-semibold text-ink transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
        >
          {status === "loading" ? dict.contact.formSending : dict.contact.formSubmit}
        </button>

        {status === "error" ? (
          <p role="alert" className="text-[0.85rem] text-red-400">
            {dict.contact.formError}
          </p>
        ) : (
          <p className="text-[0.8rem] text-cream/45">{dict.contact.formNote}</p>
        )}
      </form>

      <SuccessModal
        open={status === "success"}
        onClose={() => setStatus("idle")}
        title={dict.contact.successTitle}
        body={dict.contact.successBody}
        closeLabel={dict.contact.successClose}
      />
    </>
  );
}
