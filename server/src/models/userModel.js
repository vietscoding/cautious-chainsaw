const users = [];

const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Elon" },
    { id: 3, name: "Musk" },
    { id: 4, name: "Bill Gays" },
];

const transcript = [
    { id: 1, studentId: 1, math: 9, physics: 10 },
    { id: 2, studentId: 2, math: 6, physics: 9 },
    { id: 3, studentId: 3, math: 10, physics: 3 },
];

const listOfScores = [];

export const findTranscriptByStudentId = (studentId) =>
    transcript.find((t) => t.studentId === studentId);

export const findUserByEmail = (email) => users.find((u) => u.email === email);

export const createUser = (user) => {
    const newId = users.length + 1;

    const newUser = {
        id: newId,
        ...user
    };

    users.push(newUser);

    return newUser;


};
