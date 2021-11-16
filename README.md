# georgeom.net
Source code of georgeom.net site.

Cronjob for updating json files (/etc/crontab):
```
0 */12 * * *    www-data        /usr/bin/bash /var/www/georgeom.net/update_data.sh
```

View the old design at https://old.georgeom.net, and the new design at https://georgeom.net.
