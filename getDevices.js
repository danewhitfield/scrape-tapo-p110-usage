const {
	cloudLogin,
	listDevicesByType,
	getEnergyUsage,
	loginDevice,
	getDeviceInfo,
} = require('tp-link-tapo-connect');

require('dotenv').config();

const email = process.env.TP_LINK_ID;
const password = process.env.TP_LINK_PASSWORD;

exports.getDevices = async () => {
	try {
		const cloudToken = await cloudLogin(email, password);

		const devices = await listDevicesByType(cloudToken, 'SMART.TAPOPLUG');

		const deviceData = [];

		for (const device of devices) {
			const deviceToken = await loginDevice(email, password, device);

			const getDeviceInfoResponse = await getEnergyUsage(deviceToken);

			const deviceInfo = await getDeviceInfo(deviceToken);

			deviceData.push({
				nickname: deviceInfo.nickname,
				data: getDeviceInfoResponse,
			});
		}

		return deviceData;
	} catch (error) {
		console.error('Error:', error);
	}
};
