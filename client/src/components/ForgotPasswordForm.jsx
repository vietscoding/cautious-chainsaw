import { Fragment } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles/ForgotPasswordFormStyle.css"


function ForgotPasswordForm(props) {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }
    return (
        <div className="form-container mx-220 my-60 block justify-item-center">
            <div className="logo-container">
                Forgot Password
            </div>

            <form className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required={true} />
                </div>

                <button className="form-submit-btn" type="submit">Send Email</button>
            </form>

            <p className="signup-link">
                Don't have an account?
                <a href="#" className="signup-link link"> Sign up now</a>
            </p>
        </div>
    );
}

export default ForgotPasswordForm;
