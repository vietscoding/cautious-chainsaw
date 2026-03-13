import { findStudentById, findUserById, updateUser, createStudentsBulk, getAllUsers, deleteStudentById } from "../models/userModel.js";
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

        // // API4:vul - no limit on bulk creation, allows resource exhaustion
        // const createdStudents = createStudentsBulk(studentList);

        // API4:fix - limit bulk creation to prevent resource exhaustion
        if (studentList.length > 10) {
            return res.status(400).json({ message: "Cannot create more than 10 students at once" });
        }
        const createdStudents = createStudentsBulk(studentList);

        res.json({ message: "Students created", students: createdStudents });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// API5: Admin functions - should require admin role
export const getAllUsersAdmin = async (req, res) => {
    try {
        // API5:vul - no role check, any authenticated user can access admin function
        // const allUsers = getAllUsers();

        // API5:fix - check if user has admin role
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }
        const allUsers = getAllUsers();

        // Don't return passwords
        const usersResponse = allUsers.map(({ password, ...user }) => user);
        res.json({ users: usersResponse });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteStudentAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // API5:vul - no role check, any authenticated user can delete students
        const deletedStudent = deleteStudentById(Number(id));

        // // API5:fix - check if user has admin role
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Admin access required" });
        // }
        // const deletedStudent = deleteStudentById(Number(id));

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted", student: deletedStudent });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};