import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2, Terminal, Trash2 } from 'lucide-react';

interface PythonSandboxProps {
    initialCode?: string;
    expectedOutput?: string;
    onSuccess?: () => void;
    readOnly?: boolean;
}

export const PythonSandbox: React.FC<PythonSandboxProps> = ({
    initialCode = '# Write your Python code here\nprint("Hello, AI!")',
    expectedOutput,
    onSuccess,
    readOnly = false
}) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string>('');
    const [isRunning, setIsRunning] = useState(false);
    const [pyodide, setPyodide] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load Pyodide on mount
    useEffect(() => {
        const loadPyodide = async () => {
            try {
                setIsLoading(true);
                // Load Pyodide from CDN
                const pyodideModule = await (window as any).loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
                });
                setPyodide(pyodideModule);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load Python environment. Please refresh.');
                setIsLoading(false);
            }
        };

        // Add Pyodide script to page if not already present
        if (!(window as any).loadPyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            script.onload = loadPyodide;
            script.onerror = () => setError('Failed to load Pyodide script.');
            document.head.appendChild(script);
        } else {
            loadPyodide();
        }
    }, []);

    const runCode = async () => {
        if (!pyodide || isRunning) return;

        setIsRunning(true);
        setOutput('');
        setError(null);

        try {
            // Capture stdout
            pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
            `);

            // Run user code
            await pyodide.runPythonAsync(code);

            // Get captured output
            const stdout = pyodide.runPython('sys.stdout.getvalue()');
            setOutput(stdout || '(No output)');

            // Check for success
            if (expectedOutput && stdout.trim() === expectedOutput.trim()) {
                onSuccess?.();
            }
        } catch (err: any) {
            setOutput(`Error: ${err.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const clearOutput = () => {
        setOutput('');
    };

    return (
        <div className="w-full max-w-3xl bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-slate-400 font-mono">Python 3.11 (Pyodide)</span>
                </div>
                <div className="flex items-center gap-2">
                    {isLoading && (
                        <span className="text-xs text-amber-400 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Loading Python...
                        </span>
                    )}
                </div>
            </div>

            {/* Code Editor */}
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    readOnly={readOnly}
                    className="w-full h-48 p-4 bg-slate-950 text-green-400 font-mono text-sm resize-none focus:outline-none"
                    spellCheck={false}
                    placeholder="# Write your Python code here..."
                />
                {/* Line Numbers */}
                <div className="absolute top-0 left-0 p-4 text-slate-600 font-mono text-sm select-none pointer-events-none">
                    {code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 px-4 py-2 border-t border-slate-800 bg-slate-900">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runCode}
                    disabled={isLoading || isRunning}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all
                        ${isLoading || isRunning
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30'
                        }`}
                >
                    {isRunning ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Play className="w-4 h-4" />
                    )}
                    {isRunning ? 'Running...' : 'Run Code'}
                </motion.button>
                <button
                    onClick={clearOutput}
                    className="flex items-center gap-1 px-3 py-2 text-slate-400 hover:text-slate-200 text-xs"
                >
                    <Trash2 className="w-3 h-3" /> Clear
                </button>
            </div>

            {/* Output */}
            <div className="border-t border-slate-800">
                <div className="flex items-center gap-2 px-4 py-1 bg-slate-900 text-xs text-slate-500 font-mono">
                    <Terminal className="w-3 h-3" /> Output
                </div>
                <pre className={`p-4 min-h-[80px] font-mono text-sm overflow-auto ${output.startsWith('Error') ? 'text-red-400' : 'text-slate-300'}`}>
                    {output || <span className="text-slate-600">Run your code to see output...</span>}
                </pre>
            </div>

            {/* Success Indicator */}
            {expectedOutput && output.trim() === expectedOutput.trim() && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 bg-green-900/30 border-t border-green-700 text-green-400 text-sm font-bold text-center"
                >
                    ✓ CORRECT! Challenge Complete.
                </motion.div>
            )}
        </div>
    );
};
