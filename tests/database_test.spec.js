const { test, expect } = require('@playwright/test');
const { connectDB } = require('./db/database');

test('Insert New Student into Database', async () => {

  const studentId = 'TTC0178';
  const firstName = 'Kazi';
  const lastName = 'Hossain';
  const email = 'kazi0178@test.com';
  const password = 'Test123';
  const birthdate = '1990-01-01';
  const gender = 'male';

  const connection = await connectDB();

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
      "SELECT * FROM users WHERE student_id = ?",
      [studentId]
    );

    console.log(rows);

    expect(rows.length).toBe(1);
  } finally {
    await connection.execute(
      "DELETE FROM users WHERE student_id = ?",
      [studentId]
    );
    await connection.end();
  }

});