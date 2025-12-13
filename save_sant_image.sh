#!/bin/zsh
# Run this script after you've saved sant.jpg to frontend/public/assets/

cd /Users/adi/infyron-project

# Check if image exists
if [ ! -f "frontend/public/assets/sant.jpg" ]; then
    echo "❌ Error: frontend/public/assets/sant.jpg not found"
    echo "Please save the image first, then run this script again"
    exit 1
fi

echo "✅ Found sant.jpg"

# Remove old TODO and santosh.jpg reference if exists
rm -f SANTOSH_IMAGE_TODO.txt
echo "✅ Cleaned up old files"

# Git commit
git add frontend/src/pages/Home.jsx frontend/src/components/LeadershipModal.jsx frontend/public/assets/sant.jpg SANTOSH_IMAGE_TODO.txt
git commit -m "Move Santosh Kumar Padhi to Leadership page with sant.jpg"
git push origin main

echo "✅ All done! Santosh Kumar Padhi is now in the Leadership page"
echo "🚀 Changes pushed to GitHub"
