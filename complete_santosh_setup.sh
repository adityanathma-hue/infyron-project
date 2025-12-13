#!/bin/zsh
# Run this script after you've saved santosh.jpg to frontend/public/assets/

cd /Users/adi/infyron-project

# Check if image exists
if [ ! -f "frontend/public/assets/santosh.jpg" ]; then
    echo "❌ Error: frontend/public/assets/santosh.jpg not found"
    echo "Please save the image first, then run this script again"
    exit 1
fi

echo "✅ Found santosh.jpg"

# Remove TODO file
rm -f SANTOSH_IMAGE_TODO.txt
echo "✅ Removed TODO file"

# Git commit
git add frontend/public/assets/santosh.jpg SANTOSH_IMAGE_TODO.txt
git commit -m "Add Santosh Kumar Padhi profile image"
git push origin main

echo "✅ All done! Santosh Kumar Padhi's profile is now complete"
echo "🚀 The changes are live on GitHub"
