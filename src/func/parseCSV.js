export const parseCSV = (csv) => {
  const lines = csv.match(/(?:\"[^\"]*(?:\"\"[^\"]*)*\"|[^\"\n])*?(?:\n|$)/g);
  const result = [];
  const expectedColumnCount = 8; 

  // Обрізання і очищення заголовків від зайвих пробільних символів та інших небажаних символів
  const headers = lines[0].split(',').map(header => header.trim().replace(/[\r\n]+/g, ''));

  for (let i = 1; i < lines.length; i++) {
    const currentline = parseCSVLine(lines[i], expectedColumnCount);

    if (currentline.length !== expectedColumnCount) continue;

    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      let cellData = currentline[j] || ''; 
        if (cellData.includes('https://drive.google.com')) {
          try {
            const fileId = cellData.split('id=')[1]; // Витягнення ID файлу
            cellData = `https://drive.google.com/uc?export=view&id=${fileId}`; // Створення URL-адреси перегляду
          } catch (error) {
            console.error('Помилка обробки URL-адреси Google Drive:', cellData, error);
          }
        }
  
        obj[headers[j]] = cellData.trim();
      }
  
      result.push(obj);
    }
  
    return result;
  };
  
  // Функція для розбору рядка CSV з урахуванням ком в лапках
  function parseCSVLine(line, expectedColumnCount) {
    const columns = [];
    let columnValue = '';
    let isInsideQuotes = false;
  
    for (let char of line) {
      if (char === '"') {
        isInsideQuotes = !isInsideQuotes;
      } else if (char === ',' && !isInsideQuotes) {
        columns.push(columnValue);
        columnValue = '';
      } else {
        columnValue += char;
      }
    }
  
    if (columnValue) {
      columns.push(columnValue); // Додавання останнього стовпця
    }
  
    // Додавання порожніх значень, якщо в рядку менше стовпців, ніж очікується
    while (columns.length < expectedColumnCount) {
      columns.push('');
    }
  
    return columns;
  };
  