
import React, { useRef, useEffect, useState } from 'react';
import { Trash2, CheckCircle, PenTool } from 'lucide-react';

interface SignatureCanvasProps {
  onSave: (imageData: string | null) => void;
  currentImage: string | null;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave, currentImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000080'; // Navy blue signature color
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsCanvasEmpty(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsCanvasEmpty(true);
    onSave(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-2">
      <div className="relative bg-white border border-slate-200 rounded-lg overflow-hidden group">
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="w-full h-[100px] cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />
        
        {isCanvasEmpty && !currentImage && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="flex flex-col items-center gap-1">
                    <PenTool size={24} />
                    <span className="text-xs">Draw signature here</span>
                </div>
            </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={clearCanvas}
            className="p-2 bg-white/90 shadow-md text-red-500 rounded-lg hover:bg-red-50 transition"
            title="Clear"
          >
            <Trash2 size={16} />
          </button>
          {!isCanvasEmpty && (
            <button
              onClick={saveSignature}
              className="p-2 bg-white/90 shadow-md text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
              title="Apply Signature"
            >
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="text-[10px] text-slate-400 text-center italic">Sign on canvas and click checkmark to apply.</p>
    </div>
  );
};

export default SignatureCanvas;
