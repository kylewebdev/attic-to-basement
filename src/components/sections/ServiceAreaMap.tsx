interface ServiceAreaMapProps {
  className?: string;
}

const serviceAreaCounties = [
  {
    id: "sacramento",
    label: "Sacramento",
    d: "M396,794 L359,780 L341,775 L341,787 L346,795 L346,804 L340,827 L334,840 L320,848 L311,864 L299,877 L310,879 L313,874 L330,857 L337,857 L342,864 L355,867 L375,868 L382,865 L392,865 L401,833 Z",
    length: 378,
    labelX: 365,
    labelY: 848,
  },
  {
    id: "placer",
    label: "Placer",
    d: "M574,729 L488,707 L446,726 L426,746 L402,740 L394,734 L378,735 L375,746 L366,747 L357,774 L398,788 L421,758 L451,751 L467,753 L485,774 L491,774 L502,766 L543,767 L546,763 L552,763 L565,767 Z",
    length: 575,
    labelX: 472,
    labelY: 740,
  },
  {
    id: "el-dorado",
    label: "El Dorado",
    d: "M401,793 L407,829 L418,830 L434,825 L458,844 L473,847 L507,847 L558,820 L573,806 L564,772 L549,768 L543,773 L505,771 L494,779 L483,780 L472,770 L467,761 L460,756 L437,759 L424,763 Z",
    length: 476,
    labelX: 498,
    labelY: 810,
  },
  {
    id: "yolo",
    label: "Yolo",
    d: "M249,714 L244,719 L251,723 L255,728 L263,773 L263,788 L315,799 L318,802 L318,806 L309,839 L318,842 L326,839 L330,835 L335,824 L341,798 L336,790 L335,771 L314,732 Z",
    length: 404,
    labelX: 292,
    labelY: 778,
  },
];

