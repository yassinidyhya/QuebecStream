# QuebecStream

A French-Canadian IPTV subscription website built as a lightweight static website with HTML, CSS, JavaScript, and a small PHP contact-form backend.

The project is designed for an IPTV service targeting customers in Québec and Canada. It provides a marketing website, subscription plans, channel information, reseller information, a blog, contact/support functionality, and legal pages.

> **Project status:** Static marketing website with PHP contact handling. The repository does not contain an IPTV streaming server, channel-management backend, authentication system, customer dashboard, payment-processing integration, or subscription-management system.

## Features

### Marketing Website

- Responsive IPTV-focused landing page
- Québec/Canada-focused French content
- Hero section with primary calls to action
- IPTV service benefits and selling points
- Movies, sports, series, documentary, kids, and lifestyle categories
- Service guarantees and support messaging
- Responsive navigation with mobile menu
- SEO-oriented metadata
- Open Graph metadata
- Structured data using Schema.org
- Canonical URLs
- Accessibility-oriented markup and skip links

### Subscription Plans

The website contains two subscription categories:

#### Essentiel

- 1 month — `$14.99`
- 3 months — `$24.99`
- 6 months — `$44.99`
- 12 months — `$59.99`

The Essentiel plans advertise:

- 15,000+ channels
- 50K+ VOD content
- HD/FHD quality
- Catch-up
- EPG
- Sports packages
- Multi-category content
- 24/7 support

#### Premium

- 1 month — `$24.99`
- 3 months — `$39.99`
- 6 months — `$59.99`
- 12 months — `$79.99`

The Premium plans advertise:

- 25,000+ channels
- 150K+ VOD content
- 4K/FHD/HD quality
- Up to 5 simultaneous connections
- Catch-up
- EPG
- Sports packages
- 24/7 support

The pricing page includes an interactive Essentiel/Premium toggle and FAQ accordion.

> Pricing and service claims are website content and should be verified before being presented as actual commercial commitments.

## Main Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Main IPTV landing page |
| `pricing.html` | Subscription plans and FAQ |
| `channels.html` | Channel/VOD information |
| `revendeur.html` | IPTV reseller program |
| `contact.html` | Customer contact/support form |
| `conditions.html` | Terms of use |
| `privacy.html` | Privacy policy |
| `refund.html` | Refund policy |
| `legal.html` | Legal notices |
| `blog/index.html` | Blog homepage |

## Reseller Program

`revendeur.html` provides a dedicated reseller-oriented landing page.

The page explains a credit-based reseller model:

- Resellers purchase credits at wholesale pricing.
- Customers are sold subscriptions at the reseller's own price.
- Credits are deducted when subscriptions are created.
- Reseller profit is the difference between the retail price and wholesale credit cost.
- Credit durations are mapped as:
  - 1 month = 1 credit
  - 3 months = 3 credits
  - 6 months = 6 credits
  - 12 months = 12 credits

Wholesale pricing is intentionally not displayed publicly and prospects are directed to the contact page.

## Channel Page

`channels.html` presents the service as providing channels from multiple regions, including:

- Canada
- United States
- France
- United Kingdom
- Asia
- Africa

The actual channel list is not stored in the repository. Visitors are instructed to contact the service for the current channel/VOD list.

## Blog

The project includes a dedicated French-language IPTV blog.

Current articles cover topics including:

1. Fire Stick and IPTV
2. IPTV box comparisons
3. Fire TV Stick channels
4. Installing IPTV on Smart TVs
5. IPTV applications for iOS
6. Internet plans for IPTV in Québec
7. Family movies on IPTV
8. IPTV buffering troubleshooting
9. Free IPTV decoder/channel claims
10. Cheap TV + Internet plans in Québec

The blog also includes a reusable `article-template.html`.

## Contact System

The contact page contains a customer-support form with:

- Full name
- Email address
- Request subject
- Message
- Hidden honeypot field for bot detection

Available request categories include:

- General question
- Technical support
- Billing / renewal
- 24-hour trial request
- Reseller application

The form submits to `nodemailer.php` using `POST`.

### PHP Contact Handler

Despite the filename `nodemailer.php`, the implementation does not use NodeMailer.

It is a native PHP mail handler using PHP's `mail()` function.

The handler provides:

- POST-only requests
- Honeypot anti-spam protection
- Email validation
- Required-field validation
- Spam keyword filtering
- Link-density filtering
- Referer validation
- File-based IP rate limiting
- JSON responses
- Reply-To header using the customer's email
- Basic technical information in the email

The current default rate limit is 5 submissions per IP per hour.

## Frontend Architecture

QuebecStream does not use a JavaScript framework or build system.

The frontend consists of:

- HTML5
- CSS3
- Vanilla JavaScript
- PHP
- SVG/WebP/PNG/JPG assets

There is no `package.json`, npm dependency tree, Node.js application, React application, Next.js application, or database layer in the repository.

### External Frontend Dependencies

The website loads:

- Google Fonts
  - Outfit
  - Manrope
