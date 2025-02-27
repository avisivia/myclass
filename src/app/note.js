import { useState } from "react";
import styles from "../app/main.module.css"

export default function Note() {
    const [text, setText] = useState(localStorage.getItem("stickyText") || "");

    const [size, setSize] = useState(() => {
        const savedSize = JSON.parse(localStorage.getItem("stickyNoteSize"));
        return savedSize || { width: 200, height: 200 }; // Default size
    });

    const handleResize = (event) => {
        const { width, height } = event.target.getBoundingClientRect();
        const newSize = { width, height };
        setSize(newSize);
        localStorage.setItem("stickyNoteSize", JSON.stringify(newSize));
    };

    return (
        <div
            className={styles.noteContainer}
            onMouseUp={handleResize}
        >
            {/* Resizable Text Area */}
            <textarea
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    localStorage.setItem("stickyText", e.target.value);
                }}
                className={styles.textarea}
            />
        </div>
    );
}
