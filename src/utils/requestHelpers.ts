export const requestGet = (url: string) =>
fetch(url)
    .then((response) => response.json())
    .catch((error) => {
        // TODO: добавить нормальную обработку ошибок
        alert(`SOME PROBLEMS WITH jsonplaceholder`);
    });
