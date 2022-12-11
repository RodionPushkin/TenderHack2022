const serverUrl = 'https://hackers54.ru/api/'
// const serverUrl = 'http://localhost/api/'

class api {
    async get(url, headers) {
        return await this.request('get', url, headers)
    }

    async post(url, headers, body) {
        return await this.request('post', url, body, headers)
    }

    async put(url, headers, body) {
        return await this.request('put', url, body, headers)
    }

    async delete(url, headers, body) {
        return await this.request('delete', url, body, headers)
    }

    async upload(url, headers, body) {
        if (!headers) {
            headers = {}
        }
        let data = {
            method: 'post',
            headers: headers,
        }
        if (body) {
            data.body = body
        }
        return await fetch(serverUrl + url, data)
            .then(response => response.json())
            .then((res) => {
                return res
            })
            .catch((err) => {
                return []
            })
    }

    async request(method, url, body, headers) {
        if (!headers) {
            headers = {}
        }
        headers["Content-Type"] = 'application/json'
        headers["Accept"] = 'application/json'
        let data = {
            method: method,
            headers: headers,
        }
        if (body) {
            data.body = JSON.stringify(body)
        }
        return await fetch(serverUrl + url, data)
            .then(response => response.json())
            .then((res) => {
                return res
            })
            .catch((err) => {
                return []
            })
    }
}

export default new api()
