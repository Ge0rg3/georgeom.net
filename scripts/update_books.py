"""
    Script to put most recent books read into JSON file.
    Datetime parsed as RFC 822.
"""
from email.utils import parsedate_to_datetime
from bs4 import BeautifulSoup
from feedparser import parse
from json import dump
from sys import argv

RSS_URL = "https://www.goodreads.com/review/list_rss/141483159?shelf=read"

# Get output path or default
if len(argv) < 2:
    output_filepath = "books.json"
else:
    output_filepath = argv[1]

# Get data from RSS feed
feed = parse(RSS_URL)
entries = feed.entries

# Parse into array
books = []
for entry in entries:
    date_obj = parsedate_to_datetime(entry.get("user_read_at"))
    book_summary = BeautifulSoup(entry.get("summary"), "html.parser").text
    rating = book_summary.split("rating: ")[2].split("\n")[0]
    books.append({
        "title": entry.get("title"),
        "read": int(date_obj.timestamp()),
        "rating": int(rating),
        "link": entry.get("link")
    })

# Sort by date
sorted_books = sorted(books, key=lambda i: i["read"], reverse=True)

# Write to file
f =  open(output_filepath, "w")
dump(sorted_books, f)
f.close()
