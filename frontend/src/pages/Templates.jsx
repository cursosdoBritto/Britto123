import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Eye, 
  Edit3,
  Star,
  Zap,
  Loader2
} from "lucide-react";
import { useTemplates } from "../hooks/useTemplates";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "Todos", count: mockTemplates.length },
    { id: "social", name: "Redes Sociais", count: mockTemplates.filter(t => t.category === "social").length },
    { id: "web", name: "Web Banners", count: mockTemplates.filter(t => t.category === "web").length },
    { id: "print", name: "Impressão", count: mockTemplates.filter(t => t.category === "print").length },
    { id: "marketing", name: "Marketing", count: mockTemplates.filter(t => t.category === "marketing").length }
  ];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const TemplateCard = ({ template }) => (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
          <img 
            src={template.preview} 
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className="bg-white/90 text-gray-800">
              {template.dimensions.width}x{template.dimensions.height}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Eye className="w-4 h-4 mr-1" />
                Visualizar
              </Button>
              <Link to={`/editor/${template.id}`} className="flex-1">
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            <Zap className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
            {template.name}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        <CardDescription className="text-gray-600">
          {template.category === "social" && "Redes Sociais"}
          {template.category === "web" && "Web Banner"}
          {template.category === "print" && "Impressão"}
          {template.category === "marketing" && "Marketing"}
        </CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Templates Profissionais
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Centenas de templates prontos para usar. Escolha, personalize e publique.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-purple-100 text-purple-600" : ""}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-purple-100 text-purple-600" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredTemplates.length} template(s) 
              {selectedCategory !== "all" && ` na categoria "${categories.find(c => c.id === selectedCategory)?.name}"`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>

          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 lg:grid-cols-2"
          }`}>
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum template encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou termo de busca.
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Crie seu próprio design do zero com nosso editor avançado.
          </p>
          <Link to="/editor">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
              <Edit3 className="w-5 h-5 mr-2" />
              Criar do Zero
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Templates;