import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Palette, 
  Layout, 
  Zap, 
  Smartphone, 
  Cloud, 
  Users,
  ArrowRight,
  Star,
  Play,
  CheckCircle
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Palette,
      title: "Editor Profissional",
      description: "Ferramentas avançadas de design com interface intuitiva",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Layout,
      title: "Templates Premium",
      description: "Centenas de templates para todos os tipos de banner",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Criação Rápida",
      description: "Crie banners profissionais em minutos",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Otimizado para dispositivos móveis e touch",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Cloud,
      title: "Salvar na Nuvem",
      description: "Acesse seus designs de qualquer lugar",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalhe em equipe nos seus projetos",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Designer Freelancer",
      content: "Incrível! Consegui criar banners profissionais direto do meu celular.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Marketing Manager",
      content: "A ferramenta que nossa equipe precisava. Rápido e eficiente.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Social Media",
      content: "Templates fantásticos e editor muito intuitivo.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🚀 Novo: Editor PWA para Android
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Crie Banners
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Profissionais
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Editor de design gráfico completo no seu Android. Crie, edite e publique banners profissionais em minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/editor">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-4 h-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Começar Agora
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto">
                  <Layout className="w-5 h-5 mr-2" />
                  Ver Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para criar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas profissionais de design gráfico otimizadas para dispositivos móveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600">
              Milhares de profissionais já confiam no DesignPro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para criar banners incríveis?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Junte-se a milhares de designers que já escolheram o DesignPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/editor">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-4 h-auto">
                <ArrowRight className="w-5 h-5 mr-2" />
                Começar Gratuitamente
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Gratuito para começar</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Sem instalação</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>PWA para Android</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;