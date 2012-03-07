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

log "fetching to get new branches"
git fetch origin

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

  # TODO shell escape the $branch value it safe for executing
  log "archiving ref $branch"
  git archive -o "$output/$branch.tar" "origin/$branch"
  mkdir -p "$output/$branch"

  log "untarring $branch.tar into $output/$branch/"
  tar -C "$output/$branch" -xf "$output/$branch.tar"

  # Manipulate the commit message
  # TODO add commit and description
  echo "<li>Branch: <a href='$branch/index.html'>$branch</a></li>" >> "$index_page"
done

# close out the list
echo "</ul>" >> "$index_page"

# close out the index file
echo "</body></html>" >> "$index_page"
