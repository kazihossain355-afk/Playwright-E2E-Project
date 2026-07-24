const { test, expect } = require('@playwright/test');
const { connectDB } = require('./db/database');

test('Student E2E', async ({ page }) => {

  
  const connection = await connectDB();

 
  const random = Date.now().toString().slice(-5);

  const studentId = `TTC${random}`;
  const firstName = 'Kazi';
  const lastName = 'Hossain';
  const email = `kazihossain${random}@sql.com`;
  const password = 'Arif1234';
  const birthdate = '1990-01-01';
  const gender = 'male';

  
  await connection.execute(
    `INSERT INTO users
    (student_id, first_name, last_name, email, password, confirm_password, birthdate, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      studentId,
      firstName,
      lastName,
      email,
      password,
      password,
      birthdate,
      gender
    ]
  );

  
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE student_id = ?',
    [studentId]
  );

  expect(rows.length).toBe(1);
  expect(rows[0].student_id).toBe(studentId);
  expect(rows[0].email).toBe(email);


  await connection.end();

});