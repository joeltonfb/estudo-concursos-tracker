
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StudyData } from "@/types/study";
import { Calendar, Clock, Target } from "lucide-react";

interface StudyProgressProps {
  data: StudyData;
}

export const StudyProgress = ({ data }: StudyProgressProps) => {
  const studyProgress = (data.studiedCount / data.totalSubjects) * 100;
  const reviewProgress = (data.reviewedCount / data.totalSubjects) * 100;
  const practiceProgress = (data.practicedCount / data.totalSubjects) * 100;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Progresso Detalhado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Study Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-full">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">Matérias Estudadas</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {data.studiedCount} de {data.totalSubjects} ({Math.round(studyProgress)}%)
            </span>
          </div>
          <Progress value={studyProgress} className="h-3" />
        </div>

        {/* Review Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-full">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <span className="font-medium">Matérias Revisadas</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {data.reviewedCount} de {data.totalSubjects} ({Math.round(reviewProgress)}%)
            </span>
          </div>
          <Progress value={reviewProgress} className="h-3" />
        </div>

        {/* Practice Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-full">
                <Target className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium">Questões Praticadas</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {data.practicedCount} de {data.totalSubjects} ({Math.round(practiceProgress)}%)
            </span>
          </div>
          <Progress value={practiceProgress} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};
