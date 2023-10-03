export class Api {
  constructor () {
    this._baseUrl = 'http://localhost:3000'
    this._headers = {'Content-Type': 'application/json'}
  }


  getVacancyInfo() {
    return fetch(`${this._baseUrl}/stats/`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  postEmail(data) {
    return fetch(`${this._baseUrl}/form/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        confirm: data.confirm,
      }),
    })
  }
}

