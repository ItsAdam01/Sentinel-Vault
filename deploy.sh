#!/bin/bash

# Navigate to website folder and build
cd website
npm run build

# Navigate to build folder and initialize git
cd build
git init
git add .
git commit -m "Manual deploy to GitHub Pages"

# Setup branch and remote
git branch -M gh-pages
git remote add origin https://github.com/ItsAdam01/sentinel-vault.git

# Force push to gh-pages branch
git push -f origin gh-pages

# Return to project root
cd ../..

echo "Deployment complete. Visit https://ItsAdam01.github.io/sentinel-vault/"
