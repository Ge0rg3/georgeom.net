"""
    Script to put most recent books read into JSON file.
    Goodreads retired its RSS feeds in October 2026, so this reads the public
    shelf widget instead. The widget has no read dates, only the shelf order.
"""
from bs4 import BeautifulSoup
from json import dump
from os import replace
from re import search
from sys import argv, exit
from time import time
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen

USER_ID = "141483159"
NUM_BOOKS = 10
# widget_id must change per request, or Goodreads may serve a cached copy
WIDGET_URL = (
    f"https://www.goodreads.com/review/custom_widget/{USER_ID}"
    f"?shelf=read&sort=date_read&order=d&num_books={NUM_BOOKS}"
    f"&widget_id={int(time())}"
)

# Get output path or default
if len(argv) < 2:
    output_filepath = "books.json"
else:
    output_filepath = argv[1]


def fail(reason):
    """Keep the existing file rather than overwrite it with nothing."""
    print(f"update_books: {reason}, leaving {output_filepath} unchanged")
    exit(1)


# Get the widget, a JS snippet holding the shelf HTML in a string literal
request = Request(WIDGET_URL, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urlopen(request, timeout=30) as response:
        script = response.read().decode("utf-8")
except Exception as e:
    fail(f"widget request failed ({e})")

match = search(r"var widget_code = '(.*?)'\n", script)
if not match:
    fail("widget_code not found in widget response")
html = match.group(1)
for escaped, char in (('\\"', '"'), ("\\'", "'"), ("\\/", "/"), ("\\n", "\n")):
    html = html.replace(escaped, char)

# Parse into array, keeping the widget's newest-first order
books = []
soup = BeautifulSoup(html, "html.parser")
for container in soup.select('div[class^="gr_custom_each_container"]'):
    cover_link = container.select_one('div[class^="gr_custom_book_container"] a')
    stars = container.select_one('div[class^="gr_custom_rating"] .staticStars')
    if cover_link is None or stars is None:
        continue
    # Drop the utm_* tracking query string from the review link
    link = urlunsplit(urlsplit(cover_link["href"])._replace(query=""))
    rating = len(stars.select('img[src*="star_active"]'))
    books.append({
        "title": cover_link["title"],
        "rating": rating,
        "link": link
    })

if not books:
    fail("no books found in widget")

# Write to a temp file and rename, so a failed write never truncates the old file
tmp_filepath = output_filepath + ".tmp"
with open(tmp_filepath, "w") as f:
    dump(books, f)
replace(tmp_filepath, output_filepath)
