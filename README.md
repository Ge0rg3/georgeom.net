# georgeom.net
All of the code for my website.

Every 30 minutes, the mediumscrape.py script runs, which:
  i) Parses data from my medium RSS feed (https://medium.com/feed/@georgeomnet).
  ii) Reads the index_template.html file.
  iii) Inserts the relevant data into the string containing index_template.html's contents.
  iv) Writes this data to index.html.
  
