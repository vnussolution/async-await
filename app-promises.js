const users = [{ id: 1, name: 'frank', schoolId: 111 }, { id: 2, name: 'truc', schoolId: 222 }, { id: 3, name: 'bi', schoolId: 333 }];

const grades = [{ id: 1, schoolId: 111, grade: 11 }, { id: 2, schoolId: 222, grade: 22 }, { id: 3, schoolId: 111, grade: 33 }];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user)
            resolve(user);
        else
            reject('cannot find the user with id', id);
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => {
            return grade.schoolId === schoolId;
        }));
    });
}

const getStatus = (id) => {
    let user;
    return getUser(id).then((u) => {
        user = u;
        return getGrades(u.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average} in the class`;
    }).catch((e) => console.log(e));
}


getUser(21).then((user) => {
    console.log(user);
}).catch((err) => {
    console.log(err);
});

getGrades(111).then((grade) => {
    console.log('grade::', grade);
}).catch((err) => {
    console.log(err);
});

getStatus(1).then((status) => console.log('status::', status)).catch((e) => console.log(e));