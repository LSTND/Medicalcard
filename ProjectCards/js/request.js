// функции для запросов
export default async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.status < 200 || response.status > 299) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response;
    } catch (e) {
        throw new Error(e.message, { cause: e });
    }
}
