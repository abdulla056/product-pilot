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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Audience Insights
          </CardTitle>
          <Badge variant={(analysis.confidence || 0) > 0.8 ? "default" : "secondary"}>
            {confidencePercentage}% confidence
          </Badge>
        </div>
        <CardDescription>Deep analysis of your audience demographics and behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demographics */}
        {analysis.primaryDemographic && (
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Primary Demographic</h4>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-gray-600">Age Range:</span>
                <p className="text-sm font-semibold text-purple-700">
                  {analysis.primaryDemographic.ageRange || "Not available"}
                </p>
              </div>

              {analysis.primaryDemographic.interests && analysis.primaryDemographic.interests.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-600">Interests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.primaryDemographic.interests.slice(0, 6).map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
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
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-red-500" />
              Pain Points
            </h4>
            <ul className="space-y-2">
              {analysis.primaryDemographic.painPoints.slice(0, 4).map((pain, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-red-400 mr-2">⚠</span>
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Aspirations */}
        {analysis.primaryDemographic?.aspirations && analysis.primaryDemographic.aspirations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Aspirations
            </h4>
            <ul className="space-y-2">
              {analysis.primaryDemographic.aspirations.slice(0, 4).map((aspiration, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-400 mr-2">✨</span>
                  {aspiration}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Engagement Patterns */}
        {analysis.engagementPatterns && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Engagement Patterns</h4>
            
            <div className="space-y-3">
              {analysis.engagementPatterns.mostEngagedTopics && analysis.engagementPatterns.mostEngagedTopics.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-600">Most Engaged Topics:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.engagementPatterns.mostEngagedTopics.map((topic, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.engagementPatterns.preferredContentLength && (
                <div>
                  <span className="text-xs font-medium text-gray-600">Preferred Content Length:</span>
                  <p className="text-sm font-semibold text-blue-700">
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
            <h4 className="text-sm font-semibold text-gray-700 mb-2">What Your Audience Wants</h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-purple-600">Frequent Requests:</span>
                <ul className="mt-1 space-y-1">
                  {analysis.communityInsights.frequentRequests.slice(0, 3).map((request, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-purple-400 mr-2">📌</span>
                      {request}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
