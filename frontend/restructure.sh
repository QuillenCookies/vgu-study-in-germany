#!/usr/bin/env bash
# =============================================================================
# restructure.sh — VGU Frontend Clean Architecture Migration Script
# Chạy từ thư mục frontend/: bash restructure.sh
# =============================================================================

set -e
SRC="./src"

echo "▶ [1/5] Tạo thư mục src/types/ ..."
mkdir -p "$SRC/types"

echo "▶ [2/5] Tạo src/types/university.ts ..."
cat > "$SRC/types/university.ts" << 'EOF'
export type LocationType = 'city' | 'university';

export interface LocationState {
  id: number;
  name: string;
  type: LocationType;
}
EOF

echo "▶ [3/5] Tạo src/types/index.ts (barrel) ..."
cat > "$SRC/types/index.ts" << 'EOF'
export * from './university';
EOF

echo "▶ [4/5] Di chuyển UniversityContext: context/ → contexts/ ..."
if [ -f "$SRC/context/UniversityContext.tsx" ]; then
  cat > "$SRC/contexts/UniversityContext.tsx" << 'EOF'
import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { LocationType, LocationState } from '../types/university';

export type { LocationType, LocationState };

interface UniversityContextType {
  selectedLocation: LocationState | null;
  setSelectedLocation: (location: LocationState | null) => void;
}

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const UniversityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationState | null>(null);

  return (
    <UniversityContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = (): UniversityContextType => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};
EOF
  rm -rf "$SRC/context"
  echo "   ✓ Đã xóa src/context/ (cũ)"
else
  echo "   ℹ src/context/UniversityContext.tsx không tồn tại (có thể đã migrate rồi)"
fi

echo "▶ [5/5] Đổi tên Library.tsx → LibraryPage.tsx ..."
if [ -f "$SRC/pages/Library.tsx" ]; then
  mv "$SRC/pages/Library.tsx" "$SRC/pages/LibraryPage.tsx"
  echo "   ✓ Đổi tên thành công"
else
  echo "   ℹ Library.tsx không tồn tại (có thể đã đổi tên rồi)"
fi

echo ""
echo "✅ Restructure hoàn thành!"
echo ""
echo "⚠ Bước tiếp theo (thực hiện thủ công hoặc dùng IDE):"
echo "  1. Cập nhật main.tsx: thay './context/UniversityContext.tsx' → './contexts/UniversityContext'"
echo "  2. Cập nhật App.tsx: thay './pages/Library' → './pages/LibraryPage'"
echo "  3. Cập nhật HomePage.tsx, UniversitiesPage.tsx, TrainPage.tsx:"
echo "     '../context/UniversityContext' → '../contexts/UniversityContext'"
echo "  4. Chạy: npm run build để kiểm tra lỗi TypeScript"
