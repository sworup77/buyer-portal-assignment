
const API = "http://localhost:3000";

async function register() {
   const name = document.getElementById("name").value;
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const message = document.getElementById("message");

   if (!name || !email || !password) {
      message.style.color = "red";
      message.innerText = "All fields are required!";
      return;
   }

   try {
      const res = await fetch(`${API}/auth/register`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
         message.style.color = "green";
         message.innerText = "Registration successful! Redirecting to login...";
         setTimeout(() => {
            window.location = "login.html";
         }, 1500);
      } else {
         message.style.color = "red";
         message.innerText = data.message || "Registration failed";
      }
   } catch (err) {
      message.style.color = "red";
      message.innerText = "Server error. Try again.";
   }
}

async function login() {
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const message = document.getElementById("message");

   if (!email || !password) {
      message.innerText = "Please enter email and password";
      return;
   }

   try {
      const res = await fetch(`${API}/auth/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
         localStorage.setItem("token", data.token);
         window.location = "dashboard.html";
      } else {
         message.innerText = data.message || "Login failed";
      }
   } catch (err) {
      message.innerText = "Server error. Try again.";
   }
}

async function loadUser() {
   const token = localStorage.getItem("token");
   if (!token) {
      window.location = "login.html";
      return;
   }

   try {
      const res = await fetch(`${API}/auth/me`, {
         headers: { Authorization: token },
      });

      if (res.status !== 200) {
         localStorage.removeItem("token");
         window.location = "login.html";
         return;
      }

      const user = await res.json();
      document.getElementById("userInfo").innerText = `Name: ${user.name} | Role: ${user.role}`;
   } catch (err) {
      console.error(err);
   }
}

async function loadFavs() {
   const token = localStorage.getItem("token");
   if (!token) return;

   try {
      const res = await fetch(`${API}/favourites`, {
         headers: { Authorization: token },
      });

      const data = await res.json();

      const list = document.getElementById("list");
      list.innerHTML = data
         .map(
            (f) => `
      <li>
        ${f.propertyName} 
        <button onclick="removeFav(${f.id})">Remove</button>
      </li>
    `
         )
         .join("");
   } catch (err) {
      console.error(err);
   }
}

async function addFav() {
   const property = document.getElementById("property").value;
   if (!property) return;

   const token = localStorage.getItem("token");

   try {
      const res = await fetch(`${API}/favourites`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: token,
         },
         body: JSON.stringify({ propertyName: property }),
      });

      if (res.status === 200) {
         document.getElementById("property").value = "";
         loadFavs();
      } else {
         alert("Failed to add property");
      }
   } catch (err) {
      console.error(err);
   }
}

async function removeFav(id) {
   const token = localStorage.getItem("token");

   try {
      await fetch(`${API}/favourites/${id}`, {
         method: "DELETE",
         headers: { Authorization: token },
      });

      loadFavs();
   } catch (err) {
      console.error(err);
   }
}

function logout() {
   localStorage.removeItem("token");
   window.location = "login.html";
}