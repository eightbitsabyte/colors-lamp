# COLORS-LAMP

This project hosts the files for a LAMP-stack web app where users log in and add/search their own colors.

## Built With

- PHP
- Ubunto on DigitalOcean
- Apache
- MySQL
- HTML/CSS/Javascript with AJAX

## Repository structure
```
colors-lamp/
├── api/
│   ├── config.example.php
│   ├── config.php (not commited; you create this)
│   ├── Login.php
│   ├── AddColor.php
│   └── SearchColors.php
├── public/
│   ├── index.html
│   ├── color.html
│   ├── css/
│   ├── images/
│   └── js/
├── .gitignore
├── LICENSE.md
└── README.md
```

## Setup
- Create a LAMP droplet and point a domain at it
- Create the database and tables (`Users`, `Colors`)
- Copy `api/config.example.php` to `api/config.php` and fill in real credentials
- Upload `api/` → `/var/www/html/LAMPAPI/` and `public/` contents → `/var/www/html/`
- Change `urlBase` in `js/code.js` to your own domain 

## Running/accessing it

1. Visit the domain (http://kbcop4331c.xyz)
2. Log in
3. Add colors
4. Search colors

## Limitations
- `userId` comes from the request body in `AddColor.php` and `SearchColors.php`. Anyone could send `"userId": 3` and read or add another user's colors.
- String-built JSON functions need to be rebuilt with `json_encode()` to avoid broken JSON.
- SearchColors' `returnWithError` includes `id`, `firstName`, and `lastName` fields that don't belong to a search response.
- AddColor always reports success (`error: ""`), even if the insert silently fails.
- The frontend throws an error when a search has no matches.
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
