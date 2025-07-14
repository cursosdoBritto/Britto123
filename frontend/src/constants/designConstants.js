// Design constants moved from mockData.js
export const FONTS = [
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

export const COLORS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008080",
  "#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981",
  "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"
];

export const SHAPES = [
  { id: "rectangle", name: "Retângulo", icon: "⬜" },
  { id: "circle", name: "Círculo", icon: "⭕" },
  { id: "triangle", name: "Triângulo", icon: "🔺" },
  { id: "star", name: "Estrela", icon: "⭐" },
  { id: "arrow", name: "Seta", icon: "➡️" },
  { id: "heart", name: "Coração", icon: "❤️" }
];

export const FILTER_EFFECTS = [
  { id: "none", name: "Nenhum", preview: "normal" },
  { id: "blur", name: "Desfoque", preview: "blur(2px)" },
  { id: "brightness", name: "Brilho", preview: "brightness(1.2)" },
  { id: "contrast", name: "Contraste", preview: "contrast(1.2)" },
  { id: "grayscale", name: "Preto e Branco", preview: "grayscale(100%)" },
  { id: "sepia", name: "Sépia", preview: "sepia(100%)" },
  { id: "vintage", name: "Vintage", preview: "sepia(50%) contrast(1.2)" },
  { id: "retro", name: "Retrô", preview: "hue-rotate(90deg) saturate(1.4)" }
];

export const EXPORT_FORMATS = [
  { id: "png", name: "PNG", extension: "png" },
  { id: "jpg", name: "JPEG", extension: "jpg" },
  { id: "svg", name: "SVG", extension: "svg" }
];

export const CANVAS_DEFAULTS = {
  width: 1200,
  height: 800,
  backgroundColor: "#FFFFFF",
  zoom: 100,
  showGrid: true
};

export const ELEMENT_DEFAULTS = {
  text: {
    fontSize: 24,
    fontFamily: "Arial",
    fontWeight: "normal",
    color: "#000000"
  },
  shape: {
    width: 100,
    height: 100,
    color: "#4F46E5",
    borderColor: "#000000",
    borderWidth: 0
  },
  image: {
    width: 200,
    height: 200,
    opacity: 1
  }
};