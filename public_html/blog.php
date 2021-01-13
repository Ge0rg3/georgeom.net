<?php

require("../includes/header.php");

// Login to DB
/*
$db_host = getenv("SQL_HOST", "localhost");
$db_username = getenv("SQL_USER");
$db_password = getenv("SQL_PASSWORD");
$db_name = getenv("SQL_DBNAME");

$dbconnect = mysqli_connect($db_host, $db_username, $db_password, $db_name);


if ($dbconnect->connect_error) {
    echo "rip";
    die("Failed to connect to DB.");
}

// Get query parameters and their defaults
$category = $_GET["category"] ?? "all";
$year = $_GET["year"] ?? "all";
$source = $_GET["source"] ?? "all";
*/

?>


<!--
<div class="row u-text-center">
    <div class="four columns">
        <label for="category-select"><strong>Category</strong></label>
        <select id="category-select">
            <option value="all">All</option>
            <option value="HTB">Hack the Box</option>
            <option value="Bug Bounty">Bug Bounty</option>
        </select>
    </div>
    <div class="four columns">
        <label for="year-select"><strong>Year</strong></label>
        <select id="year-select">
            <option value="all">All</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
        </select>
    </div>
    <div class="four columns">
        <label for="source-select"><strong>Source</strong></label>
        <select id="source-select">
            <option value="all">All</option>
            <option value="georgeom.net">This Site</option>
            <option value="Medium">Medium</option>
        </select>
    </div>
</div>
<br>
-->

<script>
let selects = Array.from(document.getElementsByTagName("select"));

selects.forEach((select) => {
    select.addEventListener("change", function (evt) {
        // Get the URL parameter based off select type
        let query_parameter;
        switch (evt.currentTarget.id) {
            case "category-select":
                query_parameter = "category";
                break;
            case "year-select":
                query_parameter = "year";
                break;
            case "source-select":
                query_parameter = "source";
                break;
            default:
                return;
        }
        // Replace existing query string with new one
        let current_params = new URLSearchParams(location.search);
        current_params.set(query_parameter, evt.currentTarget.value);
        let query_string = current_params.toString();
        // Reload page with new string
        location.href = location.pathname + "?" + query_string;
    })
})

</script>


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
