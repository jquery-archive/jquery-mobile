#!/bin/bash
# determine the project root
output="branches"
index_page="$output/index.html"

function log {
  echo "[branches preview] $1"
}

# Make the output directory if it doesnt exist
mkdir -p "$output"

branches=$(git ls-remote --heads origin | cut -f2 -s | sed 's@refs/heads/@@')

echo "<html><head><title>jQm Branches Preview</title></head><body>" > "$index_page"
echo "<h1>jQuery Mobile Branches Live Previews</h1><hr />" >> "$index_page"
echo "<span class='date'>Updated: $(date)</span>" >> "$index_page"
echo "<ul>" >> "$index_page"
# Loop through the array to export each branch
for branch in $branches; do
  # skip master
  if [ $branch = "master" ]; then
    continue
  fi

  # TODO Make it safe for executing
  # $branch = escapeshellarg($branch);
  git checkout -q "$branch"

  log "checking out $branch into $output/$branch/"
  git checkout-index -a -f --prefix="$output/$branch/"

  # Manipulate the commit message
  # TODO add commit and description
  echo "<li>Branch: <a href='$branch/index.html'>$branch</a></li>" >> "$index_page"
done

git checkout master

# close out the list
echo "</ul>" >> "$index_page"

# close out the index file
echo "</body></html>" >> "$index_page"
