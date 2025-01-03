// Fungsi untuk memanggil API GET

let base_url = "https://primdev.alwaysdata.net/api";


// Fungsi untuk memanggil API POST

async function loggedUser(token) { 
  // console.log('base url!!'+ base_url);
  
  const response = await fetch(base_url+'/user', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  });

  const data = await response.json();

  return data;
}

// Fungsi untuk memanggil API POST
async function login(email, password) {
  // console.log('base url!!'+ base_url);

  const response = await fetch(base_url + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
}
// Fungsi untuk register API POST
async function register(name,email,password,confirmPassword) { 
  // console.log('base url!!'+ base_url);
  
  const response = await fetch(base_url+'/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          'name' : name,
          'email':email,
          'password' : password, 
          'confirm_password' : confirmPassword 
      }),
  });

  const data = await response.json();
  return data;
}

// Ekspor fungsi untuk digunakan di file HTML
export { login, register, loggedUser };
