# -*- coding: utf-8 -*-
logging = False

import requests as rq
import feedparser
import datetime

d = feedparser.parse('https://medium.com/feed/@georgeomnet')

links = [i['link'] for i in d.entries]
titles = [i['title'] for i in d.entries]
content = [i['content'] for i in d.entries]
dates = [i['date'][:10] for i in d.entries]
subtitles = []

###Remove Responses:
for count, i in enumerate(content):
    if "[blog.response]" in str(i):
        if logging == True: print("Deleting \"%s\" because it was a marked as a response." % (titles[count]))
        del links[count];del titles[count];del content[count];del dates[count]

###Create summaries for each post.
for count, i in enumerate(content):
    if "htb" in str(titles[count]).lower():
        trimmed_content = i[0]['value'].split("</em></p><p>")[1].split("</p>")[0]
        subtitles.append(trimmed_content)
        if logging == True: print("Adding \"%s\" to the blog as a HTB box." % (titles[count]))
    else:
        try: trimmed_content = i[0]['value'].split("<p><em>")[1].split("</em></p>")[0].replace("<em>","")
        except: trimmed_content = i[0]['value']
        subtitles.append(trimmed_content)
        if logging == True: print("Adding \"%s\" to the blog as an independent post." % (titles[count]))

###Load the template file.
with open('/var/www/html/index_template.html', 'r') as f:
    index_template = f.readlines()

###Insert data into the new file string.
insert_lines = []
for i in range(len(titles)):
    insert_lines.append("<h5><a href=\""+links[i]+"\" target=\"_blank\">"+titles[i]+"</a></h5>\n")
    insert_lines.append("<i>"+dates[i]+"</i>")
    insert_lines.append("<p>"+subtitles[i]+" [<a href=\""+links[i]+"\" target=\"_blank\">Read More...</a>]</p>\n")
insert_lines.append("<i style=\"font-size: 0.35em;\">Last updated at: "+str(datetime.datetime.now())+"</i>")
for i in insert_lines[::-1]:
    index_template.insert(39, i)

###Write the new file string into index.html
with open('/var/www/html/index.html','w') as f:
    f.write(''.join(index_template))
