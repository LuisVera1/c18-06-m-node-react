"use client";
import React from "react";
import { ProgressBar } from "primereact/progressbar";

interface CustomProgressBarProps {
    value: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ value }) => {
    return (
        <div className="card w-80">
            <ProgressBar value={value} className="custom-progress-bar " />
        </div>
    );
};

export default CustomProgressBar;
