import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AttentionHeatmapProps {
    tokens?: string[]; // e.g., ["The", "animal", "did", "not", "cross", "the", "street", "because", "it", "was", "too", "tired"]
    attentionWeights?: number[][]; // [tgt_len, src_len]
    readOnly?: boolean;
}

export const AttentionHeatmap: React.FC<AttentionHeatmapProps> = ({
    tokens = ["The", "animal", "did", "not", "cross", "the", "street", "because", "it", "was", "too", "tired"],
    // Default: "it" attends to "animal" (coreference)
    attentionWeights,
    readOnly = false
}) => {
    const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);

    // Generate default attention if not provided (simple logic for demo)
    const weights = attentionWeights || tokens.map((_, i) =>
        tokens.map((_, j) => {
            if (i === j) return 0.8; // Self-attention
            if (tokens[i] === "it" && tokens[j] === "animal") return 0.9;
            if (Math.abs(i - j) < 2) return 0.3; // Local context
            return 0.05;
        })
    );

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="text-center text-xs text-slate-500 mb-2">
                Hover over a word to see what it is "paying attention" to.
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800 relative">
                {tokens.map((token, i) => {
                    // Logic: If hovering, how much does token[i] attend to token[hovered]?
                    // OR: If hovering token[hovered], how much does it attend to token[i]?
                    // Let's show: When I look at "it" (hovered), highlight the words "it" is looking at.

                    const weight = hoveredTokenIndex !== null ? weights[hoveredTokenIndex][i] : 0;
                    const isSelf = hoveredTokenIndex === i;

                    return (
                        <motion.div
                            key={i}
                            className={`relative px-3 py-1.5 rounded-lg text-lg font-medium cursor-pointer transition-all duration-300
                                ${hoveredTokenIndex === null ? 'bg-slate-800 text-slate-300' : ''}
                            `}
                            style={{
                                backgroundColor: hoveredTokenIndex !== null
                                    ? `rgba(99, 102, 241, ${weight})` // Indigo with opacity = weight
                                    : undefined,
                                color: hoveredTokenIndex !== null && weight > 0.5 ? 'white' : 'rgb(203 213 225)',
                                scale: hoveredTokenIndex !== null && weight > 0.5 ? 1.1 : 1,
                                zIndex: hoveredTokenIndex !== null && weight > 0.5 ? 10 : 0
                            }}
                            onMouseEnter={() => setHoveredTokenIndex(i)}
                            onMouseLeave={() => setHoveredTokenIndex(null)}
                        >
                            {token}
                            {/* Connector line (simplified visualization) */}
                            {hoveredTokenIndex !== null && weight > 0.6 && i !== hoveredTokenIndex && (
                                <motion.div
                                    className="absolute inset-0 border-2 border-yellow-400 rounded-lg opacity-50 pointer-events-none"
                                    layoutId={`highlight-${i}`}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex gap-4">
                {/* Legend */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-4 h-4 rounded bg-indigo-600"></div> High Attention (Focused)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-4 h-4 rounded bg-slate-800"></div> Low Attention (Ignored)
                </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl text-center max-w-lg">
                <h4 className="font-bold text-white text-sm mb-1">Self-Attention</h4>
                <p className="text-xs text-slate-400">
                    When the model reads <strong>"it"</strong>, it looks back at the whole sentence to figure out what "it" refers to.
                    <br />
                    Here, "it" pays attention to <strong>"animal"</strong> and <strong>"tired"</strong>.
                </p>
            </div>
        </div>
    );
};
