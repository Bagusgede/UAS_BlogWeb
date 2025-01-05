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
export { getBlog, formatTanggal,deleteBlog };
