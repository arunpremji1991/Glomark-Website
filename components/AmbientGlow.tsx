// A soft, warm-white light wash behind every page — fixed to the viewport so
// it's present no matter how far down a page you've scrolled, sitting below
// all content (negative z-index) and letting section backgrounds (panels,
// the indigo-deep bands, etc.) cover it where they already have their own
// tone. Cream rather than pure white, to stay warm against the near-black
// ink background instead of reading as a harsh spotlight.
export function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[15%] left-[15%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,243,238,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -right-[12%] top-[28%] h-[48vh] w-[48vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,243,238,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute -bottom-[12%] left-[8%] h-[42vh] w-[42vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,243,238,0.045) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
