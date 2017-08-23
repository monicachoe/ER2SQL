import axios from 'axios';

/* ------------   ACTION TYPES     ------------------ */

const UPLOAD_CSV = 'UPLOAD_CSV';


/* ------------   ACTION CREATORS     ------------------ */

const uploadCsv = csvData=> ({type: UPLOAD_CSV, csvData});

/* ------------       REDUCERS     ------------------ */

export default function reducer (state = {}, action){
  switch (action.type){
    case UPLOAD_CSV:
      return action.csvData;
    default:
      return state;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const uploadDataAsCsv = (file, tableName) => dispatch => {
      var reader = new FileReader();
      // Read file into memory as UTF-8
      reader.readAsText(file);
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;

      function loadHandler(event) {
        var csv = event.target.result;
        processData(csv);
        axios.post(`/api/data/upload/${tableName}`, {data: csv} )
        .then(result => {
          console.log(result);
        })
      }

      function processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
          var tarr = [];
          for (var j=0; j<data.length; j++) {
              tarr.push(data[j]);
          }
          lines.push(tarr);
        }
        // console.log(lines); //DO WE NEED THIS?
      }

      function errorHandler(evt) {
        if (evt.target.error.name == "NotReadableError") {
          //alert("Canno't read file !");
          throw Error("Cannot read the file");
        }
      }
}
