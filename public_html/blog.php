<?php require("../includes/header.php"); ?>

<div id="blog-filter" class="row u-text-center">
    <div class="four columns">
        <label for="category-select"><strong>Category</strong></label>
        <select id="category-select">
            <option value="">All</option>
            <option value="HTB">Hack the Box</option>
            <option value="BOUNTY">Bug Bounty</option>
            <option value="TOOL">Tools</option>
            <option value="CTF">CTFs and Challenges</option>
        </select>
    </div>
    <div class="four columns">
        <label for="year-select"><strong>Year</strong></label>
        <select id="year-select">
            <option value="">All</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
        </select>
    </div>
    <div class="four columns">
        <label for="source-select"><strong>Source</strong></label>
        <select id="source-select">
            <option value="">All</option>
            <option value="Markdown">This Site</option>
            <option value="Medium">Medium</option>
        </select>
    </div>
</div>
<br>

<div id="blog-posts"></div>

<script src="assets/scripts/blog.js"></script>
        
<?php require("../includes/footer.php") ?>
