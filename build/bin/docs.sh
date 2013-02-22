source build/bin/config.sh

mkdir -p tmp/demos/js
mkdir -p tmp/demos/css/themes/$THEME
# ... Copy script files
cp compiled/*.js tmp/demos/js
cp js/jquery.js tmp/demos/js
# ... Copy html files
cp index.php tmp/demos
cp -r docs tmp/demos/
# ... Copy css and images
cp compiled/*.css tmp/demos/css/themes/$THEME
cp -r compiled/images tmp/demos/css/themes/$THEME

# NOTE the deletion here is required by gnu/bsd sed differences
# reset the docs specific js reference
find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e "s@_assets/js/.*\"@_assets/js/$DEMOSNAME.js\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;

# reset the javascript references
find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e "s@js/\"@js/$NAME.js\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;

# make sure the docs reference the right css file names (for deploy)
find tmp/demos \( -name '*.html' -o -name '*.php' \) -exec sed -i${SED_INPLACE_EXT} -e "s@$BASE_NAME.css\"@$NAME.css\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;

# make sure the docs reference the right css file names (for deploy)
# ignore the redirect directory since it requires php
find tmp/demos \( -name '*.php' ! -wholename "*redirect*" \)| while read file; do
  rename=`echo $file | sed 's/php/html/'`
  mv $file "$rename"
done

# NOTE SPECIAL CASE
# fix the index of the redirect sample
mv tmp/demos/docs/examples/redirect/index.php tmp/demos/docs/examples/redirect/index.html

function inline {
  for file in $1; do
    file_dir=$(echo $file | sed "s/\/[^\/]*.html$/\//")

    # remove the php leaving only a list of relative html file paths
    includes=$(grep -h "\?php include(" $file | sed "s/<?php include( '//" | sed "s/' ); ?>//g" | sed "s/\s*//")

    # for each relative path resolve it and replac the corresponding php
    # include in the file with the resolved files contents
    for include_relative in $includes; do
      # the html extension file include
      html_include=$(echo $include_relative | sed "s/.php/.html/")

      # the fully resolved path, NOTE readlink should be standard
      full_file_path=$(readlink -m $file_dir$html_include)

      # construct the include script replace, removing the path delimiters
      # and the double dot refs to prevent sed from borking
      include_string="<?php include( '.*$(echo $include_relative | sed "s@\([a-zA-Z\-\0-9.]*/\)*@@g")' ); ?>"

      # replace the include string with the resolved file contents
      sed -i$SED_INPLACE_EXT "/$include_string/{
        s/$include_string//g
        r $full_file_path
      }" $file

      find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;
    done
  done
}

# find all the files with php includes, do the work on includes that will
# be inlined into other files first
# NOTE SPECIAL CASE
inline "tmp/demos/docs/global-nav.html tmp/demos/docs/search.html"
for file in $(grep -lr "\?php include(" tmp/demos/); do
  inline $file
done

# replace link references from php with references to html
find tmp/demos \( -name '*.html' \) -exec sed -i${SED_INPLACE_EXT} -e "s@.php\"@.html\"@" {} \;
find tmp/demos -name "*$SED_INPLACE_EXT" -exec rm {} \;

# clean out the compiled directory demos and cp the new output
cp -R tmp/demos $OUTPUT

# clear out old zip files
clear_zip_files $OUTPUT

# create the docs zip in the output directory using the demo files
cd compiled/demos && zip -rq ../../$OUTPUT/$NAME.docs.zip * && cd -

# Finish by removing the temporary files
rm -rf tmp
