import React from "react";
import {
  Palette,
  Layers,
  Lock,
  Layout,
  Zap,
  Scissors,
  Droplets,
} from "lucide-react";

const ProductTechnicalSpecs = ({ specs }) => {
  if (!specs) return null;

  const {
    colour,
    style,
    closure,
    window,
    heatSealable,
    tearNotch,
    waterproof,
  } = specs;

  const specItems = [
    {
      label: "Color",
      value: colour,
      icon: Palette,
      show: colour && colour !== "None",
    },
    {
      label: "Style",
      value: style,
      icon: Layers,
      show: style && style !== "None",
    },
    {
      label: "Closure",
      value: closure,
      icon: Lock,
      show: closure && closure !== "None",
    },
    {
      label: "Window",
      value: window,
      icon: Layout,
      show: window && window !== "None",
    },
    {
      label: "Heat Sealable",
      value: "Yes",
      icon: Zap,
      show: heatSealable === true,
      customText: "Heat Sealable: Yes",
    },
    {
      label: "Tear Notch",
      value: "Yes (Easy Opening)",
      icon: Scissors,
      show: tearNotch === true,
      customText: "Tear Notch: Yes (Easy Opening)",
    },
    {
      label: "Waterproof/Oil-proof",
      value: waterproof ? "Yes" : "No",
      icon: Droplets,
      show: true,
      customText: waterproof
        ? "Waterproof/Oil-proof: Yes"
        : "Waterproof/Oil-proof: No",
    },
  ];

  const filteredSpecs = specItems.filter((item) => item.show);

  if (filteredSpecs.length === 0) return null;

  return (
    <div className="space-y-4 pt-6 mt-6 border-t border-white/10">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Technical Specifications
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {filteredSpecs.map((spec, index) => (
          <div key={index} className="flex items-center gap-3">
            <spec.icon size={16} className="text-[#D00000] shrink-0" />
            <span className="text-white text-sm font-bold uppercase tracking-wide">
              {spec.customText || `${spec.label}: ${spec.value}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTechnicalSpecs;
