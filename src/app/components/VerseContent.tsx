import { useState } from 'react';
import { ChevronDown, ChevronUp, Circle } from 'lucide-react';

interface VerseContentProps {
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
}

export function VerseContent({ 
  sanskrit, 
  transliteration, 
  translation, 
  commentary 
}: VerseContentProps) {
  const [showCommentary, setShowCommentary] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);

  return (
    <div className="space-y-6">
      {/* Sanskrit */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-600">🕉️</span>
          <h3 className="text-[14px] font-medium text-foreground">Sanskrit</h3>
        </div>
        <div className="pl-6">
          <p 
            className="text-[18px] leading-[1.9] text-foreground"
            style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
          >
            {sanskrit}
          </p>
        </div>
      </div>

      {/* Transliteration */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Circle className="text-orange-500 fill-orange-500" size={8} />
            <h3 className="text-[14px] font-medium text-foreground">Transliteration</h3>
          </div>
          <button 
            onClick={() => setShowTransliteration(!showTransliteration)}
            className="text-[12px] text-orange-500 hover:text-orange-600 transition-colors"
          >
            {showTransliteration ? 'Hide' : 'View'}
          </button>
        </div>
        {showTransliteration && (
          <div className="pl-6">
            <p className="text-[15px] leading-[1.8] text-muted-foreground italic">
              {transliteration}
            </p>
          </div>
        )}
      </div>

      {/* Translation */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Circle className="text-orange-500 fill-orange-500" size={8} />
          <h3 className="text-[14px] font-medium text-foreground">Translation</h3>
        </div>
        <div className="pl-6 bg-blue-50 border-l-2 border-blue-400 p-4 rounded-r">
          <p className="text-[15px] leading-[1.75] text-foreground">
            {translation}
          </p>
        </div>
      </div>

      {/* Commentary & Explanation */}
      <div>
        <button
          onClick={() => setShowCommentary(!showCommentary)}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Circle className="text-orange-500 fill-orange-500" size={8} />
            <h3 className="text-[14px] font-medium text-foreground">Commentary & Explanation</h3>
          </div>
          {showCommentary ? (
            <ChevronUp className="text-muted-foreground group-hover:text-foreground transition-colors" size={18} />
          ) : (
            <ChevronDown className="text-muted-foreground group-hover:text-foreground transition-colors" size={18} />
          )}
        </button>
        
        {showCommentary && (
          <div className="pl-6 bg-green-50 border-l-2 border-green-400 p-4 rounded-r">
            <p className="text-[14px] leading-[1.8] text-foreground/90">
              {commentary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
