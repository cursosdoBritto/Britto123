import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Edit3, 
  Trash2, 
  Download,
  Eye,
  Star,
  Clock,
  Plus,
  Calendar,
  FileText,
  Loader2
} from "lucide-react";
import { useDesigns } from "../hooks/useDesigns";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredDesigns = mockDesigns
    .filter(design => 
      design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.template.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastModified) - new Date(a.lastModified);
        case "oldest":
          return new Date(a.lastModified) - new Date(b.lastModified);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const DesignCard = ({ design }) => (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
          <img 
            src={design.thumbnail} 
            alt={design.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Visualizar
              </Button>
              <Link to={`/editor/${design.id}`} className="flex-1">
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </Link>
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {design.template}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
            {design.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-gray-600 flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatDate(design.lastModified)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(design.createdAt)}</span>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">🎨</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Sua galeria está vazia
      </h3>
      <p className="text-gray-600 mb-6">
        Comece criando seu primeiro design ou usando um template.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/editor">
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Design
          </Button>
        </Link>
        <Link to="/templates">
          <Button size="lg" variant="outline">
            <FileText className="w-5 h-5 mr-2" />
            Usar Template
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Minha Galeria
              </h1>
              <p className="text-lg text-gray-600">
                Todos os seus designs em um lugar.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Link to="/editor">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Design
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar designs..."
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
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="oldest">Mais Antigos</option>
                  <option value="name">Por Nome</option>
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

      {/* Gallery Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDesigns.length === 0 ? (
            searchTerm ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum design encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar o termo de busca.
                </p>
                <Button onClick={() => setSearchTerm("")}>
                  Limpar Busca
                </Button>
              </div>
            ) : (
              <EmptyState />
            )
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Mostrando {filteredDesigns.length} design(s)
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>

              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1 lg:grid-cols-2"
              }`}>
                {filteredDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para criar algo novo?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Explore templates ou comece com uma tela em branco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                <FileText className="w-5 h-5 mr-2" />
                Ver Templates
              </Button>
            </Link>
            <Link to="/editor">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Plus className="w-5 h-5 mr-2" />
                Tela em Branco
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;