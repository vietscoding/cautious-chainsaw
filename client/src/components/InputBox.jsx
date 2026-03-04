import { Fragment } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

function InputBox() {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }
    return (
        <form>
            <label>
                Email
            </label>
            <br></br>
            <input title="email" type="text" value={name} onChange={handleChange} />
            {/* <p>Current value: {name}</p> */}
        </form>
    );
}

export default InputBox;
