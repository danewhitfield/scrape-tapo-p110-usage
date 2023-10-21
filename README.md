<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#credits">Credits</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot 2023-10-21 at 19 34 07](https://github.com/danewhitfield/scrape-tapo-p110-usage/assets/80724506/e4b3b6f5-7d65-48c8-943e-91d78b8e3d59)

The Tapo P110 app is a project developed to enhance your smart plug experience by providing access to information about energy usage. With this app, you can autonomously monitor your Tapo P110 smart plugs. 

Here's why I made it:
- **Monitor Energy Usage**: Easily track smart plug's energy consumption and make informed decisions to save on energy costs.
- **Automation**: The server runs a cron-job on the last day of every month at 23:59 - it will grab the energy usage for that month and collate it into the relevant month's sheet tab.

---

### Built With

The Tapo P110 app is built using the following technologies:

- [Node.js](https://nodejs.org/)
- [Google API](https://developers.google.com/)
- [tp-link-tapo-connect](https://github.com/dickydoouk/tp-link-tapo-connect)

---

<!-- GETTING STARTED -->
## Getting Started

To get started with the Tapo P110 app, follow these simple steps:

### Prerequisites

1. Make sure you have the following prerequisites installed:
- [Node.js](https://nodejs.org/)
- `"axios": "^1.5.1"`
- `"dotenv": "^16.3.1"`
- `"google-auth-library": "^9.1.0"`
- `"googleapis": "^128.0.0"`
- `"node-cron": "^3.0.2"`
- `"nodemon": "^3.0.1"`
- `"tp-link-tapo-connect": "^1.0.8"`

2. Create a new [Google Sheet](https://docs.google.com/spreadsheets).
   - You can setup sheet tabs, I have them named as `MONTH_YEAR` like:
      - ![Screenshot 2023-10-21 at 19 39 04](https://github.com/danewhitfield/scrape-tapo-p110-usage/assets/80724506/05051a34-9e8e-437e-bb57-0f65074df0bd)

4. Create a new project in [Google Console](https://console.cloud.google.com/).
   - Enable the Sheets API.
   - Create a Service Account.
     - APIs & Services > Credentials > Create Credentials > Service Account.
     - Follow the steps.
     - Ensure to copy the email address it creates for the service account, go to your sheets project and share the project with that email address to give it editors access.
   - Navigate into the service account you created and go to `Keys`.
     - Add a new key as JSON (save this file somewhere safe we will need it later).
5. You can either
   - Use the JSON file directly by adding it to your project directory and read it using `fs` like
     - ```
       const authorize = async () => {
	        const credentials = JSON.parse(fs.readFileSync('/path/to/file.json')); <<< Change this
	        const authClient = await auth.fromJSON(credentials);
	        authClient.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
	        return authClient;
       };
       ```
    - OR
      - You can create env variables from each key within the JSON file.

### Installation

1. Clone the repository
2. Install dependencies
    ```
    npm install
    ```
3. Configure the app by creating a `.env` file and adding your environment variables.
4. Run the app
    ```
    npm start
    ```

---

### Credits
Shout out to [dickydoouk](https://github.com/dickydoouk/tp-link-tapo-connect) for creating this.
