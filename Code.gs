/**
 * CONFIG
 */
const SHEET_NAME = 'Master Referral Tracking';

/**
 * doGet — handle GET requests (e.g., ?action=load)
 */
function doGet(e) {
  const action = e && e.parameter && e.parameter.action ? e.parameter.action : null;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return createJsonOutput({ ok: false, error: `Sheet "${SHEET_NAME}" not found.` });
  }

  if (action === 'load') {
    const values = sheet.getDataRange().getValues();
    if (values.length <= 1) return createJsonOutput([]);

    const headers = values[0].map(h => String(h).trim());
    const data = values.slice(1).map((row, idx) => {
      const obj = { rowNumber: idx + 2 }; // account for header row
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });
    return createJsonOutput(data);
  }

  return createJsonOutput({ ok: false, error: 'Invalid action for GET.' });
}

/**
 * doPost — only supports update
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return createJsonOutput({ ok: false, error: `Sheet "${SHEET_NAME}" not found.` });
    }

    const payload = JSON.parse(e.postData.contents || "{}");
    const action = e && e.parameter && e.parameter.action ? e.parameter.action : null;

    if (action === 'update') {
      return handleUpdate(sheet, payload);
    }

    return createJsonOutput({ ok: false, error: 'Unknown action.' });

  } catch (err) {
    Logger.log("doPost ERROR: " + err.toString());
    return createJsonOutput({ ok: false, error: err.toString() });
  }
}

/**
 * Update an existing lead
 */
function handleUpdate(sheet, data) {
  if (!data.rowNumber) {
    return createJsonOutput({ ok: false, error: 'rowNumber is required for update.', debug: data });
  }

  const rowNumber = Number(data.rowNumber);
  
  // Validate row number
  if (rowNumber < 2) {
    return createJsonOutput({ ok: false, error: 'Invalid row number.' });
  }

  // Get headers to find column positions dynamically
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headerMap = {};
  headers.forEach((header, index) => {
    if (header) {
      headerMap[String(header).trim()] = index + 1; // Convert to 1-based index
    }
  });

  // Logging for debugging
  Logger.log("Row " + rowNumber + " update request: " + JSON.stringify(data));
  Logger.log("Available headers: " + JSON.stringify(headerMap));

  // Update fields if they exist in the payload
  const fieldsToUpdate = [
    'Visa Status',
    'Individual Reward', 
    'Reward Status',
    'Payment Status',
    'Notes'
  ];

  fieldsToUpdate.forEach(field => {
    if (field in data && headerMap[field]) {
      const colIndex = headerMap[field];
      try {
        sheet.getRange(rowNumber, colIndex).setValue(data[field]);
        Logger.log(`Updated ${field} in column ${colIndex} for row ${rowNumber}`);
      } catch (error) {
        Logger.log(`Error updating ${field}: ${error.toString()}`);
      }
    }
  });

  // Always update Last Updated timestamp
  if (headerMap['Last Updated']) {
    sheet.getRange(rowNumber, headerMap['Last Updated']).setValue(new Date());
  }

  return createJsonOutput({ 
    ok: true, 
    rowNumber, 
    updatedFields: Object.keys(data).filter(key => key !== 'rowNumber'),
    debug: data 
  });
}

/**
 * Helper: return JSON response
 */
function createJsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify sheet structure
 */
function testSheetStructure() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log("Sheet not found");
    return;
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  Logger.log("Sheet headers:");
  headers.forEach((header, index) => {
    Logger.log(`${index + 1}: "${header}"`);
  });
}