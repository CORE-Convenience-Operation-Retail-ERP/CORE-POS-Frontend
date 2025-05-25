import styled from "styled-components";

// 하단 탭바 컨테이너
export const BottomTabBar = styled.nav`
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;

  @media (min-width: 1024px) {
    height: 64px;
    padding: 0 48px;
    justify-content: space-around;
     gap: 0;
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

// 라벨 텍스트
export const TabLabel = styled.div`
  font-size: 10px;
  margin-top: 2px;

  @media (min-width: 1024px) {
    font-size: 12px;
  }
`;

// 중앙 FAB 버튼
export const FabButton = styled.button`
  position: fixed;
  bottom: 32px;
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
  z-index: 101;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a6cd4;
    box-shadow: 0 4px 12px rgba(91, 125, 232, 0.3);
  }

  @media (min-width: 1024px) {
    bottom: 40px;
  }
`;