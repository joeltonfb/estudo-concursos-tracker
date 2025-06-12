
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Subject, QuestionRecord, SubjectQuestionStats } from "@/types/study";
import { Target, Plus, TrendingUp, Award } from "lucide-react";

interface QuestionTrackerProps {
  subjects: Subject[];
  questionRecords: QuestionRecord[];
  onAddRecord: (record: Omit<QuestionRecord, 'id' | 'date'>) => void;
}

export const QuestionTracker = ({ subjects, questionRecords, onAddRecord }: QuestionTrackerProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [correct, setCorrect] = useState<string>("");
  const [total, setTotal] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject || !correct || !total) return;
    
    const correctNum = parseInt(correct);
    const totalNum = parseInt(total);
    
    if (correctNum > totalNum || correctNum < 0 || totalNum <= 0) return;

    onAddRecord({
      subjectId: selectedSubject,
      correct: correctNum,
      total: totalNum
    });

    setCorrect("");
    setTotal("");
    setSelectedSubject("");
  };

  const getSubjectStats = (): SubjectQuestionStats[] => {
    const statsMap = new Map<string, { total: number; correct: number }>();
    
    questionRecords.forEach(record => {
      const current = statsMap.get(record.subjectId) || { total: 0, correct: 0 };
      statsMap.set(record.subjectId, {
        total: current.total + record.total,
        correct: current.correct + record.correct
      });
    });

    return Array.from(statsMap.entries()).map(([subjectId, stats]) => ({
      subjectId,
      totalQuestions: stats.total,
      totalCorrect: stats.correct,
      accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
    }));
  };

  const subjectStats = getSubjectStats();
  const totalQuestions = subjectStats.reduce((sum, stat) => sum + stat.totalQuestions, 0);
  const totalCorrect = subjectStats.reduce((sum, stat) => sum + stat.totalCorrect, 0);
  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Form para adicionar questões */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <Plus className="h-6 w-6" />
            Registrar Questões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Matéria</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione a matéria" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name} - {subject.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="correct">Questões Corretas</Label>
                <Input
                  id="correct"
                  type="number"
                  min="0"
                  value={correct}
                  onChange={(e) => setCorrect(e.target.value)}
                  placeholder="Ex: 8"
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="total">Total de Questões</Label>
                <Input
                  id="total"
                  type="number"
                  min="1"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Ex: 10"
                  className="bg-white"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={!selectedSubject || !correct || !total}
            >
              <Target className="h-4 w-4 mr-2" />
              Adicionar Registro
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              Total de Questões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalQuestions}</div>
            <div className="text-blue-100">questões respondidas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Acertos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCorrect}</div>
            <div className="text-green-100">questões corretas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Taxa de Acerto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Math.round(overallAccuracy)}%</div>
            <div className="text-purple-100">média geral</div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por matéria */}
      {subjectStats.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Desempenho por Matéria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectStats.map(stat => {
                const subject = subjects.find(s => s.id === stat.subjectId);
                if (!subject) return null;
                
                const accuracyColor = stat.accuracy >= 70 ? "bg-green-500" : 
                                    stat.accuracy >= 50 ? "bg-yellow-500" : "bg-red-500";
                
                return (
                  <div key={stat.subjectId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white/50">
                    <div className="flex-1">
                      <h3 className="font-medium">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{stat.totalQuestions}</div>
                        <div className="text-xs text-muted-foreground">questões</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{stat.totalCorrect}</div>
                        <div className="text-xs text-muted-foreground">acertos</div>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`${accuracyColor} text-white px-3 py-1`}
                      >
                        {Math.round(stat.accuracy)}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
