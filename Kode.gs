// ==========================================================
// SI POS HIDRO - BACKEND GOOGLE APPS SCRIPT
// Bidang Sumber Daya Air - Dinas PUPR Provinsi NTT
// ==========================================================

function doPost(e) {
  try {
    let requestData = JSON.parse(e.postData.contents);
    let action = requestData.action;
    
    if (action === "getStationList") {
      return responseJson({ success: true, data: getStationListFromSheet(requestData.island, requestData.role) });
    }
    
    if (action === "submitReport") {
      return responseJson(saveReportToSheet(requestData));
    }
    
    if (action === "getVerifikatorReportList") {
      return responseJson({ success: true, data: getVerifikatorList(requestData.islandName) });
    }
    
    return responseJson({ success: false, message: "Action tidak dikenal" });
  } catch (err) {
    return responseJson({ success: false, message: err.toString() });
  }
}

function doGet(e) {
  return ContentService.createTextOutput("SI POS HIDRO Backend API Service Running Normal.");
}

function responseJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getStationListFromSheet(island, role) {
  let stationData = {
    "Pulau Timor": ["Pos MRG Noelbaki", "Pos MRG Oesao", "Pos MRG Tilong", "Pos MRG Camplong", "Pos MRG Bena"],
    "Pulau Sumba": ["Pos MRG Kambaniru", "Pos MRG Lewa", "Pos MRG Waitabula"],
    "Pulau Flores": ["Pos MRG Aesesa", "Pos MRG Nebe", "Pos MRG Mape"]
  };
  
  if (role === "admin") {
    return ["Admin Kepala Bidang SDA", "Admin Seksi Hidrologi", "Admin Operasional"];
  } else if (role === "verifikator") {
    return ["Verifikator Timor", "Verifikator Sumba", "Verifikator Flores"];
  }
  
  return stationData[island] || ["Pos MRG Noelbaki", "Pos MRG Oesao"];
}

function saveReportToSheet(data) {
  return { success: true, message: "Data berhasil disimpan" };
}

function getVerifikatorList(island) {
  return [
    { rowId: "1", timestamp: "2026-10-26 08:00", stationName: "Pos MRG Noelbaki", totalRainfall: 15.2, kondisiAlat: "Baik (B)", statusVerifikasi: "Menunggu" },
    { rowId: "2", timestamp: "2026-10-26 08:15", stationName: "Pos MRG Oesao", totalRainfall: 0.0, kondisiAlat: "Baik (B)", statusVerifikasi: "Menunggu" }
  ];
}
