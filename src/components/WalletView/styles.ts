import styled from "styled-components";
import { isMobile } from "styles/styles";

export const TitleIcon = styled.img`
  margin-right: 12px;
`;

export const StyledCustomSelect = styled.div`
  width: 100%;

  .selectLabel {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  .customSelect {
    align-items: flex-start;
  }

  .customSelectControl,
  .searchRoot {
    width: 100%;
  }
`;

export const Rate = styled.span`
  color: #65647e;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.66px;
  line-height: 14px;
  margin: 0 8px;
  text-transform: uppercase;
`;

export const Control = styled.div`
  margin-bottom: 24px;
`;

export const Terms = styled.a`
  line-height: 16px;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.newTheme.linkText};
`;
