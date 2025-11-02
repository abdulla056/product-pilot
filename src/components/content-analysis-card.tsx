import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentAnalysis } from "@/types/analysis"

interface ContentAnalysisCardProps {
  analysis: ContentAnalysis
}

export function ContentAnalysisCard({ analysis }: ContentAnalysisCardProps) {
  const confidencePercentage = Math.round((analysis.confidence || 0) * 100)

  return (
    <div className="space-y-6">
      {/* Confidence Badge */}
      <div className="flex items-center justify-end">
        <Badge variant={(analysis.confidence || 0) > 0.8 ? "default" : "secondary"} className="bg-[var(--color-accent-primary)] text-[var(--color-text-dark)]">
          {confidencePercentage}% confidence
        </Badge>
      </div>

      {/* Genre */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Primary Genre</h4>
          <p className="text-lg font-medium text-[var(--color-accent-primary)]">{analysis.genre || "Not available"}</p>
        </div>

        {/* Sub Genres */}
        {analysis.subGenres && analysis.subGenres.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Sub-Genres</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.subGenres.map((genre, index) => (
                <Badge key={index} variant="outline" className="border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Main Topics */}
        {analysis.mainTopics && analysis.mainTopics.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Main Topics</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.mainTopics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="bg-[var(--color-bg-glass)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content Style */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Content Style</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{analysis.contentStyle || "Not available"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Content Tone</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{analysis.contentTone || "Not available"}</p>
          </div>
        </div>

        {/* Key Themes */}
        {analysis.keyThemes && analysis.keyThemes.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Key Themes</h4>
            <ul className="space-y-1">
              {analysis.keyThemes.map((theme, index) => (
                <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start">
                  <span className="text-[var(--color-accent-primary)] mr-2">•</span>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expertise */}
        {analysis.expertise && analysis.expertise.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.expertise.map((skill, index) => (
                <Badge key={index} className="bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-dark)]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}
