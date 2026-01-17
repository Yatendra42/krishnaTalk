export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />
      
      <div className="relative max-w-[820px] mx-auto px-8 py-20">
        <div className="text-center space-y-3">
          {/* Chapter Number */}
          <p className="text-[13px] tracking-widest uppercase text-muted-foreground font-light">
            Chapter 2
          </p>
          
          {/* Chapter Title */}
          <h1 className="text-[32px] font-light tracking-tight text-foreground leading-[1.3]">
            Sankhya Yoga
          </h1>
          
          {/* Subtitle */}
          <p className="text-[15px] text-muted-foreground font-light max-w-[600px] mx-auto leading-relaxed">
            The Yoga of Knowledge and Self-Realization
          </p>
        </div>
      </div>
    </section>
  );
}
