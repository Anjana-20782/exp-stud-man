// public/main.js
// Frontend logic for single-page Student Management app

const API_BASE = '/api/students';

// LOGIN ELEMENTS
const loginSection = document.getElementById('login-section');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const form = document.getElementById('student-form');
const studentsList = document.getElementById('students-list');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

const idInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const rollInput = document.getElementById('rollNumber');
const s1Input = document.getElementById('subject1');
const s2Input = document.getElementById('subject2');
const s3Input = document.getElementById('subject3');

// Accordion functionality
const marksAccordion = document.getElementById('marks-accordion');
const marksContent = document.getElementById('marks-content');

// ---------------- LOGIN SYSTEM ----------------

// LOGIN
loginBtn.addEventListener('click', async () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) return alert('Enter email & password');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful');

      loginSection.style.display = 'none';
      logoutBtn.style.display = 'inline-block';

      fetchStudents();
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Login error');
    console.error(err);
  }
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  alert('Logged out');

  loginSection.style.display = 'block';
  logoutBtn.style.display = 'none';

  studentsList.innerHTML = '<tr><td colspan="8">Please login</td></tr>';
});

// ---------------- FETCH STUDENTS ----------------

async function fetchStudents() {
  const token = localStorage.getItem('token');
  if (!token) {
    studentsList.innerHTML = '<tr><td colspan="8">Please login first</td></tr>';
    return;
  }

  const res = await fetch(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return alert(data.message || 'Failed to load students');
  }

  const data = await res.json();
  renderStudents(data);
}

function renderStudents(students) {
  if (!Array.isArray(students)) {
    studentsList.innerHTML = '<tr><td colspan="8" style="text-align: center;">No students found.</td></tr>';
    return;
  }
  studentsList.innerHTML = students.map(s => studentRow(s)).join('');
  document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', onEdit));
  document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', onDelete));
}

function studentRow(s) {
  const total = (s.marks?.subject1 || 0) + (s.marks?.subject2 || 0) + (s.marks?.subject3 || 0);
  return `
    <tr data-id="${s._id}">
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.rollNumber)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${s.marks?.subject1 ?? 0}</td>
      <td>${s.marks?.subject2 ?? 0}</td>
      <td>${s.marks?.subject3 ?? 0}</td>
      <td><strong>${total}</strong></td>
      <td class="actions">
        <button class="edit-btn" data-id="${s._id}">Edit</button>
        <button class="delete-btn" data-id="${s._id}">Delete</button>
      </td>
    </tr>
  `;
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// ---------------- SAVE STUDENT ----------------

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const id = idInput.value;

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    rollNumber: rollInput.value.trim(),
    marks: {
      subject1: Number(s1Input.value),
      subject2: Number(s2Input.value),
      subject3: Number(s3Input.value)
    }
  };

  if (!payload.name || !payload.email || !payload.rollNumber) {
    alert('Name, email and roll number are required.');
    return;
  }

  try {
    let res;
    if (id) {
      res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Operation failed');
    }

    resetForm();
    fetchStudents();

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});

cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  idInput.value = '';
  formTitle.textContent = 'Add Student';
  saveBtn.textContent = 'Save';
  cancelBtn.style.display = 'none';
  form.reset();
}

// ---------------- EDIT STUDENT ----------------

async function onEdit(e) {
  const id = e.currentTarget.dataset.id;
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Failed to fetch student');

    const student = await res.json();

    idInput.value = student._id;
    nameInput.value = student.name || '';
    emailInput.value = student.email || '';
    rollInput.value = student.rollNumber || '';
    s1Input.value = student.marks?.subject1 ?? 0;
    s2Input.value = student.marks?.subject2 ?? 0;
    s3Input.value = student.marks?.subject3 ?? 0;

    formTitle.textContent = 'Edit Student';
    saveBtn.textContent = 'Update';
    cancelBtn.style.display = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    alert('Could not load student for editing');
    console.error(err);
  }
}

// ---------------- DELETE STUDENT ----------------

async function onDelete(e) {
  const id = e.currentTarget.dataset.id;
  const token = localStorage.getItem('token');

  if (!confirm('Delete this student?')) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Delete failed');

    fetchStudents();

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

// ---------------- ACCORDION ----------------
marksAccordion.addEventListener('click', () => {
  marksAccordion.classList.toggle('collapsed');
  marksContent.classList.toggle('collapsed');
});

// ---------------- INITIAL LOAD ----------------
if (localStorage.getItem('token')) {
  loginSection.style.display = 'none';
  logoutBtn.style.display = 'inline-block';
}
fetchStudents();
