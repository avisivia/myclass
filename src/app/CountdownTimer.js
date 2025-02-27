"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const totalTime = minutes * 60 + seconds;
    const maxTime = 10 * 60; // 10 minutes in seconds
    const progress = (totalTime / maxTime) * 100; // Adjust based on max time

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    setIsRunning(false);
                } else {
                    if (seconds === 0) {
                        setMinutes((prev) => prev - 1);
                        setSeconds(59);
                    } else {
                        setSeconds((prev) => prev - 1);
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    return (
        <div className="flex items-center justify-center p-8 bg-white shadow-lg rounded-3xl" style={{ width: '250px', height: '200px' }}>
            {/* Circular Progress Bar 
            <svg width="250" height="250" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd" strokeWidth="6" />
                <motion.circle
                    cx="50" cy="50" r="40" fill="none" stroke="#6a5acd" strokeWidth="6"
                    strokeDasharray="251.2" strokeDashoffset={(1 - progress / 100) * 251.2}
                    transition={{ ease: "linear", duration: 1 }}
                />
            </svg>*/}

            {/* Timer Controls */}
            <div className="flex flex-col items-center mx-4">
                <div className="flex space-x-4">
                    <button onClick={() => setMinutes((m) => Math.min(m + 1, 59))} className="text-2xl p-2">+</button>
                    <button onClick={() => setSeconds((s) => Math.min(s + 10, 59))} className="text-2xl p-2">+</button>
                </div>
                <h1 className="text-5xl font-bold my-2">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </h1>
                <div className="flex space-x-4">
                    <button onClick={() => setMinutes((m) => Math.max(m - 1, 0))} className="text-2xl p-2">-</button>
                    <button onClick={() => setSeconds((s) => Math.max(s - 10, 0))} className="text-2xl p-2">-</button>
                </div>
            </div>

            {/* Play / Stop Buttons */}
            <div className="flex flex-col space-y-2">
                <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-500 text-white text-2xl p-4 rounded-full">
                    {isRunning ? "⏸" : "▶"}
                </button>
                <button onClick={() => { setMinutes(0); setSeconds(0); setIsRunning(false); }}
                    className="border text-2xl p-4 rounded-full">
                    ⏹
                </button>
            </div>
        </div>
    );
}
