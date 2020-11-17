# Agregator

Agregator is an application to display scientific data from many sources.

## Installation

Besure you have installed [Node](https://nodejs.org/en/ 'Node') and [Angular CLI](https://github.com/angular/angular-cli#installation 'Angular CLI')

After downloading repository run a command `npm install` in repository catalog to install all dependencies.

### Requirements

[Node](https://nodejs.org/en/ 'Node') and [Angular CLI](https://github.com/angular/angular-cli#installation 'Angular CLI')

### Application external dependencies

- Dataverse database ➤ https://dataverse.org/
- GeoNode database ➤ http://geonode.org/
- Grafana database ➤ https://grafana.com/
- Orthanc DICOM server ➤ https://www.orthanc-server.com/

### Application environment variables

- `version` - Version of application
- `language` - Language of application
- `languages` - List of all supported languages
- `api` - adress to communicate with API
- `cms` - adress to communicate with CMS
- `captcha` - Captcha variable
- `siteURL` - URL of site
- `dataverseURL` - URL of Dataverse

### Application installation (local)

`npm install` to install all required dependencies then
`npm start` to run server
Server runs on http://localhost:4200

## Application tests

`npm run test` to run tests

## Deployment

To be continued

## Contribution

The project was performed by Whiteaster sp.z o.o., with register office in Chorzów, Poland - www.whiteaster.com and provided under the GNU GPL v.3 license to the Contracting Entity - Mammal Research Institute Polish Academy of Science in Białowieża, Poland.We are proud to release this project under an Open Source license. If you want to share your comments, impressions or simply contact us, please write to the following e-mail address: info@whiteaster.com
