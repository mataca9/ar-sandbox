
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b demo
git add -A
git commit -m 'deploy'

git push -f git@github.com:mataca9/mataca9.github.io.git demo

cd -