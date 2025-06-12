
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StudyData, CategoryProgress } from "@/types/study";
import { BookOpen, TrendingUp, Target, Award } from "lucide-react";

interface StudyDashboardProps {
  data: StudyData;
}

export const StudyDashboard = ({ data }: StudyDashboardProps) => {
  const categories = Array.from(new Set(data.subjects.map(s => s.category)));
  
  const categoryProgress: CategoryProgress[] = categories.map(category => {
    const categorySubjects = data.subjects.filter(s => s.category === category);
    const studied = categorySubjects.filter(s => s.studied).length;
    const reviewed = categorySubjects.filter(s => s.reviewed).length;
    const practiced = categorySubjects.filter(s => s.practiced).length;
    const total = categorySubjects.length;
    const completion = Math.round(((studied + reviewed + practiced) / (total * 3)) * 100);
    
    return {
      category,
      total,
      studied,
      reviewed,
      practiced,
      completion
    };
  });

  const overallProgress = Math.round(
    ((data.studiedCount + data.reviewedCount + data.practicedCount) / (data.totalSubjects * 3)) * 100
  );

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="h-6 w-6 text-primary" />
            Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progresso completo</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">{data.studiedCount}</div>
              <div className="text-sm text-muted-foreground">Estudadas</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-amber-600">{data.reviewedCount}</div>
              <div className="text-sm text-muted-foreground">Revisadas</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">{data.practicedCount}</div>
              <div className="text-sm text-muted-foreground">Praticadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryProgress.map((category) => (
          <Card key={category.category} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Conclusão da disciplina</span>
                <span>{category.completion}%</span>
              </div>
              <Progress value={category.completion} className="h-2" />
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <BookOpen className="h-3 w-3 text-blue-500" />
                    <span className="font-medium text-blue-600">{category.studied}</span>
                  </div>
                  <div className="text-muted-foreground">Estudadas</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <TrendingUp className="h-3 w-3 text-amber-500" />
                    <span className="font-medium text-amber-600">{category.reviewed}</span>
                  </div>
                  <div className="text-muted-foreground">Revisadas</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Target className="h-3 w-3 text-green-500" />
                    <span className="font-medium text-green-600">{category.practiced}</span>
                  </div>
                  <div className="text-muted-foreground">Praticadas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
