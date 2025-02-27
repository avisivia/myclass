"use client"
import styles from "../app/main.module.css"
import { motion } from "framer-motion";
import { ResizableBox } from "react-resizable";
import CountdownTimer from "./CountdownTimer";
import StickyNote from "./StickyNote";

export default function Home() {

  return (
    <div className={styles.container}>
     
     
     
      <StickyNote />
     
     
     
     
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragListener={true}
      >
        <CountdownTimer />
      </motion.div>
    </div>
  );
}
