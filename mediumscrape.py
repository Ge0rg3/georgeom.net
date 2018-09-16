# -*- coding: utf-8 -*-

import requests as rq
import feedparser

#r = rq.get("https://medium.com/feed/@georgeomnet")

#rdec = r.text.encode('utf-8')

d = feedparser.parse('https://medium.com/feed/@georgeomnet')


links = [i['link'] for i in d.entries]
titles = [i['title'] for i in d.entries]
content = [i['content'] for i in d.entries]
dates = [i['date'][:10] for i in d.entries]
subtitles = []

for count, i in enumerate(content):
    if "htb" in str(titles[count]).lower():
        trimmed_content = i[0]['value'].split("</em></p><p>")[1].split("</p>")[0]
        subtitles.append(trimmed_content)


with open('/var/www/html/index_template.html', 'r') as f:
    index_template = f.readlines()

insert_lines = []
for i in range(len(titles)):
    insert_lines.append("<h5><a href=\""+links[i]+"\" target=\"_blank\">"+titles[i]+"</a></h5>\n")
    insert_lines.append("<i>"+dates[i]+"</i>")
    insert_lines.append("<p>"+subtitles[i]+" [<a href=\""+links[i]+"\" target=\"_blank\">Read More...</a>]</p>\n")

import datetime
insert_lines.append("<i style=\"font-size: 0.35em;\">Last updated at: "+str(datetime.datetime.now())+"</i>")

for i in insert_lines[::-1]:
    index_template.insert(37, i)


with open('/var/www/html/index.html','w') as f:
    f.write(''.join(index_template))



#
