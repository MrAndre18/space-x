export default class FetchData {

	startUrl = 'https://api.spacexdata.com/v4/';

	getData = async (url) => {
		const result = await fetch(url);

		if (!result.ok) {
			throw new Error(`Произошла ошибка ${result.status}`);
		}

		return await result.json();
	};

	getRocket = async () =>
		await this.getData(this.startUrl + 'rockets');

	getLaunches = async () =>
		await this.getData(this.startUrl + 'launches/past');

	getCompany = async () =>
		await this.getData(this.startUrl + 'company');

}