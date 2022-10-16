//Criar um programa que calcula a average
// das grades entre os aluunos e envia mensagem do calculo da average

const classA = [
  {
    name: "Mayk",
    grade: 9.0,
  },
  {
    name: "Diego",
    grade: 5.0,
  },
  {
    name: "Marcos",
    grade: 8.0,
  },
  {
    name: "Vinicius",
    grade: 10.0,
  },
]

const classB = [
  {
    name: "Robson",
    grade: 9.0,
  },
  {
    name: "Rebeca",
    grade: 5.0,
  },
  {
    name: "Diogo",
    grade: 8.0,
  },
  {
    name: "Robert",
    grade: 8.0,
  },
]

function calculateAverage(students) {
  let sum = 0;

  for(student of turma) {
    sum += student.grade;
  }

  return sum / turma.length;
}

function sendMessage(average, students) {
  if (average > 5) {
    console.log(`${turma} average: ${average},  Congurations`)
  } else {
    console.log(`${turma} average: ${average}. Is not good.`)
  }
}

function markAsFlunked(student) {
  student.flunked = false
  if (student.grade <= 5) {
    student.flunked = true
  }
}

function sendFlunkedMessage(student) {
  if (student.flunked) {
    console.log(`${student.name} flunked`)
  }
}

function studentsflunked(students) {
  for (student of students) {
    markAsFlunked(student)
    sendFlunkedMessage(student)
  }
}

const averageA = calculateAverage(classA);
const averageB = calculateAverage(classB);

sendMessage(averageA, "Class A")
sendMessage(averageB, "Class B")

studentsflunked(classA);
studentsflunked(classB);
