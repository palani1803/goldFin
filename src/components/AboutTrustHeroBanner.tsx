interface AboutTrustHeroBannerProps {
  className?: string
}

export default function AboutTrustHeroBanner({ className = '' }: AboutTrustHeroBannerProps) {
  return (
    <div
      className={`relative w-full aspect-[3/2] rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#FFF7EC] border border-orange-200/90 shadow-[0_16px_40px_rgba(249,115,22,0.12)] select-none group transition-all duration-700 hover:shadow-[0_22px_50px_rgba(249,115,22,0.2)] ${className}`}
    >
      {/* 1. Ambient Warm Golden Glow Behind Tree */}
      <div 
        className="absolute right-0 top-0 w-3/4 h-full pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle at 70% 40%, rgba(254, 215, 170, 0.55) 0%, rgba(255, 237, 213, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* 2. Full SVG Layer for Tree & Flowing Waves */}
      <svg
        viewBox="0 0 960 640"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tree Trunk & Branches Gold Gradient */}
          <linearGradient id="treeGoldTrunk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Leaf Fill Gradient */}
          <linearGradient id="treeLeafGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="40%" stopColor="#FEF3C7" />
            <stop offset="75%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Ribbon Wave Gradient 1 (Deep Base) */}
          <linearGradient id="waveDeepGold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FB923C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.92" />
          </linearGradient>

          {/* Ribbon Wave Gradient 2 (Mid Translucent) */}
          <linearGradient id="waveMidGold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.45" />
          </linearGradient>

          {/* Ribbon Wave Gradient 3 (Light Shimmer) */}
          <linearGradient id="waveLightGold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#FDBA74" stopOpacity="0.65" />
            <stop offset="80%" stopColor="#F97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Tree Group */}
        <g id="vectorTree" className="transition-transform duration-700 group-hover:scale-[1.01] origin-[670px_350px]">
          {/* Main Trunk with Braided Fiber */}
          <path
            d="M 655,425 C 656,385 662,325 660,265 C 660,232 668,212 670,195 C 672,212 680,232 680,265 C 678,325 684,385 685,425 Z"
            fill="url(#treeGoldTrunk)"
            opacity="0.9"
          />

          {/* Trunk Fine Bark Lines */}
          <path d="M 658,420 C 660,375 666,335 665,275 C 664,238 668,218 670,195" fill="none" stroke="#B45309" strokeWidth="1.8" />
          <path d="M 664,422 C 667,370 670,325 669,270 C 669,233 671,212 670,195" fill="none" stroke="#FEF3C7" strokeWidth="1.3" opacity="0.85" />
          <path d="M 676,422 C 673,370 670,325 671,270 C 671,233 669,212 670,195" fill="none" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M 682,420 C 680,375 674,335 675,275 C 676,238 672,218 670,195" fill="none" stroke="#B45309" strokeWidth="1.8" />

          {/* Spreading Roots into Waves */}
          <path d="M 655,425 C 642,437 620,446 580,455" fill="none" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 658,425 C 648,440 630,449 608,460" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 665,428 C 658,444 646,456 634,465" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          
          <path d="M 685,425 C 698,437 720,446 760,455" fill="none" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 682,425 C 692,440 710,449 732,460" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 675,428 C 682,444 694,456 706,465" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />

          {/* Left Primary Branches */}
          <path d="M 662,285 C 638,274 595,268 540,252 C 512,244 490,250 472,246" fill="none" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 565,258 C 543,236 521,225 498,214" fill="none" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 528,249 C 511,263 494,272 472,274" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />

          <path d="M 664,238 C 632,216 584,195 530,174 C 502,163 480,157 458,152" fill="none" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 584,195 C 568,173 541,157 513,141" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 552,183 C 535,196 513,202 491,202" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

          <path d="M 667,196 C 648,164 615,137 566,116 C 544,105 522,100 500,95" fill="none" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 615,138 C 598,117 576,101 549,85" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Right Primary Branches */}
          <path d="M 678,285 C 702,274 745,268 800,252 C 828,244 850,250 868,246" fill="none" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 775,258 C 797,236 819,225 842,214" fill="none" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 812,249 C 829,263 846,272 868,274" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" />

          <path d="M 676,238 C 708,216 756,195 810,174 C 838,163 860,157 882,152" fill="none" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 756,195 C 772,173 799,157 827,141" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 788,183 C 805,196 827,202 849,202" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

          <path d="M 673,196 C 692,164 725,137 774,116 C 796,105 818,100 840,95" fill="none" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 725,138 C 742,117 764,101 791,85" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Top Center Twigs */}
          <path d="M 670,195 C 664,158 658,126 664,94" fill="none" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 670,195 C 676,158 682,126 676,94" fill="none" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 666,148 C 648,126 631,110 620,88" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M 674,148 C 692,126 709,110 720,88" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

          {/* Leaf Canopy */}
          {[
            // Top Center Cluster
            { x: 670, y: 80, rot: 0, s: 1.15 },
            { x: 642, y: 84, rot: -16, s: 1.05 },
            { x: 698, y: 84, rot: 16, s: 1.05 },
            { x: 614, y: 98, rot: -32, s: 1.05 },
            { x: 726, y: 98, rot: 32, s: 1.05 },
            { x: 658, y: 108, rot: -8, s: 1.0 },
            { x: 682, y: 108, rot: 8, s: 1.0 },
            { x: 586, y: 120, rot: -46, s: 1.05 },
            { x: 754, y: 120, rot: 46, s: 1.05 },
            { x: 630, y: 128, rot: -22, s: 1.0 },
            { x: 710, y: 128, rot: 22, s: 1.0 },
            
            // Mid Upper Canopy
            { x: 558, y: 142, rot: -58, s: 1.1 },
            { x: 782, y: 142, rot: 58, s: 1.1 },
            { x: 602, y: 152, rot: -36, s: 1.0 },
            { x: 738, y: 152, rot: 36, s: 1.0 },
            { x: 646, y: 158, rot: -12, s: 0.95 },
            { x: 694, y: 158, rot: 12, s: 0.95 },
            { x: 536, y: 170, rot: -68, s: 1.05 },
            { x: 804, y: 170, rot: 68, s: 1.05 },
            { x: 574, y: 178, rot: -52, s: 1.0 },
            { x: 766, y: 178, rot: 52, s: 1.0 },
            { x: 618, y: 184, rot: -26, s: 0.95 },
            { x: 722, y: 184, rot: 26, s: 0.95 },
            { x: 670, y: 178, rot: 0, s: 0.9 },
            
            // Outer & Lower Canopy
            { x: 512, y: 198, rot: -78, s: 1.05 },
            { x: 828, y: 198, rot: 78, s: 1.05 },
            { x: 552, y: 206, rot: -62, s: 1.0 },
            { x: 788, y: 206, rot: 62, s: 1.0 },
            { x: 590, y: 212, rot: -42, s: 0.95 },
            { x: 750, y: 212, rot: 42, s: 0.95 },
            { x: 636, y: 214, rot: -16, s: 0.9 },
            { x: 704, y: 214, rot: 16, s: 0.9 },
            
            // Bottom Fringe Leaves
            { x: 494, y: 232, rot: -88, s: 1.0 },
            { x: 846, y: 232, rot: 88, s: 1.0 },
            { x: 530, y: 238, rot: -72, s: 0.95 },
            { x: 810, y: 238, rot: 72, s: 0.95 },
            { x: 570, y: 242, rot: -52, s: 0.9 },
            { x: 770, y: 242, rot: 52, s: 0.9 },
            { x: 608, y: 242, rot: -32, s: 0.9 },
            { x: 732, y: 242, rot: 32, s: 0.9 },

            // Dense Fillers for Richness
            { x: 518, y: 168, rot: -62, s: 0.9 },
            { x: 822, y: 168, rot: 62, s: 0.9 },
            { x: 546, y: 132, rot: -52, s: 0.9 },
            { x: 794, y: 132, rot: 52, s: 0.9 },
            { x: 624, y: 104, rot: -28, s: 0.9 },
            { x: 716, y: 104, rot: 28, s: 0.9 },
            { x: 578, y: 100, rot: -42, s: 0.9 },
            { x: 762, y: 100, rot: 42, s: 0.9 },
            { x: 654, y: 72, rot: -6, s: 0.9 },
            { x: 686, y: 72, rot: 6, s: 0.9 },
          ].map((leaf, index) => (
            <g
              key={index}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.s})`}
            >
              {/* Leaf body with gold gradient and amber outline */}
              <path
                d="M 0,-18 C -7,-10 -6,0 0,6 C 6,0 7,-10 0,-18 Z"
                fill="url(#treeLeafGold)"
                stroke="#D97706"
                strokeWidth="1.3"
                opacity="0.95"
              />
              {/* Central Leaf Vein */}
              <line x1="0" y1="-14" x2="0" y2="4" stroke="#B45309" strokeWidth="0.9" opacity="0.85" />
              {/* Branch Veins */}
              <path
                d="M -3,-6 L 0,-4 L 3,-6 M -3,-1 L 0,1 L 3,-1 M -2,-11 L 0,-9 L 2,-11"
                stroke="#B45309"
                strokeWidth="0.6"
                fill="none"
                opacity="0.6"
              />
            </g>
          ))}
        </g>

        {/* Ribbon Waves at Bottom */}
        <g id="ribbonWavesGroup">
          {/* Wave 1: Soft Translucent Background Amber Wave */}
          <path
            d="M -20,530 C 150,560 300,590 480,510 C 660,430 820,490 980,450 L 980,660 L -20,660 Z"
            fill="url(#waveLightGold)"
          />

          {/* Wave 2: Main Rich Orange S-Curve Wave */}
          <path
            d="M -20,560 C 120,520 280,470 450,520 C 620,570 780,520 980,470 L 980,660 L -20,660 Z"
            fill="url(#waveMidGold)"
          />

          {/* Wave 3: Foreground Dynamic Golden Flow Wave */}
          <path
            d="M -20,580 C 160,530 320,500 500,550 C 680,600 840,540 980,500 L 980,660 L -20,660 Z"
            fill="url(#waveDeepGold)"
          />

          {/* Fine Guilloche Ribbon Contour Lines for Luxury Bank Quality */}
          <path
            d="M -20,525 C 150,555 300,585 480,505 C 660,425 820,485 980,445"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <path
            d="M -20,545 C 135,535 290,485 465,515 C 640,545 800,505 980,460"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <path
            d="M -20,565 C 145,525 305,495 485,535 C 665,575 825,525 980,480"
            fill="none"
            stroke="#EA580C"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <path
            d="M -20,585 C 155,545 315,515 495,555 C 675,595 835,545 980,500"
            fill="none"
            stroke="#FDBA74"
            strokeWidth="1.5"
            opacity="0.9"
          />
        </g>
      </svg>

      {/* 3. Razor-Sharp HTML Typography Overlay (Left Aligned) */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-7 md:p-9 lg:p-10 z-10 pointer-events-none">
        <div className="flex flex-col gap-1.5 sm:gap-3 md:gap-3.5 max-w-[65%] sm:max-w-[58%]">
          {/* ABOUT US Tag */}
          <span className="text-[8.5px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] text-[#EA580C] uppercase font-sans">
            ABOUT US
          </span>

          {/* Main Title in Serif Typography */}
          <h2 className="font-['Playfair_Display',Georgia,serif] text-sm sm:text-xl md:text-2xl lg:text-[2.2rem] xl:text-[2.35rem] font-bold text-slate-900 leading-[1.15] sm:leading-[1.12] tracking-tight">
            Your Trust.
            <br />
            Your Wealth.
            <br />
            Your{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#F59E0B] to-[#D97706] bg-clip-text text-transparent font-extrabold not-italic">
              Golden
            </span>{' '}
            Future.
          </h2>

          {/* Orange Accent Bar */}
          <div className="w-6 sm:w-10 md:w-12 h-[2px] sm:h-[3px] bg-[#FF7A00] rounded-full my-0.5 sm:my-1" />

          {/* Subtitle */}
          <p className="font-sans text-[8.5px] sm:text-xs md:text-sm lg:text-[0.95rem] text-slate-600 font-medium leading-tight sm:leading-relaxed">
            We help you secure today,
            <br />
            so you can shine tomorrow.
          </p>
        </div>
      </div>
    </div>
  )
}
