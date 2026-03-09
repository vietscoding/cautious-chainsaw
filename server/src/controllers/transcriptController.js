import { findTranscriptByStudentId } from "../models/userModel.js"; // Nhập các hàm từ models để sử dụng trong đây


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

        // if (transcript.studentId !== req.user.id) { // check autho against BOLA
        //     return res.status(403).json({
        //         message: "Forbidden"
        //     })
        // }

        res.json(transcript);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }


}