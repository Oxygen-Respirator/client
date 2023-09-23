import Table from "@/components/Table";
import styled from "styled-components";

export default function Rank() {
  const thisWeekRender = () => {
    const NOW = new Date();
    const _year = NOW.getFullYear();
    const _month = NOW.getMonth();
    const _day = NOW.getDay();
    const _date = NOW.getDate();

    return "2023.09.17 - 2023.09.23";
  };

  return (
    <>
      <RankP>{thisWeekRender()}</RankP>
      <Table tableData={data} columns={columns} pagination={false} />
    </>
  );
}

interface RankData {
  rank: number;
  nickname: string;
  solveProblemCount: number;
  score: number;
}
const columns: TableColumns<RankData> = [
  {
    dataIndex: "rank",
    title: "순위",
    render: _rank => {
      return `${_rank} 위`;
    },
  },
  {
    dataIndex: "nickname",
    title: "닉네임",
  },
  {
    dataIndex: "solveProblemCount",
    title: "해결한문제",
    render: _solveCount => {
      return `${_solveCount} 문제`;
    },
  },
  {
    dataIndex: "score",
    title: "점수",
    render: _score => {
      return `${_score} 점`;
    },
  },
];

const RankP = styled.p`
  text-align: right;
`;

const data: RankData[] = [
  {
    rank: 1,
    nickname: "아리",
    solveProblemCount: 1280,
    score: 48230,
  },
  {
    rank: 2,
    nickname: "재키",
    solveProblemCount: 1250,
    score: 48000,
  },
  {
    rank: 3,
    nickname: "애나",
    solveProblemCount: 1220,
    score: 47800,
  },
  {
    rank: 4,
    nickname: "레오",
    solveProblemCount: 1200,
    score: 46523,
  },
  {
    rank: 5,
    nickname: "테리",
    solveProblemCount: 1180,
    score: 46000,
  },
];
