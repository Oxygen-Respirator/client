import chatApis from "@/apis/chatApis";
import reportApis from "@/apis/reportApis";
import Table from "@/components/Table";
import { comma } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import * as S from "./style";

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
        <S.ReportWrap>
          <S.ReportItem>
            <S.ReportTitle>해결한 문제</S.ReportTitle>
            <S.ReportDesc>
              <S.BoldText>{historyData.solvedCount}</S.BoldText> 개
            </S.ReportDesc>
          </S.ReportItem>
          <S.ReportItem>
            <S.ReportTitle>시도한 문제</S.ReportTitle>
            <S.ReportDesc>
              <S.BoldText>{historyData.triedCount}</S.BoldText> 개
            </S.ReportDesc>
          </S.ReportItem>
          <S.ReportItem>
            <S.ReportTitle>순위</S.ReportTitle>
            <S.ReportDesc>
              <S.BoldText>{historyData.rank}</S.BoldText> 등
            </S.ReportDesc>
          </S.ReportItem>
          <S.ReportItem>
            <S.ReportTitle>점수</S.ReportTitle>
            <S.ReportDesc>
              <S.BoldText>{comma(Number(historyData.totalScore))}</S.BoldText>{" "}
              점
            </S.ReportDesc>
          </S.ReportItem>
        </S.ReportWrap>
      )}
      {isChatListData && (
        <S.ReportStudyLogWrap>
          <S.ReportStudyLogTitle>학습 로그</S.ReportStudyLogTitle>
          <Table
            pagination={false}
            tableData={chatListData}
            columns={columns}
          />
        </S.ReportStudyLogWrap>
      )}
    </>
  );
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
