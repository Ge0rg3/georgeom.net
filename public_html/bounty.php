<?php require("../includes/header.php") ?>

<h3>Bug Bounty Policy</h3>

<h5>Description</h5>
<p class="bottom-0">As someone who regularly participates in bug bounties, it's only fair that my assets have a policy themselves.</p>
<p>Please feel free to report any bug found under the <code>*.georgeom.net</code> domain (unless stated below) or on my <a href="https://github.com/Ge0rg3/">GitHub profile</a> to <a href="mailto:george@georgeom.net">george@georgeom.net</a>.</p>

<h5>Assets</h5>
<p>All <code>*.georgeom.net</code> domains are valid (unless mentioned further down), but here's a list of my current assets:</p>
<ul>
    <li>georgeom.net</li>
    <li>www.georgeom.net</li>
    <li>admin.georgeom.net</li>
    <li>direct.georgeom.net</li>
    <li>stegonline.georgeom.net</li>
    <li>mobsf.georgeom.net</li>
    <li>old.georgeom.net</li>
    <li>cipher.georgeom.net (<strong>webapp only</strong>, otherwise report to <a href="https://docs.repl.it/misc/security">repl.it</a>)</li>
    <li>gci.georgeom.net (<strong>webapp only</strong>, otherwise report to <a href="https://docs.repl.it/misc/security">repl.it</a>)</li>
    <li>cloud.georgeom.net</li>
    <li>kf2.georgeom.net</li>
</ul>

<h5>Out of Scope</h5>
<p>The following bugs are <strong>out of scope</strong>:</p>
<ul>
    <li>Real server IP discovery. The site is behind cloudflare for DNS, caching and WAF, not for IP masking. Hosts can only be accessed from cloudflare IPs anyway, and <code>direct.georgeom.net</code> simply points to the true server IP.</li>
    <li>Missing best-practice headers on sites (other than <code>georgeom.net</code> and <code>www.georgeom.net)</code>.</li>
    <li>Non-critical issues on <code>cloud.georgeom.net</code> - issues should be reported to <a href="https://nextcloud.com">Nextcloud</a>.</li>
    <li>Any email-related issues on an <code>@georgeom.net</code> email address.</li>
</ul>

<h5>Rewards</h5>
<p>If anything is found that's P3 or above (according to the <a href="https://bugcrowd.com/vulnerability-rating-taxonomy">Bugcrowd VRT</a>), I'll send some stickers your way and list your name on this page.</p>

<br>


<?php require("../includes/footer.php") ?>
