"""
    Script to put most recent letterboxd reviews into JSON file.
"""
from feedparser import parse
from json import dump
from sys import argv
from time import mktime

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
    reviews.append({
        "title": post.get("letterboxd_filmtitle"),
        "link": post.get("link"),
        "rating": post.get("letterboxd_memberrating"),
        "date": int(mktime(post.get("published_parsed")))
    })

# Write to file
f =  open(output_filepath, "w")
dump(reviews, f)
f.close()
