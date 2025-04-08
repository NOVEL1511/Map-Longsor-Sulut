document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi peta dengan fullscreen control
    var map = L.map('map', {
        fullscreenControl: true
    }).setView([1.500016, 124.840478], 8);

    // Tambahkan layer peta dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Tambahkan kontrol pencarian lokasi
    var geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
        var center = e.geocode.center;
        map.setView(center, 13);
    })
    .addTo(map);

    // Fetch data lokasi
    fetch('data/lokasi.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(lokasi => {
                // Tentukan warna berdasarkan risiko
                let warna;
                switch (lokasi.risiko.toLowerCase()) {
                    case 'tinggi':
                        warna = 'red';
                        break;
                    case 'sedang':
                        warna = 'orange';
                        break;
                    case 'rendah':
                        warna = 'green';
                        break;
                    default:
                        warna = 'blue';
                }

                // Tambahkan lingkaran sebagai efek "dikit"
                L.circle([lokasi.lat, lokasi.lng], {
                    color: warna,
                    fillColor: warna,
                    fillOpacity: 0.25,
                    radius: 1000
                }).addTo(map);

                // Tambahkan marker
                var marker = L.marker([lokasi.lat, lokasi.lng]).addTo(map);

                // Isi popup
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
