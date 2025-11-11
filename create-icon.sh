#!/bin/bash

# 사용법: ./create-icon.sh your-image.png
# 1024x1024 PNG 이미지를 ICNS로 변환합니다.

if [ -z "$1" ]; then
    echo "❌ 사용법: ./create-icon.sh <이미지파일.png>"
    echo "예제: ./create-icon.sh my-icon.png"
    exit 1
fi

SOURCE_IMAGE="$1"

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ 파일을 찾을 수 없습니다: $SOURCE_IMAGE"
    exit 1
fi

echo "🎨 아이콘 생성 시작..."

# iconset 폴더 생성
mkdir -p icon.iconset

# 다양한 크기로 이미지 생성
echo "📐 다양한 크기의 이미지 생성 중..."
sips -z 16 16     "$SOURCE_IMAGE" --out icon.iconset/icon_16x16.png > /dev/null 2>&1
sips -z 32 32     "$SOURCE_IMAGE" --out icon.iconset/icon_16x16@2x.png > /dev/null 2>&1
sips -z 32 32     "$SOURCE_IMAGE" --out icon.iconset/icon_32x32.png > /dev/null 2>&1
sips -z 64 64     "$SOURCE_IMAGE" --out icon.iconset/icon_32x32@2x.png > /dev/null 2>&1
sips -z 128 128   "$SOURCE_IMAGE" --out icon.iconset/icon_128x128.png > /dev/null 2>&1
sips -z 256 256   "$SOURCE_IMAGE" --out icon.iconset/icon_128x128@2x.png > /dev/null 2>&1
sips -z 256 256   "$SOURCE_IMAGE" --out icon.iconset/icon_256x256.png > /dev/null 2>&1
sips -z 512 512   "$SOURCE_IMAGE" --out icon.iconset/icon_256x256@2x.png > /dev/null 2>&1
sips -z 512 512   "$SOURCE_IMAGE" --out icon.iconset/icon_512x512.png > /dev/null 2>&1
sips -z 1024 1024 "$SOURCE_IMAGE" --out icon.iconset/icon_512x512@2x.png > /dev/null 2>&1

# ICNS 파일 생성
echo "🔨 ICNS 파일 생성 중..."
iconutil -c icns icon.iconset -o resources/icon.icns

# PNG 복사 (Linux용)
echo "📦 PNG 복사 중..."
sips -z 512 512 "$SOURCE_IMAGE" --out resources/icon.png > /dev/null 2>&1

# 정리
rm -rf icon.iconset

echo ""
echo "✅ 아이콘 생성 완료!"
echo ""
echo "생성된 파일:"
echo "  📁 resources/icon.icns  (macOS용)"
echo "  📁 resources/icon.png   (Linux용)"
echo ""
echo "다음 단계:"
echo "  1. Windows용 ICO 파일이 필요하면: https://cloudconvert.com/png-to-ico"
echo "  2. package.json에 아이콘 경로 설정 (자동으로 추가됨)"
echo "  3. yarn dist:mac 실행하여 빌드"
echo ""

