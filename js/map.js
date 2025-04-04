document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi peta menggunakan Leaflet.js
    var map = L.map('map').setView([-1.5, 124.5], 7); // Koordinat pusat Sulawesi Utara
    
    // Tambahkan layer peta dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Ambil data lokasi dari lokasi.json
    fetch('data/lokasi.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(lokasi => {
                var marker = L.marker([lokasi.lat, lokasi.lng]).addTo(map);
                
                var popupContent = `
                    <div style="text-align: center;">
                        <img src="${lokasi.gambar}" alt="${lokasi.nama}" width="150" height="100" style="border-radius: 5px;"><br>
                        <strong>${lokasi.nama}</strong><br>
                        Risiko: ${lokasi.risiko}<br><br>
                        <a href="${lokasi.googleMapsLink}" target="_blank" style="display: inline-block; padding: 5px 10px; background: #007BFF; color: #fff; text-decoration: none; border-radius: 3px;">Buka di Google Maps</a>
                        <br><br>
                        <a href="detail.html?id=${lokasi.id}" style="display: inline-block; padding: 5px 10px; background: #28A745; color: #fff; text-decoration: none; border-radius: 3px;">Detail Tempat</a>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
            });
        })
        .catch(error => console.error('Error fetching lokasi.json:', error));
});