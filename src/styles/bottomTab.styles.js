import styled from "styled-components";

// 하단 탭바 전체
export const BottomTabBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  height: 64px;
  background-color: white;
  border-top: 1px solid #ddd;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  z-index: 9999;
`;

// 탭 그룹 (좌우 버튼 묶음)
export const TabGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

// 각 탭 아이템
export const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;

  &.active {
    color: #007bff;
  }

  &:hover {
    color: #007bff;
  }
`;

// 아이콘
export const TabIcon = styled.div`
  font-size: 20px;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

// 라벨
export const TabLabel = styled.div`
  font-size: 10px;
  margin-top: 2px;

  @media (min-width: 1024px) {
    font-size: 12px;
  }
`;

// 중앙 FAB 버튼
export const FabButton = styled.button`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  background-color: #5b7de8;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(91, 125, 232, 0.2);
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  &:hover {
    background-color: #4a6cd4;
    box-shadow: 0 4px 12px rgba(91, 125, 232, 0.3);
  }
`;
