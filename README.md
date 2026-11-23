# COLORS-LAMP

This project hosts the files for a LAMP-stack web app where users log in and add/search their own colors.

## Built With

- PHP
- Ubuntu on DigitalOcean
- Apache
- MySQL
- HTML/CSS/JavaScript with AJAX

## Repository structure
```
colors-lamp/
├── api/
│   ├── config.example.php
│   ├── config.php (not committed; you create this)
│   ├── Login.php
│   ├── AddColor.php
│   └── SearchColors.php
├── public/
│   ├── index.html
│   ├── color.html
│   ├── css/
│   ├── images/
│   └── js/
├── tests/
│   ├── sql/schema.sql
│   ├── unit/code.test.js
│   └── integration/api.test.js
├── .github/workflows/lint.yml
├── docs/uml/
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── .htmlhintrc
├── .stylelintrc.json
├── .gitignore
├── LICENSE.md
└── README.md
```

## Setup
- Create a LAMP droplet and point a domain at it
- Create the database and load the tables from `tests/sql/schema.sql`
- Copy `api/config.example.php` to `api/config.php` and fill in real credentials
- Upload `api/` → `/var/www/html/LAMPAPI/` and `public/` contents → `/var/www/html/`
- Change `urlBase` in `js/code.js` to your own domain 

## Running/accessing it

1. Visit the domain (the original deployment has been taken down; follow Setup to deploy your own copy)
2. Log in
3. Add colors
4. Search colors

## UML Diagrams

PlantUML source files and rendered images are in `docs/uml/`. To re-render after editing a `.puml` file:
`plantuml -tpng docs/uml/<name>.puml`

### Use Case Diagram
![Use case diagram](docs/uml/usecase.png)

### Activity Diagram (Login Flow)
![Activity diagram](docs/uml/activity.png)

### Class Diagram
![Class diagram](docs/uml/class.png)

## Linting (CI)

A GitHub Actions workflow (`.github/workflows/lint.yml`) runs on every push and pull request and checks:
- **HTML**: HTMLHint (`.htmlhintrc`)
- **CSS**: Stylelint with `stylelint-config-standard` (`.stylelintrc.json`)
- **JavaScript**: ESLint recommended rules (`eslint.config.mjs`)

Node.js is used only to install and run the linters, not to run the app. To lint locally:
`npm ci` then `npm run lint`

`md5.js` is excluded because it's a third-party library. The ID selector rule is configured for camelCase because the JavaScript looks up elements by camelCase IDs.

## Testing (CI)

The same workflow (`.github/workflows/lint.yml`, "Lint and Test") runs Jest tests on every push and pull request:
- **Unit tests** (`tests/unit/`) cover the helper functions in `public/js/code.js`: `parseCookie()` and `formatColorList()`.
- **Integration tests** (`tests/integration/`) send real HTTP requests to `Login.php`, `SearchColors.php`, and `AddColor.php` and check the JSON responses.

For integration tests, CI starts a throwaway MySQL database loaded from `tests/sql/schema.sql` (with a test user and colors), writes a CI-only `api/config.php`, and serves the API with PHP's built-in server. Node.js is only used to run Jest, not the app.

Run unit tests locally with `npm run test:unit`. Integration tests need PHP and MySQL, so they run in CI.

