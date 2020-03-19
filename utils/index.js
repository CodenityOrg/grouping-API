module.exports = {
    async tryCatch(fn) {
        let result;
        let error;

        try {
            result = await fn();
        } catch (e) {
            error = e;
        }

        return [result, error];
    }
}