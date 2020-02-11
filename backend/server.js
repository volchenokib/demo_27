let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());

let server = app.listen(8081, () => {
	console.log('Server is started on 127.0.0.1:8081');
});

app.get('/downloadFile/', (req, res) => {
	res.download('./file_example_XLSX_5000.xlsx');
});
