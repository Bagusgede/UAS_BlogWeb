let base_url = "https://primdev.alwaysdata.net/api/blog"; // base url dari API

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return JSON.parse(decodeURIComponent(cookie.substring(name.length + 1)));
    }
  }
  return null; // Return null if cookie not found
}

const token = getCookie("token");
const user = getCookie("user");

// format tanggal
function formatTanggal(isoString) {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date(isoString);
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}
// mengambil semua data blog

async function getBlog() {
  // const response = await fetch(base_url+'/author/1');
  // const data = await response.json();
  // return data;

  if (!user || !token) {
    console.error("ID pengguna atau token tidak ditemukan.");
    return []; // Kembalikan array kosong jika tidak ada data
  }

  try {
    const response = await fetch(base_url + "/author/" + user.id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);

    const data = await response.json();
    console.log("Data blog berhasil diambil:", data);
    return data;
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
    return [];
  }
}
// function ambil data berdasarkan slug yang ada di permasing masing id
async function ambilDataBlog(slug) {
  try{
    const response = await fetch(`${base_url}/${slug}`,{
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token.token}`,
        'Content-Type': 'application/json'
    },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      
      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
    

  }

// function CreateBlog
async function createBlog(imageFile,title,content) {
  try{
    const formData = new FormData();
    formData.append("image", imageFile); //tambahkan file gambar
    formData.append("title", title); //tambahkan title
    formData.append("author_id", user.id); //tambahkan id create blog user
    formData.append("content", content); //tambahkan content

    const response = await fetch(base_url + "/store", {
      method: "POST",
      headers:{
        'Authorization': `Bearer ${token.token}`
      },
      body: formData, // kirim data sebagai formData
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data =  await response.json();
    return data;
  }catch (error){
    console.error("Terjadi kesalahan saat membuat blog:", error);
    return error;
  }
}

// function update  Blog
async function updateBlog(imageFile,title,content,idBlog ) { 
  // console.log('base url!!'+ base_url);
  try {
      const formData = new FormData();
      formData.append("image", imageFile); // Tambahkan file gambar
      formData.append("title", title); // Tambahkan judul
      formData.append("_method", "put"); // Tambahkan judul
      formData.append("content", content); // Tambahkan konten
      console.log(formData);
      

      const response = await fetch(`${base_url}/${idBlog}` , {    
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token.token}` 
        },
        body: formData, // Kirim data sebagai FormData
      });
      console.log(response);
      

      if (!response.ok) {
        // const errorText = await response.text();
        // console.error("Server Error:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat blog:", error);
      return error;
    }
}
// function Delete blog berdasarkan id blog
   async function deleteBlog(id){

  try{
    const response = await fetch(`${base_url}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token.token}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        '_method': "delete",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const data = await response.json();
    return data; // Kembalikan data response, misalnya { success: true } jika berhasil
  }catch (error){
      console.error("Gagal menghapus data blog:", error);
      return[];
  }
 }
export { getBlog, formatTanggal,deleteBlog, createBlog, updateBlog, ambilDataBlog };
