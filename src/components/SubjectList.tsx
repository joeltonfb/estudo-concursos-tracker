
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Subject } from "@/types/study";
import { BookOpen, TrendingUp, Target, Search } from "lucide-react";

interface SubjectListProps {
  subjects: Subject[];
  onUpdate: (id: string, field: keyof Pick<Subject, 'studied' | 'reviewed' | 'practiced'>, value: boolean) => void;
}

export const SubjectList = ({ subjects, onUpdate }: SubjectListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = Array.from(new Set(subjects.map(s => s.category)));
  
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedSubjects = categories.reduce((acc, category) => {
    acc[category] = filteredSubjects.filter(s => s.category === category);
    return acc;
  }, {} as Record<string, Subject[]>);

  const getSubjectProgress = (subject: Subject) => {
    const completed = [subject.studied, subject.reviewed, subject.practiced].filter(Boolean).length;
    return (completed / 3) * 100;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 66) return "bg-yellow-500";
    if (progress >= 33) return "bg-orange-500";
    return "bg-gray-300";
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar matérias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white">
                <SelectValue placeholder="Filtrar por disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as disciplinas</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subject List by Category */}
      {Object.entries(groupedSubjects).map(([category, categorySubjects]) => {
        if (categorySubjects.length === 0) return null;
        
        return (
          <Card key={category} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySubjects.map((subject) => {
                  const progress = getSubjectProgress(subject);
                  
                  return (
                    <div key={subject.id} className="p-4 border border-gray-200 rounded-lg bg-white/50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-lg">{subject.name}</h3>
                        <Badge variant={progress === 100 ? "default" : "secondary"} className="ml-2">
                          {Math.round(progress)}% completo
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Checkboxes */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <Checkbox
                            id={`${subject.id}-studied`}
                            checked={subject.studied}
                            onCheckedChange={(checked) => onUpdate(subject.id, 'studied', checked as boolean)}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <label htmlFor={`${subject.id}-studied`} className="flex items-center gap-2 cursor-pointer">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Estudei</span>
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                          <Checkbox
                            id={`${subject.id}-reviewed`}
                            checked={subject.reviewed}
                            onCheckedChange={(checked) => onUpdate(subject.id, 'reviewed', checked as boolean)}
                            className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                          />
                          <label htmlFor={`${subject.id}-reviewed`} className="flex items-center gap-2 cursor-pointer">
                            <TrendingUp className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Revisei</span>
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                          <Checkbox
                            id={`${subject.id}-practiced`}
                            checked={subject.practiced}
                            onCheckedChange={(checked) => onUpdate(subject.id, 'practiced', checked as boolean)}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <label htmlFor={`${subject.id}-practiced`} className="flex items-center gap-2 cursor-pointer">
                            <Target className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Fiz questões</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {filteredSubjects.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Nenhuma matéria encontrada com os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
