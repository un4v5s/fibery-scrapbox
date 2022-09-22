# fibery-scrapbox

fibery-scrapbox is a custom integration for [Fibery](https://fibery.io).

fibery-scrapbox get Scrapbox from 2 api endpoints.

1. From `api/pages/:projectname` to get all summarized page information on your project.
2. From `api/pages/:projectname/search/titles` to get all page links information of all pages.

To get all links of pages let you to handle specific links as like attributes or tags of pages.

For example, if you set `#InProgress` link in your all pages you are working on Scrapbox, you can these pages as status on board view in Fibery.
  
<br>

## Installation

Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services.

Get a free API Key at https://example.com
  
### Clone the repo

```bash
git clone https://github.com/un4v5s/fibery-scrapbox.git
```

### Install yarn packages

```bash
yarn install
```

### Deploy and host your project on any PaaS services

Like [DigitalOcean](https://www.digitalocean.com/), [Heroku](https://www.heroku.com/).

### Fibery setting

Go to your Fibery page and open database screen.

Hit `Integrate` button below database title and click the `Add custom app` button.

![integrate button](https://i.gyazo.com/365ae8867654ac0d443f7f840187c236.png])

Fill input with your url of the project, and click `Connect your awesome integration`.

![fill url](https://i.gyazo.com/f1d9c31ed6d99e3e282478030d5679da.png)

Get `connect.sid` from cookie with Chrom Dev Tool.

![get connect.sid](https://i.gyazo.com/6573c95864e549cfa6dc102e1b94291d.png)

Fill `connect.sid`.

![connect.sid](https://i.gyazo.com/8e6d31bb26d6eb77cf06324603aac431.png)

Select Scrapbox projects to connect, click `Sync now`.

![select projects to sync](https://i.gyazo.com/44936945ab309bbd29f19d0666112a9c.png)

Now you get Scrapbox pages on Fibery.

<br>

## Usage

With fibery-scrapbox, you can show Scrapbox pages with links as structured data (or attributes).

<br>

### Calendar view

Show Scrapbox pages as visualized view with created date.

![calendar view](https://i.gyazo.com/7d5f20ce5d748a7ea6d5495dd3fc8f60.png)

<br>

### Board view with status

Set status link on specific pages, catch them as a status from Fibery.

![board view](https://i.gyazo.com/b8f40b8ed97f70c83892b79d4118aff0.png)

Filter setting example.

![filter setting example](https://i.gyazo.com/f6c9f516c3240c39f323ae74e1a11602.png)

<br>

## Contributing

Pull requests are welcome.

<br>

## License

[MIT](https://choosealicense.com/licenses/mit/)

<br>

## Links

Fibery api doc: [Fibery Integrations API Overview](https://api.fibery.io/apps.html#post-api-v1-synchronizer-schema)

Unofficial Scrapbox API doc(Japanese): [Scrapbox REST APIの一覧](https://scrapbox.io/scrapboxlab/Scrapbox_REST_API%E3%81%AE%E4%B8%80%E8%A6%A7)