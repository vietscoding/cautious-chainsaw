import { useState } from "react";

function ButtonGradient(props) {

    return (
        // <button 
        // type="submit" className="form-submit-btn"></button>
        <button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-all duration-200 active:scale-95">
            Khám phá thêm
        </button>
    );
}

export default ButtonGradient;
