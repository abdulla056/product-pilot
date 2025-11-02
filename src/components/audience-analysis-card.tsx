import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AudienceAnalysis } from "@/types/analysis"
import { Users, TrendingUp, MessageSquare } from "lucide-react"

interface AudienceAnalysisCardProps {
  analysis: AudienceAnalysis
}

export function AudienceAnalysisCard({ analysis }: AudienceAnalysisCardProps) {
  const confidencePercentage = Math.round((analysis.confidence || 0) * 100)

  return (
    <div className="space-y-6">
      {/* Confidence Badge */}
      <div className="flex items-center justify-end">
        <Badge variant={(analysis.confidence || 0) > 0.8 ? "default" : "secondary"} className="bg-[var(--color-accent-primary)] text-[var(--color-text-dark)]">
          {confidencePercentage}% confidence
        </Badge>
      </div>

      {/* Demographics */}
        {analysis.primaryDemographic && (
          <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Primary Demographic</h4>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">Age Range:</span>
                <p className="text-sm font-semibold text-[var(--color-accent-primary)]">
                  {analysis.primaryDemographic.ageRange || "Not available"}
                </p>
              </div>

              {analysis.primaryDemographic.interests && analysis.primaryDemographic.interests.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">Interests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.primaryDemographic.interests.slice(0, 6).map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pain Points */}
        {analysis.primaryDemographic?.painPoints && analysis.primaryDemographic.painPoints.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[var(--color-accent-primary)]" />
              Pain Points
            </h4>
            <ul className="space-y-2">
              {analysis.primaryDemographic.painPoints.slice(0, 4).map((pain, index) => (
                <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start">
                  <span className="text-[var(--color-accent-primary)] mr-2">⚠</span>
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Aspirations */}
        {analysis.primaryDemographic?.aspirations && analysis.primaryDemographic.aspirations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--color-accent-primary)]" />
              Aspirations
            </h4>
            <ul className="space-y-2">
              {analysis.primaryDemographic.aspirations.slice(0, 4).map((aspiration, index) => (
                <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start">
                  <span className="text-[var(--color-accent-primary)] mr-2">✨</span>
                  {aspiration}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Engagement Patterns */}
        {analysis.engagementPatterns && (
          <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Engagement Patterns</h4>
            
            <div className="space-y-3">
              {analysis.engagementPatterns.mostEngagedTopics && analysis.engagementPatterns.mostEngagedTopics.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">Most Engaged Topics:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.engagementPatterns.mostEngagedTopics.map((topic, index) => (
                      <Badge key={index} className="bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-dark)] text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.engagementPatterns.preferredContentLength && (
                <div>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">Preferred Content Length:</span>
                  <p className="text-sm font-semibold text-[var(--color-accent-primary)]">
                    {analysis.engagementPatterns.preferredContentLength}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Community Insights */}
        {analysis.communityInsights?.frequentRequests && analysis.communityInsights.frequentRequests.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">What Your Audience Wants</h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-[var(--color-accent-primary)]">Frequent Requests:</span>
                <ul className="mt-1 space-y-1">
                  {analysis.communityInsights.frequentRequests.slice(0, 3).map((request, index) => (
                    <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start">
                      <span className="text-[var(--color-accent-primary)] mr-2">📌</span>
                      {request}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
