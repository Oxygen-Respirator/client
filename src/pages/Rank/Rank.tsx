import { useRecoilValue } from "recoil";
import { langListAtom } from "@/atom/langList";

import Table from "@/components/Table";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGetRankListQuery } from "@/queryHook/useRankQuery";

export default function Rank() {
  const [curLang, setCurLang] = useState<number>(0);
  const langList = useRecoilValue(langListAtom);

  const { data: rnakList = [] } = useGetRankListQuery(curLang);

  useEffect(() => {
    if (langList[0]) {
      setCurLang(langList[0].id);
    }
  }, [langList]);

  // const thisWeekRender = () => {
  //   const NOW = new Date();
  //   const _year = NOW.getFullYear();
  //   const _month = NOW.getMonth();
  //   const _day = NOW.getDay();
  //   const _date = NOW.getDate();

  //   return "2023.09.17 - 2023.09.23";
  // };

  const onChangeLangSelect = ({ target: { value = "" } }) => {
    setCurLang(Number(value));
  };

  return (
    <>
      <LangBox>
        <LangSelect onChange={onChangeLangSelect} value={curLang}>
          {langList.map(({ id, name }) => (
            <LangOption key={id} value={id}>
              {name}
            </LangOption>
          ))}
        </LangSelect>
        {/* <RankP>{thisWeekRender()}</RankP> */}
      </LangBox>
      <Table tableData={rnakList} columns={columns} pagination={false} />
    </>
  );
}

const LangBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const LangSelect = styled.select``;

const LangOption = styled.option``;

// const RankP = styled.p`
//   text-align: right;
// `;

interface RankData {
  rank: number;
  nickname: string;
  resolveCount: number;
  totalScore: number;
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
    dataIndex: "resolveCount",
    title: "해결한문제",
    render: _solveCount => {
      return `${_solveCount} 문제`;
    },
  },
  {
    dataIndex: "totalScore",
    title: "점수",
    render: _score => {
      return `${_score} 점`;
    },
  },
];

// const data: RankData[] = [
//   {
//     rank: 1,
//     nickname: "아리",
//     resolveCount: 1280,
//     totalScore: 48230,
//   },
//   {
//     rank: 2,
//     nickname: "재키",
//     resolveCount: 1250,
//     totalScore: 48000,
//   },
//   {
//     rank: 3,
//     nickname: "애나",
//     resolveCount: 1220,
//     totalScore: 47800,
//   },
//   {
//     rank: 4,
//     nickname: "레오",
//     resolveCount: 1200,
//     totalScore: 46523,
//   },
//   {
//     rank: 5,
//     nickname: "테리",
//     resolveCount: 1180,
//     totalScore: 46000,
//   },
// ];