const surroundingCounties = [
  { id: "county-0", d: "M436,482 L435,492 L446,498 L448,510 L443,524 L434,530 L436,548 L422,582 L450,636 L467,627 L476,615 L485,613 L513,634 L575,650 L582,641 L589,620 L583,588 L547,545 L524,529 L510,538 L504,546 L493,544 L479,529 L486,495 Z", length: 653 },
  { id: "county-1", d: "M216,541 L213,574 L232,580 L223,614 L296,634 L299,629 L318,634 L321,636 L320,641 L330,643 L338,625 L324,621 L324,616 L334,588 L327,572 Z", length: 440 },
  { id: "county-2", d: "M429,535 L424,539 L409,539 L383,555 L378,563 L372,567 L364,567 L338,559 L335,560 L332,566 L339,581 L340,590 L331,616 L345,620 L346,624 L329,659 L363,670 L392,670 L397,667 L413,645 L433,645 L445,639 L416,585 L420,567 L426,550 L430,545 Z", length: 501 },
  { id: "county-3", d: "M462,638 L451,672 L473,674 L489,670 L496,665 L504,665 L512,668 L515,671 L517,681 L522,685 L582,700 L593,658 L576,657 L508,639 L484,620 L477,622 L475,629 Z", length: 397 },
  { id: "county-4", d: "M212,580 L208,588 L197,588 L190,585 L184,586 L179,598 L179,631 L170,641 L165,643 L160,654 L161,663 L169,685 L185,704 L200,741 L220,741 L236,727 L236,717 L244,710 L239,704 L234,686 L234,670 L238,657 L223,651 L215,643 L208,631 L208,624 L217,612 L225,586 L223,583 Z", length: 453 },
  { id: "county-5", d: "M219,620 L214,629 L221,640 L227,646 L246,654 L240,672 L240,684 L244,699 L248,705 L257,710 L314,726 L318,717 L314,699 L310,692 L310,682 L326,649 L314,646 L312,644 L313,640 L302,636 L300,641 L295,641 Z", length: 405 },
  { id: "county-6", d: "M454,641 L440,650 L417,651 L403,670 L394,676 L382,677 L363,676 L360,685 L355,714 L355,729 L365,727 L375,729 L393,728 L401,696 L405,689 L419,679 L431,673 L444,673 Z", length: 331 },
  { id: "county-7", d: "M580,706 L517,690 L511,684 L510,675 L502,671 L475,680 L451,678 L448,681 L444,681 L441,679 L433,679 L409,695 L399,730 L406,735 L424,740 L433,732 L435,727 L444,720 L484,702 L501,703 L575,723 Z", length: 469 },
  { id: "county-8", d: "M326,665 L316,684 L316,690 L320,697 L324,715 L324,721 L320,728 L320,731 L339,767 L345,770 L352,771 L363,740 L370,741 L372,734 L368,733 L360,734 L352,741 L349,740 L349,713 L355,678 L357,674 Z", length: 316 },
  { id: "county-9", d: "M242,725 L242,730 L223,747 L200,747 L198,756 L198,763 L204,777 L214,814 L215,836 L212,841 L225,845 L235,818 L254,823 L250,803 L257,790 L257,772 L249,729 Z", length: 335 },
  { id: "county-10", d: "M208,846 L216,858 L230,868 L265,877 L269,875 L273,875 L279,878 L290,877 L305,862 L314,847 L302,842 L312,804 L262,794 L256,805 L260,817 L260,825 L257,830 L239,825 L232,844 L234,846 L232,853 Z", length: 371 },
  { id: "county-11", d: "M398,880 L401,882 L410,883 L441,873 L473,858 L530,862 L536,838 L509,853 L499,854 L456,850 L433,832 L419,836 L406,835 L398,865 Z", length: 368 },
  { id: "county-12", d: "M578,808 L578,810 L563,824 L543,835 L539,854 L536,862 L536,868 L539,879 L552,894 L564,890 L579,891 L582,897 L584,907 L594,898 L600,885 L595,868 L595,860 L599,851 L603,846 Z", length: 285 },
  { id: "county-13", d: "M196,876 L201,886 L209,887 L216,895 L219,907 L242,931 L292,930 L298,928 L307,885 L306,884 L299,883 L294,890 L288,892 L278,892 L273,890 L269,883 L263,883 L231,875 L218,868 L211,873 Z", length: 314 },
  { id: "county-14", d: "M530,868 L473,865 L443,879 L412,889 L399,887 L401,911 L424,958 L444,945 L480,909 L511,882 L519,879 L532,878 Z", length: 376 },
  { id: "county-15", d: "M392,871 L383,871 L376,874 L349,872 L340,870 L333,862 L317,879 L312,887 L304,931 L290,978 L296,989 L341,963 L356,959 L374,963 L381,961 L394,912 Z", length: 409 },
  { id: "county-16", d: "M204,893 L202,902 L213,931 L213,965 L216,971 L231,977 L247,976 L288,988 L284,982 L284,977 L296,935 L239,937 L215,913 L209,896 L206,893 Z", length: 342 },
];

export default function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  return (
    <svg
      viewBox="148 470 467 531"
      className={className}
      role="img"
      aria-label="Map of Northern California service areas including Sacramento, Placer, El Dorado, and Yolo counties"
    >
      {/* Surrounding counties */}
      {surroundingCounties.map((county) => (
        <path
          key={county.id}
          data-county={county.id}
          data-length={county.length}
          data-county-path
          d={county.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-stone-600"
          style={{
            strokeDasharray: county.length,
            strokeDashoffset: county.length,
          }}
        />
      ))}

      {/* Service area counties */}
      {serviceAreaCounties.map((county) => (
        <g key={county.id}>
          <path
            data-county={county.id}
            data-length={county.length}
            data-service-path
            d={county.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sage-400"
            style={{
              strokeDasharray: county.length,
              strokeDashoffset: county.length,
            }}
          />
          <text
            x={county.labelX}
            y={county.labelY}
            textAnchor="middle"
            className="fill-stone-300 font-sans"
            fontSize="14"
            fontWeight="600"
            data-service-label
            opacity="0"
          >
            {county.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
