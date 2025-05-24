![Keenan is ready][keenan]

[keenan]: https://www.ajc.com/resizer/v2/CQKB45CTSGY5WGEI3OUYAXIQ3U.jpg?auth=9704cf5d867a0bfe3e7709af1ef4f2fe624f94be49894ca901638d549133bf97&width=1600&height=900&smart=true "Keenan is ready"


### Bootstrapping on a local machine
1. First, make sure you have the specified version of `node` installed by running `nodenv install`. If nodenv can't find the version, you may need to upgrade `node-build` by running `brew upgrade node-build`.
2. Set up a postgres database locally
  1. Install postgres if you haven't already. 
    1. On a Mac running homebrew, run `brew install postgresql` and then `brew services start postgresql`
    2. TODO: add other OS
  2. Run `createdb -U {your_postgres_username} {fantasysnl}`.
  3. In the `server/.env` file, set `DATABASE_URL` with this format: `postgresql://{your_postgres_username}:{your_postgres_password}@localhost:5432/fantasysnl`.
3. Generate a JWT token. You can do so by running `openssl rand -base64 32` from the command line.
4. Get the server running. 
  1. From the `server` directory, run `npm install` to set up all package dependencies.
  2. Next, run `npm run dev`. This step will generate any schema migrations and start the server.
  3. You should see `Server running on port 1975` in your terminal (unless you specify a different PORT in `.env`)
5. Get the client running.
  1. From the `client` directory, run `npm install`
  2. Run `npm run dev`
  3. You should be able to navigate to `http://localhost:5173`.
6. Test your setup
  1. Navigate to `http://localhost:5173/register` to create a user. A successful submit will route you to a welcome page
