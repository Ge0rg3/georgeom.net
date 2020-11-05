# georgeom.net
Source code of georgeom.net site.

Cronjob for updating blog posts (/etc/crontab):
```
0 */12 * * *    www-data        /usr/bin/python3 /var/www/georgeom.net/update_blog.py /var/www/georgeom.net/posts.json
```

View the old design at https://old.georgeom.net, and the new design at https://georgeom.net.
