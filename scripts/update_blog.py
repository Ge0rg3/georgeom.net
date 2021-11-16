"""
    Script to combine posts from medium into JSON file.
"""
from bs4 import BeautifulSoup
from feedparser import parse
from json import dump
from sys import argv
from time import mktime

RSS_URL = "https://medium.com/feed/@georgeomnet"

# Get output path or default
if len(argv) < 2:
    output_filepath = "posts.json"
else:
    output_filepath = argv[1]

# Parse RSS Feed
feed = parse(RSS_URL)
posts = feed.entries

# Convert to dict
parsed_posts = []
for post in posts:
    # If no tags in post, not meant to be shared
    if len(post.get("tags", [])) == 0:
        continue
    # Get summary
    preview = post.get("summary")
    # Replace nbsp with space
    preview = preview.replace("\xa0", " ")
    # Remove italic and header tags
    soup = BeautifulSoup(preview, "html.parser")
    for tag in soup.find_all(["em", "h3"]):
        tag.replaceWith("")
    # Extract text from HTML
    text = " ".join(soup.findAll(text=True))
    # Fix spacing issues in sentences (sometimes space before ".")
    text = text.replace(" .", "")
    # Get only first 4 sentences
    sentences = [sentence + "." for sentence in text.split(". ")]
    extracted_text = " ".join(sentences[:4])
    # Append to total array
    parsed_posts.append({
        "title": post.get("title"),
        "link": post.get("link"),
        "date": int(mktime(post.get("published_parsed"))),
        "preview": extracted_text
    })

# Write to file
f =  open(output_filepath, "w")
dump(parsed_posts, f)
f.close()
