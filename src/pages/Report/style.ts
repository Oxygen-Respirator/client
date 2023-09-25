import styled from "styled-components";

export const ReportWrap = styled.ul`
  display: flex;
  row-gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ReportItem = styled.li`
  background: var(--subColor);
  width: 23%;
  border-radius: 1rem;
  padding: 1.5rem;
  @media screen and (max-width: 768px) {
    width: 47%;
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

export const ReportTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 1rem;
`;
export const ReportDesc = styled.p``;
export const BoldText = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

export const ReportStudyLogTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ReportStudyLogWrap = styled.div`
  margin-top: 5rem;
`;
