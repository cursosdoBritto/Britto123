import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { 
  Type, 
  Square, 
  Circle, 
  Image, 
  Download, 
  Save, 
  Undo, 
  Redo,
  Layers,
  Palette,
  Move,
  RotateCcw,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import { mockTemplates, mockColors, mockShapes, mockFonts, mockFilterEffects } from "../data/mockData";
import { useToast } from "../hooks/use-toast";

const Editor = () => {
  const { templateId } = useParams();
  const canvasRef = useRef(null);
  const { toast } = useToast();
  
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (templateId) {
      const template = mockTemplates.find(t => t.id === parseInt(templateId));
      if (template) {
        setCurrentTemplate(template);
        setCanvasElements(template.elements || []);
        addToHistory(template.elements || []);
      }
    } else {
      // Tela em branco
      const blankTemplate = {
        id: 0,
        name: "Tela em Branco",
        dimensions: { width: 1200, height: 800 },
        elements: [
          {
            id: "bg0",
            type: "background",
            color: "#FFFFFF"
          }
        ]
      };
      setCurrentTemplate(blankTemplate);
      setCanvasElements(blankTemplate.elements);
      addToHistory(blankTemplate.elements);
    }
  }, [templateId]);

  const addToHistory = (elements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(elements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasElements(history[historyIndex + 1]);
    }
  };

  const addTextElement = () => {
    const newElement = {
      id: `text_${Date.now()}`,
      type: "text",
      content: "Novo Texto",
      x: 100,
      y: 100,
      fontSize: 24,
      fontWeight: "normal",
      color: "#000000",
      fontFamily: "Arial"
    };
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);
  };

  const addShapeElement = (shapeType) => {
    const newElement = {
      id: `shape_${Date.now()}`,
      type: "shape",
      shapeType,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: "#4F46E5",
      borderColor: "#000000",
      borderWidth: 0
    };
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);
  };

  const updateElement = (elementId, updates) => {
    const newElements = canvasElements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    );
    setCanvasElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (elementId) => {
    const newElements = canvasElements.filter(el => el.id !== elementId);
    setCanvasElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);
  };

  const duplicateElement = (element) => {
    const newElement = {
      ...element,
      id: `${element.type}_${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20
    };
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);
  };

  const saveDesign = () => {
    toast({
      title: "Design Salvo!",
      description: "Seu design foi salvo com sucesso.",
    });
  };

  const exportDesign = () => {
    toast({
      title: "Exportando...",
      description: "Seu design está sendo exportado como PNG.",
    });
  };

  const renderCanvasElement = (element) => {
    const isSelected = selectedElement?.id === element.id;
    const style = {
      position: "absolute",
      left: element.x,
      top: element.y,
      cursor: "move",
      border: isSelected ? "2px solid #4F46E5" : "none",
      borderRadius: isSelected ? "4px" : "0",
      padding: isSelected ? "2px" : "0"
    };

    switch (element.type) {
      case "background":
        return (
          <div
            key={element.id}
            style={{
              position: "absolute",
              inset: 0,
              background: element.gradient || element.color,
              cursor: "pointer"
            }}
            onClick={() => setSelectedElement(element)}
          />
        );
      
      case "text":
        return (
          <div
            key={element.id}
            style={{
              ...style,
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              color: element.color,
              fontFamily: element.fontFamily,
              userSelect: "none"
            }}
            onClick={() => setSelectedElement(element)}
          >
            {element.content}
          </div>
        );
      
      case "shape":
        return (
          <div
            key={element.id}
            style={{
              ...style,
              width: element.width,
              height: element.height,
              backgroundColor: element.color,
              border: element.borderWidth > 0 ? `${element.borderWidth}px solid ${element.borderColor}` : "none",
              borderRadius: element.shapeType === "circle" ? "50%" : "0"
            }}
            onClick={() => setSelectedElement(element)}
          />
        );
      
      default:
        return null;
    }
  };

  const PropertyPanel = () => {
    if (!selectedElement) {
      return (
        <div className="p-4 text-center text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Selecione um elemento para editar</p>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => duplicateElement(selectedElement)}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => deleteElement(selectedElement.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {selectedElement.type === "text" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Texto</Label>
              <Input
                id="text-content"
                value={selectedElement.content}
                onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="font-size">Tamanho da Fonte</Label>
              <Slider
                value={[selectedElement.fontSize]}
                onValueChange={(value) => updateElement(selectedElement.id, { fontSize: value[0] })}
                max={100}
                min={10}
                step={1}
                className="mt-2"
              />
              <span className="text-sm text-gray-600">{selectedElement.fontSize}px</span>
            </div>

            <div>
              <Label htmlFor="font-family">Fonte</Label>
              <select
                id="font-family"
                value={selectedElement.fontFamily}
                onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              >
                {mockFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="font-weight">Peso da Fonte</Label>
              <select
                id="font-weight"
                value={selectedElement.fontWeight}
                onChange={(e) => updateElement(selectedElement.id, { fontWeight: e.target.value })}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="normal">Normal</option>
                <option value="bold">Negrito</option>
                <option value="lighter">Mais Leve</option>
              </select>
            </div>

            <div>
              <Label htmlFor="text-color">Cor do Texto</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {mockColors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 ${selectedElement.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateElement(selectedElement.id, { color })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedElement.type === "shape" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="shape-color">Cor da Forma</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {mockColors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 ${selectedElement.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateElement(selectedElement.id, { color })}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="shape-width">Largura</Label>
              <Slider
                value={[selectedElement.width]}
                onValueChange={(value) => updateElement(selectedElement.id, { width: value[0] })}
                max={500}
                min={10}
                step={1}
                className="mt-2"
              />
              <span className="text-sm text-gray-600">{selectedElement.width}px</span>
            </div>

            <div>
              <Label htmlFor="shape-height">Altura</Label>
              <Slider
                value={[selectedElement.height]}
                onValueChange={(value) => updateElement(selectedElement.id, { height: value[0] })}
                max={500}
                min={10}
                step={1}
                className="mt-2"
              />
              <span className="text-sm text-gray-600">{selectedElement.height}px</span>
            </div>
          </div>
        )}

        {selectedElement.type === "background" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bg-color">Cor de Fundo</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {mockColors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 ${selectedElement.color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateElement(selectedElement.id, { color, gradient: null })}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Gradientes</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                ].map((gradient, index) => (
                  <button
                    key={index}
                    className="w-full h-8 rounded border-2 border-gray-300"
                    style={{ background: gradient }}
                    onClick={() => updateElement(selectedElement.id, { gradient, color: null })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label>Posição</Label>
            <Button size="sm" variant="outline">
              <Move className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Label className="text-xs">X</Label>
              <Input
                type="number"
                value={selectedElement.x}
                onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Y</Label>
              <Input
                type="number"
                value={selectedElement.y}
                onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!currentTemplate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-16'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={`font-semibold text-gray-900 ${sidebarOpen ? 'block' : 'hidden'}`}>
              {currentTemplate.name}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {sidebarOpen && (
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3 m-4">
              <TabsTrigger value="tools">Ferramentas</TabsTrigger>
              <TabsTrigger value="layers">Camadas</TabsTrigger>
              <TabsTrigger value="properties">Propriedades</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="px-4 space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Elementos</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={addTextElement}>
                    <Type className="w-4 h-4 mr-2" />
                    Texto
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addShapeElement("rectangle")}>
                    <Square className="w-4 h-4 mr-2" />
                    Retângulo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addShapeElement("circle")}>
                    <Circle className="w-4 h-4 mr-2" />
                    Círculo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Imagem
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Formas</Label>
                <div className="grid grid-cols-3 gap-2">
                  {mockShapes.map(shape => (
                    <Button
                      key={shape.id}
                      variant="outline"
                      size="sm"
                      onClick={() => addShapeElement(shape.id)}
                      className="text-xs"
                    >
                      {shape.icon}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Efeitos</Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockFilterEffects.slice(0, 4).map(effect => (
                    <Button
                      key={effect.id}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {effect.name}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layers" className="px-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Camadas</Label>
                {canvasElements.map((element, index) => (
                  <div
                    key={element.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer ${
                      selectedElement?.id === element.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedElement(element)}
                  >
                    <div className="flex items-center space-x-2">
                      {element.type === "text" && <Type className="w-4 h-4" />}
                      {element.type === "shape" && <Square className="w-4 h-4" />}
                      {element.type === "background" && <Palette className="w-4 h-4" />}
                      <span className="text-sm truncate">
                        {element.type === "text" ? element.content : element.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <PropertyPanel />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <Button variant="outline" size="sm" onClick={() => setShowGrid(!showGrid)}>
                <span className="text-xs">Grade</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                  -
                </Button>
                <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {currentTemplate.dimensions.width}x{currentTemplate.dimensions.height}
              </Badge>
              <Button variant="outline" size="sm" onClick={saveDesign}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button size="sm" onClick={exportDesign}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div className="flex items-center justify-center min-h-full">
            <div
              ref={canvasRef}
              className="relative bg-white shadow-lg border border-gray-300"
              style={{
                width: currentTemplate.dimensions.width * (zoom / 100),
                height: currentTemplate.dimensions.height * (zoom / 100),
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
                backgroundImage: showGrid ? 'radial-gradient(circle, #00000020 1px, transparent 1px)' : 'none',
                backgroundSize: showGrid ? '20px 20px' : 'auto'
              }}
              onClick={() => setSelectedElement(null)}
            >
              {canvasElements.map(renderCanvasElement)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;