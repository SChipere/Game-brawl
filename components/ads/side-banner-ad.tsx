export const SideBannerAd = ({ position }: { position: "left" | "right" }) => {
  return (
    <div className={`absolute top-0 ${position === "left" ? "left-0" : "right-0"} h-full w-16 bg-muted/20`}>
      {/* Add content for the side banner ad here */}
      <div className="text-xs text-muted-foreground flex items-center justify-center h-full">Ad - {position}</div>
    </div>
  )
}

