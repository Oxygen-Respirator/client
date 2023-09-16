import styled from 'styled-components';

const index = () => {
  const SUBJECT_LIST = ['Java', 'JavaScript', 'Kotlin', 'React', 'Next.js', 'Node.js', 'Nest.js', 'Spring', 'CS'];

  return (
    <SideBarContainer>
      <div>
        <div>
          <TitleText>💻개발 공부 분야 선택</TitleText>
          <select>
            {SUBJECT_LIST.map((sbj) => (
              <option value={sbj}>{sbj}</option>
            ))}
          </select>
        </div>
      </div>
    </SideBarContainer>
  );
};

export default index;

const TitleText = styled.p`
  margin-bottom: 1rem;
`;

const SideBarContainer = styled.div`
  width: 10%;
  min-width: 220px;
  height: 100%;
  border-radius: 0.75rem;
  background-color: #f1f7ff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 2rem;
`;
