#!/bin/bash
# Auto-commit dan push ke GitHub

cd /workspace

# Add semua perubahan
git add -A

# Commit dengan timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Update: $TIMESTAMP" 2>/dev/null || exit 0

# Push ke GitHub
git push origin main:main 2>/dev/null || git push

echo "✅ Synced to GitHub at $TIMESTAMP"
