import Table from "@/components/Table";
import { comma } from "@/utils";
import styled from "styled-components";

export default function Report() {
  return (
    <>
      <ReportWrap>
        <ReportItem>
          <ReportTitle>해결한 문제</ReportTitle>
          <ReportDesc>
            <BoldText>{reaportData.sovled}</BoldText> 개
          </ReportDesc>
        </ReportItem>
        <ReportItem>
          <ReportTitle>시도한 문제</ReportTitle>
          <ReportDesc>
            <BoldText>{reaportData.try}</BoldText> 개
          </ReportDesc>
        </ReportItem>
        <ReportItem>
          <ReportTitle>순위</ReportTitle>
          <ReportDesc>
            <BoldText>{reaportData.rank}</BoldText> 등
          </ReportDesc>
        </ReportItem>
        <ReportItem>
          <ReportTitle>점수</ReportTitle>
          <ReportDesc>
            <BoldText>{comma(reaportData.score)}</BoldText> 점
          </ReportDesc>
        </ReportItem>
      </ReportWrap>
      <ReportStudyLogWrap>
        <ReportStudyLogTitle>학습 로그</ReportStudyLogTitle>
        <Table pagination={false} tableData={data} columns={columns} />
      </ReportStudyLogWrap>
    </>
  );
}

const ReportWrap = styled.ul`
  display: flex;
  row-gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ReportItem = styled.li`
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

const ReportTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 1rem;
`;
const ReportDesc = styled.p``;
const BoldText = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const ReportStudyLogTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ReportStudyLogWrap = styled.div`
  margin-top: 5rem;
`;

const reaportData: Rport = {
  sovled: 30,
  try: 50,
  rank: 20,
  score: 1392,
};

interface Rport {
  sovled: number;
  try: number;
  rank: number;
  score: number;
}

interface ReportStudy {
  lang: string;
  keyword: string;
  scroe: number;
  date: string;
}
const columns: TableColumns<ReportStudy> = [
  {
    dataIndex: "lang",
    title: "카테고리",
  },
  {
    dataIndex: "keyword",
    title: "키워드",
  },
  {
    dataIndex: "scroe",
    title: "점수",
    render: _solveCount => {
      return `${_solveCount} / 100 점`;
    },
  },
  {
    dataIndex: "date",
    title: "학습 일자",
  },
];

const data: ReportStudy[] = [
  {
    lang: "React",
    keyword: "state",
    scroe: 70,
    date: "2023.9.21",
  },
  {
    lang: "Node.js",
    keyword: "route",
    scroe: 85,
    date: "2023.9.22",
  },
  {
    lang: "Node.js",
    keyword: "ssr",
    scroe: 90,
    date: "2023.9.23",
  },
];
