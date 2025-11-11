#!/bin/bash

echo "🔄 macOS 아이콘 캐시 새로고침 중..."
echo ""

# 아이콘 캐시 삭제
sudo rm -rf /Library/Caches/com.apple.iconservices.store
echo "✅ 아이콘 캐시 삭제 완료"

# Dock 재시작
killall Dock
echo "✅ Dock 재시작 완료"

# Finder 재시작
killall Finder
echo "✅ Finder 재시작 완료"

echo ""
echo "🎉 아이콘 캐시가 새로고침되었습니다!"
echo "이제 새로운 아이콘이 보일 것입니다."
