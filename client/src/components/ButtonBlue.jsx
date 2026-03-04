import { useState } from "react";

function ButtonBlue(props) {

    return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.25">{props.btnText}</button>
    );
}

export default ButtonBlue;
