import { findTranscriptByStudentId, updateMathScoresByStudentId } from "../models/userModel.js"; // Nhập các hàm từ models để sử dụng trong đây


export const getTranscript = async (req, res) => { // Khai báo controller
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Student id required"
            });
        }

        const transcript = await findTranscriptByStudentId(Number(id));

        if (!transcript) {
            return res.status(404).json({
                message: "Transcript not found"
            });
        }

        // Tìm điểm số bằng id passed as parameter in URL
        // API1:fix
        if (transcript.studentId !== req.user.id) { // check autho against BOLA
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        res.json(transcript);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });

    }

}

export const patchTranscript = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Student id required"
            });
        }

        const transcript = await findTranscriptByStudentId(Number(id));

        const mathScores = req.body;

        if (mathScores < 0) {
            return res.status(400).json({
                message: "Invalid scores, requires a positive math score less than or equal to 10."
            });
        }


        if (!transcript) {
            return res.status(404).json({
                message: "Transcript not found"
            });
        }

        if (transcript.studentId !== req.user.id) { // check autho against BOLA
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        updateMathScoresByStudentId(id, mathScores)

        res.json({
            message: "Successful update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });

    }

}
