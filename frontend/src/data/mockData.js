export const mockTemplates = [
  {
    id: 1,
    name: "Instagram Post",
    category: "social",
    dimensions: { width: 1080, height: 1080 },
    preview: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    elements: [
      {
        id: "bg1",
        type: "background",
        color: "#4F46E5",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: "text1",
        type: "text",
        content: "Sua Mensagem Aqui",
        x: 100,
        y: 400,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  },
  {
    id: 2,
    name: "Facebook Cover",
    category: "social",
    dimensions: { width: 1200, height: 630 },
    preview: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=150&fit=crop",
    elements: [
      {
        id: "bg2",
        type: "background",
        color: "#1877F2",
        gradient: "linear-gradient(90deg, #1877F2 0%, #42A5F5 100%)"
      },
      {
        id: "text2",
        type: "text",
        content: "Capa do Facebook",
        x: 50,
        y: 250,
        fontSize: 64,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  },
  {
    id: 3,
    name: "Banner Web",
    category: "web",
    dimensions: { width: 1200, height: 400 },
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=100&fit=crop",
    elements: [
      {
        id: "bg3",
        type: "background",
        color: "#059669",
        gradient: "linear-gradient(45deg, #059669 0%, #10B981 100%)"
      },
      {
        id: "text3",
        type: "text",
        content: "Banner Promocional",
        x: 100,
        y: 150,
        fontSize: 42,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  },
  {
    id: 4,
    name: "Story Instagram",
    category: "social",
    dimensions: { width: 1080, height: 1920 },
    preview: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=500&fit=crop",
    elements: [
      {
        id: "bg4",
        type: "background",
        color: "#EC4899",
        gradient: "linear-gradient(180deg, #EC4899 0%, #F59E0B 100%)"
      },
      {
        id: "text4",
        type: "text",
        content: "Story",
        x: 100,
        y: 800,
        fontSize: 72,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  },
  {
    id: 5,
    name: "LinkedIn Post",
    category: "social",
    dimensions: { width: 1200, height: 627 },
    preview: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=150&fit=crop",
    elements: [
      {
        id: "bg5",
        type: "background",
        color: "#0A66C2",
        gradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)"
      },
      {
        id: "text5",
        type: "text",
        content: "Post LinkedIn",
        x: 100,
        y: 250,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  },
  {
    id: 6,
    name: "YouTube Thumbnail",
    category: "social",
    dimensions: { width: 1280, height: 720 },
    preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=150&fit=crop",
    elements: [
      {
        id: "bg6",
        type: "background",
        color: "#FF0000",
        gradient: "linear-gradient(45deg, #FF0000 0%, #FF4444 100%)"
      },
      {
        id: "text6",
        type: "text",
        content: "THUMBNAIL",
        x: 100,
        y: 300,
        fontSize: 64,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Arial"
      }
    ]
  }
];

export const mockDesigns = [
  {
    id: 1,
    name: "Campanha Verão 2024",
    template: "Instagram Post",
    createdAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-15T14:20:00Z",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    elements: mockTemplates[0].elements
  },
  {
    id: 2,
    name: "Promoção Black Friday",
    template: "Banner Web",
    createdAt: "2024-01-14T09:15:00Z",
    lastModified: "2024-01-14T16:45:00Z",
    thumbnail: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=100&fit=crop",
    elements: mockTemplates[2].elements
  },
  {
    id: 3,
    name: "Anúncio Produto",
    template: "Facebook Cover",
    createdAt: "2024-01-13T11:00:00Z",
    lastModified: "2024-01-13T15:30:00Z",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=150&fit=crop",
    elements: mockTemplates[1].elements
  }
];

export const mockFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Courier New"
];

export const mockColors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008080",
  "#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981",
  "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"
];

export const mockShapes = [
  { id: "rectangle", name: "Retângulo", icon: "⬜" },
  { id: "circle", name: "Círculo", icon: "⭕" },
  { id: "triangle", name: "Triângulo", icon: "🔺" },
  { id: "star", name: "Estrela", icon: "⭐" },
  { id: "arrow", name: "Seta", icon: "➡️" },
  { id: "heart", name: "Coração", icon: "❤️" }
];

export const mockFilterEffects = [
  { id: "none", name: "Nenhum", preview: "normal" },
  { id: "blur", name: "Desfoque", preview: "blur(2px)" },
  { id: "brightness", name: "Brilho", preview: "brightness(1.2)" },
  { id: "contrast", name: "Contraste", preview: "contrast(1.2)" },
  { id: "grayscale", name: "Preto e Branco", preview: "grayscale(100%)" },
  { id: "sepia", name: "Sépia", preview: "sepia(100%)" },
  { id: "vintage", name: "Vintage", preview: "sepia(50%) contrast(1.2)" },
  { id: "retro", name: "Retrô", preview: "hue-rotate(90deg) saturate(1.4)" }
];