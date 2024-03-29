<!DOCTYPE html>
<!--
 ________________________________________
/ If you're looking for the source code, \
| go to:                                 |
| https://github.com/Ge0rg3/georgeom.net |
\ :)                                     /
 ----------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
-->
<html>

    <head>
        <title>georgeom.net</title>
        <meta name="description" content="A cybersecurity research and competition blog by George Omnet. Contains CTF write-ups, bug bounty writeups and independent research.">
        <meta name="author" content="George Omnet">
        <meta name="keywords" content="George Omnet, georgeomnet, Cybersecurity, CTF Writeup, Bug Bounty">
        <link rel="stylesheet" href="assets/third-parties/normalize.css">
        <link rel="stylesheet" href="assets/third-parties/skeleton.css">
        <link rel="stylesheet" href="assets/third-parties/dark-skeleton.css">
        <link rel="stylesheet" href="assets/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">        
        <meta name="google-site-verification" content="7GT6boD82vaGq30OJUVrLAufphRmk5bGQjGkPzg8H6c" />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QLW6MQ2S6Z"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QLW6MQ2S6Z');
        </script>
        <?php
            // Pizza if asked for
            if (isset($_GET["pizza"]) && $_GET["pizza"] === "time") {
                echo '<link rel="stylesheet" href="assets/pizza.css">';
            }
        ?>
    </head>

    <body>
        <div id="page-contianer" class="container">
            
            <!-- Header -->
            <div id="header" class="row">
                <div class="u-text-center">
                    <h1>georgeom.net</h1>
                </div>
            </div>

            <!-- Links -->
            <div id="navbar-spacer">&nbsp;</div>
            <div id="navbar" class="row u-text-center">
                <div id="navbar-container" class="container">
                    <div class="three columns">
                        <a href="index.php">Home</a>
                    </div>
                    <div class="three columns">
                        <a href="blog.php" class="selected">Blog</a>
                    </div>
                    <div class="three columns">
                        <a href="projects.php">Projects</a>
                    </div>
                    <div class="three columns">
                        <a id="swap-theme-button"></a>
                    </div>
                </div>
                <hr>
            </div>
