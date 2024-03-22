# Setup

The project is structured as follows:
  - root
    - components
    - pages
    - services
      - api


## Running Locally
- Alterar REACT_APP_API_URL no .env para usar a url da api
```sh
REACT_APP_API_URL={API_URL}
```
- npm install
- Rodar api local

## Production
- Instalar serve package
- Alterar .env para apontar para a URL da API
`npm install -g serve`
- Run `npm run build`
- Run `serve -s build`

