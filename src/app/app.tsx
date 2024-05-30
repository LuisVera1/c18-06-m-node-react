"use client";
import React from "react";
import useAuth from "./useAuth";

const App = ({ children }: { children: React.ReactNode }) => {
    useAuth();

    return <>{children}</>;
};

export default App;
