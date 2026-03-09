import { useState } from "react";
import "../styles/ForgotPasswordFormStyle.css";

function ForgotPasswordForm(props) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage({ type: "error", text: "Vui lòng nhập email" });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            // TODO: Gọi API quên mật khẩu ở đây
            // const res = await forgotPasswordAPI(email);

            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1200));

            setMessage({
                type: "success",
                text: "Chúng tôi đã gửi link đặt lại mật khẩu vào email của bạn."
            });
            setEmail(""); // xóa form sau khi thành công
        } catch (err) {
            setMessage({
                type: "error",
                text: "Có lỗi xảy ra. Vui lòng thử lại sau."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="logo-container">
                Forgot Password
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <button 
                    className="form-submit-btn" 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Đang gửi..." : "Send Email"}
                </button>
            </form>

            {message && (
                <p className={`message ${message.type}`}>
                    {message.text}
                </p>
            )}

            <p className="signup-link">
                Don't have an account?{" "}
                <a href="/signup" className="signup-link">Sign up now</a>
            </p>
        </div>
    );
}

export default ForgotPasswordForm;