test('The data is example', () => {
    return fetch("http://localhost:8080/api/github/userinfo/yannick-m243").then(res => res.json())
        .then((result) => {
        expect(result.login).toBe("Yannick-M243");
    });
});