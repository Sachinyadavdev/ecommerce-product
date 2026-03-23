"use client";

import { useQueryBasket, BasketProduct } from "@/context/QueryBasketContext";
import { Plus, Check, Loader2, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface AddToQueryButtonProps {
  product: BasketProduct;
}

export default function AddToQueryButton({ product }: AddToQueryButtonProps) {
  const { addToBasket, isInBasket, removeFromBasket } = useQueryBasket();
  const [isAdding, setIsAdding] = useState(false);
  const [isSelectingColor, setIsSelectingColor] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [isFetchingColors, setIsFetchingColors] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inBasket = isInBasket(product.id);

  const fetchColors = async () => {
    setIsFetchingColors(true);
    try {
      const resp = await fetch("/api/admin/settings");
      const data = await resp.json();
      let colors = ["Black", "Natural", "White", "Blue", "Yellow", "Green", "Red"];
      if (data.available_colors) {
        colors = data.available_colors.split(",").map((c: string) => c.trim());
      }
      setAvailableColors(colors);
    } catch (e) {
      setAvailableColors(["Black", "Natural", "White", "Blue", "Yellow", "Green", "Red"]);
    } finally {
      setIsFetchingColors(false);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inBasket) {
      removeFromBasket(product.id);
    } else {
      setIsSelectingColor(true);
      fetchColors();
    }
  };

  const handleConfirmAdd = () => {
    if (!colorInput.trim()) {
      toast.error("Please specify a color");
      return;
    }

    setIsAdding(true);
    setIsSelectingColor(false);
    
    setTimeout(() => {
      addToBasket({ ...product, color: colorInput.trim() });
      setIsAdding(false);
      setColorInput("");
    }, 600);
  };

  const filteredColors = availableColors.filter(c => 
    c.toLowerCase().includes(colorInput.toLowerCase())
  );

  return (
    <>
    <motion.div
      onClick={(e) => {
        if (!isSelectingColor && !isAdding) handleToggle(e);
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative py-3.5 px-8 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group border cursor-pointer select-none ${
        inBasket
          ? "bg-slate-50 text-slate-800 border-slate-100 hover:bg-slate-100 shadow-sm"
          : "bg-primary text-white border-primary shadow-[0_12px_40px_-8px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_20px_60px_-10px_rgba(var(--primary-rgb),0.5)] hover:bg-[#3f863e] hover:border-[#3f863e]"
      } ${isAdding ? "opacity-70 pointer-events-none" : ""}`}
    >
      <div className="relative z-10 flex items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </motion.div>
          ) : inBasket ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span>Saved in Query</span>
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700" />
              <span>Add to Query</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Remove Instruction on Hover (if in basket) */}
      {inBasket && !isAdding && (
        <div className="absolute inset-0 bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 text-rose-600 z-20">
          <div className="flex items-center gap-2">
            <Minus className="w-3.5 h-3.5" />
            <span>Remove Item</span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </motion.div>

    {/* Color Selection Popover/Overlay - Moved outside for stable interaction */}
    <AnimatePresence>
      {isSelectingColor && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsSelectingColor(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm border border-slate-100 relative overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-primary tracking-tight uppercase">Select Color</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-relaxed">
                Please specify the preferred color <br/> for this item.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1 mb-2 block">Color Option</label>
                
                <div className="relative group/input">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => {
                      setColorInput(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select color..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-sm font-bold text-primary transition-all pr-12"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-primary transition-colors cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-45' : ''}`} />
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && filteredColors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[110] max-h-[200px] overflow-y-auto scrollbar-hide"
                    >
                      <div className="p-2 space-y-1">
                        {filteredColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setColorInput(color);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-primary hover:bg-slate-50 transition-colors flex items-center justify-between group/item"
                          >
                            {color}
                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover/item:opacity-20 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSelectingColor(false);
                  }}
                  className="flex-1 py-4 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleConfirmAdd();
                  }}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#3f863e] transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
