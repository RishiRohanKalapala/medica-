
import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 p-2.5 bg-blue-50 rounded-lg w-20 mt-2 ml-10 border border-blue-100 animate-pulse">
      <div className="typing-dots flex gap-1">
        <span className="inline-block w-2 h-2 bg-medical-primary rounded-full"></span>
        <span className="inline-block w-2 h-2 bg-medical-primary rounded-full"></span>
        <span className="inline-block w-2 h-2 bg-medical-primary rounded-full"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
