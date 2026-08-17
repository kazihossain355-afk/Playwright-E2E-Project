const { test, expect } = require('@playwright/test');
const { connectDB } = require('./db/database');

test('Database test', async () => {
  const studentId = 'TTC0225';
  const firstName = 'Kazi';
  const lastName = 'Hossain';
  const email = 'taltek.e2e@example.com';
  const password = 'E2ePass123';
  const birthdate = '2000-01-01';
  const gender = 'Male';

  let connection;

  try {
    connection = await connectDB();

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

    console.log(rows);

    expect(rows.length).toBe(1);

  } finally {
    if (connection) {
      await connection.execute(
        'DELETE FROM users WHERE student_id = ?',
        [studentId]
      );

      await connection.end();
    }
  }
});