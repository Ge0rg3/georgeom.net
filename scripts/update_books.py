"""
    Script to put most recent goodreads books into JSON file.
"""
from bs4 import BeautifulSoup
from json import dump
from re import search
from sys import argv, exit
from time import time
from urllib.request import Request, urlopen

WIDGET_URL = "https://www.goodreads.com/review/custom_widget/141483159?shelf=read&sort=date_read&order=d&num_books=10"

# Get output path or default
if len(argv) < 2:
    output_filepath = "books.json"
else:
    output_filepath = argv[1]

# Get widget (new widget_id each time, else goodreads may serve a cached copy)
request = Request(f"{WIDGET_URL}&widget_id={int(time())}", headers={"User-Agent": "Mozilla/5.0"})
script = urlopen(request, timeout=30).read().decode("utf-8")

# Extract HTML from the widget's JS string
match = search(r"var widget_code = '(.*?)'\n", script)
if match is None:
    print("Widget HTML not found, keeping old file")
    exit(1)
html = match.group(1).replace('\\"', '"').replace("\\'", "'").replace("\\/", "/").replace("\\n", "\n")

# Parse into array (widget is already sorted by read date)
books = []
soup = BeautifulSoup(html, "html.parser")
for book in soup.select('div[class^="gr_custom_each_container"]'):
    cover = book.select_one('div[class^="gr_custom_book_container"] a')
    stars = book.select_one('div[class^="gr_custom_rating"] .staticStars')
    if cover is None or stars is None:
        continue
    books.append({
        "title": cover["title"],
        "rating": len(stars.select('img[src*="star_active"]'))
    })

# Don't overwrite old file with nothing
if len(books) == 0:
    print("No books found, keeping old file")
    exit(1)

# Write to file
f = open(output_filepath, "w")
dump(books, f)
f.close()
