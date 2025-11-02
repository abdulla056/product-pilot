import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number // 1-5
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md",
  className 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starNumber = index + 1
        const isFilled = starNumber <= rating
        
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              isFilled 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-[var(--color-border-subtle)]/30 text-[var(--color-border-subtle)]/30"
            )}
          />
        )
      })}
    </div>
  )
}

