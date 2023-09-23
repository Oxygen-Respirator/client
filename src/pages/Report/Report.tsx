import chatApis from "@/apis/chatApis";
import reportApis from "@/apis/reportApis";
import Table from "@/components/Table";
import { comma } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

export default function Report() {
  const { data: historyData, isSuccess } = useQuery<{
    solvedCount: number;
    triedCount: number;
    rank: number;
    totalScore: string;
  }>(["getHistory"], () => reportApis.getHistory());

  const { data: chatListData, isSuccess: isChatListData } = useQuery<
    ChatData[]
  >(["chatList"], () => chatApis.get());

  return (
    <>
      {isSuccess && (
        <ReportWrap>
          <ReportItem>
            <ReportTitle>해결한 문제</ReportTitle>
            <ReportDesc>
              <BoldText>{historyData.solvedCount}</BoldText> 개
            </ReportDesc>
          </ReportItem>
          <ReportItem>
            <ReportTitle>시도한 문제</ReportTitle>
            <ReportDesc>
              <BoldText>{historyData.triedCount}</BoldText> 개
            </ReportDesc>
          </ReportItem>
          <ReportItem>
            <ReportTitle>순위</ReportTitle>
            <ReportDesc>
              <BoldText>{historyData.rank}</BoldText> 등
            </ReportDesc>
          </ReportItem>
          <ReportItem>
            <ReportTitle>점수</ReportTitle>
            <ReportDesc>
              <BoldText>{comma(Number(historyData.totalScore))}</BoldText> 점
            </ReportDesc>
          </ReportItem>
        </ReportWrap>
      )}
      {isChatListData && (
        <ReportStudyLogWrap>
          <ReportStudyLogTitle>학습 로그</ReportStudyLogTitle>
          <Table
            pagination={false}
            tableData={chatListData}
            columns={columns}
          />
        </ReportStudyLogWrap>
      )}
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
