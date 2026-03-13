import { findStudentById, findUserById, updateUser, createStudentsBulk } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Don't return password
        const { password, ...userResponse } = user;
        res.json(userResponse);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT
        const updates = req.body;

        // Hash password if being updated
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // // API3:vul - allows updating any property including sensitive ones like role
        // const updatedUser = updateUser(userId, updates);

        // API3:fix - only allow updating safe properties
        const allowedFields = ['email', 'password']; // exclude 'role' and 'id'
        const filteredUpdates = {};
        for (const field of allowedFields) {
            if (updates.hasOwnProperty(field)) {
                filteredUpdates[field] = updates[field];
            }
        }
        const updatedUser = updateUser(userId, filteredUpdates);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Don't return password in response
        const { password, ...userResponse } = updatedUser;
        res.json({ message: "Profile updated", user: userResponse });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getStudentProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = findStudentById(userId);

        if (!user) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Don't return password
        const { password, ...userResponse } = user;
        res.json(userResponse);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// API4: Bulk create students
export const bulkCreateStudents = async (req, res) => {
    try {
        const studentList = req.body.students;

        if (!Array.isArray(studentList)) {
            return res.status(400).json({ message: "Students must be an array" });
        }

        // API4:vul - no limit on bulk creation, allows resource exhaustion
        const createdStudents = createStudentsBulk(studentList);

        // // API4:fix - limit bulk creation to prevent resource exhaustion
        // if (studentList.length > 10) {
        //     return res.status(400).json({ message: "Cannot create more than 10 students at once" });
        // }
        // const createdStudents = createStudentsBulk(studentList);

        res.json({ message: "Students created", students: createdStudents });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};