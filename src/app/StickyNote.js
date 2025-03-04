'use client';

import { useRef, useEffect, useState } from 'react';

export default function DraggableDiv() {
    const divRef = useRef(null);
    const headerRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [note, setNote] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [isBold, setIsBold] = useState(false);
    const [color, setColor] = useState('#000000');
    const [textareaSize, setTextareaSize] = useState({ width: '100%', height: '128px' });

    useEffect(() => {
        setNote(localStorage.getItem('stickyNote') || '');
        setFontSize(parseInt(localStorage.getItem('fontSize')) || 16);
        setIsBold(localStorage.getItem('isBold') === 'true');
        setColor(localStorage.getItem('color') || '#000000');
        setTextareaSize(JSON.parse(localStorage.getItem('textareaSize')) || { width: '100%', height: '128px' });
    }, []);

    useEffect(() => {
        const div = divRef.current;
        const header = headerRef.current;

        if (!div || !header) return;

        const dragMouseDown = (e) => {
            e.preventDefault();
            setDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        };

        const dragTouchStart = (e) => {
            e.preventDefault();
            setDragging(true);
            const touch = e.touches[0];
            setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y });
        };

        const elementDrag = (e) => {
            if (!dragging) return;
            setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
        };

        const elementTouchMove = (e) => {
            if (!dragging) return;
            const touch = e.touches[0];
            setPosition({ x: touch.clientX - startPos.x, y: touch.clientY - startPos.y });
        };

        const closeDragElement = () => {
            setDragging(false);
        };

        header.addEventListener('mousedown', dragMouseDown);
        header.addEventListener('touchstart', dragTouchStart);
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('touchmove', elementTouchMove);
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('touchend', closeDragElement);

        return () => {
            header.removeEventListener('mousedown', dragMouseDown);
            header.removeEventListener('touchstart', dragTouchStart);
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('touchmove', elementTouchMove);
            document.removeEventListener('mouseup', closeDragElement);
            document.removeEventListener('touchend', closeDragElement);
        };
    }, [dragging, position, startPos]);

    useEffect(() => {
        localStorage.setItem('stickyNote', note);
    }, [note]);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('isBold', isBold);
    }, [isBold]);

    useEffect(() => {
        localStorage.setItem('color', color);
    }, [color]);

    useEffect(() => {
        localStorage.setItem('textareaSize', JSON.stringify(textareaSize));
    }, [textareaSize]);

    const handleTextareaResize = (e) => {
        const newWidth = Math.max(e.target.offsetWidth, 200);
        const newHeight = Math.max(e.target.offsetHeight, 200);
        setTextareaSize({ width: `${newWidth}px`, height: `${newHeight}px` });
    };
    
    const handleTouchMove = (e) => {
        e.preventDefault();
        const textarea = e.target;
        const newWidth = Math.max(textarea.offsetWidth, 200);
        const newHeight = Math.max(textarea.offsetHeight, 200);
        setTextareaSize({ width: `${newWidth}px`, height: `${newHeight}px` });
    };

    return (
        <div className="p-6">
            <div
                ref={divRef}
                style={{ top: `${position.y}px`, left: `${position.x}px` }}
                className="absolute z-10 bg-gray-200 text-center"
            >
                <div
                    ref={headerRef}
                    className="p-2 cursor-move bg-blue-500 text-white font-bold flex justify-between items-center"
                >
                    <span>
                        {/* Move */}
                    </span>
                    <div className="flex space-x-2 bg-blue-500">
                        <button onClick={() => setFontSize(fontSize + 1)} onTouchEnd={() => setFontSize(fontSize + 1)}>A+</button>
                        <button onClick={() => setFontSize(fontSize - 1)} onTouchEnd={() => setFontSize(fontSize - 1)}>A-</button>
                        <button onClick={() => setIsBold(!isBold)} onTouchEnd={() => setIsBold(!isBold)}>B</button>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                </div>
                <textarea
                    className="w-full h-32 p-2 bg-white border-t border-gray-400 text-black resize"
                    placeholder="Write your text here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onMouseUp={handleTextareaResize}
                    onTouchMove={handleTouchMove}
                    style={{
                        fontSize: `${fontSize}px`,
                        fontWeight: isBold ? 'bold' : 'normal',
                        color: color,
                        width: textareaSize.width,
                        height: textareaSize.height,
                        minWidth: '200px',
                        minHeight: '200px',
                    }}
                ></textarea>
            </div>
        </div>
    );
}