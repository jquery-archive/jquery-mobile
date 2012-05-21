source build/bin/config.sh

if [ ! -n "$(git tag -l $VER_OFFICIAL)" ]; then
  echo "!!! tag the version of the library before deploying"
  exit 1;
fi

# Deploying all the files to the CDN
mkdir -p tmp
cp -R $OUTPUT tmp/$VER_OFFICIAL
scp -qr tmp/* jqadmin@code.origin.jquery.com:/var/www/html/code.jquery.com/mobile/
rm -rf tmp/$VER_OFFICIAL
mv $OUTPUT/demos tmp/$VER_OFFICIAL
# Create the Demos/Docs/Tests/Tools for jQueryMobile.com
# ... By first replacing the paths
# TODO update jQuery Version replacement on deploy
find tmp/$VER_OFFICIAL -type f \
		\( -name '*.html' -o -name '*.php' \) \
		-exec perl -pi -e \
	  "s|src=\"(.*)$BASE_NAME.js\"|src=\"//code.jquery.com/mobile/$VER_OFFICIAL/$NAME.min.js\"|g;s|href=\"(.*)$BASE_NAME.css\"|href=\"//code.jquery.com/mobile/$VER_OFFICIAL/$NAME.min.css\"|g;s|src=\"(.*)jquery.js\"|src=\"//code.jquery.com/jquery-1.7.1.min.js\"|g" {} \;
# ... So they can be copied to jquerymobile.com
scp -qr tmp/* jqadmin@jquerymobile.com:/srv/jquerymobile.com/htdocs/demos/
# Do some cleanup to wrap it up
rm -rf tmp
rm -rf $OUTPUT
