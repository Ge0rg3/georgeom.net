"""
    Script to put most recent letterboxd reviews into JSON file.
"""
from datetime import datetime
from feedparser import parse
from json import dump
from sys import argv

RSS_URL = "https://letterboxd.com/g30rg3/rss/"

# Get output path or default
if len(argv) < 2:
    output_filepath = "films.json"
else:
    output_filepath = argv[1]

# Get data from RSS feed
feed = parse(RSS_URL)
posts = feed.entries

# Parse into json
reviews = []
for post in posts:
    date_obj = datetime.strptime(post.get("letterboxd_watcheddate"), "%Y-%m-%d")
    reviews.append({
        "title": post.get("letterboxd_filmtitle"),
        "link": post.get("link"),
        "rating": post.get("letterboxd_memberrating"),
        "watched": int(date_obj.timestamp())
    })

# Sort by watch date
sorted_reviews = sorted(reviews, key=lambda i: i["watched"], reverse=True)

# Write to file
f =  open(output_filepath, "w")
dump(sorted_reviews, f)
f.close()
