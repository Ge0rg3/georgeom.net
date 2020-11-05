<?php

// Header
require("../includes/header.php");

// Error message
$parse_error = "<strong>An error occurred while loading posts.</strong><br>Please visit <a href='https://medium.com/@georgeomnet'>https://medium.com/@georgeomnet</a> to view.";

// Parse posts.json file
$json_content = file_get_contents("../posts.json");
if ($json_content === false) {
    $json_content = "";
}

// Decode JSON
$posts = json_decode($json_content, true);
if ($posts === null) {
    // Error if file doesn't exist/json cannot be parsed
    echo($parse_error);
    require("../includes/footer.php");
    exit();
}

// Iterate and show posts

foreach($posts as $post) {
    echo '<div class="row">';
    echo "<h5>" . $post["title"] . "</h5>";
    echo "<p><i>" . $post["date"] . "</i></p>";
    echo "<p>" . $post["preview"] . "</p>";
    echo '<p><i><a href="' . $post["link"] . '">Read more...</a></i></p>';
    echo "</div>";
    echo "<hr>";

}

?>

<p><a href="https://medium.com/@georgeomnet">Read the rest over on medium.</a></p>

<?php require("../includes/footer.php") ?>
