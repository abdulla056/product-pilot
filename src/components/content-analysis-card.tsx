import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentAnalysis } from "@/types/analysis"

interface ContentAnalysisCardProps {
  analysis: ContentAnalysis
}

export function ContentAnalysisCard({ analysis }: ContentAnalysisCardProps) {
  const confidencePercentage = Math.round((analysis.confidence || 0) * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Content Analysis</CardTitle>
          <Badge variant={(analysis.confidence || 0) > 0.8 ? "default" : "secondary"}>
            {confidencePercentage}% confidence
          </Badge>
        </div>
        <CardDescription>AI-powered analysis of your content patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Genre */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Primary Genre</h4>
          <p className="text-lg font-medium text-purple-600">{analysis.genre || "Not available"}</p>
        </div>

        {/* Sub Genres */}
        {analysis.subGenres && analysis.subGenres.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Sub-Genres</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.subGenres.map((genre, index) => (
                <Badge key={index} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Main Topics */}
        {analysis.mainTopics && analysis.mainTopics.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Main Topics</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.mainTopics.map((topic, index) => (
                <Badge key={index} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content Style */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Content Style</h4>
            <p className="text-sm text-gray-600">{analysis.contentStyle || "Not available"}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Content Tone</h4>
            <p className="text-sm text-gray-600">{analysis.contentTone || "Not available"}</p>
          </div>
        </div>

        {/* Key Themes */}
        {analysis.keyThemes && analysis.keyThemes.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Themes</h4>
            <ul className="space-y-1">
              {analysis.keyThemes.map((theme, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expertise */}
        {analysis.expertise && analysis.expertise.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.expertise.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
