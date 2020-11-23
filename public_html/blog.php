<?php require("../includes/header.php") ?>

<!--
<div class="row u-text-center">
<div class="four columns">
        <label for="category-select"><strong>Category</strong></label>
        <select id="category-select">
            <option value="All">All</option>
            <option value="HTB">Hack the Box</option>
            <option value="Bug Bounty">Bug Bounty</option>
        </select>
    </div>
    <div class="four columns">
        <label for="year-select"><strong>Year</strong></label>
        <select id="year-select">
            <option value="All">All</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
        </select>
    </div>
    <div class="four columns">
        <label for="source-select"><strong>Source</strong></label>
        <select id="source-select">
            <option value="All">All</option>
            <option value="georgeom.net">This Site</option>
            <option value="Medium">Medium</option>
        </select>
    </div>
</div>
<br>
-->

<?php
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
    echo "<hr style='width: 100%''>";

}

?>

<p><a href="https://medium.com/@georgeomnet">Read the rest over on medium.</a></p>

<?php require("../includes/footer.php") ?>