- Lucide Icons through the Unpkg CDN

Example:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

## JavaScript Modules

JavaScript functionality is separated into four modules.

### `assets/js/main.js`

Main frontend entry point.

Responsibilities:

- Initialize Lucide icons
- Set the current footer year
- Detect the active navigation link
- Initialize FAQ accordions

### `assets/js/navigation.js`

Navigation functionality.

Responsibilities:

- Header scroll state
- Mobile navigation
- Mobile overlay
- Mobile menu open/close
- Escape-key handling
- Mobile navigation link handling

### `assets/js/animations.js`

Provides lightweight frontend animation utilities.

Responsibilities:

- Smooth scrolling
- Anchor-link handling

### `assets/js/forms.js`

Handles client-side form behavior.

Responsibilities:

- Required-field validation
- Email validation
- User-interaction detection
- Submission loading state
- AJAX form submission
- Success/error handling
- Form error messages
- Anti-bot interaction check

The browser submits the form asynchronously with `fetch()` and expects a JSON response from the PHP endpoint.

## CSS Architecture

The main stylesheet is:

```text
assets/css/main.css
```

It imports the project's CSS modules in a defined order:

```text
reset.css
variables.css
global.css
layout.css
components.css
navigation.css
animations.css
utilities.css
sections.css
status.css
responsive.css
```

Additional specialized stylesheets include:

```text
blog.css
legal.css
revendeur.css
```

This keeps the global design system separated from page-specific and component-specific styles.

## Project Structure

```text
QuebecStream/
│
├── index.html
├── pricing.html
├── channels.html
├── contact.html
├── revendeur.html
│
├── conditions.html
├── privacy.html
├── refund.html
├── legal.html
│
├── nodemailer.php
├── README.md
├── 404.html
├── .gitignore
├── robots.txt
└── sitemap.xml
│
├── assets/
│   ├── css/
│   │   ├── animations.css
│   │   ├── blog.css
│   │   ├── components.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── legal.css
│   │   ├── main.css
│   │   ├── navigation.css
│   │   ├── reset.css
│   │   ├── responsive.css
│   │   ├── revendeur.css
│   │   ├── sections.css
│   │   ├── status.css
│   │   ├── utilities.css
│   │   └── variables.css
│   │
│   ├── js/
│   │   ├── animations.js
│   │   ├── forms.js
│   │   ├── main.js
│   │   └── navigation.js
│   │
│   └── images/
│       ├── logos
│       ├── icons
│       ├── promotional images
│       ├── category images
│       ├── pricing images
│       └── blog images
│
└── blog/
    ├── index.html
    ├── article-template.html
    ├── fire-stick-iptv.html
    ├── quel-boitier-iptv-2026.html
    ├── fire-tv-stick-chaines.html
    ├── installer-iptv-smart-tv.html
    ├── meilleure-app-iptv-ios.html
    ├── forfait-internet-iptv-quebec.html
    ├── films-famille-iptv-2026.html
    ├── iptv-bloque-solutions.html
    ├── decodeur-iptv-chaines-gratuites.html
    ├── forfait-tv-internet-pas-cher.html
    └── images/
```

## Running Locally

Because this is primarily a static website, the HTML portion can be previewed with any static web server.

For example:

```bash
git clone https://github.com/yassinidyhya/QuebecStream.git
cd QuebecStream
```

For a static-only preview:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

However, the contact form requires PHP because `nodemailer.php` is executed server-side.

For local development with PHP:

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

## Production Deployment

The website can be deployed to any hosting environment capable of serving:

- Static HTML
- CSS
- JavaScript
- Images
- PHP

A traditional PHP hosting environment is required if the contact form is expected to function.

If deployed as a purely static site, all pages except the PHP contact endpoint will still work, but the contact form backend will not execute.

## Configuration Before Deployment

The current repository contains placeholder production values.

Before deploying, update the following.

### Branding

Replace:

```text
VotreSite
VotreSite.ca
Votre Entreprise
Votre Ville
```

with the actual business identity.

### Domain

Replace:

```text
https://example.com
```

with the actual production domain.

This appears in:

- Canonical URLs
- Open Graph metadata
- Twitter metadata
- Schema.org structured data
- PHP CORS configuration
- PHP referer validation

### Contact Information

Replace:

```text
contact@example.com
+1 (000) 000-0000
```

with the actual support contact information.

### PHP Configuration

Inside `nodemailer.php`, update:

```php
define('SITE_DOMAIN', 'example.com');
define('RECIPIENT_EMAIL', 'contact@example.com');
define('FROM_EMAIL', 'noreply@example.com');
```

These values are currently placeholders.

## Important Production Considerations

This repository is currently a marketing website rather than a complete SaaS or IPTV management platform.

It does not contain:

- User accounts
- Customer authentication
- Customer dashboard
- Subscription database
- Payment gateway integration
- Automated subscription activation
- IPTV credentials management
- Channel database
- VOD database
- Reseller dashboard
- Reseller authentication
- Credit management backend
- Admin dashboard
- Server-side API
- Webhooks
- Automated billing
- Customer database