## Limitations
- `userId` comes from the request body in `AddColor.php` and `SearchColors.php`. Anyone could send `"userId": 3` and read or add another user's colors.
- String-built JSON functions need to be rebuilt with `json_encode()` to avoid broken JSON.
- SearchColors' `returnWithError` includes `id`, `firstName`, and `lastName` fields that don't belong to a search response.
- AddColor always reports success (`error: ""`), even if the insert silently fails.
- `userId` lives in a plain cookie. Anyone can edit it in dev tools and become another user.
- Passwords go over plain HTTP, unhashed (the `md5` lines are commented out and there's no HTTPS).

## License
- MIT (see LICENSE.md)

## AI Assistance Disclosure
This repository was organized and documented with help from a generative AI tool, per the COP 4331C AI Use Policy.

- **Tool**: Claude Opus 5.5 (Anthropic, accessed via claude.ai)
- **Date**: September 27, 2026
- **Scope**: Git/GitHub workflow for this assignment, reviewing my changes to the lab code before committing, and identifying limitations of the existing code
- **Use**:
  - Suggested a commit breakdown for organizing the lab files into logical stages
  - Walked me through how to implement `.gitignore` and verifying the ignore rule with `git check-ignore`
  - Reviewed my config files and pointed out fixes (removing whitespace before `<?php` and dropping the closing `?>` to avoid "headers already sent" errors)
  - Reviewed `Login.php`, `AddColor.php`, `SearchColors.php`, and `code.js` and helped identify and described the issues listed under the limitations section
  - Explained concepts I asked about, including AJAX, the `.vscode/` folder, and `.DS_Store`

**Example prompts used:**
- "Is this all I need inside my api/config.example.php file?" (followed by my draft)
- "Can you check on my other files before I commit them?" (followed by my AddColor.php and SearchColors.php)
- "Here's my code.js file, I didn't see anything sensitive but I wanted to check with you first:" (followed by my code.js)

 ### Assignment 2: UML Diagrams

- **Tool**: Claude Opus 5.5 (Anthropic, accessed via claude.ai)
- **Date**: November 1, 2026
- **Use**:
  - Drafted the PlantUML source for the use case, activity, and class diagrams based on the code in this repository
  - Explained PlantUML setup and rendering
- **Verification**: I checked each diagram against the actual code and the live app, and confirmed the database schema by running `DESCRIBE` on the production database (which showed that `Colors.UserID` has no foreign key constraint).

**Example prompts used:**
- “Turn this database schema into a UML class diagram.”
- "Does this look correct so far?" (with my `usecase.puml`)

### Assignment 4: Linting with GitHub Actions

- **Tool**: Claude Opus 5.5 (Anthropic, accessed via claude.ai)
- **Date**: November 8, 2026
- **Use**:
  - Provided the GitHub Actions workflow (`lint.yml`) and the linter configuration files (`eslint.config.mjs`, `.stylelintrc.json`, `.htmlhintrc`)
  - Explained the lint errors from my local runs and suggested fixes: adding doctypes, configuring the ID selector rule for camelCase, the `/* exported */` comment for functions called from HTML, and fixing a duplicate key in `addColor()`
  - Helped resolve a push error caused by my access token missing the `workflow` scope
- **Verification**: I ran all three linters locally before pushing, renamed the one kebab-case ID (`inner-title` → `innerTitle`) to match the rest of the project, and confirmed the final run passes in the Actions tab.

**Example prompts used:**
- "Is this correct?" (with my `git add` command for the config files)
- My pasted output from `npm run lint:html`, `lint:css`, and `lint:js`, asking for help fixing the errors

### Assignment 5: Automated Testing with GitHub Actions

- **Tool**: Claude Opus 5.5 (Anthropic, accessed via claude.ai)
- **Date**: November 22, 2026
- **Use**:
  - Suggested the testing approach: extracting pure helper functions from `code.js` for unit tests, and running PHP and MySQL inside CI for integration tests after my droplet was taken down
  - Provided the test files, test database schema, updated workflow, and refactored `code.js`
  - Helped debug CI failures (tests running before the helper functions were committed, and the `formatColorList` crash on missing results)
- **Verification**: I reviewed the `code.js` diff to confirm only the intended changes, confirmed the failing test caught the no-results bug before fixing it, and confirmed the final run passes in the Actions tab.

**Example prompts used:**
- "I no longer have access to the domain and the droplet, can you help me modify our testing method?"
- "How can I implement a guard to formatColorList in code.js?"
