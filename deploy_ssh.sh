#!/bin/bash

# Navigate to website folder and build
cd website
npm run build

# Navigate to build folder and initialize git
cd build
git init
git add .
git commit -m "Manual deploy to GitHub Pages (SSH)"

# Setup branch and remote using SSH
git branch -M gh-pages
git remote add origin git@github.com:ItsAdam01/sentinel-vault.git

# Force push to gh-pages branch
git push -f origin gh-pages

# Return to project root
cd ../..

echo "------------------------------------------------"
echo "Deployment build complete and pushed via SSH."
echo "Visit: https://ItsAdam01.github.io/sentinel-vault/"
echo "------------------------------------------------"
echo "Reminder: Ensure GitHub Pages source is set to 'gh-pages' branch in repository settings."
