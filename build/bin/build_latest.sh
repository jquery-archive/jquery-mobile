source build/bin/config.sh

# Copy over the lib js, avoid the compiled stuff, to get the defines for tests/unit/*
find js -name "*.js" -not -name "*.docs.js" -not -name "*.mobile.js"  | xargs -L1 -I FILENAME cp FILENAME $OUTPUT/demos/js/