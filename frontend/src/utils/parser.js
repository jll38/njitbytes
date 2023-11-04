const fs = require('fs');

// Function to parse a tuple string into an array
function parseTupleString(tupleString) {
  try {
    // Replace Python tuple notation with JSON array notation
    const jsonArrayString = tupleString.replace(/\(/g, '[').replace(/\)/g, ']');
    return JSON.parse(jsonArrayString);
  } catch (error) {
    console.error('Failed to parse tuple string:', error);
    return null;
  }
}

// Read the file and convert it to a JSON object
fs.readFile('dining_hall_data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const jsonObject = parseTupleString(data);
  
  // If you want to work with the JSON object, you can do so here
  console.log(jsonObject);
  
  // If you want to write the JSON object to a file
  fs.writeFile('dining_hall_data.json', JSON.stringify(jsonObject, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing JSON to file:', writeErr);
    } else {
      console.log('JSON data saved to dining_hall_data.json');
    }
  });
});
