#!/bin/bash

# After creating the repository on GitHub, run these commands:

# Replace YOUR_REPO_NAME with the actual repository name you created
REPO_NAME="2gis-mapgl-mobile-app"

# Add remote origin
git remote add origin https://github.com/vladprrs/$REPO_NAME.git

# Push to main branch
git branch -M main
git push -u origin main

echo "Code pushed to https://github.com/vladprrs/$REPO_NAME"