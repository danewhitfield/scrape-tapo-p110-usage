const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { auth } = require('google-auth-library');
const fs = require('fs');
const { getDevices } = require('./getDevices');
const {
	getCurrentMonthAndYearTitle,
} = require('./getCurrentMonthAndYearTitle');

require('dotenv').config();

const cron = require('node-cron');

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetTitle = getCurrentMonthAndYearTitle();

const authorize = async () => {
	const credentials = JSON.parse(fs.readFileSync(process.env.CREDS));
	const authClient = await auth.fromJSON(credentials);
	authClient.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
	return authClient;
};

const writeToGoogleSheets = async (data) => {
	const authClient = await authorize();

	const sheetsAPI = google.sheets({ version: 'v4', auth: authClient });

	// Append the data
	const requestData = {
		spreadsheetId,
		range: sheetTitle,
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
		resource: {
			values: data,
		},
	};

	try {
		const response = await sheetsAPI.spreadsheets.values.append(requestData);
		console.log('Data added to Google Sheets:', response.data);

		const readRequest = {
			spreadsheetId,
			range: sheetTitle,
		};
		const readResponse = await sheetsAPI.spreadsheets.values.get(readRequest);
		const values = readResponse.data.values;
	} catch (error) {
		console.error('Error adding or reading data from Google Sheets: ', error);
	}
};

async function runScript() {
	try {
		const deviceData = await getDevices();
		const transformedData = deviceData?.map((device) => [
			device.nickname,
			device.data.today_runtime,
			device.data.month_runtime,
			device.data.today_energy,
			device.data.month_energy,
			device.data.local_time,
		]);

		console.log('Transformed Data:', transformedData);

		const res = await writeToGoogleSheets(
			[
				[
					'Nickname',
					'Today Runtime',
					'Month Runtime',
					'Today Energy',
					'Month Energy',
					'Local Time',
				],
			].concat(transformedData)
		);

		console.log('%cgoogleAuth.js line:57 res', 'color: #26bfa5;', res);
	} catch (error) {
		console.log('%cgoogleAuth.js line:47 error', 'color: #26bfa5;', error);
	}
}

// Schedule the script to run on the last day of every month at 23:59
cron.schedule('59 23 L * *', () => {
	runScript();
});
