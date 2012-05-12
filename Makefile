# in build/bin/config.sh this setting will alter the variable definitions to match
# the changes for the deploy target in the makefile. temp solution
ARGS = IS_DEPLOY_TARGET=false
deploy: ARGS = IS_DEPLOY_TARGET=true

# The output folder for the finished files
OUTPUT = compiled

# Build Targets
# When no build target is specified, all gets ran
all: css js zip notify

clean:
	@@rm -rf ${OUTPUT}
	@@rm -rf tmp

# Create the output directory.
init:
	@@npm install
	@@mkdir -p ${OUTPUT}

# Build and minify the CSS files
css: init
	@@node node_modules/.bin/grunt css

# Build and minify the JS files
js: init
	@@node node_modules/.bin/grunt js

# -------------------------------------------------
#
# For jQuery Team Use Only
#
# -------------------------------------------------
docs: init js css
	@@${ARGS} bash build/bin/docs.sh

# Output a message saying the process is complete
notify: init
	@@echo "The files have been built and are in: " $$(pwd)/${OUTPUT}


# Zip up the jQm files without docs
zip: init css js
	@@${ARGS} bash build/bin/zip.sh

build_latest: css docs js zip
	@@${ARGS} bash build/bin/build_latest.sh

# Push the latest git version to the CDN. This is done on a post commit hook
deploy_latest:
	@@${ARGS} bash build/bin/deploy_latest.sh

# TODO target name preserved to avoid issues during refactor, latest -> deploy_latest
latest: build_latest deploy_latest

# Push the nightly backups. This is done on a server cronjob
deploy_nightlies:
	@@${ARGS} bash build/bin/deploy_nightlies.sh

# Deploy a finished release. This is manually done.
deploy: clean init css js docs zip
	@@${ARGS} bash build/bin/deploy.sh
