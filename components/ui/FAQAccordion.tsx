"use client";

import { useState } from "react";

export type FAQItemData = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItemData[];
  tone?: "on-ink" | "on-ivory";
  idPrefix: string;
  className?: string;
};

/**
 * Accordion list. Multiple items may be open simultaneously (simpler mental
 * model than forced single-open, per service-page-layout-spec §8). Fully
 * keyboard operable, question/answer text stays as clean plain text so it
 * stays JSON-LD/schema-extractable by the page composing this component.
 */
export function FAQAccordion({ items, tone = "on-ivory", idPrefix, className = "" }: FAQAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const textColor = tone === "on-ink" ? "text-ivory" : "text-ink";
  const borderColor = "border-slate-deep";
  const answerColor = tone === "on-ink" ? "text-slate" : "text-slate-deep";

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        const questionId = `${idPrefix}-question-${index}`;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <div key={item.question} className={`border-b ${borderColor}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggle(index)}
                className={`flex w-full items-start justify-between gap-6 py-6 text-left font-sans text-base font-medium ${textColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                  tone === "on-ink" ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-ivory"
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 font-display text-xl leading-none transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
              className={isOpen ? "block pb-6" : "hidden"}
            >
              <p className={`font-sans text-sm leading-relaxed ${answerColor} max-w-[65ch]`}>
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
