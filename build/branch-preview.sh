#!/bin/bash
# determine the project root
rel_project_root=`dirname ${0%/*}/..`
cd "$rel_project_root/.."
project_root=`pwd`

echo $project_root

output="$project_root/branches"
index_page="$output/index.html"

function log {
  echo "[branches preview] $1"
}

# Make the output directory if it doesnt exist
mkdir -p "$output"

branches=$(git ls-remote --heads origin | cut -f2 -s | sed 's@refs/heads/@@')
existing_branch_dirs=$(ls -l --full-time "$output" | grep "^d" | awk '{ print $9 }' | xargs)

echo "<html><head><title>jQm Branches Preview</title></head><body>" > "$index_page"
echo "<h1>jQuery Mobile Branches Live Previews</h1><hr />" >> "$index_page"
echo "<span class='date'>Updated: $(date)</span>" >> "$index_page"
echo "<ul>" >> "$index_page"
# Loop through the array to export each branch
for branch in $branches; do

  existing_branch_dirs=`echo "$existing_branch_dirs" | sed "s/$branch\s*//"`

  # skip master
  if [ $branch = "master" ]; then
    continue
  fi

  # TODO Make it safe for executing
  # $branch = escapeshellarg($branch);

  log "checking out $branch into $output/$branch/"
  git checkout-index -a -f --prefix="$output/$branch/"

  # Manipulate the commit message
  echo "<li>Branch: <a href='$branch/index.html'>$branch</a></li>" >> "$index_page"
done

# close out the list
echo "</ul>" >> "$index_page"

# close out the index file
echo "</body></html>" >> "$index_page"

for dir in $existing_branch_dirs; do
  log "removing old branch from $output: $dir"
  rm -r "$output/$dir"
done