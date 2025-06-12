
import { useState, useEffect } from "react";
import { StudyDashboard } from "@/components/StudyDashboard";
import { SubjectList } from "@/components/SubjectList";
import { StudyProgress } from "@/components/StudyProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, TrendingUp } from "lucide-react";
import { Subject, StudyData } from "@/types/study";

const initialSubjects: Subject[] = [
  // Direito Constitucional
  { id: "const-1", name: "Princípios Fundamentais", category: "Direito Constitucional", studied: false, reviewed: false, practiced: false },
  { id: "const-2", name: "Direitos e Garantias Fundamentais", category: "Direito Constitucional", studied: false, reviewed: false, practiced: false },
  { id: "const-3", name: "Organização do Estado", category: "Direito Constitucional", studied: false, reviewed: false, practiced: false },
  { id: "const-4", name: "Poder Legislativo", category: "Direito Constitucional", studied: false, reviewed: false, practiced: false },
  { id: "const-5", name: "Poder Executivo", category: "Direito Constitucional", studied: false, reviewed: false, practiced: false },
  
  // Direito Administrativo
  { id: "admin-1", name: "Princípios da Administração", category: "Direito Administrativo", studied: false, reviewed: false, practiced: false },
  { id: "admin-2", name: "Atos Administrativos", category: "Direito Administrativo", studied: false, reviewed: false, practiced: false },
  { id: "admin-3", name: "Licitações e Contratos", category: "Direito Administrativo", studied: false, reviewed: false, practiced: false },
  { id: "admin-4", name: "Serviços Públicos", category: "Direito Administrativo", studied: false, reviewed: false, practiced: false },
  { id: "admin-5", name: "Responsabilidade Civil do Estado", category: "Direito Administrativo", studied: false, reviewed: false, practiced: false },
  
  // Português
  { id: "port-1", name: "Ortografia e Acentuação", category: "Português", studied: false, reviewed: false, practiced: false },
  { id: "port-2", name: "Morfologia", category: "Português", studied: false, reviewed: false, practiced: false },
  { id: "port-3", name: "Sintaxe", category: "Português", studied: false, reviewed: false, practiced: false },
  { id: "port-4", name: "Interpretação de Texto", category: "Português", studied: false, reviewed: false, practiced: false },
  { id: "port-5", name: "Redação Oficial", category: "Português", studied: false, reviewed: false, practiced: false },
  
  // Matemática
  { id: "mat-1", name: "Aritmética", category: "Matemática", studied: false, reviewed: false, practiced: false },
  { id: "mat-2", name: "Álgebra", category: "Matemática", studied: false, reviewed: false, practiced: false },
  { id: "mat-3", name: "Geometria", category: "Matemática", studied: false, reviewed: false, practiced: false },
  { id: "mat-4", name: "Estatística", category: "Matemática", studied: false, reviewed: false, practiced: false },
  { id: "mat-5", name: "Matemática Financeira", category: "Matemática", studied: false, reviewed: false, practiced: false },
];

const Index = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('study-progress');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  useEffect(() => {
    localStorage.setItem('study-progress', JSON.stringify(subjects));
  }, [subjects]);

  const updateSubject = (id: string, field: keyof Pick<Subject, 'studied' | 'reviewed' | 'practiced'>, value: boolean) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const resetProgress = () => {
    const resetSubjects = subjects.map(subject => ({
      ...subject,
      studied: false,
      reviewed: false,
      practiced: false
    }));
    setSubjects(resetSubjects);
  };

  const studyData: StudyData = {
    subjects,
    totalSubjects: subjects.length,
    studiedCount: subjects.filter(s => s.studied).length,
    reviewedCount: subjects.filter(s => s.reviewed).length,
    practicedCount: subjects.filter(s => s.practiced).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Controle de Estudos</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acompanhe seu progresso nos estudos para concursos. Marque o que você estudou, revisou e praticou com questões.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5" />
                Estudado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studyData.studiedCount}</div>
              <div className="text-blue-100">de {studyData.totalSubjects} matérias</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Revisado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studyData.reviewedCount}</div>
              <div className="text-amber-100">de {studyData.totalSubjects} matérias</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Praticado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studyData.practicedCount}</div>
              <div className="text-green-100">de {studyData.totalSubjects} matérias</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <StudyProgress data={studyData} />

        {/* Study Dashboard */}
        <StudyDashboard data={studyData} />

        {/* Subject List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Lista de Matérias</h2>
            <Button 
              onClick={resetProgress} 
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Resetar Progresso
            </Button>
          </div>
          <SubjectList subjects={subjects} onUpdate={updateSubject} />
        </div>
      </div>
    </div>
  );
};

export default Index;
