#!/bin/bash

# 아이콘에 여백(패딩)을 추가하여 더 이쁘게 만드는 스크립트
# macOS Dock에서 아이콘이 너무 꽉 차 보일 때 사용

if [ -z "$1" ]; then
    echo "❌ 사용법: ./add-icon-padding.sh <이미지파일.png> [패딩비율]"
    echo ""
    echo "예제:"
    echo "  ./add-icon-padding.sh icon.png 10    # 10% 패딩"
    echo "  ./add-icon-padding.sh icon.png 15    # 15% 패딩 (권장)"
    echo ""
    exit 1
fi

SOURCE_IMAGE="$1"
PADDING="${2:-15}"  # 기본값 15%

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ 파일을 찾을 수 없습니다: $SOURCE_IMAGE"
    exit 1
fi

echo "🎨 아이콘에 패딩 추가 중..."
echo "📦 원본: $SOURCE_IMAGE"
echo "📏 패딩: ${PADDING}%"
echo ""

# ImageMagick이 설치되어 있는지 확인
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick이 설치되어 있지 않습니다."
    echo ""
    echo "설치 방법:"
    echo "  brew install imagemagick"
    echo ""
    exit 1
fi

# 백업 생성
BACKUP="${SOURCE_IMAGE}.backup"
cp "$SOURCE_IMAGE" "$BACKUP"
echo "💾 백업 생성: $BACKUP"

# 패딩 추가 (흰색 배경 대신 투명 배경)
convert "$SOURCE_IMAGE" \
    -background none \
    -gravity center \
    -extent "$(identify -format '%wx%h' "$SOURCE_IMAGE" | sed "s/[0-9]*x[0-9]*/$(echo "scale=0; (100-$PADDING)*10" | bc)%x$(echo "scale=0; (100-$PADDING)*10" | bc)%/")" \
    "${SOURCE_IMAGE%.png}_padded.png"

echo ""
echo "✅ 패딩이 추가된 아이콘이 생성되었습니다!"
echo "📁 파일: ${SOURCE_IMAGE%.png}_padded.png"
echo ""
echo "다음 단계:"
echo "  1. 생성된 _padded.png 파일을 확인하세요"
echo "  2. 마음에 들면:"
echo "     mv ${SOURCE_IMAGE%.png}_padded.png $SOURCE_IMAGE"
echo "     ./create-icon.sh $SOURCE_IMAGE"
echo "  3. 마음에 안 들면 패딩 비율을 조정하세요"
echo ""

