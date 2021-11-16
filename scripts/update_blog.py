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

def getMedium():
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
        # "Guesstimate" blog category (old and unreliable, but future blogs are all Markdown)
        title = post.get("title").upper()
        if "HTB" in title or "HACK THE BOX" in title:
            category = "HTB"
        elif "BOUNTY" in title:
            category = "BOUNTY"
        elif "TOOL" in title:
            category = "TOOL"
        elif "CTF" in title or "CHALLENGE" in title:
            category = "CTF"
        else:
            category = "OTHER"
        # Append to total array
        parsed_posts.append({
            "title": post.get("title"),
            "link": post.get("link"),
            "date": int(mktime(post.get("published_parsed"))),
            "preview": extracted_text,
            "source": "Medium",
            "category": category
        })
    return parsed_posts

# Get posts from markdown folder
def getMarkdown():
    posts = []
    return []

medium_posts = getMedium()
markdown_posts = getMarkdown()
posts = dict(medium_posts.items(), markdown_posts.items())

# Write to file
f =  open(output_filepath, "w")
dump(posts, f)
f.close()
