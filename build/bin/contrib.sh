set -e

if [ $# -ne 2 ]; then
  echo "please supply two versions, eg contribs.sh 1.1.0 1.1.0"
  exit 1;
fi

format_contributors='%aN%n%cN';
LC_ALL='C' git whatchanged $1..$2 --pretty=format:"$format_contributors" \
| sed '/^:/ d' \
| sed '/^$/ d' \
| sort \
| uniq
