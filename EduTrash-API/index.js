const express = require('express'); // Import Express
const app = express(); // Membuat instance dari Express
const PORT = process.env.PORT || 3000; // Menentukan port

app.use(express.json()); // Middleware untuk mengubah request body ke JSON

// Endpoint default untuk root URL (http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Server berjalan dengan baik!');
});

let users = []; // Database sementara untuk menyimpan pengguna

// Endpoint untuk register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.status(201).json({ message: 'User berhasil didaftarkan', user });
});

// Endpoint untuk login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login berhasil', user });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
});

// Endpoint untuk mendapatkan user berdasarkan id
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
