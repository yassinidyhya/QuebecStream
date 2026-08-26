<?php
/**
 * Contact Form Handler
 * ====================
 *
 * Generic PHP mailer for static websites.
 * Update the CONFIG section below before deploying.
 */

// ====================
// CONFIG
// ====================
define('SITE_DOMAIN', 'example.com');              // Your domain, no protocol
define('RECIPIENT_EMAIL', 'contact@example.com');  // Where messages are sent
define('FROM_EMAIL', 'noreply@example.com');       // Sender address
define('RATE_LIMIT', 5);                           // Max submissions per IP per hour

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://' . SITE_DOMAIN);
header('Access-Control-Allow-Methods: POST');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// 1. Honeypot check (anti-spam)
if (!empty($_POST['website'])) {
    http_response_code(200); // Silent fail for bots
    echo json_encode(['success' => true]);
    exit;
}

// 2. Simple Speed Check (Requires JS to set a token or hidden field)
// For now, we sanitize first.
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// 3. Keyword Filtering (Anti-Spam)
$spam_keywords = [
    'crypto',
    'bitcoin',
    'viagra',
    'pills',
    'casino',
    'casino',
    'dating',
    'lottery',
    'inheritance',
    'make money',
    'work from home',
    'seo service'
];
$content = strtolower($name . ' ' . $message);
foreach ($spam_keywords as $keyword) {
    if (strpos($content, $keyword) !== false) {
        http_response_code(200); // Pretend success
        echo json_encode(['success' => true]);
        exit;
    }
}

// 4. Link Density Check (Spam often has many links)
if (preg_match_all('/http|https|www/i', $message) > 2) {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// 5. Referer Check (Prevent direct API access from other sites, though Headers handle CORS, this is a backup)
if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], SITE_DOMAIN) === false) {
    // Check if localhost for testing
    if (strpos($_SERVER['HTTP_HOST'], 'localhost') === false && strpos($_SERVER['HTTP_HOST'], '127.0.0.1') === false) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Unauthorized source']);
        exit;
    }
}

// 6. Rate Limiting (File-based)
$ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_dir = sys_get_temp_dir(); // Use system temp dir
$rate_limit_file = $rate_limit_dir . '/qs_rate_' . md5($ip) . '.txt';
$limit = RATE_LIMIT; // emails
$window = 3600; // 1 hour

if (file_exists($rate_limit_file)) {
    $data = json_decode(file_get_contents($rate_limit_file), true);
    // Cleanup old data
    if ($data['start_time'] < time() - $window) {
        $data = ['start_time' => time(), 'count' => 0];
    }

    if ($data['count'] >= $limit) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Trop de tentatives. Veuillez réessayer plus tard.']);
        exit;
    }

    $data['count']++;
    file_put_contents($rate_limit_file, json_encode($data));
} else {
    file_put_contents($rate_limit_file, json_encode(['start_time' => time(), 'count' => 1]));
}

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs requis.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// Email configuration
$to = RECIPIENT_EMAIL;
$subjectLine = '[Contact Form] ' . ($subject ?: 'New message');

// Email body
$body = "
New message from the contact form on " . SITE_DOMAIN . "

======================
Contact information
======================

Name: $name
Email: $email
Subject: " . ($subject ?: 'Not specified') . "

======================
Message
======================

$message

======================
Technical information
======================

IP: {$_SERVER['REMOTE_ADDR']}
Date: " . date('Y-m-d H:i:s') . "
";

$headers = [
    'From' => FROM_EMAIL,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$sent = mail($to, $subjectLine, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi.']);
}
