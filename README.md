# QuebecStream

A modern, French-language IPTV marketing website built for customers in Québec and Canada.

QuebecStream is a lightweight website for presenting subscription plans, service information, reseller opportunities, blog content, and customer support. It is built with HTML, CSS, JavaScript, and a small PHP contact-form backend.

> **Project status:** Marketing website. This repository does not include IPTV streaming infrastructure, customer accounts, payments, subscription management, or channel management.

## Features

* Responsive IPTV-focused landing page
* French content tailored for Québec and Canada
* Subscription plans and interactive pricing toggle
* Channel and VOD information
* Reseller program landing page
* French-language IPTV blog
* Customer support and contact form
* Legal and policy pages
* SEO and social metadata
* Schema.org structured data
* Mobile navigation and responsive layouts
* Accessibility-oriented markup

## Subscription Plans

The website includes two plan categories: **Essentiel** and **Premium**.

### Essentiel

* 15,000+ channels
* 50K+ VOD content
* HD / FHD quality
* Catch-up and EPG
* Sports and entertainment content
* 24/7 support

### Premium

* 25,000+ channels
* 150K+ VOD content
* 4K / FHD / HD quality
* Up to 5 simultaneous connections
* Catch-up and EPG
* Sports packages
* 24/7 support

> Pricing and service claims are website content and should be verified before production use.

## Main Pages

| Page              | Purpose                     |
| ----------------- | --------------------------- |
| `index.html`      | Main landing page           |
| `pricing.html`    | Subscription plans and FAQ  |
| `channels.html`   | Channel and VOD information |
| `revendeur.html`  | Reseller program            |
| `contact.html`    | Customer support            |
| `conditions.html` | Terms of use                |
| `privacy.html`    | Privacy policy              |
| `refund.html`     | Refund policy               |
| `legal.html`      | Legal notices               |
| `blog/`           | IPTV-related articles       |

## Tech Stack

| Layer        | Technology             |
| ------------ | ---------------------- |
| Frontend     | HTML5                  |
| Styling      | CSS3                   |
| JavaScript   | Vanilla JavaScript     |
| Backend      | PHP                    |
| Contact Form | PHP `mail()`           |
| Icons        | Lucide                 |
| Fonts        | Google Fonts           |
| Images       | PNG / JPG / WebP / SVG |

No framework, database, authentication system, package manager, or build system is required.

## Project Structure

```text
QuebecStream/
├── index.html
├── pricing.html
├── channels.html
├── contact.html
├── revendeur.html
├── conditions.html
├── privacy.html
├── refund.html
├── legal.html
├── nodemailer.php
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
└── blog/
    ├── index.html
    ├── article-template.html
    └── articles/
```

## Running Locally

Clone the repository:

```bash
git clone https://github.com/yassinidyhya/QuebecStream.git
cd QuebecStream
```

For a static preview:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

The contact form requires PHP. For full local functionality:

```bash
php -S localhost:8000
```

## Contact Form

The contact form submits requests asynchronously to `nodemailer.php`.

The PHP handler includes:

* Required-field validation
* Email validation
* Honeypot spam protection
* Basic spam filtering
* IP rate limiting
* POST-only requests
* JSON responses

> Despite its filename, `nodemailer.php` does not use NodeMailer. It uses PHP's native `mail()` function.

## Production Deployment

QuebecStream can be deployed to any hosting environment that supports:

* Static HTML
* CSS
* JavaScript
* PHP

The website can work as a static deployment, but the contact form requires a PHP-capable server.

Before deploying, update:

* Domain and canonical URLs
* Contact information
* Business information
* SEO metadata
* PHP email configuration
* Legal content
* Placeholder branding

## Important

This repository is a **website frontend**, not a complete IPTV platform.

It does not include:

* IPTV streams or media files
* Streaming servers
* Customer accounts
* Authentication
* Payment processing
* Subscription automation
* IPTV credential management
* Channel or VOD databases
* Customer dashboard
* Admin dashboard
* Reseller backend
* Automated billing

The repository provides the website and contact functionality only.

## SEO & Accessibility

The project includes:

* SEO metadata
* Canonical URLs
* Open Graph metadata
* Twitter metadata
* Schema.org structured data
* Sitemap and `robots.txt`
* Semantic HTML
* Skip links
* ARIA attributes
* Keyboard-friendly navigation
* Responsive layouts

## Contributing

Issues, improvements, and pull requests are welcome.

## License

No explicit open-source license is currently provided.

If you plan to reuse, modify, or distribute this project, check the repository's license status first.

## Disclaimer

This repository does not contain television streams, VOD files, channel feeds, IPTV credentials, or streaming infrastructure.

Anyone operating a service based on this website is responsible for ensuring that all content and services offered are properly authorized and comply with applicable laws and regulations.

---

Made for the **QuebecStream** project.
