dir=$(dirname $BASH_SOURCE)
python3 $dir/scripts/update_blog.py $dir/public_html/data/blog.json
python3 $dir/scripts/update_books.py $dir/public_html/data/books.json
python3 $dir/scripts/update_films.py $dir/public_html/data/films.json