The pricing buttons currently lead to the contact page rather than an automated checkout flow.

## SEO

The website has a relatively extensive SEO foundation for a static site.

Implemented elements include:

- Page titles
- Meta descriptions
- Meta keywords
- Robots directives
- Canonical URLs
- Open Graph metadata
- Twitter metadata
- Schema.org structured data
- French-Canadian language declaration
- Semantic HTML
- Sitemap
- `robots.txt`

The homepage uses French Canadian locale metadata (`fr_CA`) and targets IPTV-related Québec/Canada search queries.

## Accessibility

The frontend includes several accessibility-oriented features:

- Semantic `<header>`, `<nav>`, `<main>`, and `<footer>` elements
- ARIA labels
- `aria-expanded` on interactive navigation elements
- Keyboard Escape handling for the mobile menu
- Skip-to-content links
- Form labels
- Image `alt` attributes
- Responsive layouts
- Keyboard-friendly accordion controls

## Legal Pages

The website includes dedicated pages for:

- Terms of Use
- Privacy Policy
- Refund Policy
- Legal Notices

The terms describe private/domestic usage restrictions, account-sharing restrictions, recording/redistribution restrictions, commercial-use requirements, payment terms, suspension, and Québec jurisdiction.

The privacy page describes collection of account, transaction, technical, and support information and references Québec privacy legislation.

The refund page describes a 7-day satisfaction guarantee with eligibility conditions and several non-refundable situations.

> **Legal notice:** The legal pages currently contain placeholder business identity and contact information and should be reviewed by an appropriate legal professional before production use.

## Content and Compliance

The website makes claims regarding IPTV channels, VOD libraries, sports packages, and third-party entertainment services.

The operator of the deployed service is responsible for ensuring that all content offered or referenced is properly licensed and that the service complies with applicable copyright, broadcasting, consumer-protection, privacy, tax, and other laws in every jurisdiction where it operates.

This repository itself does not contain the underlying media streams or channel infrastructure.

## Design

The website uses a dark, modern streaming-oriented visual system with:

- Dark backgrounds
- Gradient typography
- Card-based layouts
- Responsive grids
- Large promotional sections
- CTA-focused navigation
- Lucide icons
- Responsive mobile navigation
- WebP image optimization
- Lazy-loaded images
- Separate desktop/mobile layouts

The design system is centralized through CSS variables and reusable components.

## Browser Support

The project uses standard HTML5, CSS3, and modern JavaScript APIs such as:

- `fetch`
- `FormData`
- `classList`
- `querySelector`
- `IntersectionObserver-compatible browser patterns`
- `scrollIntoView`

Modern desktop and mobile browsers are expected to provide the best experience.

## Deployment Checklist

Before going live:

- [ ] Replace `VotreSite` with the real brand
- [ ] Replace `example.com` with the production domain
- [ ] Replace placeholder email addresses
- [ ] Replace placeholder phone numbers
- [ ] Replace placeholder business/legal information
- [ ] Configure `nodemailer.php`
- [ ] Verify PHP `mail()` functionality
- [ ] Configure a proper production mail delivery system if `mail()` is unreliable
- [ ] Verify CORS configuration
- [ ] Verify contact-form rate limiting
- [ ] Test the contact form
- [ ] Test mobile navigation
- [ ] Test all internal links
- [ ] Test all blog articles
- [ ] Verify canonical URLs
- [ ] Verify sitemap
- [ ] Verify `robots.txt`
- [ ] Verify Open Graph metadata
- [ ] Verify structured data
- [ ] Compress/optimize production images
- [ ] Enable HTTPS
- [ ] Review all legal pages
- [ ] Verify that all advertised IPTV content is properly authorized/licensed
- [ ] Remove unused placeholder content
- [ ] Test the website on mobile, tablet, and desktop

## Technology Summary

| Layer | Technology |
| --- | --- |
| Frontend | HTML5 |
| Styling | CSS3 |
| Client-side logic | Vanilla JavaScript |
| Backend | PHP |
| Email | PHP `mail()` |
| Icons | Lucide |
| Fonts | Google Fonts |
| Images | PNG / JPG / WebP / SVG |
| Database | None |
| Authentication | None |
| Payments | None |
| Build system | None |
| Package manager | None |
| Framework | None |
| API | None |

## Repository

GitHub:

https://github.com/yassinidyhya/QuebecStream

## License

No explicit open-source license is currently provided in the repository.

Unless a license is added, the code should not be assumed to be freely reusable, modified, or redistributed.

## Disclaimer

QuebecStream is a website project intended to provide a web interface for an IPTV-related commercial service.

The repository does not include television streams, VOD files, IPTV credentials, channel feeds, or streaming infrastructure.

Users and operators are responsible for complying with all applicable laws and ensuring that any media or services distributed through a deployment of this project are properly authorized.

---
Made for the QuebecStream project.